
const db = require('../db/db')


module.exports = {
    recuperar: async (req, res) => {
        res.render('recuperar/recuperar')
    },
    recuperarContraRegreso: async(req, res) => {
        const correo = req.body.txtCorreo;
        res.render('login/login', { txtCorreo: correo })
    }
}