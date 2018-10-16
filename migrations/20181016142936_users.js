
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
   // TABLE COLUMN DEFINITIONS HERE
   table.increments()   // id field, auto PK
   table.string('name').notNullable()
   table.string('phone')
   table.string('gender')
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
