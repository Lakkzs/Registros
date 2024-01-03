
module.exports = {
    logout: async (req,res) => {
        req.sessionID = "";
        req.session.destroy();
        req.sessionStore.destroy()
        res.render('login/login')
    },
}