var User = require('./models/user');
var request = require('request');
var passport = require('./passport');
var Poll = require('./models/poll');
var auth = require('./middlewares/auth');

module.exports = function(app, passport) {

    app.get("/", function(request, response, next) {
        Poll.find({})
            .populate('author')
            .exec()
            .then(polls => response.render('index', { polls, title: 'Vote Or Die!' }))
            .catch(err => next(err));
    });

    app.get("/signup", function(request, response) {
        response.render('signup', {
            title: 'Sign Up'
        });
    });

    app.get("/login", function(request, response) {
        response.render('login', {
            title: 'Log In'
        });
    });

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    app.post('/auth/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    app.post('/auth/signup', function(req, res) {
        if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
            return res.redirect('/signup');
        }

        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.CAPTCHA_SECRET + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

        request(verificationUrl, function(error, response, body) {
            body = JSON.parse(body);

            if (body.success !== undefined && !body.success) {
                return res.redirect('/signup');
            }
            User.register({
                username: req.body.username
            }, req.body.password, function(err, user) {
                if (err) return res.redirect('/signup');
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/');
                });
            });
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/new', auth.isAuthenticated, (req, res) => {
        res.render('new', {
            title: 'New Poll'
        });
    });

    app.post('/polls', auth.isAuthenticated, function(req, res, next) {
        var newpoll = req.body.poll;

        newpoll.options = newpoll.options.map(function(option) {
            return { description: option };
        });

        newpoll.author = req.user;

        Poll.create(newpoll).then(function(poll) {
            res.redirect('/');
        });
    });

    app.get('/polls/:pollId', function(req, res, next) {
        Poll.findById(req.params.pollId)
            .populate('author')
            .exec()
            .then(poll => {
                res.format({
                    'text/html': () => res.render('polls', { poll, title: poll.title }),
                    'application/json': () => res.json(poll)
                });
            })
            .catch(err => next(err));
    });

    app.post('/polls/:pollId', function(req, res, next) {
        Poll.findByIdAndRemove(req.params.pollId, function(err) {
            res.redirect('/')
        });
    });

    app.post('/polls/:pollId/vote', auth.checkVoted, function(req, res, next) {
        Poll.findById(req.params.pollId)
            .then(poll => {

                poll.options
                    .id(req.body.vote)
                    .votes
                    .push(req.user);

                poll.save()
                    .then(() => res.redirect('/polls/' + req.params.pollId))
                    .catch(err => next(err));

            })
            .catch(err => next(err));
    });

    app.get('/mypolls', auth.isAuthenticated, function(req, res) {
        Poll.find({ author: req.user })
            .then(polls => {
                res.render('index', { polls, title: 'My Polls' })
            })
    });
};