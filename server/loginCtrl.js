const url = require('url')
module.exports = {
    checkLoggedIn: (req, res, next) => {
        if (req.session.passport.user){
        res.status(200).send(req.session.passport.user)
        } else res.sendStatus(401);
    }
    
}