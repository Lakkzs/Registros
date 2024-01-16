const db = require('../db/db')
module.exports = {
    info: (req, res) => {
        res.render('info/info')
    },
    infoAdicional: async (req, res) => {
        let data = req.session.user
        let resultado = await db.altas.cargaColaboradores(data)
        res.render('infoColaborador/info_Adicional',{colaboradores: resultado.datos})
    },
    infoPrincipal: async (req, res) => {
        console.log(req.session)
        if(req.session.user){
            let data = req.session.user
            let resultado = await db.altas.cargaColaboradores(data)
            if(req.session.user.user == 'SuperAdministrador'){
                console.log(1)
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(153, datos)
                res.render('infoColaborador/info_Principal', {colaboradores: resultado.datos, empresa: datos, varias:true})
            }else{
                console.log(2)
                res.render('infoColaborador/info_Principal', {colaboradores: resultado.datos, EMPRESA: req.session.user.empresa, varias:false})
            }
        }else{
            res.render('login/login')
        }
    },
    rt_infoPrincipal: async (req, res) => {
        let data = req.session.user
        let resultado = await db.altas.cargaColaboradores(data)
        let resultado2 = await db.altas.cargaEstados()
        let resultado3 = await db.altas.cargaInfo(req)
        console.log(123, resultado3)

        res.render('partials/infoPrincipal',{colaboradores: resultado.datos,estados: resultado2.datos, datos: resultado3.datos[0]}, (error, html) => {
            res.json({html})
        })
    },

    infoEstudios: (req, res) => {
        res.render('infoColaborador/info_Estudios')
    },
    infoEmergencia: async(req, res) => {
        let data = req.session.user
        let resultado = await db.altas.cargaColaboradores(data)
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