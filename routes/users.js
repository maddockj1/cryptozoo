var express = require('express');
var router = express.Router();
const knex = require('../knex')


// Route that returns all reports for a given user
// should be able to put in URL like /users/23
router.get('/:id', function(req, res, next) {
  console.log('in the user/reports lookup route');
  // Look up a user
  // find all records in the users_reports table that are linked to the user
  // then for each of those, get the actual report
  
  // Could be 3 individual queries, OR 1 fat JOIN
  // But when JOINing, gotta use ALIASING
  
  knex.select(
    'u.id AS u_id',
    'u.name AS u_name',
    'u.phone AS u_phone',
    'u.gender AS u_gender',
    'ur.id AS ur_id',
    'ur.user_id AS ur_user_id',
    'ur.report_id AS ur_report_id',
    'r.id AS r_id',
    'r.content AS r_content',
    'r.reported_at AS r_reported_at',
    'r.location AS r_location',
    'r.cryptid_id AS r_cryptid_id'
  )
  .from('users AS u')
  .leftJoin('users_reports AS ur', 'u.id', 'ur.user_id')
  .leftJoin('reports AS r', 'ur.report_id', 'r.id')
  .where('u.id',req.params.id)
  .then((data) => {
    console.log('join result data', data)
    res.send(data)
  })
})

module.exports = router;
