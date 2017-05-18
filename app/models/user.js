var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({

    username : {
        type:String,
        index:true,
        required:true
    },
    password: {
        type: String,
        required:true
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;