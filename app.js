var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require("express-session")
var validator=require("express-validator")
var file_upload=require("express-fileupload")

var indexRouter = require('./routes/index');
var updateRouter = require('./routes/update');
var mainRouter=require("./routes/main");

var myjson=require("./json_respons/main_api");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:"secret",
  resave:false,
  saveUninitialized:false,
  cookie: {
    expires:60*60*1000
  }
}))
app.use(file_upload())

app.use('/', indexRouter);
app.use('/main', mainRouter);
app.use('/update', updateRouter);
app.use('/static', express.static(__dirname + '/public'));
app.use('/json', myjson);

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
  res.render('error');
});

module.exports = app;