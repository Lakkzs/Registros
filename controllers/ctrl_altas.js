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
    perfiles: async(req, res) => {
        let resultado = await db.altas.cargaColaboradores()
        let resultado2 = await db.altas.cargaDepartamentos()
        let resultado3 = await db.altas.cargaPuestos()
        res.render('altas/alta_Perfiles', {colaboradores: resultado.datos, departamentos: resultado2.datos, puestos: resultado3.datos})
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
    transitorios: (req, res) => {
        res.render('altas/alta_Transitorios')
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