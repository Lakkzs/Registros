// module.exports = {
//     recuperar: (req, res) => {
//         res.render('recuperar/recuperar')
//     }
// }

const db = require('../db/db')


module.exports = {
    recuperar: async (req, res) => {
        try {
            let body = req.body
            let datos = (await db.tempPass.InsertTemporalPass(body)).datos
            res.json({status: 'OK', datos})
        } catch (error) {
            console.log(error)
            res.json({estatus: 'ERROR'})
        }
    },
}