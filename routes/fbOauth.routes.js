const passport = require('passport');
const { Strategy } = require('passport-facebook');
const router = require('express').Router()
const userModel = require('../models/user.model')

const AUTH_FACEBOOK_OPTIONS = {
    callbackURL: '/auth/facebook/callback',
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    profileFields: ['emails']
}

async function verifyCallback(accessToken, refreshToken, profile, done) {    
    const email = profile._json.email
    
    let isAgent = await userModel.find({email, userType: 'agent'})
    if (isAgent.length) {
        console.log(isAgent)
        done(new Error('Agents can not sign in with social media accounts'), null)
    }
    else {
        await userModel.findOrCreate({ email }, { 
            email, 
            registerType: 'facebook', 
            userType: 'client', 
            activated: true 
        }, 
        (err, result) => {})
        done(null, profile);
    }
}

passport.use(new Strategy(AUTH_FACEBOOK_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})


// routes
router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
}))

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/failure',
    successRedirect: '/home',
    session: true
}), (req, res) => {
    console.log('FACEBOOK called us back!')
})

module.exports = {
    path: '',
    router
}