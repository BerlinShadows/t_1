import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { User } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly uRepository: Repository<User>,
    ) { }

    async getBalance(id: number) {
        const user = await this.uRepository.findOneBy({
            id
        })
        if (!user) {
            throw new NotFoundException('user not found')
        }
        return user.balance;
    }
}