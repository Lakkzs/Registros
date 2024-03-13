const express = require('express');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const app = express();
const path = require('path');
const hbs = require('hbs');
const port = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Ruta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre del archivo
    }
});
const upload = multer({ storage: storage });

//Middlewares
app.use(express.urlencoded(({extended: false})))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'assets/')))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, './views/partials'))
app.use(session({
    secret: 'some secret',
    cookie: {maxAge: 30000},
    saveUninitialized: false,
    resave: true,
}))

// Rutas
app.use(require('./routes/rt_index'))

app.post('/altaDocumentos', upload.array('file'), (req, res) => {
    const files = req.files;
    const identifiers = [];

    files.forEach(file => {
        const identifier = file.filename;
        identifiers.push(identifier);
    });

    res.json({ identifiers: identifiers });

    //res.send('Documento(s) subido(s) correctamente');
});

app.listen(port, () => {
    console.log('Inicializando el servidor')
})