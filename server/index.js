const massive = require('massive');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const bodyParser = require('body-parser');
const loginCtrl = require('./loginCtrl');
const residentCtrl = require('./residentCtrl');
require('dotenv').config();

const app = express();
const { SERVER_PORT,
    DATABASE_CONNECTION,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL

} = process.env;
//TOP-LEVEL MIDDLEWARE
app.use(bodyParser.json());
massive( DATABASE_CONNECTION ).then( (db) => {
    app.set('db', db)
})

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))
app.use( passport.initialize() )
app.use( passport.session() )

passport.use( new Auth0Strategy ({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function( accessToken, refreshToken, extraParams, profile, done) {
    done(null, profile);
}))

passport.serializeUser( ( user, done ) => {
    done( null, { userID: user.id, email: user._json.email, name:user._json.name})
})

passport.deserializeUser( ( obj, done) => {
    done(null, obj)
})

// LOGIN ENDPOINTS //
app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: '/dashboard', failureRedirect: '/auth', failureFlash: true
    })
);
app.get('/dashboard', loginCtrl.authenticated, loginCtrl.sendUser)

// RESIDENT LIST ENDPOINTS //
app.get('/api/facility', residentCtrl.getFacility)
app.get('/api/residentlist', residentCtrl.getResidents)


app.listen(SERVER_PORT, () => console.log( `Port ${ SERVER_PORT } is at attention sir!` ) )