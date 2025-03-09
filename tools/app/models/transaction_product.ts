import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Transactions from './transactions.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class TransactionProduct extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare transactionId: string

  @column()
  declare productId: number

  @column()
  declare quantity: number

  @belongsTo(() => Transactions, { foreignKey: 'id' })
  declare transactionStatus: BelongsTo<typeof Transactions>
}
