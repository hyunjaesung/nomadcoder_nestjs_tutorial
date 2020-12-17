import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    // 테스트 전에 설정 하는것
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    // service.create({ 아래 반복되는거 여기에 하면 한번에도 가능
    //     title: 'test movie',
    //     genres: ['test'],
    //     year: 2000,
    //   });
  });

  it('should be defined', () => {
    // individual test 의 약자
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    // 이름이 같을필욘 없다
    it('should return an array', () => {
      const result = service.getAll(); // 위에서 연결되어있음
      expect(result).toBeInstanceOf(Array); // expect(검증해야되는 값).그뒤 메서드(정답 값)
    });
  });
  describe('getOne', () => {
    console.log(service); // service 밖에서는 undefined다
    it('sholud return a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999); // NotFoundException 터질것
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('DeleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();

      expect(afterDelete.length).toEqual(beforeDelete.length - 1);
    });
    it('should throw 404 error', () => {
      try {
        service.deleteOne(999); // NotFoundException 터질것
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create', () => {
    it('shold create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: 'updated test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updated test');
    });
    it('should throw 404 error', () => {
      try {
        service.update(999, {}); // NotFoundException 터질것
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
