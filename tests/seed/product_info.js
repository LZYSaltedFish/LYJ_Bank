const Model = require('../../models')
module.exports = async () => {
  // 国债
  await Model.Product_Info.create({
    product_type: 'National debt',
    term: 3,
    interest: 0.0391
  })
  await Model.Product_Info.create({
    product_type: 'National debt',
    term: 5,
    interest: 0.0422
  })
  // 定期
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 1,
    interest: 0.011
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 2,
    interest: 0.013
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 3,
    interest: 0.015
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 4,
    interest: 0.021
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 5,
    interest: 0.0275
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 6,
    interest: 0.0275
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 7,
    interest: 0.0275
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 8,
    interest: 0.0275
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 9,
    interest: 0.0275
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 10,
    interest: 0.0275
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 11,
    interest: 0.0275
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 12,
    interest: 0.0275
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 13,
    interest: 0.0275
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 14,
    interest: 0.0275
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 15,
    interest: 0.0275
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 16,
    interest: 0.0275
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 17,
    interest: 0.0275
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 18,
    interest: 0.0275
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 19,
    interest: 0.0275
  })
  await Model.Product_Info.create({
    product_type: 'Time deposit',
    term: 20,
    interest: 0.0275
  })
}
