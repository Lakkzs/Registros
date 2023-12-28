const db = require('../db/db')

module.exports = {
    tabla: async (req, res) => {
        console.log(100000000000000000, req.query)
        if(Object.keys(req.query).length != 0){
            console.log(1, 'asd', parseInt(req.query.p))
            let resultado = await db.loadTable.loadTableData(req.query)
            let Max = resultado.datos[1][0].Paginas
            if(parseInt(req.query.p) >= 5){
                console.log(777)
                let cuarto = parseInt(req.query.p)+1
                let quinto = parseInt(req.query.p)+2
                let sexto = parseInt(req.query.p)+3
                if(Max == cuarto){
                    res.render('tabla/tabla', {tabla: resultado.datos[0], Paginas: Max, Cuarto: cuarto-2, Quinto: quinto-2, Sexto: sexto-2})
                }else if(Max == quinto){
                    res.render('tabla/tabla', {tabla: resultado.datos[0], Paginas: Max, Cuarto: cuarto-1, Quinto: quinto-1, Sexto: sexto-1})
                }else if(Max == sexto){
                    res.render('tabla/tabla', {tabla: resultado.datos[0], Paginas: Max, Cuarto: cuarto, Quinto: quinto, Sexto: sexto})
                }else{
                    res.render('tabla/tabla', {tabla: resultado.datos[0], Paginas: Max, Cuarto: cuarto, Quinto: quinto, Sexto: sexto})
                }
            }else{
                console.log(888)
                res.render('tabla/tabla', {tabla: resultado.datos[0], Paginas: Max, Cuarto: 4, Quinto: 5, Sexto: 6})
            }
        }else{
            console.log(0, 'dsa')
            let resultado = await db.loadTable.loadTableData({p: 0, c: 20})
            let Max = resultado.datos[1][0].Paginas
            console.log(150, resultado.datos[1][0].Paginas)
            res.render('tabla/tabla', {tabla: resultado.datos[0], Paginas: Max, Cuarto: 4, Quinto: 5, Sexto: 6})
        }
    },

}