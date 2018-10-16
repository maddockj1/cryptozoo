
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_reports').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_reports').insert([
        {id: 1, user_id: 4, report_id: 3},
        {id: 2, user_id: 2, report_id: 3},
        {id: 3, user_id: 2, report_id: 2},
        {id: 4, user_id: 1, report_id: 1}
      ])
      .then(() => {
        // After SQL INSERT, update the autoincrementing id counter
        return knex.raw("SELECT setval('users_reports_id_seq', (SELECT MAX(id) FROM users_reports));")
      })
    })
}