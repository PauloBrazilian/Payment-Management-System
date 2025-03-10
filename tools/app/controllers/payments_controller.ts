import { HttpContext } from '@adonisjs/core/http'
import { processPaymentValidator } from '#validators/process_payment'
import GatewayService from '#services/gateway_service'
import { inject } from '@adonisjs/core'

@inject()
export default class PaymentsController {
  public async process({ request, response }: HttpContext) {
    const payload = await request.validateUsing(processPaymentValidator)
    const gatewayService = new GatewayService()

    try {
      const result = await gatewayService.processPayment(payload)
      return response.status(200).json(result)
    } catch (error) {
      return response.status(500).json({
        error: 'All gateways failed',
      })
    }
  }
}
