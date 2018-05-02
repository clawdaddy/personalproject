const massive = require('massive');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const bodyParser = require('body-parser');
const loginCtrl = require('./loginCtrl');
const residentCtrl = require('./residentCtrl');
const adlctrl = require('./adlCtrl');
require('dotenv').config();

const app = express();
const { SERVER_PORT,
    DATABASE_CONNECTION,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    SUCCESS_REDIRECT,
    FAILURE_REDIRECT

} = process.env;
//TOP-LEVEL MIDDLEWARE
app.use(express.static(`${__dirname}/../build`))
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
    console.log(profile)    
    const user={
            authzeroid: profile.id,
            firstname: profile._json.given_name,
            lastname: profile._json.family_name,
        }
   done(null, user);
}))


passport.serializeUser( ( user, done ) => {
    done( null, user)
})

//deserialize -- can run through user table and see if the authid is in my user table--
//find user by id
passport.deserializeUser( ( user, done) => {
    //look through database to see if id is there, if it isn't, add it
    let match = null
    app.get('db').get_caregivers().then( result => 
        {
            match = result.find(caregiver => caregiver.authzeroid === user.authzeroid )
        }
    )
    if (match) return done(null, match)
    app.get('db').add_caregiver([user.authzeroid, user.firstname, user.lastname]).then(
        () => done(null, user))
    }
)

// LOGIN ENDPOINTS //

app.get('/login', passport.authenticate('auth0', {
    successRedirect: SUCCESS_REDIRECT, failureRedirect: FAILURE_REDIRECT, failureFlash: true
    })
);

app.get('/checklogin', loginCtrl.checkLoggedIn)
app.get('/logout', (req, res, next ) => {
    req.session.destroy( () => {
    res.sendStatus(200)
    }
)})


// RESIDENT LIST ENDPOINTS //
app.get('/api/facility/:facility', residentCtrl.getFacility)
app.post('/api/group', residentCtrl.getResidents)

// ADL endpoints //
app.get('/api/adllist', adlctrl.getadlSchema)
app.post('/api/postadl', adlctrl.postadl)
app.patch('/api/patchadl', adlctrl.patchadl)
app.delete('/api/deleteadl?:deleteID', adlctrl.deleteadl)

// LOGOUT //
app.delete('/api/logout', loginCtrl.logout)

app.listen(SERVER_PORT, () => console.log( `Port ${ SERVER_PORT } is at attention sir!` ) )