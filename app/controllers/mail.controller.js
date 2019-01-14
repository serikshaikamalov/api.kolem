const nodemailer = require('nodemailer');

// Get Data Models
const Projects = require('../models/project');
const constants = require('../../config/constants');

exports.sendEmail = (req, res, next) => {
    
    /**
     * ContactFormDat
     */

     const formData = {
         email: req.body.email,
         message: req.body.message,
         phoneNumber: req.body.phoneNumber,
         firstName: req.body.firstName
     }

     console.log('FormData: ', formData);

    /**
     * Mail: Auth
     */
    var transporter = nodemailer.createTransport({
        service: 'yandex',
        auth: {
          user: 'info@kolem.kz',
          pass: '15052017kolemarchB'
        }
    });


    /**
     * Mail: Options
     */
    var mailOptions = {
        from: formData.email,
        to: 'info@kolem.kz',
        // to: 'serik.shaikamalov@gmail.com',
        subject: 'New message from kolem.kz',
        text: formData.message
    };

    /**
     * Mail: Send Message
     */
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


    res.json('Mail Send!');
}