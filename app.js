var express = require('express');
var app = express();
var mongoose = require('mongoose');
var opts = {
    server:{
        socketOptions: {keepAlive: 1}
    }
};
var credentials = require('./credentials.js');

var nodemailer = require('nodemailer');
var mailTransport = nodemailer.createTransport('SMTP', {
    service: "Gmail",
    auth: {
        user: credentials.gmail.user,
        pass: credentials.gmail.password
    }
});

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

var database = require('./db.js');
database.initdb;


app.use(    require('cookie-parser')(credentials.cookieSecret),
            express.static(__dirname + '/public'),
            function(err, req, res, next){
                console.log('Error : ' + err.message);
                next()});

app.get('/', function(req, res){
    res.render('home', {title: "Home Page"});
});
app.get('/aboutus', function(req, res){
    res.render('aboutus', {title: "About us"});
});
app.get('/add_receipt', function(req, res){
    res.render('add_receipt', {title: "Add new receipt"});
});
app.get('/allreceipt', function(req, res){
    res.render('allreceipts', {title: "List Of Receipts"});
});

app.get('/rating', function(req, res){
    res.render('rating', {title: "Rating of receipts"});
});
//!!!!!!!!!here other routes



app.use(
    function(req, res){
    res.type('text/html');
    res.status(404);
    res.render('404');},

    function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render('500');    }
);

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});
