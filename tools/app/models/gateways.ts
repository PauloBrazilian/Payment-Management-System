import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Gateways extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare is_active: boolean

  @column()
  declare priority: number
}
