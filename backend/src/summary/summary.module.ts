import { Module } from '@nestjs/common';
import { SummaryController } from './summary.controller';
import { ExpensesModule } from '../expenses/expenses.module';

@Module({
  imports: [ExpensesModule],
  controllers: [SummaryController]
})
export class SummaryModule {}
