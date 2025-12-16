import { Injectable } from '@nestjs/common';

import { UserRepositoryPort } from '../../domain/ports/UserRepositoryPort';

export type GetCurrentBalanceInput = {
    userId: number;
};

@Injectable()
export class GetCurrentBalanceUseCase {
    constructor(
        private readonly userRepo: UserRepositoryPort,
    ) { }

    async execute(input: GetCurrentBalanceInput): Promise<number> {
        const user = await this.userRepo.findById(input.userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user.balance;
    }
}