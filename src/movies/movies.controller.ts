import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { create } from 'istanbul-reports';

@Controller('movies') // 'movies' 요부분을 써주 면 엔트리 포인트로 관리함, 도메인/moives 라우트로 특별하게 취급
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('/:id') // 추가 라우팅 가능하게
  getOne(@Param('id') potato: string) {
    // @Param 데코레이터로 요청해야지만 상위 데코레이터가 변수 전달해준다
    return `This will return one movie :${potato}`;
  }

  @Post()
  create() {
    return 'this will create a movie';
  }

  @Delete('/:id')
  remove(@Param('id') potato: string) {
    return `this will delete ${potato} movie`;
  }

  @Put('/:id') // Patch 를 쓰면 일부분만 업데이트 가능
  Put(@Param('id') potato: string) {
    return `this will put ${potato} movie`;
  }
}
