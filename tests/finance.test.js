const { request, tokens } = require('../tests')
const setup = require('./seed')
beforeAll(async () => {
  await setup()
})

afterAll(async () => {
})
describe('account', () => {
  test('购买理财-->余额不足', (done) => {
    request.put('/api/account/finance')
      .send({
        account_id: 'account2',
        amount: 4000,
        product_type: 'National debt',
        term: 4
      })
      .set(tokens.user_b)
      .expect(200)
      .then(res => {
        expect(res.body.errcode).toBe(2)
        done()
      })
  })
  test('购买理财-->操作合法', (done) => {
    request.put('/api/account/finance')
      .send({
        account_id: 'account3',
        amount: 40,
        product_type: 'Time deposit',
        term: 4
      })
      .set(tokens.user_b)
      .expect(200)
      .then(res => {
        expect(res.body.errcode).toBeUndefined()
        done()
      })
  })
  test('查询理财', (done) => {
    request.get('/api/account/finance')
      .query({
        account_id: 'account3'
      })
      .set(tokens.user_b)
      .expect(200, done)
  })
  // 每次测试的时候需要替换新的Objectid
  // test('取消理财', (done) => {
  //   request.delete('/api/account/finance/5ceff609c110fa1c802ae256')
  //     .query({
  //       account_id: 'account3'
  //     })
  //     .set(tokens.user_b)
  //     .expect(200, done)
  // })
})
