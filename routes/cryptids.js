var express = require('express');
var router = express.Router();
const knex = require('../knex')

// READ ALL records for this table
router.get('/', (req, res, next) => {
  knex('cryptids')
  .then( (records) => {
    res.send(records)
  })
  .catch((err) => {
    next(err)
  })
  
})

// READ ONE record for this table
router.get('/:id', (req, res, next) => {
  
  // validate id is a number, escape any special chars that would indicate SQL injection.
  // do this later
  
  knex('cryptids')
  .where('id', req.params.id)
  .then( (records) => {
    res.send(records)
  })
  .catch((err) => {
    next(err)
  })
  
})

// CREATE ONE record for this table
router.post('/', (req, res, next) => {
  //create new cryptid
  // we'll need some POST body data in order to create a new cryptid
  // req.body
  
  // // want to do some validation
  // let err = new Error('validation failed')
  // if( theresAProblem ) next(err)
  
  let newRecord = {
    name: req.body.name,
    bio: req.body.bio,
    photo: req.body.photo,
  }
  
  knex('cryptids')
  .insert(newRecord)
  .returning('*')
  .then((insertedRecord) => {
    res.send(insertedRecord)
  })
  .catch((err) => {
    next(err)
  })
  
})

// UPDATE ONE record for this table
router.patch('/:id', (req, res, next) => {
  
  // Using the given id, look up if that record actually exists
  // req.params.id
  
  knex('cryptids')
  .where('id', req.params.id)
  .then((results) => {
    console.log('record', results);
    // If found, go ahead and update it
    if(results.length>0) {
      // all good, it was found-- update it
      let updatedRecord = results[0]
      
      if( req.body.name ) { updatedRecord.name = req.body.name }
      if( req.body.bio ) { updatedRecord.bio = req.body.bio }
      if( req.body.photo ) { updatedRecord.photo = req.body.photo }
      
      // UPDATE the record in the DB
      knex('cryptids')
      .update(updatedRecord)
      .where('id', req.params.id)
      .returning('*')
      .then((resUpdate) => {
      
        // Send back the newly updated record object
        res.send(resUpdate)
      })
      
    } else {
      throw new Error('YA DINGUS. NOT FOUND.')
    }
  })
  .catch((err) => {
    next(err)
  })
  

})

// DELETE ONE record for this table
router.delete('/:id', (req, res, next) => {
    // lookup or verify that the record specified by the given id, actually exists
    // req.params.id
    knex('cryptids')
    .where('id', req.params.id)
    .then((theRecords) => {
      console.log('theRecord', theRecords);
      // if it exists, delete it
      if( theRecords.length>0 ) {
        // delete it
        knex('cryptids')
        .del()
        .where('id', req.params.id)
        .returning('*')
        .then((result) => {
          res.send(result[0])
        })
        
      } else {
        throw new Error(`Can't delete what does not exist`)
      }
    })
    .catch((err) => {
      next(err)
    })
    
  
})

module.exports = router