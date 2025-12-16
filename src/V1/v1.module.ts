import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ledger } from './ledger/entity/ledger.entity';
import { LedgerModule } from './ledger/ledger.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';



@Module({
    imports: [
        TypeOrmModule.forFeature([User, Ledger]),
        UserModule,
        LedgerModule,
    ]
})
export class V1Module { }