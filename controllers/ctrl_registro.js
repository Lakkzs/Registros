const db = require('../db/db')


module.exports = {
    rtRegistro: async (req, res) => {
        try {
            let body = req.body
            let datos = (await db.registro.registrar(body)).datos

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
            let res = await db.codes.guardarCodigo(req, code)
            return res
      } catch (error) {
          console.log(error)
          res.json({estatus: 'ERROR'})
      }
      }
}