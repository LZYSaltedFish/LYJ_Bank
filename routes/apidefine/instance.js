/**
 * @apiDefine Todos
 * @apiSuccessExample {Array} Todos
 * [Todo]
 */

/**
 * @apiDefine Todo
 * @apiSuccessExample {json} Todo
 * {
 *    text: 'todo_text',
 *    done: false
 * }
 */

/**
 * @apiDefine Account
 * @apiSuccessExample {json} Account
 * {
 *    _id: 'mongo_id'           // mongo 唯一标识
 *    account_id: 'accountID',  // 账户id
 *    balance: 666              // 存款
 * }
 */

/**
 * @apiDefine User
 * @apiSuccessExample {json} User
 * {
 *    _id: 'mongo_id'
 *    username: '用户名'
 * }
 */

/**
 * @apiDefine Finances
 * @apiSuccessExample {json} Finances
 * [Finance]
 */

/**
 * @apiDefine Finance
 * @apiSuccessExample {json} Finance
 * {
 *    _id: 'mongo_id'
 *    account_id: 'account_id'  // 账户id
 *    buy_time: '2019-01-01' // 转账时间
 *    amount: 1 // 转账金额
 *    product_type: String,
 *    term: Number
 * }
 */
