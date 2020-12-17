import { IsString, IsNumber, IsOptional } from 'class-validator';
// 클래스의 유효성 검사 도와준다
// 잘못된거 주고 받을시 400 에러 날린다

// DTO Data transfer object
export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
