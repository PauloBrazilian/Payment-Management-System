import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Gateways extends BaseSchema {
  protected tableName = 'gateways'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.boolean('is_active').notNullable().defaultTo(false)
      table.integer('priority').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
