const app = require('./app');
const request = require('supertest');

describe('포스트 라우트!!!', () => {
  test('디테일 포스트를 가져올 때 200을 반환해야 함', async () => {
    const response = await request(app).get('/posts')
    expect(response.status).toEqual(200)
  });

  test('포스팅을 등록할 때 200을 반환해야 함', async () => {
    const response = await request(app).post('/posts')
    expect(response.status).toEqual(200)
  })

  // test('포스트를 삭제할 때 200을 반환해야 함', async () => {
  //   const response = await request(app).post('/posts/*')
  //   expect(response.status).toEqual(200)
  // })
})
