'use strict';
const nodemailer = require('nodemailer');

function sendEmailToEng(text, subject) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // test email account
      user: 'foodandart100@gmail.com',
      pass: 'SkurtTechQuestion'
    }
  });
  
  let mailOptions = {
    from: '"Phaedra Randolph" <foodandart100@gmail.com>',
    to: 'engineering@skurt.com',
    subject: subject,
    text: text,
    html: '<b>' + text + '</b>'
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error('Failed to send email: ' + error.message);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

module.exports = sendEmailToEng;
