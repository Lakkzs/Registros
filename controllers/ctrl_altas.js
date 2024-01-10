const db = require('../db/db')
const email_config = require('../config/credenciales').emailConfig
const codes = require('../controllers/ctrl_codes.js')
const nodemailer = require("nodemailer");

module.exports = {
    empresas: (req, res) => {
        res.render('altas/alta_Empresas')
    },
    tipoUsuario: (req, res) => {
        res.render('altas/alta_TipoUsuario')
    },
    departamentos: (req, res) => {
        res.render('altas/alta_Departamentos')
    },
    puestos: async(req, res) => {
        let resultado = await db.altas.cargaDepartamentos()
        res.render('altas/alta_Puestos', {departamentos: resultado.datos})
    },
    infoEmpresa: async(req, res) => {
        let resultado = await db.altas.cargaColaboradores()
        let resultado2 = await db.altas.cargaDepartamentos()
        let resultado4= await db.altas.cargaPerfiles()
        res.render('altas/alta_infoEmpresa', {colaboradores: resultado.datos, departamentos: resultado2.datos, perfiles: resultado4.datos})
    },
    cargaPuestos: async(req,res) => {
        let datos = req.body
        console.log(777, datos)
        let resultado3 = await db.altas.cargaInfoEmpresa(datos)
        // console.log(3, resultado3)
        console.log(150, datos)
        if(datos.consulta){
            res.render('partials/select',{opciones: resultado3.datos, name: "txtPuesto", id:"txtPuesto", NOMBRE_PUESTO: datos.consulta}, (error, html) => {
                console.log(html)
                res.json({html})
            })
        }else{
            res.render('partials/select',{opciones: resultado3.datos, name: "txtPuesto", id:"txtPuesto"}, (error, html) => {
                console.log(html)
                res.json({html})
            })
        }
    },
    rt_Departamentos: async(req,res) => {
        let 
    },
    colaborador: (req, res) => {

        res.render('altas/alta_Colaborador')

    },
    transitorios: (req, res) => {
        res.render('altas/alta_Transitorios')
    },
    rt_altaColaborador: async (req, res) => {
        try {
            let body = req.body
            let datos = (await db.altas.altaColaborador(body)).datos
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
            let datos = (await db.altas.altaDepartamento(body)).datos
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
            let datos = (await db.altas.altaTipoUsuario(body)).datos
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
    }

}