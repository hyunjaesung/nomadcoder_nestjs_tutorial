import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies') // 'movies' 요부분을 써주 면 엔트리 포인트로 관리함, 도메인/moives 라우트로 특별하게 취급
export class MoviesController {
  // 수동으로 import 하는게 아니라 요청을 해야한다
  constructor(private readonly moviesService: MoviesService) {}
  // 타입스크립트 덕분에 바로 주입이된다
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(':id') // 추가 라우팅 가능하게
  getOne(@Param('id') potato: number): Movie {
    // @Param 데코레이터로 요청해야지만 상위 데코레이터가 변수 전달해준다
    return this.moviesService.getOne(potato);
  }

  @Post()
  create(@Body() potato: CreateMovieDto) {
    // @Body 데코레이터로 요청해서 받은 데이터 가져올 수 있음
    // Body도 Param과 마찬가지로 요청하면 준다
    return this.moviesService.create(potato);
  }

  @Delete(':id')
  remove(@Param('id') potato: number) {
    return this.moviesService.deleteOne(potato);
  }

  @Patch(':id') // Patch 를 쓰면 일부분만 업데이트 가능
  update(@Param('id') potato: number, @Body() potato2: UpdateMovieDto) {
    // @Body 로 요청 하면 준다
    // json 을 받아도 자동으로 이해해서 반환한다
    return this.moviesService.update(potato, potato2);
  }
}
