const db = require('../db/db')

module.exports = {
    seccion: async(req,res) => {
        let resultado = await db.loadInfo.loadInfoData()
        console.log(resultado.datos[0])
        console.log({NUMERO_MUJER: resultado.datos[0].NUMERO_MUJERES, NUMERO_HOMBRE: resultado.datos[1].NUMERO_HOMBRES, NUMERO_TOTAL: resultado.datos[2].NUMERO_COLABORADORES})
        res.render('seccion/seccion', {NUMERO_MUJER: resultado.datos[0], NUMERO_HOMBRE: resultado.datos[1].NUMERO_HOMBRES, NUMERO_TOTAL: resultado.datos[2].NUMERO_COLABORADORES})
    }
}