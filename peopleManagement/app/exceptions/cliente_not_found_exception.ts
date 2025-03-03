import { Exception } from '@adonisjs/core/exceptions'

export default class ClientNotFoundException extends Exception {
  constructor(id: number) {
    super(`Product with ID ${id} not found`, { status: 404, code: 'E_PRODUCT_NOT_FOUND' })
  }
}
