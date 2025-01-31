const db = require('../db/db')

module.exports = {
    vacaciones: async (req, res) => {
        if (req.session.user) {
            if (req.session.user.user == 'SuperAdministrador') {
                //console.log(1)
                let datos = (await db.loadInfo.loadEmpresas()).datos
                //console.log(153, datos)
                res.render('extras/extras_vacaciones', { empresa: datos, varias: true, user: req.session.user, seleccionada: req.session.user.empresa})
            } else {
                //console.log(2)
                res.render('extras/extras_vacaciones', { EMPRESA: req.session.user.empresa, varias: false, user: req.session.user })
            }
        } else {
            res.render('login/login')
        }
    },
    calendario: async (req, res) => {
        if (req.session.user) {
            if (req.session.user.user == 'SuperAdministrador') {
                //console.log(1)
                let datos = (await db.loadInfo.loadEmpresas()).datos
                //console.log(153, datos)
                res.render('extras/extras_calendario', { empresa: datos, varias: true, user: req.session.user, seleccionada: req.session.user.empresa})
            } else {
                //console.log(2)
                res.render('extras/extras_calendario', { EMPRESA: req.session.user.empresa, varias: false, user: req.session.user })
            }
        } else {
            res.render('login/login')
        }
    },
    editar_vacaciones: async (req, res) => {
        if(req.session.user){
            if(req.session.user.user == 'SuperAdministrador'){
                //console.log(1)
                let datos = (await db.loadInfo.loadEmpresas()).datos
                //console.log(153, datos)
                res.render('extras/extras_editar_vacaciones', {empresa: datos, varias:true, user: req.session.user, seleccionada: req.session.user.empresa})
            }else{
                //console.log(2)
                res.render('extras/extras_editar_vacaciones', {EMPRESA: req.session.user.empresa, varias:false, user: req.session.user})
            }
        }else{
            res.render('login/login')
        }
    },
    editar_diasEconomicoss: async (req, res) => {
        if (req.session.user) {
            let resultado = await db.altas.cargaTiempos()
            if (req.session.user.user == 'SuperAdministrador') {
                //console.log(1)
                let datos = (await db.loadInfo.loadEmpresas()).datos
                //console.log(153, datos)
                res.render('extras/extras_dias_economicos', { empresa: datos, varias: true, user: req.session.user, seleccionada: req.session.user.empresa, tiempos: resultado.datos})
                console.log('-----------------------------',resultado.datos)
            } else {
                //console.log(2)
                res.render('extras/extras_dias_economicos', { EMPRESA: req.session.user.empresa, varias: false, user: req.session.user, tiempos: resultado.datos })
                console.log('-----------------------------',resultado.datos)
            }
        } else {
            res.render('login/login')
        }

    },
    rt_cargarDirectorio: async (req, res) => {
        // let data = req.session.user
        // let resultado3 = (await db.extras.cargarFestivos(data)).datos
        // console.log(123, resultado3)
        // res.render('partials/extrasCalendario', { datos: resultado3 }, (error, html) => {
        //     res.json({ html })
        // })
        res.render('extras/directorio')
    },
    
    rt_cargarCalendario: async (req, res) => {
        let data = req.session.user
        let resultado3 = (await db.extras.cargarFestivos(data)).datos
        //console.log(123, resultado3)
        res.render('partials/extrasCalendario', { datos: resultado3 }, (error, html) => {
            res.json({ html })
        })
    },
    rt_actualizarFechas: async (req, res) => {
        try {
            let body = req.body.jsonExtraCalendario
            let filas = req.body.filas
            let data = req.session.user
            let datos = (await db.extras.actualizarFestivos(body, filas, data))
            res.json({ status: 'OK', datos: 'ACTUALIZADO' })
        } catch (error) {
            console.log(error)
            res.json({ estatus: 'ERROR' })
        }
    },
    rt_eliminarFecha: async (req, res) => {
        let body = req.body
        let data = req.session.user
        let datos = (await db.extras.eliminarFecha(body, data)).datos
        res.json({ status: 'OK', datos })
    },
    rt_buscarVacaciones: async (req, res) => {
        let datos = req.body
        let resultado = await db.altas.cargaVacaciones(datos)
        if (resultado.datos[0] != undefined) {
            res.render('partials/editarVacaciones', { DIAS_VACACIONES: resultado.datos[0].DIAS_VACACIONES, name: "txtDias", id: "txtDias" }, (error, html) => {
                res.json({ html })
            })
        } else {
            res.render('partials/editarVacaciones', { name: "txtDias", id: "txtDias" }, (error, html) => {
                res.json({ html })
            })
        }
    },
    rt_buscarDias: async (req, res) => {
        let datos = req.body
        let resultado = await db.altas.cargaDias(datos)
        console.log('----------------DIAS ECONOMICOS:', resultado.datos[0])
        if (resultado.datos[0] != undefined) {
            res.render('partials/editarDias', { DIAS_ECONOMICOS: resultado.datos[0].DIAS_ECONOMICOS, name: "txtDiasEconomicos", id: "txtDiasEconomicos" }, (error, html) => {
                res.json({ html })
            })
        } else {
            res.render('partials/editarDias', { name: "txtDiasEconomicos", id: "txtDiasEconomicos" }, (error, html) => {
                res.json({ html })
            })
        }
    },
    rt_altaVacaciones: async (req, res) => {
        try {
            let body = req.body
            let datos = (await db.altas.altaVacaciones(body)).datos
            console.log(datos)
            res.json({ status: 'OK', datos })
        } catch (error) {
            console.log(error)
            res.json({ estatus: 'ERROR' })
        }
    },
    rt_altaDias: async (req, res) => {
        try {
            let body = req.body
            let datos = (await db.altas.altaDias(body)).datos
            console.log(datos)
            res.json({ status: 'OK', datos })
        } catch (error) {
            console.log(error)
            res.json({ estatus: 'ERROR' })
        }
    },
 


}