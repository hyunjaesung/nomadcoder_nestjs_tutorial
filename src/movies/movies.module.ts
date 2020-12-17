import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  // 여기에 넣어야지 의존성 주입이 되고 자동으로 import 되고 그냥 this 로 엮어서 사용이 가능하다
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
