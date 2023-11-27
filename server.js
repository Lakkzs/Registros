const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const port = 3000

//Middlewares (siemrpe antes de llamar a las otras peticiones)
app.use(express.urlencoded(({extended: false})))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'assets/')))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, './views/partials'))

// Rutas
app.use(require('./routes/rt_index'))

app.listen(port, () => {
    console.log('Inicializando el servidor')
})