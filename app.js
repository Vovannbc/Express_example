var express = require('express'),
    nodemailer = require('nodemailer'),
    expressSession= require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser= require('body-parser'),
    database = require('./db.js'),
    path = require('path'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose');

var app = express();

var credentials = require('./credentials.js');

var opts = {
    server:{
        socketOptions: {keepAlive: 1}
    }
};

var transporter = nodemailer.createTransport('smtps://'+credentials.gmail.user+':'+credentials.gmail.password+'@smtp.gmail.com');


// switch (app.get('env')){
//     case 'development':
//         mongoose.connect(credentials.mongo.development.connectionString, opts);
//         break;
//     case 'production':
//         mongoose.connect(credentials.mongo.production.connectionString, opts);
//         break;
//     default :
//         throw new Error('Неизвестная среда выполнения '+ app.get('env'));
// }

app.set('port', process.env.PORT || 7000);
app.set('view engine', 'jade');
app.set('views', __dirname +'/views');

// logging
switch(app.get('env')){
    case 'development':
        // compact, colorful dev logging
        app.use(require('morgan')('dev'));
        break;
    case 'production':
        // module 'express-logger' supports daily log rotation
        app.use(require('express-logger')({ path: __dirname + '/log/requests.log'}));
        break;
}

app.use(    bodyParser.json(),
            bodyParser.urlencoded({ extended: true }),
            cookieParser(credentials.cookieSecret),
            express.static(__dirname + '/public'),
            expressSession({resave: true,
                saveUninitialized: true,
                secret: credentials.cookieSecret}),

            function(err, req, res, next){
                console.log('Error : ' + err.message);
                next();});

// Passport init    https://github.com/bradtraversy/loginapp/blob/master/app.js
app.use(passport.initialize());
app.use(passport.session());

// Express Validator https://github.com/ctavan/express-validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Connect Flash  https://github.com/bradtraversy/loginapp/blob/master/app.js
app.use(flash());

// Global Vars  https://github.com/bradtraversy/loginapp/blob/master/app.js
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// add routes
require('./routes.js')(app);


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});

module.exports = app;