import { Controller, Get } from '@nestjs/common';
import { ExpensesService } from '../expenses/expenses.service';

@Controller('summary')
export class SummaryController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getSummary() {
    return this.expensesService.summarize();
  }
}
