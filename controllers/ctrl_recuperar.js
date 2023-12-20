// module.exports = {
//     recuperar: (req, res) => {
//         res.render('recuperar/recuperar')
//     }
// }

const db = require('../db/db')


module.exports = {
    recuperar: async (req, res) => {
        res.render('recuperar/recuperar')
    },
    recuperarContra: async(req, res) => {
        
    }
}