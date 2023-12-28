const db = require('../db/db')

module.exports = {
    tabla: async (req, res) => {
        console.log(100000000000000000, req.query)
        if(Object.keys(req.query).length != 0){
            console.log(1, 'asd', parseInt(req.query.p))
            let resultado = await db.loadTable.loadTableData(req.query)
            console.log(150, resultado)
            if(parseInt(req.query.p) >= 5){
                console.log(777)
                let cuarto = parseInt(req.query.p)
                let quinto = parseInt(req.query.p)+1
                let sexto = parseInt(req.query.p)+2
                res.render('tabla/tabla', {tabla: resultado.datos[0], paginas: resultado.datos[1], Cuarto: cuarto, Quinto: quinto, Sexto: sexto})
            }else{
                console.log(888)
                res.render('tabla/tabla', {tabla: resultado.datos[0], paginas: resultado.datos[1], Cuarto: 4, Quinto: 5, Sexto: 6})
            }
        }else{
            console.log(0, 'dsa')
            let resultado = await db.loadTable.loadTableData({p: 0, c: 20})
            console.log(150, resultado)
            res.render('tabla/tabla', {tabla: resultado.datos[0], paginas: resultado.datos[1], Cuarto: 4, Quinto: 5, Sexto: 6})
        }
    },

}