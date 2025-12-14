import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { AdjustBalanceDto } from './dto/adjust-balance.dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly service: UserService,
    ) { }

    @Get(':id/balance')
    async balance(@Param('id', ParseIntPipe) userId: number) {
        return await this.service.getBalance(userId);
    }

    @Get(':id/balance-from-history')
    async getBalanceFromHistory(@Param('id', ParseIntPipe) id: number): Promise<{ balance: number }> {
        const balance = await this.service.getBalanceFromHistory(id);
        return { balance: Number(balance.toFixed(2)) };
    }

    @Patch(':id/balance')
    async adjustBalance(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: AdjustBalanceDto,
    ): Promise<User> {
        return await this.service.adjustBalance(id, dto.amount, dto.action);
    }
}