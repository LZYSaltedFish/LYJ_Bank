const { request, tokens } = require('../tests')
const setup = require('./seed')
beforeAll(async () => {
  await setup()
})

afterAll(async () => {
})
describe('account', () => {
  test('取款-->余额不足', (done) => {
    request.put('/api/account/withdraw')
      .send({
        account_id: 'account2',
        amount: 6000
      })
      .set(tokens.user_b)
      .expect(200)
      .then(res => {
        expect(res.body.errcode).toBe(2)
        done()
      })
  })
  test('取款-->合法操作', (done) => {
    request.put('/api/account/withdraw')
      .send({
        account_id: 'account2',
        amount: 20
      })
      .set(tokens.user_b)
      .expect(200)
      .then(res => {
        expect(res.body.errcode).toBeUndefined()
        done()
      })
  })
})
