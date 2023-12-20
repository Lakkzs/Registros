const nodemailer = require("nodemailer");
const db = require('../db/db')
const email_config = require('../config/credenciales').emailConfig
const codes = require('../controllers/ctrl_codes.js')
const reg = require('../controllers/ctrl_registro.js')


module.exports = {
  rtEmail: async (req, res) => {
    try {
      let code = await codes.generateVerification()
      let resp = await reg.registerVerification(req.body, code)
      const correo = req.body.txtCorreo;
      const nombre = req.body.txtNombre
      res.render('verificarCorreo/verificarCorreo', { txtCorreo: correo, txtNombre: nombre })
      if (resp.datos[0].RESULT == "CORRECTO") {
        const transporter = nodemailer.createTransport(email_config);
        const mailOptions = transporter.sendMail({
          from: 'a181648une@gmail.com',
          cc: 'a181648une@gmail.com',
          to: `${correo}`,
          subject: "¡Registro exitoso! 👌🏻",
          // text: `${req.body.txtNombre}, has sido registrado correctamente 🥳. \nTu código de verificación es el siguiente: \n ${code}`
          html:
            `
              <div style="width:690px; height:550px; background-color:rgb(255, 255, 255); display:block; margin-left: auto; margin-right:auto;">
  
      <div style="width:100%; height:10%; margin-top:2%;align-items:center; ">
          <img style="height:90%; width:auto; display:inline-block;"
              src="https://cdn.domestika.org/c_fill,dpr_auto,f_auto,h_256,pg_1,t_base_params,w_256/v1505584180/avatars/000/596/250/596250-original.jpg?1505584180">
      </div>
  
      <div style=" background-color:rgb(127,176,6); height:8% ;">
      <label style="font-size:25px; color:rgb(127,176,6); vertical-align:bottom; "></label>
      </div>
  
      <div style=" background-color:rgb(127,176,6); height:8% ;">
          <label style="font-size:25px; color:white; vertical-align:bottom; ">Código de verificación</label>
      </div>
  
      <div style="text-align: justify;">
          <br>
           Hola, ${req.body.txtNombre} <br><br>
  
           Recibimos una solicitud para acceder a tu cuenta ${correo} con tu dirección de correo electrónico.<br>
           El código de verificación es:<br><br>
  
            <div style="margin-right: auto; margin-left: auto; width: 100%; display: flex;">
              <label style="text-align:center; width:100%; font-size:25px;"><b>${code}</b></label>
            </div><br><br>
  
           Si no solicitaste este código, es posible que otra persona esté intentando acceder a la cuenta: ${correo} <br>
           No reenvíes ni proporciones este código a otra persona.<br><br>
       
           Atentamente.<br><br>
  
           El equipo de ProInternet<br><br>
      </div>
  
  </div>
              `

        });
      }
      // expressSesion para crear sesiones se guarda id nombre correo para saber q usuario navega y mostrarle su instanceof; sequelize especie de conector de bd como mssql, nos permite hacer conexiones con multiples bd, solo se ocupa una pequeña instancia para usar connect session, para hacer guardado de la sesion; connect-session-sequelize; meterlo en el midleware, dsps crear otro para rear la sesion; req.cookies, req.session, crea un objeto con la anterior con tiempo de expiración

    } catch (error) {
      console.log(error)
    }
  },


  
  emailPass: async (req, res) => {
    try {
      let code = await codes.generateVerification()
      let resp = await db.tempPass.InsertTemporalPass(req, code)
      const correo = req.body.txtCorreo;
      res.render('login/login', { txtCorreo: correo })
      if (resp.datos[0].RESULT == 'ACTUALIZADO') {
        await db.changeStatusCode.changeStatus(req).datos //CHECHARRRRRRRRRRRRRRRRRR
        // expressSesion para crear sesiones se guarda id nombre correo para saber q usuario navega y mostrarle su instanceof; sequelize especie de conector de bd como mssql, nos permite hacer conexiones con multiples bd, solo se ocupa una pequeña instancia para usar connect session, para hacer guardado de la sesion; connect-session-sequelize; meterlo en el midleware, dsps crear otro para rear la sesion; req.cookies, req.session, crea un objeto con la anterior con tiempo de expiración
        const transporter = nodemailer.createTransport(email_config);
        const mailOptions = transporter.sendMail({
          from: 'a181648une@gmail.com',
          cc: 'a181648une@gmail.com',
          to: `${correo}`,
          subject: "Contraseña Temporal 🔒",
          // text: `${req.body.txtNombre}, has sido registrado correctamente 🥳. \nTu código de verificación es el siguiente: \n ${code}`
          html:
            `
         <div style="width:690px; height:550px; background-color:rgb(255, 255, 255); display:block; margin-left: auto; margin-right:auto;">

   <div style="width:100%; height:10%; margin-top:2%;align-items:center; ">
       <img style="height:90%; width:auto; display:inline-block;"
           src="https://cdn.domestika.org/c_fill,dpr_auto,f_auto,h_256,pg_1,t_base_params,w_256/v1505584180/avatars/000/596/250/596250-original.jpg?1505584180">
   </div>

   <div style=" background-color:rgb(127,176,6); height:8% ;">
   <label style="font-size:25px; color:rgb(127,176,6); vertical-align:bottom; "></label>
   </div>

   <div style=" background-color:rgb(127,176,6); height:8% ;">
       <label style="font-size:25px; color:white; vertical-align:bottom; ">Contraseña Temporal</label>
   </div>

   <div style="text-align: justify;">
       <br>
        Hola, ${req.body.txtNombre} <br><br>

         Tu cuenta ha sido verificada correctamente. Para acceder a tu cuenta ${correo} con tu dirección de correo electrónico.<br>
         Puedes utilizar la siguiente contraseña temporal:<br><br>

       
         <div style="margin-right: auto; margin-left: auto; width: 100%; display: flex;">
           <label style="text-align:center; width:100%; font-size:25px;"><b>${code}</b></label>
         </div><br><br>

        Si no solicitaste esta contraseña, es posible que otra persona esté intentando acceder a la cuenta: ${correo} <br>
        No reenvíes ni proporciones esta contraseña a otra persona.<br><br>
    
        Atentamente.<br><br>

        El equipo de ProInternet<br><br>
   </div>

</div>
           `

        });
      }

    } catch (error) {
      console.log(error)
    }
  },


  emailRecup: async (req, res) => {
    try {
      let code = await codes.generateVerification()
      let resp = await db.tempPass.RecoupPass(req, code)
      const correo = req.body.txtCorreo;
      res.json({status: 'OK', resp})
      console.log(resp)
      if (resp.datos[0].RESULT == 'ACTUALIZADO') {
        const transporter = nodemailer.createTransport(email_config);
        const mailOptions = transporter.sendMail({
          from: 'a181648une@gmail.com',
          cc: 'a181648une@gmail.com',
          to: `${correo}`,
          subject: "Nueva Contraseña 🔒",
          // text: `${req.body.txtNombre}, has sido registrado correctamente 🥳. \nTu código de verificación es el siguiente: \n ${code}`
          html:
            `
            <div style="width:690px; height:450px; background-color:rgb(255, 255, 255); display:block; margin-left: auto; margin-right:auto;">
  
      <div style="width:100%; height:10%; margin-top:2%;align-items:center; ">
          <img style="height:90%; width:auto; display:inline-block;"
              src="https://cdn.domestika.org/c_fill,dpr_auto,f_auto,h_256,pg_1,t_base_params,w_256/v1505584180/avatars/000/596/250/596250-original.jpg?1505584180">
      </div>
  
      <div style=" background-color:rgb(127,176,6); height:8% ;">
      <label style="font-size:25px; color:rgb(127,176,6); vertical-align:bottom; "></label>
      </div>
  
      <div style=" background-color:rgb(127,176,6); height:8% ;">
          <label style="font-size:25px; color:white; vertical-align:bottom; ">Recuperar Contraseña</label>
      </div>
  
      <div style="text-align: justify;">
          <br>
           Hola, ${resp.datos[0].txtNombre} <br><br>
  
           Recibimos una solicitud para modificar la contraseña de su cuenta: ${correo} <br>
           Su <b>nueva contraseña</b> es: 
  
            <div style="margin-right: auto; margin-left: auto; width: 100%; display: flex;">
              <label style="text-align:center; width:100%; font-size:25px;"><b>${code}</b></label>
            </div><br><br>
  
           No reenvíes ni proporciones esta contraseña a otra persona.<br><br>
       
          Inicie <a href="http://localhost:3000/login">sesión</a> para modificar su contraseña<br><br>
  
      </div>
  
  </div>
              `

        });
      }
    } catch (error) {
      console.log(error)
    }
  }




}

