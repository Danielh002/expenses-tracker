import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ExpensesModule } from './expenses/expenses.module';
import { HealthModule } from './health/health.module';
import { SummaryModule } from './summary/summary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ExpensesModule,
    HealthModule,
    SummaryModule
  ]
})
export class AppModule {}
