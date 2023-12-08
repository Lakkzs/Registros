const db = require('../db/db')


module.exports = {
    rtRegistro: async (req, res) => {
        try {
            let body = req.body
            console.log(body)
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
    },
    registerVerification: async (req, code, res) => {
        try {
            console.log(1, req)
            console.log(2, code)
            await db.codes.guardarCodigo(req, code)
      } catch (error) {
          console.log(error)
          res.json({estatus: 'ERROR'})
      }
      }
}