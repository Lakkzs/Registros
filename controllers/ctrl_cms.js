const db = require('../db/db')

module.exports = {
    cms: async (req, res) => {
        console.log(req.session)
        if(req.session.user){
            if(req.session.user.user == 'SuperAdministrador'){
                console.log(1)
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(153, datos)
                res.render('cms/cms', {empresa: datos, varias:true, user: req.session.user})
            }else{
                console.log(2)
                res.render('cms/cms', {EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }
    }
}