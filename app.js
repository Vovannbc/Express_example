var database = require('./db.js');

database.initdb;

var express = require('express');

var app = express();

app.set('view engine', 'jade');
app.set('views', './views');

var credentials = require('./credentials.js');
app.use(require('cookie-parser')(credentials.cookieSecret));

app.set('port', process.env.PORT || 7001);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('home', {title: "Home Page"});
});

app.use(function(err, req, res, next){
    console.log('Error : ' + err.message);
    next();
});

app.get('/aboutus', function(req, res){
    res.render('aboutus');
});

app.get('/add_receipt', function(req, res){
    res.render('add_receipt');
});

app.post('/add_receipt', function (req, res, next) {
    console.log(req.body);            //{}
    console.log(req.body.title);      //undefined
    console.log(req.body.link);       //undefined
    res.send("Thanks for inserting!");
    res.json(req.body);               //{}
    next();
});

app.get('/allreceipt', function(req, res){
    res.render('allreceipts', {TEST:+TEST});
});

app.use(function(req, res){
    res.type('text/html');
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});
