import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
    Transaction,
    TransactionAction,
    TransactionStatus,
} from '../../core/domain/entities/transaction.entity';
import { TransactionRepositoryPort } from '../../core/domain/ports/TransactionRepositoryPort';
import { TransactionOrm } from './typeorm/entities/transaction.orm-entity';

@Injectable()
export class TransactionRepositoryAdapter implements TransactionRepositoryPort {
    constructor(
        @InjectRepository(TransactionOrm)
        private readonly ormRepo: Repository<TransactionOrm>,
    ) { }

    async save(transaction: Transaction): Promise<Transaction> {
        const orm = this.ormRepo.create({
            id: transaction.id === 0 ? undefined : transaction.id,
            userId: transaction.userId,
            amount: transaction.amount,
            action: transaction.action as TransactionAction,
            status: transaction.status as TransactionStatus,
            createdAt: transaction.createdAt,
        });

        const saved = await this.ormRepo.save(orm);

        return new Transaction(
            saved.id,
            saved.userId,
            Number(saved.amount),
            saved.action,
            saved.status,
            saved.createdAt,
        );
    }

    async findByUserId(userId: number): Promise<Transaction[]> {
        const orms = await this.ormRepo.find({
            where: { userId },
            order: { createdAt: 'ASC' },
        });

        return orms.map(orm =>
            new Transaction(
                orm.id,
                orm.userId,
                Number(orm.amount),
                orm.action,
                orm.status,
                orm.createdAt,
            )
        );
    }
}