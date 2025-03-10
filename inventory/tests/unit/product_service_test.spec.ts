import ProductService from '#services/product_service'
import { test } from '@japa/runner'
import Product from '#models/product'

test.group('Product service test', (group) => {
  let productService: ProductService

  group.each.setup(async () => {
    await Product.truncate(true)
  })

  group.setup(() => {
    productService = new ProductService()
  })

  test('create should create a product with valid data', async ({ assert }) => {
    const productData = { name: 'name', amount: 1 }
    const product = await productService.create(productData)
    assert.equal(product.name, 'name')
    assert.equal(product.amount, 1)
  })

  test('getAll should return products', async ({ assert }) => {
    await Product.create({ name: 'Product 1', amount: 10 })
    const products = await productService.getAll()
    assert.isAbove(products.length, 0)
  })

  test('getById should return product when found', async ({ assert }) => {
    const product = await Product.create({ name: 'Product 1', amount: 10 })
    const foundProduct = await productService.getById(product.id)
    assert.exists(foundProduct.id)
    assert.equal(foundProduct.id, product.id)
  })

  test('update should update product and return updated product', async ({ assert }) => {
    const product = await Product.create({ name: 'Product 1', amount: 10 })
    const updatedData = { name: 'Updated Product', amount: 20 }
    const updatedProduct = await productService.update(product.id, updatedData)
    assert.equal(updatedProduct.name, 'Updated Product')
    assert.equal(updatedProduct.amount, 20)
  })

  test('delete should remove product', async ({ assert }) => {
    const product = await Product.create({ name: 'Product 1', amount: 10 })
    await productService.delete(product.id)
    const deletedProduct = await Product.find(product.id)
    assert.isNull(deletedProduct)
  })
})
