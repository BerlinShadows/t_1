import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { LedgerService } from './ledger.service';

@Controller('ledger')
export class LedgerController {
    constructor(
        private readonly service: LedgerService,
    ) { }

    @Get(':id/balance-from-history')
    async getBalanceFromHistory(@Param('id', ParseIntPipe) id: number): Promise<{ balance: number }> {
        const balance = await this.service.getBalanceFromHistory(id);
        return { balance: Number(balance.toFixed(2)) };
    }
}