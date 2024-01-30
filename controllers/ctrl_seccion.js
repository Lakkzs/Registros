const db = require('../db/db')

module.exports = {
     seccion: async(req,res) => {
 
        if(req.session.user){
            let resultado = await db.loadInfo.loadInfoData()
            let pendientes = resultado.datos[0][0].PENDIENTES
            let n_mujer = resultado.datos[1][0].NUMERO_MUJERES
            let n_hombre = resultado.datos[2][0].NUMERO_HOMBRES
            let n_total = resultado.datos[3][0].NUMERO_COLABORADORES
           
    
            let resultado2 = await db.loadInfo.loadInfoMonths()
            let enero = resultado2.datos[0][0].ALTA_ENERO
            let febrero = resultado2.datos[1][0].ALTA_FEBRERO
            let marzo = resultado2.datos[2][0].ALTA_MARZO
            let abril = resultado2.datos[3][0].ALTA_ABRIL
            let mayo = resultado2.datos[4][0].ALTA_MAYO
            let junio = resultado2.datos[5][0].ALTA_JUNIO
            let julio = resultado2.datos[6][0].ALTA_JULIO
            let agosto = resultado2.datos[7][0].ALTA_AGOSTO
            let septiembre = resultado2.datos[8][0].ALTA_SEPTIEMBRE
            let octubre = resultado2.datos[9][0].ALTA_OCTUBRE
            let noviembre = resultado2.datos[10][0].ALTA_NOVIMEBRE
            let diciembre = resultado2.datos[11][0].ALTA_DICIEMBRE
    
            let resultado3 = await db.loadInfo.loadInfoYears()
            let actual = resultado3.datos[0][0].ALTA_AÑO_ACTUAL
            let pasado = resultado3.datos[1][0].ALTA_AÑO_PASADO
            let antepasado = resultado3.datos[2][0].ALTA_AÑO_ANTEPASADO
            let pasadoAntepasado = resultado3.datos[3][0].ALTA_AÑO_PASADO_ANTEPASADO
            let mesActual = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date());
    
            let resultado4 = await db.loadInfo.loadInfoBirthday()


            let resultado5 = await db.loadInfo.loadInfoDate()
            let dia = resultado5.datos[0][0].DIA_FECHA 
            let mes = resultado5.datos[1][0].MES_FECHA
    
            let resultado6 = await db.loadInfo.loadInfoAniversary() 

            let resultado7= await db.loadInfo.loadNextBirthday()
            
            let resultado8= await db.altas.cargaDepartamentos()


            if(req.session.user.user == 'SuperAdministrador'){
                console.log(1)
                let datos = (await db.loadInfo.loadEmpresas()).datos
                
                res.render('seccion/seccion', {PENDIENTES: pendientes, NUMERO_MUJER: n_mujer, NUMERO_HOMBRE: n_hombre, NUMERO_TOTAL: n_total, ENERO: enero, FEBRERO: febrero, MARZO: marzo, ABRIL: abril, 
                    MAYO: mayo, JUNIO: junio, JULIO: julio, AGOSTO: agosto, SEPTIEMBRE: septiembre, OCTUBRE: octubre, NOVIMEBRE: noviembre, DICIEMBRE: diciembre, 
                    ACTUAL: actual, PASADO: pasado, ANTEPASADO: antepasado, PASADOANTEPASADO: pasadoAntepasado, MESACTUAL: mesActual, cumpleanos: resultado4.datos, DIA: dia, MES: mes,
                    aniversario: resultado6.datos, empresa: datos, varias:true, todo: true, todo2:false, todo3: true, todo4: false, user: req.session.user,proximosCumpleanos: resultado7.datos, departamentos: resultado8.datos})
            }else{
                res.render('seccion/seccion', {PENDIENTES: pendientes, NUMERO_MUJER: n_mujer, NUMERO_HOMBRE: n_hombre, NUMERO_TOTAL: n_total, ENERO: enero, FEBRERO: febrero, MARZO: marzo, ABRIL: abril, 
                    MAYO: mayo, JUNIO: junio, JULIO: julio, AGOSTO: agosto, SEPTIEMBRE: septiembre, OCTUBRE: octubre, NOVIMEBRE: noviembre, DICIEMBRE: diciembre, 
                    ACTUAL: actual, PASADO: pasado, ANTEPASADO: antepasado, PASADOANTEPASADO: pasadoAntepasado, MESACTUAL: mesActual, cumpleanos: resultado4.datos, DIA: dia, MES: mes,
                    aniversario: resultado6.datos, EMPRESA: req.session.user.empresa, varias:false, todo: true, todo2: false, todo3: true, todo4: false, proximosCumpleanos: resultado7.datos, departamentos: resultado8.datos})
            }
        }else{
            res.render('login/login')
        }
    },
    seccion2: async (req, res) => {

        res.render('seccion/seccion2')

    },
    seccion3: async (req, res) => {

        res.render('seccion/seccion3')

    },
    rt_cargaMeses: async (req, res) => {
        let datos = req.body
       
        let resultado2 = await db.loadInfo.loadInfoMonths()
            
        let enero = resultado2.datos[0][0].ALTA_ENERO
            let febrero = resultado2.datos[1][0].ALTA_FEBRERO
            let marzo = resultado2.datos[2][0].ALTA_MARZO
            let abril = resultado2.datos[3][0].ALTA_ABRIL
            let mayo = resultado2.datos[4][0].ALTA_MAYO
            let junio = resultado2.datos[5][0].ALTA_JUNIO
            let julio = resultado2.datos[6][0].ALTA_JULIO
            let agosto = resultado2.datos[7][0].ALTA_AGOSTO
            let septiembre = resultado2.datos[8][0].ALTA_SEPTIEMBRE
            let octubre = resultado2.datos[9][0].ALTA_OCTUBRE
            let noviembre = resultado2.datos[10][0].ALTA_NOVIMEBRE
            let diciembre = resultado2.datos[11][0].ALTA_DICIEMBRE

        let resultado3 = await db.loadInfo.loadChartInfoMonths(datos)

  
  
        if(datos.consulta){
            res.render('partials/grafico',{meses: resultado2.datos, ENERO: enero, FEBRERO: febrero, MARZO: marzo, ABRIL: abril, 
                MAYO: mayo, JUNIO: junio, JULIO: julio, AGOSTO: agosto, SEPTIEMBRE: septiembre, OCTUBRE: octubre, NOVIMEBRE: noviembre, DICIEMBRE: diciembre, todo2: true, todo:true}, (error, html) => {
                console.log(html)
                res.json({html})
            })
        }else{
            res.render('partials/grafico',{meses: resultado3.datos, todo2:true, todo:true}, (error, html) => {
                console.log(html)
                res.json({html})
            })
        }
    },
    rt_cargaAnios: async (req, res) => {
        let datos = req.body
        let resultado3 = await db.loadInfo.loadInfoYears()
        let actual = resultado3.datos[0][0].ALTA_AÑO_ACTUAL
        let pasado = resultado3.datos[1][0].ALTA_AÑO_PASADO
        let antepasado = resultado3.datos[2][0].ALTA_AÑO_ANTEPASADO
        let pasadoAntepasado = resultado3.datos[3][0].ALTA_AÑO_PASADO_ANTEPASADO
        let mesActual = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date());

        let resultado4 = await db.loadInfo.loadChartInfoYears(datos)
        if(datos.consulta){
            res.render('partials/graficoAnio',{anios: resultado4.datos,ACTUAL: actual, PASADO: pasado, ANTEPASADO: antepasado, PASADOANTEPASADO: pasadoAntepasado, 
                MESACTUAL: mesActual, todo3: true, todo4: true}, (error, html) => {
                console.log(html)
                res.json({html})
            })
        }else{
            res.render('partials/graficoAnio',{anios: resultado4.datos, todo3: true, todo4: true}, (error, html) => {
                console.log(html)
                res.json({html})
            })
        }
    },
}