var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var passportLocalMongoose = require('passport-local-mongoose');
var UserSchema = mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);