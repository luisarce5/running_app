'use strict'
let express = require('express');
let logger = require('morgan');
let request = require('request');
let path = require('path');
let bodyParser = require('body-parser');
// let User = require('/models/user');

// require our routes
let userRoutes = require('./controllers/users_controller');
let runRoutes = require('./controllers/runs_controller');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// connect to our database, running_app name of database
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLARB_URI || 'mongodb://localhost:27017/running_app');
// note that 'running_app' name must match the local dtabase name

/* check if connected to mongoose */
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', (callback) => {
  console.log('Mongoose connected');
});

// Register the required routes
// all routes starting with /users will be in the userRoutes
app.use('/users', userRoutes);
// all route starting with /runs will be in the runRoutes
app.use('/runs', runRoutes);

// const routes = require('./config/routes');

// if using Heroku, then will use process.env.PORT; otherwise local port 3000
let server = app.listen(process.env.PORT || 3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('server running', host, port);
  console.log(process.env.SECRET);
});
