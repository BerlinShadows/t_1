import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../core/domain/entities/user.entity';
import { UserRepositoryPort } from '../../core/domain/ports/UserRepositoryPort';
import { UserOrm } from './typeorm/entities/user.orm-entity';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
    constructor(
        @InjectRepository(UserOrm)
        private readonly ormRepo: Repository<UserOrm>,
    ) { }

    async findById(id: number): Promise<User | null> {
        const orm = await this.ormRepo.findOneBy({ id });
        if (!orm) return null;
        return new User(orm.id, Number(orm.balance));
    }

    async save(user: User): Promise<User> {
        const orm = this.ormRepo.create({
            id: user.id,
            balance: user.balance,
        });
        const saved = await this.ormRepo.save(orm);
        return new User(saved.id, Number(saved.balance));
    }
}