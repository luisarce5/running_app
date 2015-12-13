'use strict';
let express = require('express');
let router = express.Router();
// let User = require('../models/user');
let request = require('request');
let Run = require('../models/run.js');

router.route('/')
  .get((req, res, next) => {
    console.log('hit / route in /runs => /runs/');
    res.send('hit / route in /runs => /runs/');
  }); // ends get

module.exports = router;
