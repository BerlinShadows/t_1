import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { User } from './entity/user.entity';
import { Ledger } from 'src/ledger/entity/ledger.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly uRepository: Repository<User>,
        @InjectRepository(Ledger)
        private readonly lRepository: Repository<Ledger>,
        private readonly dataSource: DataSource,
    ) { }

    async getBalance(id: number) {
        const user = await this.uRepository.findOneBy({
            id
        })
        if (!user) {
            throw new NotFoundException('user not found')
        }
        return user.balance;
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