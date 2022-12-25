var createError = require('http-errors');
var express = require('express'); // web server framework
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // for log
var cors = require('cors'); // grant the api request for all origin. enable the policy
var helmet = require("helmet"); //  Prevent the Http headers and set protected header defaults 

require('dotenv').config(); // access the .env variables

/**
 * Getting  all api routes
 */
var indexRouter = require('./routes/index'); // Sample API routes
var usersRouter = require('./routes/users'); // Contact User Routes
var adminRouter = require('./routes/admin'); // Admin routes
var logoutRouter = require('./routes/logout'); // logout routes

var app = express(); // initialize the express server


app.set('views', path.join(__dirname, 'views')); // setting view path 


app.use(logger('dev')); // logging mode development
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // setting static path file file access like images

// cors policy
app.use(cors()); // cors lib mapped to server
app.use(helmet()); // helmet lib mapped to server

/**
 * Setting up all API routes
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error:'invalid requests'});
});

module.exports = app;
