import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { LedgerModule } from 'src/ledger/ledger.module';
import { Ledger } from 'src/ledger/entity/ledger.entity';
import { LedgerService } from 'src/ledger/ledger.service';

@Module({
    imports: [
        LedgerModule,
        TypeOrmModule.forFeature([User, Ledger])
    ],
    controllers: [UserController],
    providers: [UserService, LedgerService],
})
export class UserModule { }