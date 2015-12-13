'use strict';

const secret = process.env.SECRET;
let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
// require models
let User = require('../models/user.js');
let Run = require('../models/run.js');

let express = require('express');
let router = express.Router();

var userToken;
