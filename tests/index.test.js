const { request } = require('../tests')

beforeAll(async () => {
})

afterAll(async () => {
})

describe('测试', () => {
  test('能访问到根路径', (done) => {
    request.get('/api')
      .expect(200, done)
  })
})
