import ProductService from '#services/product_service'
import { test } from '@japa/runner'

const newProduct = {
  id: 1,
  name: 'name',
  amount: 1,
}

const updateProduct = {
  id: 2,
  name: 'Product',
  amount: 2,
}

test.group('Product service test', (group) => {
  let productService: ProductService

  group.setup(() => {
    productService = new ProductService()
  })

  test('create should create a product with valid data', async ({ assert }) => {
    const product = await productService.create(newProduct)
    await product.save()
    assert.equal(product.name, 'name')
    assert.equal(product.amount, 1)
  })

  test('getAll should return products', async ({ assert }) => {
    const products = await productService.getAll()
    assert.isAbove(products.length, 0)
  })

  test('getById should return product when found', async ({ assert }) => {
    const product = await productService.getById(newProduct.id)
    assert.exists(product.id)
    assert.equal(product.id, product.id)
  })

  test('update should update product and return updated product', async ({ assert }) => {
    const product = await productService.getById(newProduct.id)
    const updated = await productService.update(product.id, updateProduct)
    assert.equal(updated.name, 'Product')
    assert.equal(updated.amount, 2)
  })

  test('delete should remove product', async ({ assert }) => {
    const product = await productService.getById(newProduct.id)
    assert.exists(product.id)
    await productService.delete(product.id)
  })
})
