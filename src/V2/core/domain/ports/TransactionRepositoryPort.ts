import { Transaction } from '../entities/transaction.entity';

export abstract class TransactionRepositoryPort {
  abstract save(transaction: Transaction): Promise<Transaction>;
  abstract findByUserId(userId: number): Promise<Transaction[]>;
}