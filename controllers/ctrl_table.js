const db = require('../db/db')

module.exports = {
    data: async (req, res) => {
        console.log(1002, req.query)
        let resultado = await db.loadTable.loadTableData(req.query)
        console.log(444, resultado)
        res.render('partials/tabla', {data: resultado.datos})
    },
}