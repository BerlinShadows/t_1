import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { AdjustBalanceDto } from './dto/adjust-balance.dto';
import { LedgerService } from 'src/ledger/ledger.service';

@Controller('users')
export class UserController {
    constructor(
        private readonly uService: UserService,
        private readonly lService: LedgerService,
    ) { }

    @Get(':id/balance')
    async balance(@Param('id', ParseIntPipe) userId: number) {
        return await this.uService.getBalance(userId);
    }

    @Patch(':id/balance')
    async adjustBalance(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: AdjustBalanceDto,
    ): Promise<User> {
        return await this.lService.adjustBalance(id, dto.amount, dto.action);
    }
}