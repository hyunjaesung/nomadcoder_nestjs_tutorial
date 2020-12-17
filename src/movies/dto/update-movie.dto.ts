import { PartialType } from '@nestjs/mapped-types';
// @nestjs/mapped-types은 dto 타입변환 도와주는 모듈
import { CreateMovieDto } from './create-movie.dto';
// 클래스의 유효성 검사
// 잘못된거 주고 받을시 400 에러 날린다

export class UpdateMovieDto extends PartialType(CreateMovieDto) {} // 전부 필수아니라는것만 다르게 dto 확장
