var express = require('express');
var app = express();
var routes = require('./routes');
var passport = require('./passport');
var session = require('express-session');
var mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

app.use(express.static('public'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

routes(app,passport);

app.listen(process.env.PORT);