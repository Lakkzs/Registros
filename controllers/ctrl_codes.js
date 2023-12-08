const db = require('../db/db')

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

}