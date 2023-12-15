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
        // text: `${req.body.txtNombre}, has sido registrado correctamente 🥳. \nTu código de verificación es el siguiente: \n ${code}`
        html:
          `
            <div style="width:690px; height:550px; background-color:rgb(255, 255, 255); display:block;">

    <div style="width:100%; height:10%; margin-top:2%;align-items:center; ">
        <img style="height:90%; width:auto; display:inline-block;"
            src="https://cdn.domestika.org/c_fill,dpr_auto,f_auto,h_256,pg_1,t_base_params,w_256/v1505584180/avatars/000/596/250/596250-original.jpg?1505584180">
    </div>

    <div style=" background-color:rgb(127,176,6); height:8 ;">
    <label style="font-size:25px; color:rgb(127,176,6); vertical-align:bottom; ">Cón</label>
    </div>

    <div style=" background-color:rgb(127,176,6); height:8% ;">
        <label style="font-size:25px; color:white; vertical-align:bottom; ">Código de verificación</label>
    </div>

    <div style="text-align: justify;">
        <br>
         Hola,${req.body.txtNombre} <br><br>

         Recibimos una solicitud para acceder a tu cuenta ${correo} con tu dirección de correo electrónico.<br>
         El código de verificación es:<br><br>

        
          <label style="text-align:center; width:100%; font-size:25px"><b>${code}</b></label><br><br>


         Si no solicitaste este código, es posible que otra persona esté intentando acceder a la cuenta: ${correo} <br>
         No reenvíes ni proporciones este código a otra persona.<br><br>
     
         Atentamente.<br><br>

         El equipo de ProInternet<br><br>
    </div>

</div>
            `

      });
      res.render('verificarCorreo/verificarCorreo', { txtCorreo: correo })
    } catch (error) {
      console.log(error)
    }
  },


  emailPass: async (req, res) => {
    try {
      await db.changeStatusCode.changeStatus(req).datos //CHECHARRRRRRRRRRRRRRRRRR
      let code = await codes.generateVerification()
      await db.tempPass.InsertTemporalPass(req, code).datos
      // expressSesion para crear sesiones se guarda id nombre correo para saber q usuario navega y mostrarle su instanceof; sequelize especie de conector de bd como mssql, nos permite hacer conexiones con multiples bd, solo se ocupa una pequeña instancia para usar connect session, para hacer guardado de la sesion; connect-session-sequelize; meterlo en el midleware, dsps crear otro para rear la sesion; req.cookies, req.session, crea un objeto con la anterior con tiempo de expiración
      const correo = req.body.txtCorreo;
      const transporter = nodemailer.createTransport(email_config);
      const mailOptions = transporter.sendMail({
        from: 'a181648une@gmail.com',
        cc: 'a181648une@gmail.com',
        to: `${correo}`,
        subject: "Contraseña Temporal 🔒",
        // text: `${req.body.txtNombre}, has sido registrado correctamente 🥳. \nTu código de verificación es el siguiente: \n ${code}`
        html:
          `
            <div style="width:690px; height:550px; background-color:rgb(255, 255, 255); display:block;">

    <div style="width:100%; height:10%; margin-top:2%;align-items:center; ">
        <img style="height:90%; width:auto; display:inline-block;"
            src="https://cdn.domestika.org/c_fill,dpr_auto,f_auto,h_256,pg_1,t_base_params,w_256/v1505584180/avatars/000/596/250/596250-original.jpg?1505584180">
    </div>

    <div style=" background-color:rgb(127,176,6); height:8 ;">
    <label style="font-size:25px; color:rgb(127,176,6); vertical-align:bottom; ">Cón</label>
    </div>

    <div style=" background-color:rgb(127,176,6); height:8% ;">
        <label style="font-size:25px; color:white; vertical-align:bottom; ">Código de verificación</label>
    </div>

    <div style="text-align: justify;">
        <br>
         Hola,${req.body.txtNombre} <br><br>

          Tu cuenta ha sido verificada correctamente. Para acceder a tu cuenta ${correo} con tu dirección de correo electrónico.<br>
          Puedes utilizar la siguiente contraseña temporal:<br><br>

        
          <label style="text-align:center; width:100%; font-size:25px"><b>${code}</b></label><br><br>


         Si no solicitaste este código, es posible que otra persona esté intentando acceder a la cuenta: ${correo} <br>
         No reenvíes ni proporciones este código a otra persona.<br><br>
     
         Atentamente.<br><br>

         El equipo de ProInternet<br><br>
    </div>

</div>
            `

      });
      res.render('login/login')
    } catch (error) {
      console.log(error)
    }
  }




}

