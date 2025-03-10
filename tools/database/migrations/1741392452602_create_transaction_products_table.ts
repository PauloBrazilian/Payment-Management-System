import { BaseSchema } from '@adonisjs/lucid/schema'

export default class TransactionProducts extends BaseSchema {
  protected tableName = 'transaction_products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .uuid('transaction_id')
        .references('external_id')
        .inTable('transactions')
        .onDelete('CASCADE')
      table.integer('product_id').notNullable()
      table.integer('quantity').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
