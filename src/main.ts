import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
    // 유효성 검사 다해주는 모듈
    // whitelist true라고 하면 없으면 거르고 있는것들만 처리함
    // forbidNonWhitelisted true 면 없으면 아예 에러던짐
    // transform 실제타입으로 변환해줌 예를들어서 number로 지정된 문자열 숫자 숫자로 변환
  );
  await app.listen(3000);
}
bootstrap();
