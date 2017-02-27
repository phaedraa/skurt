'use strict';
const nodemailer = require('nodemailer');

function sendEmailToEng(carLoc, carID) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // test email account
      user: 'foodandart100@gmail.com',
      pass: 'SkurtTechQuestion'
    }
  });
  
  var coordinates = '[' + carLoc[0] + ', ' + carLoc[1] + ']';
  var message = 'Car ' + carID + ' is out of bounds at: ' + coordinates;
  let mailOptions = {
    from: '"Phashizzle" <foodandart100@gmail.com>',
    to: 'phaedra.a.r@gmail.com',
    subject: 'ALERT: OUT OF BOUNDS EXCEPTION: Car: ' + carID,
    text: message,
    html: '<b>' + message + '</b>'
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

module.exports = sendEmailToEng;
