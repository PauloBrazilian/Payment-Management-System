import Client from '#models/client'
import ClientNotFoundException from '#exceptions/cliente_not_found_exception'
import EmailNotFoundException from '#exceptions/email_not_found_exception'
import InvalidDataException from '#exceptions/invalid_data_exception'

export default class ClientService {
  async create(obj: { name: string; email: string }) {
    if (!obj.name || !obj.email) {
      throw new InvalidDataException()
    }
    return await Client.create(obj)
  }

  async getAll() {
    const clients = await Client.all()
    return clients
  }

  async getById(id: number) {
    const client = await Client.find(id)
    if (client === null) {
      throw new ClientNotFoundException(id)
    }
    return client
  }

  async getByEmail(email: string) {
    const client = await Client.findBy({ email })
    if (client === null) {
      throw new EmailNotFoundException(email)
    }
    return client
  }

  async update(id: number, obj: { name?: string; email?: string }) {
    const client = await Client.find(id)
    if (!client) {
      throw new ClientNotFoundException(id)
    }
    client.merge(obj)
    await client.save()
    return client
  }

  async delete(id: number) {
    const client = await Client.find(id)
    if (!client) {
      throw new ClientNotFoundException(id)
    }
    await client.delete()
  }
}
