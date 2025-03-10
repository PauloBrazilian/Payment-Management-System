import vine from '@vinejs/vine'
import { Status } from '../enums/status.js'

const statusValues = Object.values(Status) as [string, ...string[]]

export const transactionValidator = vine.compile(
  vine.object({
    client: vine.number().positive(),
    gateway: vine
      .number()
      .positive()
      .exists(async (db, value) => {
        const gateways = await db.from('gateways').where('id', value).first()
        return !!gateways
      }),
    external_id: vine.string().unique(async (db, value) => {
      const existing = await db.from('transactions').where('external_id', value).first()
      return !existing
    }),
    status: vine.enum(statusValues),
    amount: vine.number().positive().decimal([0, 2]),
    card_last_numbers: vine
      .string()
      .regex(/^[0-9]{4}$/)
      .transform((value) => value.padStart(4, '0')),
  })
)
