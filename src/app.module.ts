import { Module } from '@nestjs/common';

// 데코레이터
// 데코레이터는 클래스에 함수 기능을 추가할 수 있다
// 클래스 위의 함수라고 생각하면된다

@Module({
  imports: [],
  controllers: [], // express의 router 같은 것
  providers: [],
})
export class AppModule {} // 루트 모듈 같은 개념
