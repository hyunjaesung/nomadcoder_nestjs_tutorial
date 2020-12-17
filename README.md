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

## 만들어 보자

### movie controller

```
@Controller('movies') // 'movies' 요부분을 써주 면 엔트리 포인트로 관리함, 도메인/moives 라우트로 특별하게 취급
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  // http://localhost:3000/movies/search?year=2020
  @Get('search')
  search(@Query('year') potato: string) {
    // @Query 데코레이터로 쿼리 요청
    // 컨셉은 요청하면 준다는 것
    return `We are searching made after ${potato}`;
  }

  @Get(':id') // 추가 라우팅 가능하게
  getOne(@Param('id') potato: string) {
    // @Param 데코레이터로 요청해야지만 상위 데코레이터가 변수 전달해준다
    return `This will return one movie :${potato}`;
  }

  @Post()
  create(@Body() potato) {
    // @Body 데코레이터로 요청해서 받은 데이터 가져올 수 있음
    // Body도 Param과 마찬가지로 요청하면 준다
    return potato;
  }

  @Delete(':id')
  remove(@Param('id') potato: string) {
    return `this will delete ${potato} movie`;
  }

  @Put(':id') // Patch 를 쓰면 일부분만 업데이트 가능
  put(@Param('id') potato: string, @Body() potato2) {
    // @Body 로 요청 하면 준다
    // json 을 받아도 자동으로 이해해서 반환한다
    return {
      updateMovie: potato,
      ...potato2,
    };
  }
}
```
