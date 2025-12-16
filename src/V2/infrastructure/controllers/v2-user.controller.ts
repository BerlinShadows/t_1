import {
    Controller,
    Get,
    Patch,
    Param,
    Body,
    ParseIntPipe,
} from '@nestjs/common';

import { AdjustBalanceUseCase, AdjustBalanceInput } from '../../core/application/use-cases/AdjustBalanceUseCase';
import { GetBalanceFromHistoryUseCase, GetBalanceFromHistoryInput } from '../../core/application/use-cases/GetBalanceFromHistoryUseCase';
import { GetCurrentBalanceUseCase, GetCurrentBalanceInput } from '../../core/application/use-cases/GetCurrentBalanceUseCase';

@Controller('v2/users')
export class V2UserController {
    constructor(
        private readonly adjustBalanceUseCase: AdjustBalanceUseCase,
        private readonly getBalanceFromHistoryUseCase: GetBalanceFromHistoryUseCase,
        private readonly getCurrentBalanceUseCase: GetCurrentBalanceUseCase,
    ) { }

    @Patch(':id/balance')
    async adjustBalance(
        @Param('id', ParseIntPipe) userId: number,
        @Body() body: { amount: number; action: 'deposit' | 'withdrawal' },
    ) {
        const input: AdjustBalanceInput = { userId, amount: body.amount, action: body.action };
        return this.adjustBalanceUseCase.execute(input);
    }

    @Get(':id/balance')
    async getCurrentBalance(@Param('id', ParseIntPipe) userId: number) {
        const input: GetCurrentBalanceInput = { userId };
        const balance = await this.getCurrentBalanceUseCase.execute(input);
        return { balance };
    }

    @Get(':id/balance-from-history')
    async getBalanceFromHistory(@Param('id', ParseIntPipe) userId: number) {
        const input: GetBalanceFromHistoryInput = { userId };
        const balance = await this.getBalanceFromHistoryUseCase.execute(input);
        return { balance };
    }
}