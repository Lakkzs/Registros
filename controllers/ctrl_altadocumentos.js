const db = require('../db/db')

module.exports = {
    altaDocumentos: (req, res) => {
        res.render('altaDocumentos/altaDocumentos')
    }
}