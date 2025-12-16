import { Module } from '@nestjs/common';

import { LedgerController } from './ledger.controller';
import { LedgerService } from './ledger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ledger } from './entity/ledger.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ledger]),
    ],
    controllers: [LedgerController],
    providers: [LedgerService],
    exports: [LedgerService],
})
export class LedgerModule { }