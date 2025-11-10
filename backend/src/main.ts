import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });

  const logger = new Logger('Bootstrap');
  app.useLogger(logger);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const frontendOrigin = configService.get<string>('frontendOrigin', 'http://localhost:5173');
  const frontendOrigins =
    configService.get<string>('FRONTEND_ORIGINS') ?? frontendOrigin;
  const allowedOrigins = frontendOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
  const apiPrefix = configService.get<string>('API_PREFIX', 'api');

  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true
  });
  app.setGlobalPrefix(apiPrefix);

  await app.listen(port);
  logger.log(`API listening on port ${port}`);
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Failed to start the application', error.stack);
  process.exit(1);
});
