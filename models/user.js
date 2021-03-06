'use strict';
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let runSchema = require('./run.js').schema // ADDED WORK IN PROGRESS

let SALT_WORK_FACTOR = 5;

let userSchema = new mongoose.Schema({
  username: String,
  email: String,
  user_description: String,
  city: String,
  profile_photo: String,
  created_at: Date,
  updated_at: Date,
  password: String,
  token: String,
  myRuns: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Run'
            }
          ]
});

//Before saving a paswword, encrypt it.
userSchema.pre('save', function(next) {
  let user = this;
  console.log("The user info is displayed below:")
  console.log(user);

  // hash the password only if it is new or has been modified
  if (!user.isModified('password')) return next();

  // generate a SALT
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next (err);

  // has the password annd the newly generaled salt
  bcrypt.hash(user.password, salt, (err, hash) => {
    if (err) return next (err);
    // override cleartext password with hashed pasword
    user.password = hash;
    console.log(user.password);
    next();
    });
  });
});

// Use password verification
userSchema.methods.authenticate = function(password, callback) {
  // compare method that returns a boolean
  // determine if the first argument once encrypted corresponds to the second argument
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

let User = mongoose.model('user', userSchema);
module.exports = User;
