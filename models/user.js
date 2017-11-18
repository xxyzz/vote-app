var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var passportLocalMongoose = require('passport-local-mongoose');
var UserSchema = mongoose.Schema({
    username: {
      type: String,
      minlength: 3,
      maxlength: 12
    },
    password: {
      type: String,
      minlength: 3,
      maxlength: 30
    }
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);