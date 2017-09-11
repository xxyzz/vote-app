module.exports = {
	'twitterAuth': {
		'consumerKey': process.env.TWITTER_ID,
		'consumerSecret': process.env.TWITTER_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/twitter/callback'
	},
  'githubAuth': {
		'clientID': process.env.GITHUB_ID,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/github/callback'
  }
}