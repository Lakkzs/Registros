const db = require('../db/db')

module.exports = {
    seccion: async(req,res) => {
        let resultado = await db.loadInfo.loadInfoData()
        let n_mujer = resultado.datos[0][0].NUMERO_MUJERES
        let n_hombre = resultado.datos[1][0].NUMERO_HOMBRES
        let n_total = resultado.datos[2][0].NUMERO_COLABORADORES
        res.render('seccion/seccion', {NUMERO_MUJER: n_mujer, NUMERO_HOMBRE: n_hombre, NUMERO_TOTAL: n_total})
    }
}