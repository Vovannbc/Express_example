var send_mail = require('./send_mail');

module.exports = function(app) {
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
//require('./send_mail').send_mail;
    app.post('/aboutus', send_mail.sendMail);

    app.post('/add_receipt', function (req, res) {
        var text = req.body.text;
        var title = req.body.title;
        var ingredients = req.body.ingredients;
        var description = req.body.description;
        var link = req.body.link;

        res.redirect(303, '/thank-you', {message: "Thank you for new receipt!"})
    });
};