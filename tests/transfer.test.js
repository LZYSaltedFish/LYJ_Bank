const { request, tokens } = require('../tests')
const setup = require('./seed')
beforeAll(async () => {
  await setup()
})

afterAll(async () => {
})
describe('account', () => {
  test('转账-->收款人不存在', (done) => {
    request.put('/api/account/transfer')
      .send({
        remitter_id: 'account1',
        recipient_id: 'account10',
        amount: 100
      })
      .set(tokens.user_a)
      .expect(200)
      .then(res => {
        expect(res.body.errcode).toBe(3)
        done()
      })
  })
  test('转账-->余额不足', (done) => {
    request.put('/api/account/transfer')
      .send({
        remitter_id: 'account1',
        recipient_id: 'account3',
        amount: 1000
      })
      .set(tokens.user_a)
      .expect(200)
      .then(res => {
        expect(res.body.errcode).toBe(2)
        done()
      })
  })
  test('转账-->合法操作', (done) => {
    request.put('/api/account/transfer')
      .send({
        remitter_id: 'account1',
        recipient_id: 'account3',
        amount: 50
      })
      .set(tokens.user_a)
      .expect(200)
      .then(res => {
        expect(res.body.errcode).toBeUndefined()
        done()
      })
  })
})
