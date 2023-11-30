// Peticiones asincronas POST, PUT, DELETE
const express = require('express')
const router = express.Router()
const db = require('../db/db')
const registro = require('../controllers/ctrl_registro')
const login = require('../controllers/ctrl_login')
const email = require('../controllers/ctrl_email')


router.post('/rt_registro', registro.rtRegistro)
//router.post('/rt_login', login.rtLogin)
router.post('/rt_login', login.rtLogin)

router.post('/rt_landing', email.rtEmail)

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
