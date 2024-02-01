const db = require('../db/db')

module.exports = {
    seccion2: async (req, res) => {
        if (req.session.user) {
            let resultado4 = await db.loadInfo.loadInfoBirthday()
            let resultado6 = await db.loadInfo.loadInfoAniversary()
            let resultado7 = await db.loadInfo.loadNextBirthday()
            console.log('ID DEL COLABORADOR',req.session.user.folio)
            let folio = req.session.user
            let resultado = await db.loadInfo.loadDayOfEntry(folio)
            let entrada = resultado.datos[0].FECHA
            let resultado1 = await db.loadInfo.loadVacations(folio)
            let vacaciones = resultado1.datos[0].DIAS_VACACIONES
            let resultado2 = await db.loadInfo.loadEconomicDays(folio)
            let economicos = resultado2.datos[0].DIAS_ECONOMICOS
            res.render('seccion/seccion2', { cumpleanos: resultado4.datos, aniversario: resultado6.datos, proximosCumpleanos: resultado7.datos, ENTRADA: entrada , VACACIONES: vacaciones, ECONOMICOS: economicos})

        }
        else {
            res.render('login/login')

        }
    }

}