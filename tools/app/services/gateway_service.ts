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
      Logger.error(`Gateway1 failed: ${error.message}`)
      throw new Error('Gateway1 failed')
    }
  }

  private async processGateway2(payload: any) {
    try {
      const response = await axios.post(`${this.gateway2Url}/transacoes`, {
        valor: payload.amount,
        nome: payload.name,
        email: payload.email,
        numeroCartao: payload.cardNumber,
        cvv: payload.cvv,
      })

      return {
        success: true,
        gateway: 'Gateway2',
        externalId: response.data.id,
        response: response.data,
      }
    } catch (error) {
      Logger.error(`Gateway2 failed: ${error.message}`)
      throw new Error('Gateway2 failed')
    }
  }

  private async getAllTransactionsFromGateway1() {
    try {
      const response = await axios.get(`${this.gateway1Url}/transactions`)
      return {
        success: true,
        gateway: 'Gateway1',
        data: response.data,
      }
    } catch (error) {
      Logger.error(`Error fetching transactions from Gateway1: ${error.message}`)
      throw new Error('Error fetching transactions from Gateway1')
    }
  }

  private async getAllTransactionsFromGateway2() {
    try {
      const response = await axios.get(`${this.gateway2Url}/transacoes`)
      return {
        success: true,
        gateway: 'Gateway2',
        data: response.data,
      }
    } catch (error) {
      Logger.error(`Error fetching transactions from Gateway2: ${error.message}`)
      throw new Error('Error fetching transactions from Gateway2')
    }
  }

  private async processChargebackGateway1(transactionId: string) {
    try {
      const response = await axios.post(
        `${this.gateway1Url}/transactions/${transactionId}/charge_back`
      )
      return {
        success: true,
        gateway: 'Gateway1',
        data: response.data,
      }
    } catch (error) {
      Logger.error(`Error processing refund in Gateway1: ${error.message}`)
      throw new Error('Refund not processed in Gateway1')
    }
  }

  private async processChargebackGateway2(transactionId: string) {
    try {
      const response = await axios.post(`${this.gateway2Url}/transacoes/reembolso`, {
        id: transactionId,
      })
      return {
        success: true,
        gateway: 'Gateway2',
        data: response.data,
      }
    } catch (error) {
      Logger.error(`Error processing refund in Gateway2: ${error.message}`)
      throw new Error('Refund not processed in Gateway2')
    }
  }

  async processPayment(payload: any) {
    try {
      return await this.processGateway1(payload)
    } catch (error) {
      Logger.info('Trying Gateway2 after Gateway1 failure')
      return await this.processGateway2(payload)
    }
  }

  async getAllTransactions() {
    try {
      return await this.getAllTransactionsFromGateway1()
    } catch (error) {
      Logger.info('Trying Gateway2 after Gateway1 failure')
      return await this.getAllTransactionsFromGateway2()
    }
  }

  async processChargeback(transactionId: string) {
    try {
      return await this.processChargebackGateway1(transactionId)
    } catch (error) {
      Logger.info('Trying Gateway2 after Gateway1 failure')
      return await this.processChargebackGateway2(transactionId)
    }
  }
}
