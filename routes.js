"use strict";
var send_mail = require('./app/controllers/send_mail');
var phrases = require('./other/server_phrases');
var authvalidation = require('./app/controllers/validation');

module.exports = (app)=> {

    app.get('/',                (req, res, next)=>{res.render('home',         {title: "Home Page", phrase: phrases.getPhrase()})});
    app.get('/aboutus',         (req, res, next)=>{res.render('aboutus',      {title: "About us"})});
    app.get('/add_receipt',     (req, res, next)=>{res.render('add_receipt',  {title: "Add new receipt"})});
    app.get('/allreceipts',     (req, res, next)=>{res.render('allreceipts',  {title: "List Of Receipts"})});
    app.get('/rating',          (req, res, next)=>{res.render('rating',       {title: "Rating of receipts"})});
    app.get('/thank-you',       (req, res, next)=>{res.render('thank-you');});
    app.get('/testpage',       (req, res, next)=>{res.render('testpage');});

    app.get('/register',        (req, res)=>{res.render('auth/register',    {title: "Registration page"})});
    app.get('/login',           (req, res)=>{res.render('auth/login')});

    app.post('/register',        (req, res)=>{
        authvalidation.authValidation(req, res)
    });
    app.post('/aboutus',        send_mail.sendMail);
    app.post('/add_receipt',    (req, res)=>{
        var text = req.body.text;
        var title = req.body.title;
        var ingredients = req.body.ingredients;
        var description = req.body.description;
        var link = req.body.link;
        res.redirect(303, '/thank-you', {message: "Thank you for new receipt!"})
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

};