import factory from '@adonisjs/lucid/factories'
import Product from '#models/product'

export const ProductFactory = factory
  .define(Product, ({ faker }) => {
    return {
      name: faker.commerce.productName(),
      amount: faker.number.int({ min: 1, max: 100 }),
    }
  })
  .build()
