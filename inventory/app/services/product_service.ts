import InvalidDataException from '#exceptions/invalid_data_exception'
import ProductNotFoundException from '#exceptions/product_not_found_exception'
import Product from '#models/product'

export default class ProductService {
  async create(obj: { name: string; amount: number }) {
    if (!obj.name || !obj.amount) {
      throw new InvalidDataException()
    }
    return await Product.create(obj)
  }

  async getAll() {
    const products = await Product.all()
    return products
  }

  async getById(id: number) {
    const product = await Product.find(id)
    if (!product) {
      throw new ProductNotFoundException(id)
    }
    return product
  }

  async update(id: number, obj: { name?: string; amount?: number }) {
    const product = await Product.find(id)
    if (!product) {
      throw new ProductNotFoundException(id)
    }
    product.merge(obj)
    await product.save()
    return product
  }

  async delete(id: number) {
    const product = await Product.find(id)
    if (!product) {
      throw new ProductNotFoundException(id)
    }
    await product.delete()
  }
}
