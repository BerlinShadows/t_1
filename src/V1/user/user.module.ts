import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { Ledger } from '../ledger/entity/ledger.entity';
import { LedgerModule } from '../ledger/ledger.module';
import { LedgerService } from '../ledger/ledger.service';


@Module({
    imports: [
        LedgerModule,
        TypeOrmModule.forFeature([User, Ledger])
    ],
    controllers: [UserController],
    providers: [UserService, LedgerService],
})
export class UserModule { }