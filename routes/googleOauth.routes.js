const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const router = require('express').Router()
const userModel = require('../models/user.model')

const AUTH_GOOGLE_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}

async function verifyCallback(accessToken, refreshToken, profile, done) {    
    const email = profile._json.email
    await userModel.findOrCreate({ email }, { email, registerType: 'google' }, (err, result) => {
        //console.log(err)
    })
    done(null, profile);
}

passport.use(new Strategy(AUTH_GOOGLE_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})


// routes
router.get('/auth/google', passport.authenticate('google', {
    scope: ['email']
}))

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/home',
    session: true
}), (req, res) => {
    console.log('Google called us back!')
})

router.get('/auth/logout', (req, res) => { 
    req.logout();
    return res.redirect('/')
})

module.exports = {
    path: '',
    router
}