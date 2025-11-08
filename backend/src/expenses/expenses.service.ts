import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Expense } from './interfaces/expense.interface';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpensesService {
  private readonly logger = new Logger(ExpensesService.name);
  private readonly expenses: Expense[] = [];

  findAll(): Expense[] {
    this.logger.debug(`Returning ${this.expenses.length} expenses`);
    return [...this.expenses];
  }

  create(dto: CreateExpenseDto): Expense {
    const expense: Expense = {
      id: randomUUID(),
      amount: dto.amount,
      category: dto.category,
      date: dto.date
    };

    this.expenses.push(expense);
    this.logger.log(`Created expense ${expense.id} (${expense.category})`);
    return expense;
  }

  summarize(): Record<string, number> {
    return this.expenses.reduce<Record<string, number>>((acc, expense) => {
      acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
      return acc;
    }, {});
  }
}
