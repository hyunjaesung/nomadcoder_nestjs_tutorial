import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  // 여기서 데이터 베이스를 다루자
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      // nest 에서 기본제공하는 에러 모듈;
      throw new NotFoundException(`Movie With ID ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id); // 없는거 지울때 에러 던져서 방어
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id); // 지우고
    // 업데이트 로직
    this.movies.push({ ...movie, ...updateData });
  }
}
