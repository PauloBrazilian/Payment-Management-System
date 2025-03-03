import vine from '@vinejs/vine'

export const clientValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(256),
    email: vine.string().trim().email(),
  })
)
