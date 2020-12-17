import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

// 데코레이터
// 데코레이터는 클래스에 함수 기능을 추가할 수 있다
// 클래스 위의 함수라고 생각하면된다

@Module({
  imports: [MoviesModule],
  controllers: [AppController], // express의 router 같은 것
  providers: [],
})
export class AppModule {} // 루트 모듈 같은 개념
// 루트 모듈에는 앱을 형성하는 모듈들을 모아주고
// 특정 컨트롤러나 프로바이더는 그 특정에 속하는 모듈에 넣도록 해야함
