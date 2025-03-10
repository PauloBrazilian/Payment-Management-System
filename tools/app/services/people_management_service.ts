import axios from 'axios'
import Logger from '@adonisjs/core/services/logger'
import Env from '#start/env'

export default class PeopleManagementService {
  private baseUrl = Env.get('PEOPLE_MANAGEMENT_MS_URL', 'http://localhost:3011')

  public async getClientById(clientId: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/clients/${clientId}`)
      return response.data
    } catch (error) {
      Logger.error(`Erro ao buscar cliente ${clientId}: ${error.message}`)
      throw new Error('Cliente não encontrado')
    }
  }

  public async getClientByEmail(email: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/clients/email/${email}`)
      return response.data
    } catch (error) {
      Logger.error(`Erro ao buscar cliente ${email}: ${error.message}`)
      throw new Error('Cliente não encontrado')
    }
  }

  public async createClient(clientData: { name: string; email: string }) {
    try {
      const response = await axios.post(`${this.baseUrl}/clients`, clientData)
      return response.data
    } catch (error) {
      Logger.error(`Erro ao criar cliente: ${error.message}`)
      throw new Error('Falha ao criar cliente')
    }
  }
}
