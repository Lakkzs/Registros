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
const seccion = require('../controllers/ctrl_seccion.js')
const altas = require('../controllers/ctrl_altas.js')
const info = require('../controllers/ctrl_info.js')
const extras = require('../controllers/ctrl_extras.js')

// Inicio
router.get('/', login.login)
router.get('/landing', landing.landing)
router.get('/verificarCorreo', verificationEmail.landing)
router.get('/cms', cms.cms)
// Productos
router.get('/productos', productos.productos)
router.get('/login', login.login)
router.get('/recuperar', recuperar.recuperar)
router.get('/tabla', tabla.tabla)
router.get('/seccion', seccion.seccion)
router.get('/seccion2', seccion.seccion2)
router.get('/table_data', table.data)
//Altas
router.get('/alta_Empresas', altas.empresas)
router.get('/alta_TipoUsuario', altas.tipoUsuario)
router.get('/alta_Departamentos', altas.departamentos)
router.get('/alta_Puestos', altas.puestos)
router.get('/alta_Colaborador', altas.colaborador)
router.get('/alta_Transitorios', altas.transitorios)
router.get('/alta_infoEmpresa', altas.infoEmpresa)
router.get('/info_Estudios', info.infoEstudios)
router.get('/info_Emergencia', info.infoEmergencia)
router.get('/info_Salud', info.infoSalud)
router.get('/info_Adicional', info.infoAdicional)
router.get('/info_Principal', info.infoPrincipal)
//EXTRAS
router.get('/extras_vacaciones', extras.vacaciones)
router.get('/extras_calendario', extras.calendario)

module.exports = router