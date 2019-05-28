const { request } = require('../tests')
const setup = require('./seed')
beforeAll(async () => {
  await setup()
})

afterAll(async () => {
})

describe('account', () => {
  test('创建account', (done) => {
    request.post('/api/account')
      .send({
        account_id: '测试账号',
        balance: 0
      })
      .expect(200, done)
  })
  test('获取账户信息', (done) => {
    request.get('/api/account')
      .query({
        account_id: '测试账号'
      })
      .expect(200, done)
  })
})
