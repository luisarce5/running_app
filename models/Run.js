'use strict';

let mongoose = require('mongoose');

let runSchema = new mongoose.Schema({
  date: Date,
  distance: Number,
  start_time: String,
  duration: Number,
  pace: Number,
  route: String,
  run_type: String,
  comments: String,
  shoes: String,
  weight: Number,
  calories: Number,
  created_at: Date,
  updated_at: Date,
});

let Run = mongoose.model('myruns', runSchema);

module.exports = Run;
