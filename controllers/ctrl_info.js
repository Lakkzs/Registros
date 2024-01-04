const db = require('../db/db')
module.exports = {
    info: (req, res) => {
        res.render('info/info')
    },
    infoAdicional: (req, res) => {
        res.render('infoColaborador/info_Adicional')
    },
    infoEstudios: (req, res) => {
        res.render('infoColaborador/info_Estudios')
    },
    infoEmergencia: (req, res) => {
        res.render('infoColaborador/info_Emergencia')
    },
    infoSalud: (req, res) => {
        res.render('infoColaborador/info_Salud')
    },
}