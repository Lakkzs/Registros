
module.exports = {
    logout: async (req,res) => {
        req.sessionID == '';
        req.session.destroy();
        console.log(req)
        res.redirect('/login');
    },
}