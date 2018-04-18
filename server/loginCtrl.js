const url = require('url')
module.exports = {
    authenticated : ( req, res, next) => {
        if (req.user){
            next();
        } else {res.sendStatus(401)};
    },
    sendUser : (req, res, next) => {
        
        res.redirect(url.format({
            pathname:'http://localhost:3000/#/dashboard',
            query:req.user.name
        }));
            
    },
    
    
    checkLoggedIn: (req, res, next) => {
        if (req.session.passport.user){
        res.status(200).send(req.session.passport.user)
        } else res.sendStatus(401);
    }
    
}