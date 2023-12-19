const db = require('../db/db')


module.exports = {
    login: async (req, res) => {
        res.render('login/login')
    },
    rtLogin: async (req, res) => {
        try {
            console.log(req.sessionID)
            let body = req.body
            const {email, password} = req.body
            let datos = (await db.login.ingresar(body)).datos
            if(body.txtCorreo && body.txtContrasena){
                if(req.session.authenticated){
                    res.json(req.session)
                }else{
                    if(datos[0].RESULT == "USUARIO ENCONTRADO"){
                        req.session.authenticated = true;
                        req.session.user = {
                            email, password
                        }
                        res.json({status: 'OK', datos})
                    }else{
                        res.status(403).json({msg: 'Bad Credentials'})
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