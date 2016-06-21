var request = require('request');
var nodemailer = require('nodemailer');
var data = require('./data.json');


var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'SENDING_EMAIL_ADDRESS_HERE',
    pass: 'PASSWORD_HERE'
  },
  logger: true,
  debug: true
}, {
  from: 'Flight Price <SENDING_EMAIL_ADDRESS_HERE>',
});

console.log('SMTP Configured');

var key = 'API_KEY_HERE';
var endPoint = "https://www.googleapis.com/qpxExpress/v1/trips/search?key="+key;

request({method: "post",  url: endPoint,  body: data,  json: true}, function(err, resp, body){
  if (body.error) {
    return console.error(body.error);
  } else {
    var price= body.trips.tripOption[0].saleTotal;
    var message = {
      to: '"NAME_HERE" <RECEIVING_EMAIL_HERE>',
      subject: 'Price update',
      text: ''+price+''
    };

    console.log('Sending mail');
    transporter.sendMail(message, function(error, info){
      if(error){
        console.log(error.message);
        return;
      }
      console.log('Email sent!');
    })
  }
});
