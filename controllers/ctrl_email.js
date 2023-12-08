const nodemailer = require("nodemailer");
const db = require('../db/db')
const email_config = require('../config/credenciales').emailConfig
const codes = require('../controllers/ctrl_codes.js')
const reg = require('../controllers/ctrl_registro.js')

module.exports = {
    rtEmail: async (req, res) => {
        try {
          let code = await codes.generateVerification()
          console.log(code)
          await reg.registerVerification(req.body, code)
          // expressSesion para crear sesiones se guarda id nombre correo para saber q usuario navega y mostrarle su instanceof; sequelize especie de conector de bd como mssql, nos permite hacer conexiones con multiples bd, solo se ocupa una pequeña instancia para usar connect session, para hacer guardado de la sesion; connect-session-sequelize; meterlo en el midleware, dsps crear otro para rear la sesion; req.cookies, req.session, crea un objeto con la anterior con tiempo de expiración
          const correo = req.body.txtCorreo; 
          const transporter = nodemailer.createTransport(email_config);
          const mailOptions = transporter.sendMail({
            from: 'a181648une@gmail.com',
            cc: 'a181648une@gmail.com',
            to: `${correo}`,
            subject: "¡Registro exitoso! 👌🏻",
            text: `${req.body.txtNombre}, has sido registrado correctamente 🥳. \nTu código de verificación es el siguiente: \n ${code}`
          });
        res.render('verificarCorreo/verificarCorreo', {txtCorreo: correo})
        } catch (error) {
            console.log(error)
        }
    }
}

