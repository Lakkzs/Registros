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
    puestos: async(req, res) => {
        let resultado = await db.altas.cargaDepartamentos()
        res.render('altas/alta_Puestos', {departamentos: resultado.datos})
    },
    infoEmpresa: async(req, res) => {
        let resultado = await db.altas.cargaColaboradores()
        let resultado2 = await db.altas.cargaDepartamentos()
        let resultado4= await db.altas.cargaPerfiles()
        res.render('altas/alta_infoEmpresa', {colaboradores: resultado.datos, departamentos: resultado2.datos, perfiles: resultado4.datos})
    },
    cargaPuestos: async(req,res) => {
        let datos = req.body
        console.log(777, datos)
        let resultado3 = await db.altas.cargaInfoEmpresa(datos)
        // console.log(3, resultado3)
        console.log(150, datos)
        if(datos.consulta){
            res.render('partials/select',{opciones: resultado3.datos, name: "txtPuesto", id:"txtPuesto", NOMBRE_PUESTO: datos.consulta}, (error, html) => {
                console.log(html)
                res.json({html})
            })
        }else{
            res.render('partials/select',{opciones: resultado3.datos, name: "txtPuesto", id:"txtPuesto"}, (error, html) => {
                console.log(html)
                res.json({html})
            })
        }
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
    rt_altaTipoUsuario: async(req, res) => {
        try{
            let body = req.body
            let datos = (await db.altas.altaTipoUsuario(body)).datos
            console.log(datos)
            res.json({status: 'OK', datos})
        } catch(error){
            console.log(error)
            res.json({estatus:'ERROR'})
        }
    },
    rt_infoEmpresa: async(req, res) => {
        try{
            let datos = req.body
            let resultado5 = (await db.altas.altaInfoLaboral(datos)).datos
            console.log(resultado5)
            res.json({status: 'OK', resultado5}) 
        }
        catch(error){
            console.log(error)
            res.json({estatus:'ERROR'})
        }
    },
    rt_infoAdicional: async(req,res) => {
        let datos = req.body
        let resultado = await db.altas.cargaDatosColaboradores(datos)
        console.log(3, resultado.datos[0].ESTADO_CIVIL_COLABORADOR_AD)
        res.render('partials/infoAdicional',{ESTADO_CIVIL_COLABORADOR_AD: resultado.datos[0].ESTADO_CIVIL_COLABORADOR_AD, name: "txtEstado", id:"txtEstado",DEPENDENCIA_COLABORADOR_AD: resultado.datos[0].DEPENDENCIA_COLABORADOR_AD, name1:"txtDependencia", id1:"txtDependencia",NUM_DEPENDIENTES_COLABORADOR_AD:resultado.datos[0].NUM_DEPENDIENTES_COLABORADOR_AD, name3: "txtNumero", id3: "txtNumero"}, (error, html) => {
            res.json({html})
        })
    },
    rt_cargaInfoEmpresa: async(req, res) => {
        try{
            let datos = req.body
            console.log(10, datos)
            let resultado = (await db.altas.cargaInfoLaboral(datos)).datos
            let resultado2 = await db.altas.cargaDepartamentos()
            let resultado4= await db.altas.cargaPerfiles()
            console.log(11, resultado)
            if(resultado[0] != undefined){
                res.render('partials/infoLaboral',{datos: resultado[0], departamentos: resultado2.datos, perfiles: resultado4.datos, txtFecha_Entrada: resultado[0].FECHA_INGRESO_INF_COL_EMPRESA, txtFecha_Salida: resultado[0].FECHA_SALIDA_INF_COL_EMPRESA, NOMBRE_TRANSITORIO: resultado[0].NOMBRE_TRANSITORIO, NOMBRE_DEPARTAMENTO: resultado[0].NOMBRE_DEPARTAMENTO, NOMBRE_PUESTO: resultado[0].NOMBRE_PUESTO}, (error, html) => {
                    console.log(html)
                    res.json({html})
                })
            }else{
                res.render('partials/infoLaboral',{datos: resultado[0], departamentos: resultado2.datos, perfiles: resultado4.datos}, (error, html) => {
                    console.log(html)
                    res.json({html})
                })
            }
        }
        catch(error){
            console.log(error)
            res.json({estatus:'ERROR'})
        }
    },
    rt_altaTransitorios: async(req, res) => {
        try{
            let body = req.body
            let datos = (await db.altas.altaTransitorios(body)).datos
            console.log(datos)
            res.json({status: 'OK', datos})
        } catch(error){
            console.log(error)
            res.json({estatus:'ERROR'})
        }
    },

}