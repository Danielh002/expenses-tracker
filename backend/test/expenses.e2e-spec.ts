import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ExpensesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('creates and retrieves expenses', async () => {
    const expense = {
      amount: 25.5,
      category: 'food',
      date: new Date().toISOString()
    };

    const createResponse = await request(app.getHttpServer()).post('/expenses').send(expense).expect(201);
    expect(createResponse.body).toMatchObject({ amount: expense.amount, category: expense.category });

    const listResponse = await request(app.getHttpServer()).get('/expenses').expect(200);
    expect(listResponse.body.length).toBeGreaterThanOrEqual(1);
  });

  it('summarizes expenses', async () => {
    const summaryResponse = await request(app.getHttpServer()).get('/summary').expect(200);
    expect(summaryResponse.body).toBeDefined();
  });
});
