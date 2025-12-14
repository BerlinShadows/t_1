import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { LedgerModule } from 'src/ledger/ledger.module';
import { Ledger } from 'src/ledger/entity/ledger.entity';

@Module({
    imports: [
        LedgerModule,
        TypeOrmModule.forFeature([User, Ledger])
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }