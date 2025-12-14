import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Ledger } from "src/ledger/entity/ledger.entity";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 19, scale: 2, default: 0 })
    balance: number;

    @OneToMany(() => Ledger, (ledger) => ledger.user)
    ledger: Ledger[];
}