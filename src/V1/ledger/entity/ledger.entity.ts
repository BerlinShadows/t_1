import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "src/V1/user/entity/user.entity";

@Entity({ name: 'ledger' })
export class Ledger {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ['deposit', 'withdrawal'],
        name: 'action',
    })
    action: 'deposit' | 'withdrawal';

    @Column({ type: 'decimal', precision: 19, scale: 2 })
    amount: number;

    @Column({
        name: 'status',
        type: 'enum',
        enum: ['pending', 'completed', 'failed'],
        default: 'completed',
    })
    ts: 'pending' | 'completed' | 'failed';

    @ManyToOne(() => User, (user) => user.ledger)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'user_id', type: 'varchar' })
    userId: number;
}