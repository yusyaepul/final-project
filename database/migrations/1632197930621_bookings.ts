import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bookings extends BaseSchema {
  protected tableName = 'bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.datetime('play_date_start').notNullable()
      table.datetime('play_date_end').notNullable()
      table.integer('user_id_booking').unsigned().references('id').inTable('users')
      table.integer('fields_id').unsigned().references('id').inTable('fields')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
