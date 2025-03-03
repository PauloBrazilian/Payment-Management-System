import { Exception } from '@adonisjs/core/exceptions'

export default class InvalidDataException extends Exception {
  constructor() {
    super('Invalid data: name and amount are required', { status: 400, code: 'E_INVALID_DATA' })
  }
}
