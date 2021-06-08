"use strict";
const workout = require('express').Router();
const ObjectID = require('mongodb').ObjectID;

workout.get('/getExerciseTypes', (req,res) => {
  let {exerciseList} = req.app.locals;
  exerciseList.findOne( { "record" : "Exercise Types"} )
    .then(result => res.json(result))
    .catch( err => {
      res.status(404).send({err})
    })
})

workout.get('/getExerciseByCategory', (req,res) => {
  let {exerciseList} = req.app.locals;
  exerciseList.find( req.query )
    .sort( { "name": 1} )
    .toArray()
    .then(items => {res.json(items)})
    .catch( err => {
      res.status(404).send({err})
    })
  })

workout.get('/getExerciseBySearch/:search', (req, res) => {
  let {exerciseList} = req.app.locals;
  exerciseList.find(
    { name : { $regex: req.params.search, $options: "i" } }
  )
    .sort( { name: 1} )
    .toArray()
    .then(items => {res.json(items)})
    .catch( err => {
      res.status(404).send({err})
    })
 })

workout.get('/getRoutines', (req, res) => {
  let {routines} = req.app.locals;
  let {user} = req.user;
  routines.find({  user } )
    .sort( { name : 1 } )
    .toArray()
    .then(items => res.json(items))
    .catch( err => {
      res.status(404).send({err})
    })
})

workout.get('/getWorkouts', (req, res) => {
  let {workouts} = req.app.locals;
  let {user} = req.user;
  workouts.find(
    { user },
    { projection: { _id: 0, name: 0, user: 0, exercises: 0 } }
  )
    .sort( { date : 1 } )
    .toArray()
    .then(result => res.json(result))
    .catch(err => {
      res.status(404).send({err})
    })
})

workout.get('/getWorkoutsByDate', (req, res) => {
  let {workouts} = req.app.locals;
  let {user} = req.user;
  let query = {...req.query, user};
  workouts.find( query )
    .sort( { date : 1 } )
    .toArray()
    .then(result => res.json(result))
    .catch(err => {
      res.status(404).send({err})
    })
})

workout.get('/getWorkoutById', (req, res) => {
  let {workouts } = req.app.locals;
  workouts.findOne(
   { _id: ObjectID(req.query._id) } )
    .then(result => res.json(result))
    .catch(err => {
      res.status(404).send({err})
    })
})

workout.post('/updateExercises', (req,res) => {
  let {db} = req.app.locals;
  let {_id, exercises, name, collectionName} = req.body;
  let collection = db.collection(collectionName);
  let {user} = req.user;
  collection.updateOne(
    { _id: ObjectID(_id), user },
    {$set: { name, exercises } },
    {upsert: true}
  )
  .then(result => {
    console.log({result})
    res.status(200).send(result.result)
  })
  .catch(err => {
    res.status(500).send({err})
  })
})

workout.put('/saveWorkout', (req, res) => {
  let {workouts} = req.app.locals;
  let {name, date, exercises, _id} = req.body;
  let {user} = req.user;
  workouts.updateOne(
    { _id: ObjectID(_id)},
    {$set: {name, date, user, exercises } },
    {upsert: true}
  )
    .then(result => {
      res.status(200).send(result.result)
    })
    .catch(err => {
      res.status(500).send({err})
    })
})

workout.delete('/deleteCurrentRoutine/:collectionName/:id', (req, res) => {
  let {db} = req.app.locals;
  let {collectionName, id} = req.params;
  let collection = db.collection(collectionName);
  collection.deleteOne(
    { _id: ObjectID(req.params.id) }
  )
    .then(() => {
      res.sendStatus(204)
    })
    .catch(err => {
      res.status(500).send({err})
    })
})

module.exports = workout;
