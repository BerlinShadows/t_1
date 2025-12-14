import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { AppConfigModule } from './config/config.module';
import { LedgerModule } from './ledger/ledger.module';
import { User } from './user/entity/user.entity';
import { Ledger } from './ledger/entity/ledger.entity';

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
          Ledger
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    LedgerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
