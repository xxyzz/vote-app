var mongoose = require('mongoose');

var optionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

var pollSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    options: [optionSchema],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    voteNum: {
      type: Number,
      required: true
    }
}, {
    timestamps: true
});

pollSchema.virtual('totalVotes').get(function() {
    return this.options.reduce(function(total, option) {
        return total + option.votes.length;
    }, 0);
});

pollSchema.methods.userVoted = function(user) {
  if (!user) return false;

  return this.options.some(option => {
    return option.votes.some(vote => {
      return vote.equals(user._id);
    });
  });
};

pollSchema.methods.pollAuthor = function(user) {
  if (!user) return false;
  
  return this.author.equals(user._id);
};

module.exports = mongoose.model('Poll', pollSchema);