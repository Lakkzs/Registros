const db = require('../db/db')

const nodemailer = require("nodemailer");

module.exports = {
    rtEmail: async (req, res) => {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
              auth: {
                user: "a181648une@gmail.com",
                pass: "ltxx yfgz eita xezz",
              },
            });
            
            const mailOptions = transporter.sendMail({
              from: 'a181648une@gmail.com', // sender address
              to: "a181648@une.edu.mx", // list of receivers
              subject: "Hello ✔", // Subject line
              text: 'Hello world?'
              //html: "<b>Hello world?</b>", // html body
            });

            res.render('landing/landing')
        
        } catch (error) {
            console.log(error)
        }
    }
}