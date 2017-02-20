var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
    name : String,
    username : {
        type:String,
        index:true
    },
    email : String,
    password: String,
    // role : String,
    created : Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;