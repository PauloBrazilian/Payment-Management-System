import { Exception } from '@adonisjs/core/exceptions'

export default class EmailNotFoundException extends Exception {
  constructor(email: string) {
    super(`Email not found: ${email}`, { status: 404, code: 'E_EMAIL_NOT_FOUND' })
  }
}
