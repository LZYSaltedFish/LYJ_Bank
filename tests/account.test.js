const { request, tokens } = require('../tests')
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
      .set(tokens.user_a)
      .expect(200)
      .then(res => {
        expect(res.body.errcode).toBe(1)
        expect()
        done()
      })
  })
  test('创建account->account_id非重复', (done) => {
    request.post('/api/account')
      .send({
        account_id: 'account100',
        balance: 0
      })
      .set(tokens.user_a)
      .expect(200)
      .then(res => {
        expect(res.body.errcode).toBeUndefined()
        done()
      })
  })
  test('获取账户信息', (done) => {
    request.get('/api/account')
      .set(tokens.user_b)
      .query({
        account_id: 'account1'
      })
      .expect(200, done)
  })
  test('获取账户信息->账户不是用户所有', (done) => {
    request.get('/api/account')
      .set(tokens.user_a)
      .query({
        account_id: 'account1'
      })
      .expect(403, done)
  })
})
