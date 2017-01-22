var send_mail = require('./controllers/send_mail');
var phrases = require('./other/server_phrases');

module.exports = (app)=> {
    app.get('/',                (req, res)=>{res.render('home',         {title: "Home Page"})});
    app.get('/aboutus',         (req, res)=>{res.render('aboutus',      {title: "About us"})});
    app.get('/add_receipt',     (req, res)=>{res.render('add_receipt',  {title: "Add new receipt"})});
    app.get('/allreceipts',     (req, res)=>{res.render('allreceipts',  {title: "List Of Receipts"})});
    app.get('/rating',          (req, res)=>{res.render('rating',       {title: "Rating of receipts"})});
    app.get('/thank-you',       (req, res)=>{res.render('thank-you');});
    app.get('/phrase',          (req, res)=>{phrases.getPhrase()});
    app.post('/aboutus',        send_mail.sendMail);
    app.post('/add_receipt',    (req, res)=>{
        var text = req.body.text;
        var title = req.body.title;
        var ingredients = req.body.ingredients;
        var description = req.body.description;
        var link = req.body.link;
        res.redirect(303, '/thank-you', {message: "Thank you for new receipt!"})
    });
};