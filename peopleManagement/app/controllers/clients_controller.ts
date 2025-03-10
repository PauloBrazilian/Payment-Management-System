import type { HttpContext } from '@adonisjs/core/http'
import ClientService from '../service/client_service.js'
import { clientValidator } from '../validators/client_validator.js'
import { inject } from '@adonisjs/core'

@inject()
export default class ClientsController {
  constructor(private clientService: ClientService) {}

  async index({ response }: HttpContext) {
    const clients = await this.clientService.getAll()
    return response.ok(clients)
  }

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(clientValidator)
    await this.clientService.create(payload)
    return response.created(payload)
  }

  async show({ params, response }: HttpContext) {
    const client = await this.clientService.getById(params.id)
    return response.ok(client)
  }

  async showEmail({ params, response }: HttpContext) {
    const client = await this.clientService.getByEmail(params.email)
    return response.ok(client)
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(clientValidator)
    await this.clientService.update(params.id, payload)
    return response.ok(payload)
  }

  async destroy({ params, response }: HttpContext) {
    await this.clientService.delete(params.id)
    return response.ok('Client deleted with Successfull')
  }
}
