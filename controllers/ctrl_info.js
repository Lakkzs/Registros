const db = require('../db/db')
module.exports = {
    info: (req, res) => {
        res.render('info/info')
    },
    infoAdicional: async (req, res) => {
        if(req.session.user){
            let data = req.session.user
            let resultado = await db.altas.cargaColaboradores(data)
            if(req.session.user.user == 'SuperAdministrador'){
                console.log(1)
                res.render('infoColaborador/info_Adicional', {colaboradores: resultado.datos, empresa: datos, varias:true, user: req.session.user})
            }else{
                console.log(2)
                res.render('infoColaborador/info_Adicional', {colaboradores: resultado.datos, EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }
    },
    infoPrincipal: async (req, res) => {
        if(req.session.user){
            let data = req.session.user
            let resultado = await db.altas.cargaColaboradores(data)
            if(req.session.user.user == 'SuperAdministrador'){
                console.log(1)
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(153, datos)
                res.render('infoColaborador/info_Principal', {colaboradores: resultado.datos, empresa: datos, varias:true, user: req.session.user})
            }else{
                console.log(2)
                res.render('infoColaborador/info_Principal', {colaboradores: resultado.datos, EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
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
    rt_altaInfoPrincipal: async (req, res) => {
        let body = req.body
        console.log(999, body)
        let resultado = (await db.infoColaborador.altaInfoPrincipal(body)).datos
        console.log(resultado)
        res.json({status: 'OK', resultado})
    },
    infoEstudios: async (req, res) => {
        if(req.session.user){
            let data = req.session.user
            let resultado = await db.altas.cargaColaboradores(data)
            if(req.session.user.user == 'SuperAdministrador'){
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(1)
                res.render('infoColaborador/info_Estudios', {colaboradores: resultado.datos, empresa: datos, varias:true, user: req.session.user})
            }else{
                res.render('infoColaborador/info_Estudios', {colaboradores: resultado.datos, EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }
    },
    rt_cargaInfoEstudios: async(req, res) => {
        try {
            let datos = (req.body)
            let resultado3 = await db.altas.cargaInfoEstudios(datos)
            console.log(123, resultado3)

            res.render('partials/infoEstudios',{datos: resultado3.datos[0]}, (error, html) => {
                console.log(html)
                res.json({html})
            })
        } catch (error) {
            console.log(error)
        }
    },
    rt_cargaInfoSalud: async(req, res) => {
        try {
            let datos = (req.body)
            let resultado3 = await db.altas.cargaInfoSalud(datos)
            console.log(123, resultado3)

            res.render('partials/infoSalud',{datos: resultado3.datos[0]}, (error, html) => {
                console.log(html)
                res.json({html})
            })
        } catch (error) {
            console.log(error)
        }
    },
    infoEmergencia: async(req, res) => {
        if(req.session.user){
            let data = req.session.user
            let resultado = await db.altas.cargaColaboradores(data)
            if(req.session.user.user == 'SuperAdministrador'){
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(1)
                res.render('infoColaborador/info_Emergencia', {colaboradores: resultado.datos, empresa: datos, varias:true, user: req.session.user})
            }else{
                console.log(2)
                res.render('infoColaborador/info_Emergencia', {colaboradores: resultado.datos, EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }
    },
    infoSalud: async (req, res) => {
        if(req.session.user){
            let data = req.session.user
            let resultado = await db.altas.cargaColaboradores(data)
            if(req.session.user.user == 'SuperAdministrador'){
                let datos = (await db.loadInfo.loadEmpresas()).datos
                console.log(1)
                res.render('infoColaborador/info_Salud', {colaboradores: resultado.datos, empresa: datos, varias:true, user: req.session.user})
            }else{
                res.render('infoColaborador/info_Salud', {colaboradores: resultado.datos, EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }
    },
    rt_altaInfoEstudios: async (req, res) => {
        try {
            let body = req.body
            let datos = (await db.infoColaborador.altaInfoEstudios(body)).datos
            console.log(datos)
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
        console.log('pasar', datos)
        console.log('pasar2', datos.CIUDAD_COLABORADOR)
        let resultado = await db.altas.cargaMunicipios(datos)
        if(resultado.datos[0] != undefined){
            console.log(152)
            res.render('partials/municipio',{municipios: resultado.datos, name: "txtCiudad", id:"txtCiudad", datos: datos.CIUDAD_COLABORADOR}, (error, html) => {
                res.json({html})
            })
        }else{
            res.render('partials/municipio',{municipios: resultado.datos, name: "txtCiudad", id:"txtCiudad"}, (error, html) => {
                res.json({html})
            })
        }
        
    },
}