import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('payment_history')
export class TransactionOrm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id', type: 'int' })
    userId: number;

    @Column({ type: 'decimal', precision: 19, scale: 2 })
    amount: number;

    @Column({
        type: 'enum',
        enum: ['deposit', 'withdrawal'],
        name: 'action',
    })
    action: 'deposit' | 'withdrawal';

    @Column({
        type: 'enum',
        enum: ['pending', 'completed', 'failed'],
        default: 'completed',
    })
    status: 'pending' | 'completed' | 'failed';

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}