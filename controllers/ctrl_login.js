const db = require('../db/db')


module.exports = {
    login: async (req, res) => {
        if(req.body.txtCorreo){
            const correo = req.body.txtCorreo;
            res.render('login/login', { txtCorreo: correo })
        }else{
            res.render('login/login')
        }
    },
    rtLogin: async (req, res) => {
        try {
            console.log(req.sessionID)
            let body = req.body
            const {email, password} = req.body
            let datos = (await db.login.ingresar(body)).datos
            const user = datos[0].USUARIO
            const folio = datos[0].FOLIO
            const empresa = datos[0].EMPRESA
            if(body.txtCorreo && body.txtContrasena){
                if(req.session.authenticated){
                    res.json(req.session)
                }else{
                    if(datos[0].RESULT == "USUARIO ENCONTRADO"){
                        req.session.authenticated = true;
                        req.session.user = {
                            email, password, user, folio, empresa
                        }
                        // console.log(req)
                        res.json({status: 'OK', datos})
                    }else{
                        res.json({msg: 'Bad Credentials'})
                    }
                }
            }else{
                res.status(403).json({msg: 'Bad Credentials'})
            }
        } catch (error) {
            console.log(error)
            res.json({estatus: 'ERROR'})
        }
    }
}