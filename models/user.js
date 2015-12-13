'use strict';
let mongoose = require('mongoose');
let bcrypt = require('bcrpt');
let SALT_WORK_FACTOR = 5;

let userSchema = new mongoose.Schema({

});

//Before saving a paswword, encrypt it.
userSchema.pre('save', function(next){
  let user = this;
  console.log(user);

  // hash the password only if it is new or has been modified
  if (!user.isModified('password')) return (next();

  // generate a SALT
  bycrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next (err);

  // has the password annd the newly generaled salt
  bcrypt.hash(user.password, salt, (err, hash) => {
    if (err) return next (err);
    // override cleartext password with hashed pasword
    user.password = hash;
    console.log(user.password);
    });
  });
});

// Use password verification
userSchema.methods.authenticate = function(password, callback) {
  // compare method that returns a boolean
  // determine if the first argument once encrypted corresponds to the second argument
  bycrypt.compare(password, this.password, function(err, isMatch){
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

let User = mongoose.mode('user', userSchema);
module.exports = User;
