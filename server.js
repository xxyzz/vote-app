var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes');
var passport = require('./passport');
var session = require('express-session');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

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

routes(app, passport);

app.listen(process.env.PORT);
