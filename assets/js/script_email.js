"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
  auth: {
    user: "a181648une@gmail.com",
    pass: "ltxx yfgz eita xezz",
  },
});

const mailOptions = await transporter.sendMail({
  from: 'a181648une@gmail.com', // sender address
  to: "a181648@une.edu.mx", // list of receivers
  subject: "Hello ✔", // Subject line
  html: "<b>Hello world?</b>", // html body
});

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error)
    }else{
        console.log('Correo enviado: ' + info.response)
    }
})
