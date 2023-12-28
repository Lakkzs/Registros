const db = require('../db/db')

module.exports = {
    seccion: async(req,res) => {
        let resultado = await db.loadInfo.loadInfoData()
        let n_mujer = resultado.datos[0][0].NUMERO_MUJERES
        let n_hombre = resultado.datos[1][0].NUMERO_HOMBRES
        let n_total = resultado.datos[2][0].NUMERO_COLABORADORES

        let resultado2 = await db.loadInfo.loadInfoMonths()
        let enero = resultado2.datos[0][0].ALTA_ENERO
        let febrero = resultado2.datos[1][0].ALTA_FEBRERO
        let marzo = resultado2.datos[2][0].ALTA_MARZO
        let abril = resultado2.datos[3][0].ALTA_ABRIL
        let mayo = resultado2.datos[4][0].ALTA_MAYO
        let junio = resultado2.datos[5][0].ALTA_JUNIO
        let julio = resultado2.datos[6][0].ALTA_JULIO
        let agosto = resultado2.datos[7][0].ALTA_AGOSTO
        let septiembre = resultado2.datos[8][0].ALTA_SEPTIEMBRE
        let octubre = resultado2.datos[9][0].ALTA_OCTUBRE
        let noviembre = resultado2.datos[10][0].ALTA_NOVIMEBRE
        let diciembre = resultado2.datos[11][0].ALTA_DICIEMBRE
        
        res.render('seccion/seccion', {NUMERO_MUJER: n_mujer, NUMERO_HOMBRE: n_hombre, NUMERO_TOTAL: n_total, ENERO: enero, FEBRERO: febrero, MARZO: marzo, ABRIL: abril, 
            MAYO: mayo, JUNIO: junio, JULIO: julio, AGOSTO: agosto, SEPTIEMBRE: septiembre, OCTUBRE: octubre, NOVIMEBRE: noviembre, DICIEMBRE: diciembre})
    }
}