
module.exports = {
    landing: (req, res) => {
        if(req.session.authenticated){
            res.render('landing/landing')
        }else{
            res.send(`<p> Es necesario iniciar sesión para ingresar a este módulo. Diríjase a <a style="font-weight:bold" href="/login"> localhost:3000/login </a> </p>`)
        }
    }
}