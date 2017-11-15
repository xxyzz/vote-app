var Poll = require('./../models/poll');

function login(req, res, next) {
  if (req.isAuthenticated())
    return next();
  req.session.returnTo = req.path; 
  res.redirect('/login');
}

function checkOwner(req, res, next) {
  login(req, res, function() {
    Poll.findById(req.params.pollId, 'author')
      .then(poll => {
        if (poll.author.equals(req.user._id)) next();
        else res.redirect('back');
      })
      .catch(err => next(err));
  })
};

function checkVoted(req, res, next) {
    login(req, res, function() {
      Poll.findById(req.params.pollId)
        .then(poll => {
            if (poll.userVoted(req.user)) res.redirect('back');
            else next();
        })
        .catch(err => next(err));
    }); 
};

module.exports = { login, checkVoted, checkOwner };
