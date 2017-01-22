var express = require('express'),
    nodemailer = require('nodemailer'),
    database = require('./db.js'),
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

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret
}));

app.use(    require('cookie-parser')(credentials.cookieSecret),
            express.static(__dirname + '/public'),
            function(err, req, res, next){
                console.log('Error : ' + err.message);
                next()});
app.use(require('body-parser'). urlencoded({ extended: true }));






// add routes
require('./routes.js')(app);







app.use(function(req, res){
    res.type('text/html');
    res.status(404);
    res.render('404')});

app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render('500')});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});

module.exports = app;