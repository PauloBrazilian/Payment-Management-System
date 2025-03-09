import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import GatewayService from '#services/gateway_service'
import PeopleManagementService from '#services/people_management_service'
import { processPaymentValidator } from '#validators/process_payment'
import Transaction from '#models/transactions'
import { Status } from '../enums/status.js'
import Gateway from '../models/gateways.js'
import TransactionProduct from '#models/transaction_product'
import InventoryService from '#services/inventory_service'
import { cartValidator } from '#validators/cart_validator'
import Transactions from '#models/transactions'

@inject()
export default class TransactionsController {
  constructor(
    private gatewayService: GatewayService,
    private peopleManagementService: PeopleManagementService,
    private inventoryService: InventoryService
  ) {}

  async createTransaction({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(processPaymentValidator)
      const gatewayResponse = await this.gatewayService.processPayment(payload)
      const client = await this.peopleManagementService.getClientByEmail(payload.email)

      const gatewayName = gatewayResponse.gateway
      const priority = Number.parseInt(gatewayName.replace(/\D/g, ''))

      const gateway = await Gateway.firstOrCreate(
        { name: gatewayResponse.gateway },
        {
          name: gatewayResponse.gateway,
          is_active: true,
          priority: priority,
        }
      )

      await Transaction.create({
        client: client.id,
        gateway: gateway.id,
        externalId: gatewayResponse.externalId,
        status: Status.SUCCESS,
        amount: payload.amount,
        cardLastNumbers: payload.cardNumber.slice(-4),
      })

      return response.status(201).json({
        success: true,
        message: 'Transaction created successfully',
        data: gatewayResponse,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Error creating transaction',
        error: error.message,
      })
    }
  }

  async createCart({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(cartValidator)

      const transaction = await Transactions.findBy('external_id', payload.transaction_id)
      if (!transaction) {
        return response.status(404).json({
          success: false,
          message: 'Transaction not found',
        })
      }

      const productExists = await this.inventoryService.getProductById(payload.product_id)
      if (!productExists) {
        return response.status(404).json({
          success: false,
          message: `Product with ID ${payload.product_id} not found`,
        })
      }

      await TransactionProduct.create({
        transactionId: payload.transaction_id,
        productId: payload.product_id,
        quantity: payload.quantity,
      })

      return response.status(201).json({
        success: true,
        message: 'Cart created successfully',
        data: payload,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Error creating cart',
        error: error.message,
      })
    }
  }
}
