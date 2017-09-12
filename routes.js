var User = require('./user');
var passport = require('./passport');
module.exports = function (app, passport) {
  
  app.get("/", function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
  });

  app.get("/signup", function (request, response) {
    response.sendFile(__dirname + '/views/signup.html');
  });

  app.get("/login", function (request, response) {
    response.sendFile(__dirname + '/views/login.html');
  });
  
  app.get('/auth/twitter', passport.authenticate('twitter'));
  
  app.get('/auth/twitter/callback', passport.authenticate('twitter',{
		successRedirect: '/',
		failureRedirect: '/login'
	}));

  app.get('/auth/github', passport.authenticate('github'));
  
  app.get('/auth/github/callback', passport.authenticate('github',{
		successRedirect: '/',
		failureRedirect: '/login'
	}));

  app.post('/auth/login', passport.authenticate('local', {
    successRedirect: '/',
		failureRedirect: '/login'
  }));
  
  app.post('/auth/signup', function(req, res) {
     User.register({ username: req.body.username }, req.body.password, function(err, user) {
      if (err) return res.redirect('/signup');
      passport.authenticate('local')(req, res, () => {
        res.redirect('/');
      });
     });
  });
  
}