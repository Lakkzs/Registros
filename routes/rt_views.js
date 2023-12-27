// Todas las peticiones que sean un GET
const express = require('express')
const nodemailer = require("nodemailer");
const router = express.Router()
const inicio = require('../controllers/ctrl_inicio')
const productos = require('../controllers/ctrl_productos')
const login = require('../controllers/ctrl_login')
const landing = require('../controllers/ctrl_landing')
const verificationEmail = require('../controllers/ctrl_verificationemail')
const recuperar = require('../controllers/ctrl_recuperar')
const cms = require('../controllers/ctrl_cms')
const tabla = require('../controllers/ctrl_tabla')
const table = require('../controllers/ctrl_table.js')

// Inicio
router.get('/', inicio.inicio)
router.get('/landing', landing.landing)
router.get('/verificarCorreo', verificationEmail.landing)
router.get('/cms', cms.cms)

// Productos
router.get('/productos', productos.productos)
router.get('/login', login.login)
router.get('/recuperar', recuperar.recuperar)
router.get('/tabla', tabla.tabla)
router.get('/seccion', tabla.seccion)

router.get('/table_data', table.data)


module.exports = router