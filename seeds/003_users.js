
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Joe Bob Jenkins', phone: '555-720-2345', gender: 'Male'},
        {id: 2, name: 'Sally Mae', phone: '555-321-1234', gender: 'Female'},
        {id: 3, name: 'Pete', phone: '555-123-8474', gender: 'Turtle'},
        {id: 4, name: 'Craig', phone: '555-393-3829', gender: 'Male'}
      ])
      .then(() => {
        // After SQL INSERT, update the autoincrementing id counter
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
      })
    })
}