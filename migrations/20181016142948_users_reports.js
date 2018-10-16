
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_reports', function(table) {
   // TABLE COLUMN DEFINITIONS HERE
   table.increments()   // id field, auto PK
   table.integer('user_id').notNullable()
   table.integer('report_id').notNullable()
   table.foreign('user_id').references('users.id').onDelete('CASCADE')
   table.foreign('report_id').references('reports.id').onDelete('CASCADE')
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users_reports')
}
