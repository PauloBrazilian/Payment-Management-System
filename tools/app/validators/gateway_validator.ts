import vine from '@vinejs/vine'

export const createGatewayValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    is_active: vine.boolean(),
    priority: vine.number().min(1),
  })
)
