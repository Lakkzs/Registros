const db = require('../db/db')

module.exports = {
    vacaciones: async (req, res) => {
        if(req.session.user){
            if(req.session.user.user == 'SuperAdministrador'){
                console.log(1)
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(153, datos)
                res.render('extras/extras_vacaciones', {empresa: datos, varias:true, user: req.session.user})
            }else{
                console.log(2)
                res.render('extras/extras_vacaciones', {EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }
    },
    calendario: async (req, res) => {
        if(req.session.user){
            if(req.session.user.user == 'SuperAdministrador'){
                console.log(1)
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(153, datos)
                res.render('extras/extras_calendario', {empresa: datos, varias:true, user: req.session.user})
            }else{
                console.log(2)
                res.render('extras/extras_calendario', {EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }
    },
}