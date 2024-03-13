const db = require('../db/db')

module.exports = {
    descargaDocumentos: (req, res) => {
        res.render('descargaDocumentos/descargaDocumentos')
    }
}