import { Injectable } from '@nestjs/common';

import { User } from '../../domain/entities/user.entity';
import { TransactionAction } from '../../domain/entities/transaction.entity';
import { UserRepositoryPort } from '../../domain/ports/UserRepositoryPort';
import { TransactionRepositoryPort } from '../../domain/ports/TransactionRepositoryPort';

export type AdjustBalanceInput = {
    userId: number;
    amount: number;
    action: TransactionAction;
};

@Injectable()
export class AdjustBalanceUseCase {
    constructor(
        private readonly userRepo: UserRepositoryPort,
        private readonly transactionRepo: TransactionRepositoryPort,
    ) { }

    async execute(input: AdjustBalanceInput): Promise<User> {
        if (input.amount <= 0) {
            throw new Error('Amount must be positive');
        }

        const user = await this.userRepo.findById(input.userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (input.action === 'withdrawal' && user.balance < input.amount) {
            throw new Error('Insufficient balance');
        }

        const delta = input.action === 'deposit' ? input.amount : -input.amount;
        user.balance = Number((user.balance + delta).toFixed(2));

        await this.userRepo.save(user);

        await this.transactionRepo.save({
            id: 0,
            userId: user.id,
            amount: input.amount,
            action: input.action,
            status: 'completed',
            createdAt: new Date(),
        });

        return user;
    }
}