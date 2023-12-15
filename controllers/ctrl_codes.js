const db = require('../db/db')
const emailSend = require('../controllers/ctrl_email.js')

module.exports = {
    generateVerification: async (req, res) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let resultado = '';
        const characterLenght = characters.length;
        for (let i = 0; i < 6; i++){
          resultado += characters.charAt(Math.floor(Math.random()* characterLenght));
        }
        return resultado
    },
    verify: async (req, res) => {
      try {
        let body = req.body
        let datos = (await db.verify.verificarCodigo(body)).datos
        res.json({status: 'OK', datos})
      } catch (error) {
          console.log(error)
          res.json({estatus: 'ERROR'})
      }
    },
}