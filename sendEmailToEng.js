'use strict';
const nodemailer = require('nodemailer');

function sendEmailToEng(carLoc, carID) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'foodandart100@gmail.com',
        pass: 'SkurtTechQuestion'
    }
  });
  
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Phashizzle" <foodandart100@gmail.com>', // sender address
    to: 'phaedra.a.r@gmail.com', // list of receivers
    subject: 'Car ' + carID + ' Out of Bounds! ✔', // Subject line
    text: 'Car ' + carID + ' is out of bounds at: ' + carLoc, // plain text body
    html: '<b>Hello world ?</b>' // html body
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

module.exports = sendEmailToEng;