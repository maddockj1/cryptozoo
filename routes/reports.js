var express = require('express');
var router = express.Router();
const knex = require('../knex')

// CREATE ONE
router.post('/', (req, res, next) => {
  // we'll need some POST body data in order to create a new cryptid (req.body)
  // If we wanted to do some validation, it would go like:
  // let err = new Error('validation failed')
  // if( !req.body.name ) { next(err) }
  let newRecord = {
    name: req.body.name,
    content: req.body.content,
    reported_at: req.body.reported_at,
    location: req.body.location,
    cryptid_id: req.body.cryptid_id
  }
  
  knex('reports')
  .insert(newRecord)
  .returning('*')
  .then((insertedRecord) => {
    res.send(insertedRecord)
  })
  .catch((err) => {
    next(err)
  })  
})

// READ ALL
router.get('/', (req, res, next) => {
  knex('reports')
  .then( (records) => {
    res.send(records)
  })
  .catch((err) => {
    next(err)
  })
})

// READ ONE
router.get('/:id', (req, res, next) => {
  // validate id is a number, escape any special chars that would indicate SQL injection. Do this later.
  knex('reports')
  .where('id', req.params.id)
  .then( (records) => {
    res.send(records)
  })
  .catch((err) => {
    next(err)
  })  
})

// UPDATE ONE
router.patch('/:id', (req, res, next) => {
  // FIRST KNEX CALL: Using the given id (req.params.id), look up if that record actually exists
  knex('reports')
  .where('id', req.params.id)
  .then((results) => {
    // If found, go ahead and update that record
    if(results.length>0) {
      // It was found-- update it. Check to see what new data was provided via req.body
      let myRecord = results[0]
      if( req.body.name ) { myRecord.name = req.body.name }
      if( req.body.content ) { myRecord.content = req.body.content }
      if( req.body.reported_at ) { myRecord.reported_at = req.body.reported_at }
      if( req.body.location ) { myRecord.location = req.body.location }
      if( req.body.cryptid_id ) { myRecord.cryptid_id = req.body.cryptid_id }
      
      // SECOND KNEX CALL: Update the record in the DB
      knex('reports')
      .update(myRecord)
      .where('id', req.params.id)
      .returning('*')
      .then((updatedRecord) => {
        // Send back the newly updated record object
        res.send(updatedRecord)
      })
      
    } else {
      // Couldn't find a record whose id = req.params.id
      throw new Error('YA DINGUS. NOT FOUND.')
    }
  })
  .catch((err) => {
    next(err)
  })
})

// DELETE ONE record for this table
router.delete('/:id', (req, res, next) => {
    // FIRST KNEX CALL: Using the given id (req.params.id), look up if that record actually exists
    knex('reports')
    .where('id', req.params.id)
    .then((foundRecords) => {
      // if it exists, delete it
      if( foundRecords.length>0 ) {
        
        // SECOND KNEX CALL: Delete the record from the DB
        knex('reports').del()
        .where('id', req.params.id)
        .returning('*')
        .then((results) => {
          let deletedRecord = results[0]
          res.send(deletedRecord)
        })
        
      } else {
        // Couldn't find what I'm trying to delete
        throw new Error(`Can't delete what does not exist`)
      }
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router