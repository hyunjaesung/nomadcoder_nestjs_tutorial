import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // Get Router랑 같은 역할
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello') // /hello 주소 라우팅 hello 주소 접근하면 sayHello() 실행
  // 주의점은 데코레이터와 클래스 붙어있어야한다
  sayHello(): string {
    return 'Hello everyone!!';
  }
}
