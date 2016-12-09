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

var database = require('./db.js');
database.initdb;


app.use(    require('cookie-parser')(credentials.cookieSecret),
            express.static(__dirname + '/public'),
            function(err, req, res, next){
                console.log('Error : ' + err.message);
                next()});
app.use(require('body-parser'). urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.render('home', {title: "Home Page"});
});
app.get('/aboutus', function(req, res){
    res.render('aboutus', {title: "About us"});
});
app.get('/add_receipt', function(req, res){
    res.render('add_receipt', {title: "Add new receipt"});
});
app.get('/allreceipts', function(req, res){
    res.render('allreceipts', {title: "List Of Receipts"});
});

app.get('/rating', function(req, res){
    res.render('rating', {title: "Rating of receipts"});
});

app.get('/thank-you', function(req, res){
    res.render('thank-you');
});

app.post('/aboutus', function (req, res) {
    var text = req.body.text;
    var email = req.body.email;
    var subject = req.body.subject;

    transporter.sendMail({from: credentials.gmail.name+" "+credentials.gmail.surname+ '<credentials.gmail.user>',
            to: email,
            subject: subject,
            text: text},
        function(error, info){ if(error){return console.log(error);}
            console.log('Message sent: ' + info.response);
        });
    res.redirect(303, '/thank-you'/*, {message: "Thank you for sending letter!"}*/)
});

app.post('/add_receipt', function (req, res) {
    var text = req.body.text;
    var title = req.body.title;
    var ingredients = req.body.ingredients;
    var description = req.body.description;
    var link = req.body.link;

    res.redirect(303, '/thank-you', {message: "Thank you for new receipt!"})
});
//!!!!!!!!!here other routes



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