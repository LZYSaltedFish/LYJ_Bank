const { request } = require('../tests')
const setup = require('./seed')
beforeAll(async () => {
  await setup()
})

afterAll(async () => {
})

describe('account', () => {
  test('创建account->account_id重复', (done) => {
    request.post('/api/account')
      .send({
        account_id: 'account1',
        balance: 0
      })
      .expect(200)
      .then(res => {
        expect(res.body.errcode).toBe(1)
        done()
      })
  })
  test('创建account->account_id非重复', (done) => {
    request.post('/api/account')
      .send({
        account_id: 'account100',
        balance: 0
      })
      .expect(200)
      .then(res => {
        expect(res.body.errcode).toBeUndefined()
        done()
      })
  })
  test('获取账户信息', (done) => {
    request.get('/api/account')
      .query({
        account_id: 'account1'
      })
      .expect(200, done)
  })
})
