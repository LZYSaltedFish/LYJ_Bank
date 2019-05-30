const { request, tokens } = require('../tests')
const setup = require('./seed')
beforeAll(async () => {
  await setup()
})

afterAll(async () => {
})
describe('account', () => {
  test('存款', (done) => {
    request.put('/api/account/deposit')
      .send({
        account_id: 'account1',
        amount: 200
      })
      .set(tokens.user_b)
      .expect(200)
      .then(res => {
        expect(res.body.errcode).toBeUndefined()
        done()
      })
  })
})
