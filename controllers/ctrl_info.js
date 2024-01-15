const db = require('../db/db')
module.exports = {
    info: (req, res) => {
        res.render('info/info')
    },
    infoAdicional: async (req, res) => {
        let resultado = await db.altas.cargaColaboradores()
        res.render('infoColaborador/info_Adicional',{colaboradores: resultado.datos})
    },
    infoPrincipal: async (req, res) => {
       let resultado = await db.altas.cargaColaboradores()
       let resultado2= await db.altas.cargaEstados()
       res.render('infoColaborador/info_Principal',{colaboradores: resultado.datos,estados: resultado2.datos})
    },

    infoEstudios: (req, res) => {
        res.render('infoColaborador/info_Estudios')
    },
    infoEmergencia: async(req, res) => {
        let resultado = await db.altas.cargaColaboradores()
        res.render('infoColaborador/info_Emergencia',{colaboradores: resultado.datos})
    },
    infoSalud: (req, res) => {
        console.log(req.session)
        res.render('infoColaborador/info_Salud')
    },
    rt_altaInfoEstudios: async (req, res) => {
        try {
            let body = req.body
            let folio = req.session.user
            let datos = (await db.infoColaborador.altaInfoEstudios(body, folio)).datos
            res.json({status: 'OK', datos})
        } catch (error) {
            console.log(error)
            res.json({estatus: 'ERROR'})
        }
    },
    rt_altaInfoSalud: async (req, res) => {
        console.log(req.session.user)
        try {
            let body = req.body
            let folio = req.session.user
            let datos = (await db.infoColaborador.altaInfoSalud(body, folio)).datos
            res.json({status: 'OK', datos})
        } catch (error) {
            console.log(error)
            res.json({estatus: 'ERROR'})
        }
    },
    rt_cargaMunicipio: async(req, res) => {
        let datos = req.body
        let resultado = await db.altas.cargaMunicipios(datos)
        console.log('RESULTADO DATOSSSSSSS',resultado.datos)
        if(datos.consulta){
            res.render('partials/municipio',{municipios: resultado.datos, name: "txtCiudad", id:"txtCiudad"}, (error, html) => {
                console.log(html)
                res.json({html})
            })
        }else{
            res.render('partials/municipio',{municipios: resultado.datos, name: "txtCiudad", id:"txtCiudad"}, (error, html) => {
                console.log(html)
                res.json({html})
            })
        }
        
    },
}