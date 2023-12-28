const db = require('../db/db')

module.exports = {
    tabla: async (req, res) => {
        console.log(100000000000000000, req.query)
        if(Object.keys(req.query).length != 0){
            console.log(1, 'asd')
            let resultado = await db.loadTable.loadTableData(req.query)
            console.log(150, resultado)
            res.render('tabla/tabla', {tabla: resultado.datos[0], paginas: resultado.datos[1]})
        }else{
            console.log(0, 'dsa')
            let resultado = await db.loadTable.loadTableData({p: 0, c: 20})
            console.log(150, resultado)
            res.render('tabla/tabla', {tabla: resultado.datos[0], paginas: resultado.datos[1]})
        }
    },

}