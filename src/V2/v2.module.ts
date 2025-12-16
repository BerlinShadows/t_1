import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { V2UserController } from './infrastructure/controllers/v2-user.controller';
import { AdjustBalanceUseCase } from './core/application/use-cases/AdjustBalanceUseCase';
import { UserRepositoryAdapter } from './infrastructure/persistence/UserRepositoryAdapter';
import { UserOrm } from './infrastructure/persistence/typeorm/entities/user.orm-entity';
import { TransactionOrm } from './infrastructure/persistence/typeorm/entities/transaction.orm-entity';
import { GetBalanceFromHistoryUseCase } from './core/application/use-cases/GetBalanceFromHistoryUseCase';
import { GetCurrentBalanceUseCase } from './core/application/use-cases/GetCurrentBalanceUseCase';
import { TransactionRepositoryPort } from './core/domain/ports/TransactionRepositoryPort';
import { UserRepositoryPort } from './core/domain/ports/UserRepositoryPort';
import { TransactionRepositoryAdapter } from './infrastructure/persistence/TransactionRepositoryAdapter';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserOrm, TransactionOrm]),
    ],
    controllers: [V2UserController],
    providers: [
        AdjustBalanceUseCase,
        GetCurrentBalanceUseCase,
        GetBalanceFromHistoryUseCase,

        { provide: UserRepositoryPort, useClass: UserRepositoryAdapter },
        { provide: TransactionRepositoryPort, useClass: TransactionRepositoryAdapter },
    ],
})
export class V2Module { }