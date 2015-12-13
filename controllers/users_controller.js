'use strict';
// const jwt = require('jsonwebtoken');
// const expressJwt = require('express-jwt');
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
    // var response = "hit /users/test";
    // res.send(response);
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


// Gets & displays all of the information of all Users in the database
router.route('/')
  .get((req, res, next) => {
    console.log ('Hit / route in /users => /users/');
    User.find([], (err, user) => {
      console.log(user);
      if(err) throw err;
      res.send(user);
      console.log('These are all the Users in running_app database');
    });
  }); // ends .get

  // Lines below attempting to refactor code => pending for last
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


// Gets & displays the information of a User given an ID in the database
router.route('/:id')
  // GET a specific User
  // .get(usersController.getUser)
  .get((req, res, next) => {
    // console.log("req.headers.host: " + req.headers.host);
    // console.log(req.headers);
    console.log("The req.params.id: ");
    console.log(req.params.id);
    User.find({_id: req.params.id}, (err, user) => {
      if (err) return next(err);
      res.send(user);
      console.log("the user data in GET by :id request: " + user);
    }); // ends User.find
  }) // ends .get for /:id


  // PUT (Edit) a specific User
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

router.route('/signup')
  // POST (Create) a new User
  //.post(usersController.createUser)
  .post ((req, res) => {
    let newUser = new User(req.body);
    console.log("Data for new User: " + req.body);
    newUser.save();
  }); // ends .post for /signup

module.exports = router;
