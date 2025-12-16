export type TransactionAction = 'deposit' | 'withdrawal';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

export class Transaction {
    constructor(
        public id: number,
        public userId: number,
        public amount: number,
        public action: TransactionAction,
        public status: TransactionStatus,
        public createdAt: Date,
    ) { }
}