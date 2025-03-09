import { BaseSchema } from '@adonisjs/lucid/schema'
import { Status } from '../../app/enums/status.js'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('client').unsigned().notNullable()
      table.integer('gateway').unsigned().notNullable().references('id').inTable('gateways')
      table.uuid('external_id').notNullable().unique()
      table.enum('status', Object.values(Status)).notNullable()
      table.integer('amount').notNullable()
      table.string('card_last_numbers', 4).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
