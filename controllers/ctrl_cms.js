const db = require('../db/db')
const cms = require('../controllers/ctrl_cms.js')

module.exports = {
    cms: async (req, res) => {
        if(req.session.user){
            console.log(req.session.user)
            if(req.session.user.user == 'SuperAdministrador'){
                console.log(1)
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(153, datos)
                res.render('cms/cms', {empresa: datos, varias:true, user: req.session.user, seleccionada: req.session.user.empresa})
            }else{
                console.log(2)
                res.render('cms/cms', {EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }
    },
    rt_empresa: async(req, res) => {
        req.session.user.id_empresa = req.body.id
        req.session.user.empresa = req.body.empresa
        res.json({seleccionada: req.session.user.empresa})
    }
}