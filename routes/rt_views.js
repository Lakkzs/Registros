// Todas las peticiones que sean un GET
const express = require('express')
const nodemailer = require("nodemailer");
const router = express.Router()
const inicio = require('../controllers/ctrl_inicio')
const productos = require('../controllers/ctrl_productos')
const login = require('../controllers/ctrl_login')
const landing = require('../controllers/ctrl_landing')

// Inicio
router.get('/', inicio.inicio)
router.get('/landing', landing.landing)

// Productos
router.get('/productos', productos.productos)
router.get('/login', login.login)



module.exports = router