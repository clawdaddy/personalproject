const massive = require('massive');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const { SERVER_PORT,
    DATABASE_CONNECTION 
} = process.env;
//TOP-LEVEL MIDDLEWARE
app.use(bodyParser.json());
massive( DATABASE_CONNECTION ).then( (db) => {
    app.set('db', db)
})





app.listen(SERVER_PORT, () => console.log( `Port ${ SERVER_PORT } is at attention sir!` ) )