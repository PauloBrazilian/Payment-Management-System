import axios from 'axios'
import Logger from '@adonisjs/core/services/logger'
import Env from '#start/env'

export default class GatewayService {
  private gateway1Url = Env.get('GATEWAY1_URL', 'http://localhost:3001')
  private gateway2Url = Env.get('GATEWAY2_URL', 'http://localhost:3002')

  private async processGateway1(payload: any) {
    try {
      const response = await axios.post(`${this.gateway1Url}/transactions`, {
        amount: payload.amount,
        name: payload.name,
        email: payload.email,
        cardNumber: payload.cardNumber,
        cvv: payload.cvv,
      })

      return {
        success: true,
        gateway: 'Gateway1',
        externalId: response.data.id,
        response: response.data,
      }
    } catch (error) {
      Logger.error(`Gateway1 falhou: ${error.message}`)
      throw new Error('Gateway1 falhou')
    }
  }

  private async processGateway2(payload: any) {
    try {
      const response = await axios.post(
        `${this.gateway2Url}/transacoes`,
        {
          valor: payload.amount,
          nome: payload.name,
          email: payload.email,
          numeroCartao: payload.cardNumber,
          cvv: payload.cvv,
        }
        // {
        //   headers: {
        //     'Gateway-Auth-Token': 'tk_f2198cc671b5289fa856',
        //     'Gateway-Auth-Secret': '3d15e8ed6131446ea7e3456728b1211f',
        //   },
        // }
      )

      return {
        success: true,
        gateway: 'Gateway2',
        externalId: response.data.id,
        response: response.data,
      }
    } catch (error) {
      Logger.error(`Gateway2 falhou: ${error.message}`)
      throw new Error('Gateway2 falhou')
    }
  }

  public async processPayment(payload: any) {
    try {
      return await this.processGateway1(payload)
    } catch (error) {
      Logger.info('Tentando Gateway2 após falha no Gateway1')
      return await this.processGateway2(payload)
    }
  }
}
