var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes');
var passport = require('./passport');
var session = require('express-session');
var mongoose = require('mongoose');
var auth = require('./middlewares/auth');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.loggedUser = req.user;
  res.locals.path = req.path;
  next();
});
routes(app, passport);

app.listen(process.env.PORT);
