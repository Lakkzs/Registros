const nodemailer = require("nodemailer");
const db = require('../db/db')
const email_config = require('../config/credenciales').emailConfig

module.exports = {
    rtEmail: async (req, res) => {
        try {
          const correo = req.body.txtCorreo;
          const transporter = nodemailer.createTransport(email_config);
          
          const mailOptions = transporter.sendMail({
            from: 'a181648une@gmail.com', // sender address
            cc: 'a181648une@gmail.com',
            to: `${correo}`, // list of receivers
            subject: "¡Registro exitoso! 👌🏻", // Subject line
            text: `${req.body.txtNombre}, has sido registrado correctamente 🥳🥳.`
            //html: "<b>Hello world?</b>", // html body
          });
          
        res.render('landing/landing')



        } catch (error) {
            console.log(error)
        }
    }
}