const db = require('../db/db')


module.exports = {
    rtRegistro: async (req, res) => {
        try {
            let body = req.body
            let datos = (await db.registro.registrar(body)).datos
            // if(datos[0].RESULT != 'EXISTE'){
            //     res.json({status: 'OK', datos})
            // }
            console.log(datos)
            res.json({status: 'OK', datos})
        } catch (error) {
            console.log(error)
            res.json({estatus: 'ERROR'})
        }
    }
}