// Peticiones asincronas POST, PUT, DELETE
const express = require('express')
const router = express.Router()
const db = require('../db/db')
const registro = require('../controllers/ctrl_registro')
const login = require('../controllers/ctrl_login')
const logout = require('../controllers/ctrl_logout')
const email = require('../controllers/ctrl_email')
const landing = require('../controllers/ctrl_landing')
const verificationEmail = require('../controllers/ctrl_codes')
const recuperar = require('../controllers/ctrl_recuperar')
const cms = require('../controllers/ctrl_cms')
const altas = require('../controllers/ctrl_altas')
const info = require('../controllers/ctrl_info')
const seccion = require('../controllers/ctrl_seccion')
const extras = require('../controllers/ctrl_extras')

router.post('/rt_registro', registro.rtRegistro)

router.post('/rt_login', login.rtLogin)
router.post('/login', login.login)
router.post('/logout', logout.logout)
router.post('/cms', cms.cms)
router.post('/rt_empresa', cms.rt_empresa)

router.post('/rt_verification', email.rtEmail)

router.post('/rt_verify', verificationEmail.verify)
router.post('/rt_login_view', email.emailPass)

router.post('/landing', landing.landing)
router.post('/rt_recuperar', email.emailRecup)

//ALTAS
router.post('/rt_altaColaborador', altas.rt_altaColaborador)
router.post('/rt_altaDepartamentos', altas.rt_altaDepartamentos)
router.post('/rt_altaEmpresas', altas.rt_altaEmpresas)
router.post('/rt_infoEmpresa', altas.rt_infoEmpresa)
router.post('/rt_cargaPuesto', altas.cargaPuestos)
router.post('/rt_altaPuestos', altas.rt_altaPuestos)
router.post('/rt_altaTipoUsuario', altas.rt_altaTipoUsuario)
router.post('/rt_altaTransitorios', altas.rt_altaTransitorios)
router.post('/rt_info_Adicional', altas.rt_infoAdicional)

router.post('/rt_altaAdicional', altas.rt_altaAdicional)
router.post('/rt_cargaInfoEmpresa', altas.rt_cargaInfoEmpresa)
router.post('/rt_info_Emergencia', altas.rt_cargaContactos)
router.post('/rt_altaEmergencia', altas.rt_altaContactos)

//GRAFICOS 
router.post('/rt_cargaMeses', seccion.rt_cargaMeses)
router.post('/rt_cargaAnios', seccion.rt_cargaAnios)
router.post('/rt_consultaEventos', seccion.rt_consultaEventos)

//DASHBOARD 
router.post('/rt_cargaseccion', seccion.rt_consultaDashboard)

//INFO COLABORADOR
router.post('/rt_altaInfoEstudios', info.rt_altaInfoEstudios) //ESTO ES LO QUE SUBE EL COLABORADOR
router.post('/rt_altaInfoSalud', info.rt_altaInfoSalud) //ESTO ES LO QUE SUBE EL COLABORADOR
router.post('/rt_cargaMunicipio', info.rt_cargaMunicipio)
router.post('/rt_cargaInfoEstudios', info.rt_cargaInfoEstudios)
router.post('/rt_cargaInfoSalud', info.rt_cargaInfoSalud)
router.post('/rt_cargaInfoHobbies', info.rt_cargaInfoHobbies)
router.post('/rt_info_Principal', info.rt_infoPrincipal)
router.post('/rt_altaInfoPrincipal', info.rt_altaInfoPrincipal)
router.post('/rt_altaHobbies', info.rt_altaInfoHobbies)

//EXTRAS
router.post('/rt_cargarCalendario', extras.rt_cargarCalendario)
router.post('/rt_actualizarFechas', extras.rt_actualizarFechas)
router.post('/rt_eliminarFecha', extras.rt_eliminarFecha)
router.post('/rt_buscarVacaciones', extras.rt_buscarVacaciones)
router.post('/rt_altaVacaciones', extras.rt_altaVacaciones)
router.post('/rt_buscarDias', extras.rt_buscarDias)
router.post('/rt_altaDias', extras.rt_altaDias)





module.exports = router

































// router.route('/rt_productos')
// .get((req, res) => {
//     res.json({status: 'LISTA DE PRODUCTOS', datos: {ruta: 'GET', productos}})
// })
// .post((req, res) => {
//     let producto = req.body
//     let existsId = productos.find(item => item.id === producto.id)
//     let existsName = productos.find(item => item.nombre === producto.nombre)
//     if(existsId == undefined && existsName == undefined){
//         productos.push(producto)
//         res.json({status: 'PRODUCTO AGREGADO', datos: {ruta: 'POST', productos}})
//     }
//     else{
//         res.json({status: 'PRODUCTO EXISTENTE. VERIFICAR EL ID O NOMBRE DEL PRODUCTO', datos: {ruta: 'POST', productos}})
//     }
// })
// .put((req, res) => {
//     let producto = req.body
//     let index = productos.findIndex(item => item.id === producto.id)
//     let existsName = productos.find(item => item.nombre === producto.nombre)
//     let nameIndex = productos.findIndex(item => item.nombre === producto.nombre)
//     if(index != -1){
//         if(nameIndex == index || existsName == undefined){
//             productos.splice(index, 1, producto);
//             res.json({status: 'PRODUCTO ACTUALIZADO', datos: {ruta: 'PUT', productos}})
//         }else{
//             return res.json({status: 'PRODUCTO NO ENCONTRADO O CONTIENE DATOS EXISTENTES', datos: {ruta: 'PUT', productos}})
//         }
//     }
// })
// .delete((req, res) => {
//     let producto = req.body
//     let index = productos.findIndex(item => item.id === producto.id)
//     if(index != -1){
//         productos.splice(index, 1);
//         res.json({status: 'PRODUCTO ELIMINADO', datos: {ruta: 'DELETE', productos}})
//     }else{
//         res.json({status: 'PRODUCTO NO ENCONTRADO', datos: {ruta: 'DELETE', productos}})
//     }
// })

// router.post('/rt_registro_agregar', (req, res) => {
//     res.json({status: 'OK', datos: {ruta: 'POST'}})
// })
// router.put('/rt_registro_editar', (req, res) => {
//     res.json({status: 'OK', datos: {ruta: 'PUT'}})
// })
// router.delete('/rt_registro_eliminar', (req, res) => {
//     res.json({status: 'OK', datos: {ruta: 'DELETE'}})
// })
