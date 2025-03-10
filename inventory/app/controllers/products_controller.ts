import type { HttpContext } from '@adonisjs/core/http'
import ProductService from '#services/product_service'
import { inject } from '@adonisjs/core'
import { productValidator } from '#validators/product_validator'

@inject()
export default class ProductsController {
  constructor(private productService: ProductService) {}

  async index({ response }: HttpContext) {
    const products = await this.productService.getAll()
    return response.ok(products)
  }

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(productValidator)
    await this.productService.create(payload)
    return response.created(payload)
  }

  async show({ params, response }: HttpContext) {
    const product = await this.productService.getById(params.id)
    return response.ok(product)
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(productValidator)
    await this.productService.update(params.id, payload)
    return response.ok(payload)
  }

  async destroy({ params, response }: HttpContext) {
    await this.productService.delete(params.id)
    return response.ok('Product deleted with Successfull')
  }
}
