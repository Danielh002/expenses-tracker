import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsPositive } from 'class-validator';

enum ExpenseCategory {
  HOUSING = 'housing',
  UTILITIES = 'utilities',
  FOOD = 'food',
  TRANSPORTATION = 'transportation',
  ENTERTAINMENT = 'entertainment',
  OTHER = 'other'
}

export class CreateExpenseDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  amount!: number;

  @IsEnum(ExpenseCategory, {
    message: `category must be one of: ${Object.values(ExpenseCategory).join(', ')}`
  })
  category!: ExpenseCategory;

  @IsDateString()
  date!: string;
}

export const ExpenseCategories = ExpenseCategory;
