import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  // 여기서 데이터 베이스를 다루자
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === parseInt(id));
    if (!movie) {
      // nest 에서 기본제공하는 에러 모듈;
      throw new NotFoundException(`Movie With ID ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: string) {
    this.getOne(id); // 없는거 지울때 에러 던져서 방어
    this.movies = this.movies.filter((movie) => movie.id !== parseInt(id));
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
  update(id: string, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id); // 지우고
    // 업데이트 로직
    this.movies.push({ ...movie, ...updateData });
  }
}
