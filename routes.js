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

  
}