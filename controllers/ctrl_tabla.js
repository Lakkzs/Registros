const db = require('../db/db')

module.exports = {
    tabla: async (req, res) => {
        let resultado = await db.loadTable.loadTableData()
        res.render('partials/tabla', {data: resultado.datos})
    }
}