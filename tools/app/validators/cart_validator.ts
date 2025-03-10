import vine from '@vinejs/vine'

export const cartValidator = vine.compile(
  vine.object({
    transaction_id: vine
      .string()
      .regex(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)
      .exists(async (db, value) => {
        const transaction = await db.from('transactions').where('external_id', value).first()
        return !!transaction
      }),
    product_id: vine.number().positive(),
    quantity: vine.number().positive().min(1),
  })
)
