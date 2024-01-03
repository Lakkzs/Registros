const db = require('../db/db')

module.exports = {
    empresas: (req, res) => {
        res.render('altas/alta_Empresas')
    },
    tUsuario: (req, res) => {
        res.render('altas/alta_TUsuario')
    },
    departamentos: (req, res) => {
        res.render('altas/alta_Departamentos')
    },
    perfiles: (req, res) => {
        res.render('altas/alta_Perfiles')
    },
    puestos: (req, res) => {
        res.render('altas/alta_Puestos')
    },
    colaborador: (req, res) => {
        res.render('altas/alta_Colaborador')
    },
    rt_altaColaborador: async (req, res) => {
        try {
            let body = req.body
            let datos = (await db.altas.altaColaborador(body)).datos
            res.json({status: 'OK', datos})
        } catch (error) {
            console.log(error)
            res.json({estatus: 'ERROR'})
        }
    },
}