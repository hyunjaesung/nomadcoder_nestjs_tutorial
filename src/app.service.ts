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
