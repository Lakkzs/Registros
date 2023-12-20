
module.exports = {
    landing: (req, res) => {
        if(req.session.authenticated){
            res.render('landing/landing')
        }else{
            res.send('Es necesario iniciar sesión para ingresar a este módulo. Diríjase a localhost:3000/login')
        }
    }
}