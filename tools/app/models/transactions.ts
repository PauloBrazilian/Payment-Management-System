import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { Status } from '../enums/status.js'
import Gateways from './gateways.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Transactions extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare client: number

  @column()
  declare gateway: number

  @column({ columnName: 'external_id' })
  declare externalId: string

  @column()
  declare status: Status

  @column()
  declare amount: number

  @column({ serializeAs: 'card_last_numbers' })
  declare cardLastNumbers: string

  @belongsTo(() => Gateways, { foreignKey: 'id' })
  declare gatewayStatus: BelongsTo<typeof Gateways>
}
