import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Ledger } from './entity/ledger.entity';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class LedgerService {
    constructor(
        @InjectRepository(Ledger)
        private readonly lRepository: Repository<Ledger>,
        private readonly dataSource: DataSource,
    ) { }

    async getBalanceFromHistory(userId: number): Promise<Number> {
        const result = await this.lRepository
            .createQueryBuilder('ledger')
            .select(
                `COALESCE(SUM(CASE WHEN ledger.action = 'deposit' THEN ledger.amount ELSE -ledger.amount END), 0)`,
                'balance',
            )
            .where('ledger.userId = :userId', { userId })
            .getRawOne();

        return Number(result.balance);
    }


    async adjustBalance(
        userId: number,
        amount: number,
        action: 'deposit' | 'withdrawal',
    ): Promise<User> {
        return this.dataSource.transaction(async (manager) => {
            const user = await manager
                .getRepository(User)
                .createQueryBuilder('user')
                .where('user.id = :id', { id: userId })
                .setLock('pessimistic_write')
                .getOne();

            if (!user) {
                throw new NotFoundException(`User with ID ${userId} not found`);
            }

            if (user.balance === null || user.balance === undefined) {
                user.balance = 0;
            }

            const delta = action === 'deposit' ? amount : -amount;
            const newBalance = Number(user.balance) + delta;
            if (action === 'withdrawal' && newBalance < 0) {
                throw new BadRequestException('Insufficient balance');
            }

            user.balance = Number(newBalance.toFixed(2));
            await manager.getRepository(User).save(user);

            const historyEntry = new Ledger();
            historyEntry.userId = userId;
            historyEntry.amount = amount;
            historyEntry.action = action;
            historyEntry.ts = 'completed';
            await manager.getRepository(Ledger).save(historyEntry);

            return user;
        });
    }
}