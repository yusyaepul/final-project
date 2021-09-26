import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Booking from 'App/Models/Booking'
import Venue from './Venue'

export default class Field extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: Array<string> = ['futsal', 'mini soccer', 'basketball']

  @column()
  public venue_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Booking, {
    foreignKey: 'fields_id'
  })
  public bookings: HasMany<typeof Booking>

  @belongsTo(() => Venue, {
    foreignKey: 'venue_id'
  })
  public venues: BelongsTo<typeof Venue>
}
