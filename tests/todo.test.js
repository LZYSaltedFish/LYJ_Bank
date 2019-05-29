const { request, tokens } = require('../tests')
const setup = require('./seed')
beforeAll(async () => {
  await setup()
})

afterAll(async () => {
})

describe('todo', () => {
  test('创建todo', (done) => {
    request.post('/api/todos')
      .send({
        text: '一个todo'
      })
      .set(tokens.user_a)
      .expect(200, done)
  })
  test('获取todos', (done) => {
    request.get('/api/todos')
      .set(tokens.user_a)
      .expect(200, done)
  })
})
