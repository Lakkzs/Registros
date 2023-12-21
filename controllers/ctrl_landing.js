
module.exports = {
    landing: (req, res) => {
        if(req.session.authenticated){
            console.log(req.session.user.user)
            correo = req.body.txtCorreo;
            usuario = req.session.user.user;
            res.render('landing/landing', { txtCorreo: correo, txtUsuario: usuario })
        }else{
            res.send(`<p> Es necesario iniciar sesión para ingresar a este módulo. Diríjase a <a style="font-weight:bold" href="/login"> localhost:3000/login </a> </p>`)
        }
    }
}