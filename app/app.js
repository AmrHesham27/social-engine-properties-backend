const express = require("express")
const app = require('../routes/index')
const cors = require('cors')
const path = require('path')
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const helmet = require("helmet");
const cookieSession = require("cookie-session");
require("dotenv").config()

const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// security
app.use(helmet());

const AUTH_GOOGLE_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}

function verifyCallback(accessToken, refreshToken, profile, done) {
    done(null, profile);
}

passport.use(new Strategy(AUTH_GOOGLE_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})


app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY_1],
}))

app.use(passport.initialize());
app.use(passport.session())

app.get('/auth/google', passport.authenticate('google', {
    scope: ['email']
}))

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/home',
    session: true
}), (req, res) => {
    console.log('Google called us back!')
})

app.get('/auth/logout', (req, res) => { 
    req.logout();
    return res.redirect('/')
})

// path to get images 
app.get('/images/:id/:ext', async(req,res)=>{
    let id = req.params.id
    let ext = req.params.ext
    let filePath = `../images/${id}.${ext}`
    res.sendFile(path.join(__dirname, filePath))
})

module.exports = app