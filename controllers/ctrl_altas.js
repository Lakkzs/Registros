const db = require('../db/db')
const email_config = require('../config/credenciales').emailConfig
const codes = require('../controllers/ctrl_codes.js')
const nodemailer = require("nodemailer");

module.exports = {
    empresas: async (req, res) => {
        console.log(req.session)
        if(req.session.user){
            if(req.session.user.user == 'SuperAdministrador'){
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(1)
                res.render('altas/alta_Empresas', {empresa: datos, varias:true, user: req.session.user})
            }else{
                console.log(2)
                res.render('altas/alta_Empresas', {EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }
    },
    tipoUsuario: async (req, res) => {
        console.log(req.session)
        if(req.session.user){
            if(req.session.user.user == 'SuperAdministrador'){
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(1)
                res.render('altas/alta_TipoUsuario', {empresa: datos, varias:true, user: req.session.user})
            }else{
                console.log(2)
                res.render('altas/alta_TipoUsuario', {EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }
    },
    departamentos: async (req, res) => {
        console.log(req.session)
        if(req.session.user){
            if(req.session.user.user == 'SuperAdministrador'){
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(1)
                res.render('altas/alta_Departamentos', {empresa: datos, varias:true, user: req.session.user})
            }else{
                console.log(2)
                res.render('altas/alta_Departamentos', {EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }
    },
    puestos: async(req, res) => {
        console.log(req.session)
        if(req.session.user){
            let resultado = await db.altas.cargaDepartamentos()
            if(req.session.user.user == 'SuperAdministrador'){
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(1)
                res.render('altas/alta_Puestos', {departamentos: resultado.datos, empresa: datos, varias:true, user: req.session.user})
            }else{
                console.log(2)
                res.render('altas/alta_Puestos', {departamentos: resultado.datos, EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }
    },
    infoEmpresa: async(req, res) => {
        console.log(req.session)
        if(req.session.user){
            let data = req.session.user
            let resultado = await db.altas.cargaColaboradores(data)
            let resultado2 = await db.altas.cargaDepartamentos()
            let resultado4= await db.altas.cargaPerfiles()
            if(req.session.user.user == 'SuperAdministrador'){
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(1)
                res.render('altas/alta_infoEmpresa', {colaboradores: resultado.datos, departamentos: resultado2.datos, perfiles: resultado4.datos, empresa: datos, varias:true, user: req.session.user})
            }else{
                console.log(2)
                res.render('altas/alta_infoEmpresa', {colaboradores: resultado.datos, departamentos: resultado2.datos, perfiles: resultado4.datos,EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }

    },
    cargaPuestos: async(req,res) => {
        let datos = req.body
        console.log(777, datos)
        let resultado3 = await db.altas.cargaInfoEmpresa(datos)
        // console.log(3, resultado3)
        console.log(150, datos)
        if(datos.consulta){
            res.render('partials/puestos',{opciones: resultado3.datos, name: "txtPuesto", id:"txtPuesto", NOMBRE_PUESTO: datos.consulta}, (error, html) => {
                console.log(html)
                res.json({html})
            })
        }else{
            res.render('partials/puestos',{opciones: resultado3.datos, name: "txtPuesto", id:"txtPuesto"}, (error, html) => {
                console.log(html)
                res.json({html})
            })
        }
    },
    
    rt_Departamentos: async(req,res) => {
        let 
    },
    colaborador: async (req, res) => {
        console.log(req.session)
        if(req.session.user){
            if(req.session.user.user == 'SuperAdministrador'){
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(1)
                res.render('altas/alta_Colaborador', {empresa: datos, varias:true, user: req.session.user})
            }else{
                console.log(2)
                res.render('altas/alta_Colaborador', {EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }
    },
    transitorios: async (req, res) => {
        console.log(req.session)
        if(req.session.user){
            if(req.session.user.user == 'SuperAdministrador'){
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(1)
                res.render('altas/alta_Transitorios', {empresa: datos, varias:true, user: req.session.user})
            }else{
                console.log(2)
                res.render('altas/alta_Transitorios', {EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }
    },
    rt_altaColaborador: async (req, res) => {
        try {
            let body = req.body
            let data = req.session.user
            let datos = (await db.altas.altaColaborador(body, data)).datos
            let code = await codes.generateVerification()
            let resp = await db.tempPass.InsertTemporalPass(req, code)
            res.json({status: 'OK', datos})
            const correo = req.body.txtCorreo;
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
                <div
                    style="width:690px; height:550px; background-color:rgb(255, 255, 255); display:block; margin-left: auto; margin-right:auto;">
                
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
                        Hola, ${req.body.txtNombres} <br><br>
                
                        Tu cuenta ha sido verificada correctamente. Para acceder a tu cuenta ${correo} con tu dirección de correo
                        electrónico.<br>
                        Puedes utilizar la siguiente contraseña temporal:<br><br>
                
                
                        <div style="margin-right: auto; margin-left: auto; width: 100%; display: flex;">
                            <label style="text-align:center; width:100%; font-size:25px;"><b>${code}</b></label>
                        </div><br><br>
                
                        Si no solicitaste esta contraseña, es posible que otra persona esté intentando acceder a la cuenta: ${correo}
                        <br>
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
            res.json({estatus: 'ERROR'})
        }
    },
    rt_altaDepartamentos: async (req, res) => {
        try {
            console.log(777, req)
            let body = req.body
            let data = req.session.user
            let datos = (await db.altas.altaDepartamento(body, data)).datos
            console.log(datos)
            res.json({status: 'OK', datos})
        } catch (error) {
            console.log(error)
            res.json({estatus: 'ERROR'})
        }
    },
    rt_altaEmpresas: async (req, res) => {
        try {
            console.log(777, req)
            let body = req.body
            let datos = (await db.altas.altaEmpresa(body)).datos
            console.log(datos)
            res.json({status: 'OK', datos})
        } catch (error) {
            console.log(error)
            res.json({estatus: 'ERROR'})
        }
    },
    rt_altaPuestos: async(req, res) => {
        try{
            console.log(777,req)
            let body = req.body
            let datos = (await db.altas.altaPuestos(body)).datos
            console.log(datos)
            res.json({status: 'OK', datos})
        } catch(error){
            console.log(error)
            res.json({estatus:'ERROR'})
        }
    },
    rt_altaTipoUsuario: async(req, res) => {
        try{
            let body = req.body
            let data = req.session.user
            let datos = (await db.altas.altaTipoUsuario(body, data)).datos
            console.log(datos)
            res.json({status: 'OK', datos})
        } catch(error){
            console.log(error)
            res.json({estatus:'ERROR'})
        }
    },
    rt_infoEmpresa: async(req, res) => {
        try{
            let datos = req.body
            let resultado5 = (await db.altas.altaInfoLaboral(datos)).datos
            console.log(resultado5)
            res.json({status: 'OK', resultado5}) 
        }
        catch(error){
            console.log(error)
            res.json({estatus:'ERROR'})
        }
    },
    rt_infoAdicional: async(req,res) => {
        let datos = req.body
        let resultado = await db.altas.cargaDatosColaboradores(datos)
        console.log(3, resultado.datos[0])
        if(resultado.datos[0] != undefined){
            res.render('partials/infoAdicional',{ESTADO_CIVIL_COLABORADOR_AD: resultado.datos[0].ESTADO_CIVIL_COLABORADOR_AD, name: "txtEstado", id:"txtEstado",DEPENDENCIA_COLABORADOR_AD: resultado.datos[0].DEPENDENCIA_COLABORADOR_AD, name2:"txtDependencia", id2:"txtDependencia",NUM_DEPENDIENTES_COLABORADOR_AD:resultado.datos[0].NUM_DEPENDIENTES_COLABORADOR_AD, name3: "txtNumero", id3: "txtNumero"}, (error, html) => {
                res.json({html})
            })
        }else{
            res.render('partials/infoAdicional',{name: "txtEstado", id:"txtEstado", name2:"txtDependencia", id2:"txtDependencia", name3: "txtNumero", id3: "txtNumero"}, (error, html) => {
                res.json({html})
            })
        } 
    },
    rt_cargaInfoEmpresa: async(req, res) => {
        try{
            let datos = req.body
            console.log(10, datos)
            let resultado = (await db.altas.cargaInfoLaboral(datos)).datos
            let resultado2 = await db.altas.cargaDepartamentos()
            let resultado4= await db.altas.cargaPerfiles()
            console.log(11, resultado)
            if(resultado[0] != undefined){
                res.render('partials/infoLaboral',{datos: resultado[0], departamentos: resultado2.datos, perfiles: resultado4.datos, txtFecha_Entrada: resultado[0].FECHA_INGRESO_INF_COL_EMPRESA, txtFecha_Salida: resultado[0].FECHA_SALIDA_INF_COL_EMPRESA, NOMBRE_TRANSITORIO: resultado[0].NOMBRE_TRANSITORIO, NOMBRE_DEPARTAMENTO: resultado[0].NOMBRE_DEPARTAMENTO, NOMBRE_PUESTO: resultado[0].NOMBRE_PUESTO}, (error, html) => {
                    console.log(html)
                    res.json({html})
                })
            }else{
                res.render('partials/infoLaboral',{datos: resultado[0], departamentos: resultado2.datos, perfiles: resultado4.datos}, (error, html) => {
                    console.log(html)
                    res.json({html})
                })
            }
        }
        catch(error){
            console.log(error)
            res.json({estatus:'ERROR'})
        }
    },
    
    rt_cargaContactos: async(req,res) => {
        let datos = req.body
        let resultado = (await db.altas.cargaContactosEmergencia(datos)).datos
        console.log(387, resultado[0])
        if(resultado[0] != undefined){
            let opcion =  resultado[0].PARENTESCO_CONTACTO;
            let opcion2 =  resultado[0].PARENTESCO_CONTACTO_2;
            let opcion3 =  resultado[0].PARENTESCO_CONTACTO_3;
            let opciones = ["Padre","Madre", "Hermano/a", "Esposo/a", "Hijo/a", "Abuelo/a", "Tío/a", "Amigo/a", "Otro"];
            let flag = true
            if(opciones.includes(opcion) ){
                flag= true
            }else{
                flag=false
            }
            let flag2 = true
            if(opciones.includes(opcion2) ){
                flag2= true
            }else{
                flag2=false
            }
            let flag3 = true
            if(opciones.includes(opcion3) ){
                flag3= true
            }else{
                flag3=false
            }
            console.log('asd',resultado[0].NOMBRES_CONTACTO)
            res.render('partials/infoEmergencia',{NOMBRES_CONTACTO: resultado[0].NOMBRES_CONTACTO, APELLIDOS_CONTACTO: resultado[0].APELLIDOS_CONTACTO, CELULAR_CONTACTO: resultado[0].CELULAR_CONTACTO,
            PARENTESCO_CONTACTO: resultado[0].PARENTESCO_CONTACTO,NOMBRES_CONTACTO_2: resultado[0].NOMBRES_CONTACTO_2, APELLIDOS_CONTACTO_2: resultado[0].APELLIDOS_CONTACTO_2, CELULAR_CONTACTO_2: resultado[0].CELULAR_CONTACTO_2,
            PARENTESCO_CONTACTO_2: resultado[0].PARENTESCO_CONTACTO_2, NOMBRES_CONTACTO_3: resultado[0].NOMBRES_CONTACTO_3, APELLIDOS_CONTACTO_3: resultado[0].APELLIDOS_CONTACTO_3, CELULAR_CONTACTO_3: resultado[0].CELULAR_CONTACTO_3,
            PARENTESCO_CONTACTO_3: resultado[0].PARENTESCO_CONTACTO_3, name: "txtNombre", id: "txtNombre", name2:"txtApellido" ,id2:"txtApellido", name3:"txtCelular", id3:"txtCelular" ,
            name4:"txtParentesco", id4:"txtParentesco", name5: "txtNombre2", id5: "txtNombre2" ,name6:"txtApellido2" ,id6:"txtApellido2", name7:"txtCelular2" ,id7:"txtCelular2" ,
            name8:"txtParentesco2", id8:"txtParentesco2", name9: "txtNombre3" ,id9: "txtNombre3", name10:"txtApellido3", id10:"txtApellido3" ,name11:"txtCelular3", id11:"txtCelular3", 
            name12:"txtParentesco3" ,id12:"txtParentesco3" ,id13:"txtOtro" ,name13:"txtOtro" ,id14:"txtOtro2" ,name14:"txtOtro2", id15:"txtOtro3", name15:"txtOtro3", alerta:flag , alerta2:flag2, alerta3:flag3}, (error, html) => {
                console.log(html)
                res.json({html})
            })
        }else{
            res.render('partials/infoEmergencia',{name: "txtNombre", id: "txtNombre", name2:"txtApellido" ,id2:"txtApellido", name3:"txtCelular", id3:"txtCelular" ,
            name4:"txtParentesco", id4:"txtParentesco", name5: "txtNombre2", id5: "txtNombre2" ,name6:"txtApellido2" ,id6:"txtApellido2", name7:"txtCelular2" ,id7:"txtCelular2" ,
            name8:"txtParentesco2", id8:"txtParentesco2", name9: "txtNombre3" ,id9: "txtNombre3", name10:"txtApellido3", id10:"txtApellido3" ,name11:"txtCelular3", id11:"txtCelular3", 
            name12:"txtParentesco3" ,id12:"txtParentesco3" ,id13:"txtOtro" ,name13:"txtOtro" ,id14:"txtOtro2" ,name14:"txtOtro2", id15:"txtOtro3", name15:"txtOtro3", alerta: true, alerta2:true, alerta3:true}, (error, html) => {
                res.json({html})
            })
        }
    },
    rt_altaTransitorios: async(req, res) => {
        try{
            let body = req.body
            let datos = (await db.altas.altaTransitorios(body)).datos
            console.log(datos)
            res.json({status: 'OK', datos})
        } catch(error){
            console.log(error)
            res.json({estatus:'ERROR'})
        }
    },
    rt_altaAdicional: async(req,res) => {
        try{
            let body = req.body
            let datos = (await db.altas.altaInfoAdicional(body)).datos
            console.log(datos)
            res.json({status: 'OK', datos})
        } catch(error){
            console.log(error)
            res.json({estatus:'ERROR'})
        }
    },
    rt_altaContactos: async(req, res) => {
        try{
            let body = req.body
            let datos = (await db.altas.altaContactos(body)).datos
            console.log(datos)
            res.json({status: 'OK', datos})

        } catch(error){
            console.log(error)
            res.json({estatus:'ERROR'})
        }
    },
   

}