import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserOrm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 19, scale: 2, default: 0 })
    balance: number;
}