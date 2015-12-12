'use strict'
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/running-app');

/* checking if connected to mongoose */
let db = mongoose.connection;
db.on('error', console.errog.bind(console, 'Connection error'));
db.once('open', function (callback){
  console.log('Mongoose connected');
});

const routes = require('./config/routes');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlenconded{extended: true}));

// adding angular static route
app.use('/', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirnmae + '/node_modules'));
app.use(routes);

let server = app.listen(process.env.PORT || 3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('server running', host, port);
  console.log(process.env.SECRET);
});
