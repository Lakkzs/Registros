const db = require('../db/db')
const codes = require('../controllers/ctrl_codes.js')

module.exports = {
    generateVerification: async (req, res) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let resultado = '';
        const characterLenght = characters.length;
        for (let i = 0; i < 6; i++){
          resultado += characters.charAt(Math.floor(Math.random()* characterLenght));
        }
        console.log(resultado)
        return resultado
    },
    verify: async (req, res) => {
      try {
        let body = req.body
        let datos = (await db.verify.verificarCodigo(body)).datos
        console.log(datos)
        res.json({status: 'OK', datos})
      } catch (error) {
          console.log(error)
          res.json({estatus: 'ERROR'})
      }
    },
    login: async (req, res) => {
        let body = req.body
        let code = await codes.generateVerification()
        await db.tempPass.InsertTemporalPass(body, code).datos
        await db.changeStatusCode.changeStatus(body).datos
        res.render('login/login')
    },
}