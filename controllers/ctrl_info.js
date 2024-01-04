module.exports = {
    info: (req, res) => {
        res.render('info/info')
    },
    infoAdicional: (req, res) => {
        res.render('infoColaborador/info_Adicional')
    },
    infoEmpresa: (req, res) => {
        res.render('infoColaborador/info_Empresa')
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