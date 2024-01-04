const db = require('../db/db')

module.exports = {
    empresas: (req, res) => {
        res.render('altas/alta_Empresas')
    },
    tipoUsuario: (req, res) => {
        res.render('altas/alta_TipoUsuario')
    },
    departamentos: (req, res) => {
        res.render('altas/alta_Departamentos')
    },
    perfiles: (req, res) => {
        res.render('altas/alta_Perfiles')
    },
    puestos: async(req, res) => {
        let resultado = await db.altas.cargaDepartamentos()
        res.render('altas/alta_Puestos', {departamentos: resultado.datos})
    },
    rt_Departamentos: async(req,res) => {
        let 
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
    rt_altaDepartamentos: async (req, res) => {
        try {
            console.log(777, req)
            let body = req.body
            let datos = (await db.altas.altaDepartamento(body)).datos
            console.log(datos)
            res.json({status: 'OK', datos})
        } catch (error) {
            console.log(error)
            res.json({estatus: 'ERROR'})
        }
    },
    rt_altaPuestos: async(req, res) => {
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
    rt_altaEmpresas: async (req, res) => {
        try {
            console.log(777, req)
            let body = req.body
            let datos = (await db.altas.altaEmpresa(body)).datos
            console.log(datos)
            res.json({status: 'OK', datos})
        } catch (error) {
            console.log(error)
            res.json({estatus: 'ERROR'})
        }
    },
}