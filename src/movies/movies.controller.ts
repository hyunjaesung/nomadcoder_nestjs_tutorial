import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
  Query,
} from '@nestjs/common';

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
