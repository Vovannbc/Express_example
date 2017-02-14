var express = require('express'),
    nodemailer = require('nodemailer'),
    expressSession= require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser= require('body-parser'),
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

app.use(    expressSession({resave: false,
                            saveUninitialized: false,
                            secret: credentials.cookieSecret}),
            cookieParser(credentials.cookieSecret),
            bodyParser.urlencoded({ extended: true }),
            express.static(__dirname + '/public'),
            function(err, req, res, next){
                console.log('Error : ' + err.message);
                next();});

app.post('/aboutus', function (req, res) {
    var text = req.body.text;
    var email = req.body.email;
    var subject = req.body.subject;

    transporter.sendMail({from: credentials.gmail.name+" "+credentials.gmail.surname,
            to: email,
            subject: subject,
            text: text},
        function(error, info){ if(error){return console.log(error);}
            console.log('Message sent: ' + info.response);
        });
    res.redirect(303, '/thank-you');
});

// add routes
require('./routes.js')(app);





app.use(function(req, res){
    res.type('text/html');
    res.status(404);
    res.render('404');});

app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render('500');});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});

module.exports = app;