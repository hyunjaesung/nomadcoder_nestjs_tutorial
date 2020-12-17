import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest'; // e to e 슈퍼테스트!!
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // beforeAll 쓰면 end부터 end까지 순차적인 조건 유지
    // beforeEach 쓰면 테스트 마다 초기화
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // test 를 위해서 따로 루트 모듈 실행시킨다
    }).compile();

    app = moduleFixture.createNestApplication();
    // 주의사항!!
    // 개발서버와 테스트시 app 형성을 따로 하는거라
    // 엔트리 부분에서 app 모듈 설정이 다르면
    // 테스트 결과가 다르게 나옴
    // 아래 pipe 설정 안하는 차이가 생기면
    // 테스팅에서는 id 가 string 으로 들어가고 로컬서버에서는 number로 들어감
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to my site');
  });

  describe('/movies', () => {
    // describe 로 감싸는건 좀 더 깔끔해 보이게하려고
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2020,
          genres: ['test'],
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2020,
          genres: ['test'],
          hack: 'haha',
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'update title' })
        .expect(200);
    });
    // it.todo('DELETE'); todo써서 작업할 때 요긴하게 사용가능
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
