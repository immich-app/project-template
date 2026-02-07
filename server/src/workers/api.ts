import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiModule } from 'src/app.module';
import { excludePaths, serverVersion } from 'src/constants';
import { AppRepository } from 'src/repositories/app.repository';
import { ConfigRepository } from 'src/repositories/config.repository';
import { LoggingRepository } from 'src/repositories/logging.repository';
import { isStartUpError } from 'src/utils/misc';

async function bootstrap() {
  process.title = 'server-api';

  const app = await NestFactory.create<NestExpressApplication>(ApiModule, { bufferLogs: true });
  app.enableCors();
  app.setGlobalPrefix('api', { exclude: excludePaths });
  app.get(AppRepository).setCloseFn(() => app.close());
  const configRepository = app.get(ConfigRepository);
  const { environment } = configRepository.getEnv();
  const logger = await app.resolve(LoggingRepository);
  await app.listen(2283);
  logger.log(`Server API is listening [v${serverVersion}] [${environment}] on 2283`);
}

bootstrap().catch((error) => {
  if (!isStartUpError(error)) {
    console.error(error);
  }
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
});
