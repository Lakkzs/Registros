
module.exports = {
    landing: (req, res) => {
        if(req.session.authenticated){
            res.render('landing/landing')
        }else{
            res.render('login/login')
        }
    }
}