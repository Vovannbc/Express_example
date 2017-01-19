var app = require('express')();
var send_mail = function(){
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
        res.redirect(303, '/thank-you')
    });
};
exports.sendMail = send_mail;