'use strict';
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const secret = process.env.SECRET;
let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
// require models
let User = require('../models/user.js');
let Run = require('../models/run.js');

let express = require('express');
let router = express.Router();

var userToken;

// POST (Authenticate) a User before logging in
// .post(usersController.authenticate)
router.route('/authenticate')
  .post((req, res) => {
    console.log('hit/users/authenticate');
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    console.log("this is req.body:");
    console.log(req.body);
    console.log('user: ' + user);
    if (err) throw err;
    // if unable to find the Username in the database
    if (user == undefined) {
      res.json({ success:false, message: 'Authentication failed.  User not found'});
    // if User is in database then
    } else {
      user.authenticate(req.body.password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
          // send back a success message, a token, and all of the User's data for matching that Usernmae and password
          return res.send({message: "Password is valid. Here is your token", token: jwt.sign(user, secret), user: user});
        } else {
          return res.send({message: "Password is not valid. No token issued"});
        }
      }) // ends user.authenticate
    }  // end first else
  }); // ends User.findOne
}); // ends .post


// ******* Gets all of the information for each of all Users in the database ******
router.route('/')
  .get((req, res, next) => {
    console.log ('Hit / route in /users => /users/');
    User.find([], (err, user) => {
      console.log(user);
      if(err) throw err;
      res.send(user);
      console.log('All the Users in running_app database just displayed above');
    });
  }); // ends .get

  // Lines below attempting to refactor code => PENDING
  // .get(usersController_getAll);
  //
  // function usersController_getAll(req, res, next) {
  //   console.log ('Hit / route in /users => /users/');
  //   User.find([], (err, user) => {
  //     if(err) throw err;
  //     // if(err) response.json({message: 'Could not find any User in database'});
  //     res.send(user);
  //     console.log('These are all the Users in the database');
  //   });
  // };


// ******* Builds Route /users/:id  =>  GET & POST methods for a given User by User ID *******
router.route('/:id')
  // GET information of specific User by ID
  // .get(usersController.getUser)
  .get((req, res, next) => {
    console.log('hit/users/:id GET route');
    console.log(req.params);
    console.log("The req.params.id is next line: ");
    console.log(req.params.id);
    User.find({_id: req.params.id}, (err, user) => {
      if (err) return next(err);
      res.send(user);
      console.log("Below the user data in GET by :id request: ")
      console.log(user);
      console.log(user[0].username);
    }); // ends User.find
  }) // ends .get for /:id

  // PUT (Edit) information of a specific User by User ID
  // .put(usersController.updateUser)
  .put((req, res) => {
    console.log('hit /users/:id POST route');
    console.log(req.params.id);
    User.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: req.body
    }, function (err, user) {
      res.send(user);
    });
    // var userData = req.body.data;
    // console.log(userData);
  });

  // ******* Builds Route /signup => Create a New User *******
  router.route('/signup')
    // POST (Create) a New User
    //.post(usersController.createUser)
    .post ((req, res) => {
      console.log('hit users/signup with POST request.');
      let newUser = new User(req.body);
      console.log("Data for new User: " + req.body);
      newUser.save();
    }); // ends .post for /signup

  // ***** Build routes /users/:id/runs => POST & GET methods for the Runs of a given User by User ID *****
  router.route('/:id/runs')
    // ADD a NEW RUN to a specific User
    .post((req, res) => {
      User.findById(req.params.id).exec(function(err, user) {
        let run = new Run(req.body);
        run.save(function(err){
          if (err) {
            console.log(err)
          } else {
            user.myRuns.push(run._id);
            user.save(function(err) {
              if (err) {
                console.log(err)
              } else {
                res.send(user);
              } // close 2nd else
            }) // close user.save
          } // close 1st else
        }); // close run.save
      }); // close User.findByID
    }) // ends .post

    .get((req, res, next) => {
      console.log('hit/users/:id/runs GET route');
      console.log("The req.params.id is next line: ");
      console.log(req.params.id);
      User.find( {_id: req.params.id}, (err, user) => {
        if (err) return next(err);
        res.send(user);
        console.log("Below the user data in GET by users/:id/runs request: ")
        console.log(user);
        console.log(user[0].myRuns);
        return;
      }); // ends User.find
    }); // ends .get for /:id
// ***** Build route to VIEW ALL RUNS of a specific User by User ID *****




module.exports = router;
