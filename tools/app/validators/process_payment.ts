import vine from '@vinejs/vine'

export const processPaymentValidator = vine.compile(
  vine.object({
    amount: vine.number().positive(),
    name: vine.string().minLength(3),
    email: vine.string().email().normalizeEmail(),
    cardNumber: vine.string().regex(/^\d{16}$/),
    cvv: vine.string().regex(/^\d{3}$/),
  })
)
