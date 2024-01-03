module.exports = {
    empresas: (req, res) => {
        res.render('altas/alta_Empresas')
    },
    tUsuario: (req, res) => {
        res.render('altas/alta_TUsuario')
    },
    departamentos: (req, res) => {
        res.render('altas/alta_Departamentos')
    },
    perfiles: (req, res) => {
        res.render('altas/alta_Perfiles')
    },
    puestos: (req, res) => {
        res.render('altas/alta_Puestos')
    },
    colaborador: (req, res) => {
        res.render('altas/alta_Colaborador')
    }
}