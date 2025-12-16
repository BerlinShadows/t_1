import { Injectable } from '@nestjs/common';

import { TransactionRepositoryPort } from '../../domain/ports/TransactionRepositoryPort';

export type GetBalanceFromHistoryInput = {
    userId: number;
};

@Injectable()
export class GetBalanceFromHistoryUseCase {
    constructor(
        private readonly transactionRepo: TransactionRepositoryPort,
    ) { }

    async execute(input: GetBalanceFromHistoryInput): Promise<number> {

        const transactions = await this.transactionRepo.findByUserId(input.userId);

        let balance = 0;
        for (const tx of transactions) {
            if (tx.action === 'deposit') {
                balance += tx.amount;
            } else if (tx.action === 'withdrawal') {
                balance -= tx.amount;
            }
        }

        return Number(balance.toFixed(2));
    }
}