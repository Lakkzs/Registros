const db = require('../db/db')
module.exports = {
    info: (req, res) => {
        res.render('info/info')
    },
    infoAdicional: (req, res) => {
        res.render('infoColaborador/info_Adicional')
    },
    infoEmpresa: async(req, res) => {
        let resultado = await db.altas.cargaColaboradores()
        let resultado2 = await db.altas.cargaDepartamentos()
        let resultado3 = await db.infoColaborador.cargaInfoEmpresa()
        res.render('infoColaborador/info_Empresa', {colaboradores: resultado.datos, departamentos: resultado2.datos, puestos: resultado3.datos})
    },
    infoEstudios: (req, res) => {
        res.render('infoColaborador/info_Estudios')
    },
    infoEmergencia: (req, res) => {
        res.render('infoColaborador/info_Emergencia')
    },
    infoSalud: (req, res) => {
        res.render('infoColaborador/info_Salud')
    },
    rt_infoEmpresa: async(req, res) => {
        try{
            console.log(777,req)
            let body = req.body
            let datos = (await db.altas.altaPuestos(body)).datos
            console.log(datos)
            res.json({status: 'OK', datos})
        } catch(error){
            console.log(error)
            res.json({estatus:'ERROR'})
        }
    },
}