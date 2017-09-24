var Poll = require('./../models/poll');

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

function checkVoted(req, res, next) {
	isAuthenticated(req, res, function() {
        Poll.findById(req.params.pollId)
            .then(poll => {
                if (poll.userVoted(req.user)) res.redirect('back');
                else next();
            })
            .catch(err => next(err));
    });
};

module.exports = { isAuthenticated, checkVoted };