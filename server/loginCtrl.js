const url = require('url')
module.exports = {
    checkLoggedIn: (req, res, next) => {
        console.log(req.session.id)
        if (req.session.passport.user){
        res.status(200).send(req.session.passport.user)
        } else res.sendStatus(401);
    },
    logout: (req, res, next) => {
        console.log( 'session id: ',req.session.id)
        req.session.destroy()
        res.sendStatus(200);
    }
    
}