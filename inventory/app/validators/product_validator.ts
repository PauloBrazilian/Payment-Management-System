import vine from '@vinejs/vine'

export const productValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(256),
    amount: vine.number().min(1),
  })
)
