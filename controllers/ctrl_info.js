const db = require('../db/db')
module.exports = {
    info: (req, res) => {
        res.render('info/info')
    },
    infoAdicional: async (req, res) => {
        let resultado = await db.altas.cargaColaboradores()
        res.render('infoColaborador/info_Adicional',{colaboradores: resultado.datos})
    },
    infoEstudios: (req, res) => {
        res.render('infoColaborador/info_Estudios')
    },
    infoEmergencia: async(req, res) => {
        let resultado = await db.altas.cargaColaboradores()
        res.render('infoColaborador/info_Emergencia',{colaboradores: resultado.datos})
    },
    infoSalud: (req, res) => {
        res.render('infoColaborador/info_Salud')
    },
    rt_altaInfoEstudios: async (req, res) => {
        try {
            let body = req.body
            let datos = (await db.infoColaborador.altaInfoEstudios(body)).datos
            res.json({status: 'OK', datos})
        } catch (error) {
            console.log(error)
            res.json({estatus: 'ERROR'})
        }
    },
}