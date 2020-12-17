# 노마드코더 nest js 튜토리얼

## 기본 세팅

### 설치

```
npm i -g @nestjs/cli
```

설치 후 nest 쳐보면 커맨드 볼 수 있다

### 보일러 플레이트 실행

```
nest new
```

### 시작

```
npm run start:dev
```

### 모듈생성

cli 도움받으면 쉽게 가능  
예) 컨트롤러 생성

```
nest g co
```

## 기본 구조

### main.ts

```
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

```

### 루트 모듈

```
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 데코레이터
// 데코레이터는 클래스에 함수 기능을 추가할 수 있다
// 클래스 위의 함수라고 생각하면된다

@Module({
  imports: [],
  controllers: [AppController], // express의 router 같은 것
  providers: [AppService],
})
export class AppModule {} // 루트 모듈 같은 개념

```

### 컨트롤러

```
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
// url 을 가져오고 function을 뱉는 역할
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // Get Router랑 같은 역할
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello') // /hello 주소 라우팅 hello 주소 접근하면 sayHello() 실행
  // 주의점은 데코레이터와 클래스 붙어있어야한다
  sayHello(): string {
    return this.appService.getHi();
  }
}

```

### provider

```
import { Injectable } from '@nestjs/common';

@Injectable()
// 비즈니스 로직을 실행시키는 역할
export class AppService {
  getHello(): string {
    return 'Hello Nest!'; // 출력 되던 것
  }
  getHi(): string {
    return 'Hi next'; // nest 컨벤션에 따르면 이렇게 service를 만들어 주는게 좋다
  }
}

```
