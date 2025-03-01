import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import ProductNotFoundException from './product_not_found_exception.js'
import InvalidDataException from './invalid_data_exception.js'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof ProductNotFoundException) {
      return ctx.response.status(error.status).send({
        error: error.message,
        code: error.code,
      })
    }

    if (error instanceof InvalidDataException) {
      return ctx.response.status(error.status).send({
        error: error.message,
        code: error.code,
      })
    }

    return super.handle(error, ctx)
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
