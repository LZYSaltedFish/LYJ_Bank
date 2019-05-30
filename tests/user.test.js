const { request } = require('.')
const setup = require('./seed')
beforeAll(async () => {
  await setup()
})

afterAll(async () => {
})

describe('user', () => {
  test('创建用户->username不重复', (done) => {
    request.post('/api/register')
      .send({
        username: 'test',
        password: '123456'
      })
      .expect(200, done)
  })
  test('创建用户->username重复', (done) => {
    request.post('/api/register')
      .send({
        username: '23333',
        password: '123456'
      })
      .expect(200)
      .then(res => {
        expect(res.body.errcode).toBe(5)
        done()
      })
  })
  test('登陆', (done) => {
    request.post('/api/login')
      .send({
        username: '23333',
        password: '123456'
      })
      .expect(200)
      .then(res => {
        expect(res.get('Authorization')).toBeDefined()
        done()
      })
  })
})
