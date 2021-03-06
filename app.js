var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dbConfig = require('./db');
var mongoose = require('mongoose');

mongoose.connect(dbConfig.url);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

var flash = require('connect-flash');
app.use(flash());

var initPassport = require('./passport/init');
initPassport(passport);

var index = require('./routes/index');
var api = require('./routes/api')(passport);
var thankyou = require('./routes/thankyou');
var login = require('./routes/login')(passport);
var register = require('./routes/register')(passport);
var home = require('./routes/home')(passport);
var addmember = require('./routes/addmember')(passport);
var editmembers = require('./routes/editmembers')(passport);
var addGame = require('./routes/addgame')(passport);
var addTeam = require('./routes/addteam')(passport);
var leagueSchedule = require('./routes/leagueschedule')(passport);
app.use('/', index);
app.use('/api', api);
app.use('/login', login);
app.use('/register', register);
app.use('/thankyou', thankyou);
app.use('/home', home);
app.use('/addmember', addmember);
app.use('/editmembers', editmembers);
app.use('/addgame', addGame);
app.use('/addteam', addTeam);
app.use('/leagueschedule', leagueSchedule);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
