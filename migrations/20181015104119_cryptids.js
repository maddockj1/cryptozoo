
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cryptids', function(table) {
   // TABLE COLUMN DEFINITIONS HERE
   table.increments()   // id field, auto PK
   table.string('name').notNullable()
   table.text('bio')
   table.string('photo')
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cryptids')
}
