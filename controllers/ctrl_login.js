const db = require('../db/db')


module.exports = {
    login: async (req, res) => {
        res.render('login/login')
    },
    rtLogin: async (req, res) => {
        try {
            let body = req.body
            let datos = (await db.login.ingresar(body)).datos
            res.json({status: 'OK', datos})
        } catch (error) {
            console.log(error)
            res.json({estatus: 'ERROR'})
        }
    }
}