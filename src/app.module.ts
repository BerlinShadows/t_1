import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from './config/config.module';
import { V1Module } from './V1/v1.module';
import { V2Module } from './V2/v2.module';
import { User } from './V1/user/entity/user.entity';
import { Ledger } from './V1/ledger/entity/ledger.entity';
import { UserOrm } from './V2/infrastructure/persistence/typeorm/entities/user.orm-entity';
import { TransactionOrm } from './V2/infrastructure/persistence/typeorm/entities/transaction.orm-entity';


@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          User,
          Ledger,
          UserOrm,
          TransactionOrm
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    V1Module,
    V2Module
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
