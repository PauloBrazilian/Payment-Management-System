import axios from 'axios'
import Logger from '@adonisjs/core/services/logger'
import Env from '#start/env'

export default class InventoryService {
  private baseUrl = Env.get('INVENTORY_MS_URL', 'http://localhost:3010')

  public async getProductById(productId: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/products/${productId}`)
      return response.data
    } catch (error) {
      Logger.error(`Erro ao buscar produto ${productId}: ${error.message}`)
      throw new Error('Produto não encontrado')
    }
  }

  public async createProduct(productData: { name: string; amount: number }) {
    try {
      const response = await axios.post(`${this.baseUrl}/products`, productData)
      return response.data
    } catch (error) {
      Logger.error(`Erro ao criar produto: ${error.message}`)
      throw new Error('Falha ao criar produto')
    }
  }
}
