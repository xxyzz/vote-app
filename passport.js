var passport = require('passport');
var User = require('./user');
var configAuth = require('./auth');
var LocalStrategy = require('passport-local');
var GitHubStrategy = require('passport-github').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new LocalStrategy(User.authenticate()));

passport.use(new GitHubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ username: profile.username }, function (err, user) {
      if (err) return done(err)
      return done(null, user);
    });
  }                         
));

passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ username: profile.username }, function (err, user) {
      if (err) return done(err)
      return done(null, user);
    });
  }                         
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;