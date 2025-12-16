import { IsEnum, IsNumber, Min } from 'class-validator';

export class AdjustBalanceDto {
    @IsNumber()
    @Min(0.01)
    amount: number;

    @IsEnum(['deposit', 'withdrawal'])
    action: 'deposit' | 'withdrawal';
}