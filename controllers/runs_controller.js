'use strict';
let mongoose = require('mongoose');
//require models
let Run = require('../models/run.js');
let User = require('../models/user.js');


let express = require('express');
let router = express.Router();
let request = require('request');

// Run - INDEX
// ******* Gets all of the information for each of all Runs in the database ******
router.route('/')
  .get((req, res, next) => {
    console.log('hit / route in /runs => /runs/');
    Run.find([], (err, myruns) => {
      console.log(myruns);
      if(err) throw err;
      res.send(myruns);
      console.log('this is all the contents in the runs database');
    }); // ends Run.find
}); // ends .get

// ******* Builds Route /runs/:id  =>  GET methods for a given Run by Run ID *******
router.route('/:id')
  // GET information of specific Run by Run ID
  .get((req, res, next) => {
    console.log('hit/runs/:id GET route');
    console.log(req.params);
    console.log("The req.params.id is next line: ");
    console.log(req.params.id);
    Run.find({_id: req.params.id}, (err, run) => {
      if (err) return next(err);
      res.send(run);
      console.log("Below the user data in GET by :id request: ")
      console.log(run);
      console.log(run[0].route);
    }); // ends User.find
  }) // ends .get for /:id






// END OF WORK IN PROGRESS

// ONLY FOR EXAMPLE BELOW
// router.route('/:id')
//   .get((req, res, next) => {
//     User.find({_id: req.params.id}, (err, user) => {
//       if (err) return next(err);
//       res.send(user);
//     }); // ends User.find
//   }) // ends .get for /:id
//
//   }) // ends .get for /:id
//
//   router.route('/signup')
//     // POST (Create) a new User
//     //.post(usersController.createUser)
//     .post ((req, res) => {
//       console.log('hit users/signup with POST request.');
//       let newUser = new User(req.body);
//       console.log("Data for new User: " + req.body);
//       newUser.save();
//     }); // ends .post for /signup

module.exports = router;
