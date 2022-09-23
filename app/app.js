const express = require("express")
const cors = require('cors')
const path = require('path')
const passport = require('passport');
const helmet = require("helmet");
const cookieSession = require("cookie-session");
require("dotenv").config()

const app = express()

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
app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY_1],
}))

app.use(passport.initialize());
app.use(passport.session())


// path to get images 
app.get('/images/:id/:ext', async(req,res)=>{
    let id = req.params.id
    let ext = req.params.ext
    let filePath = `../images/${id}.${ext}`
    res.sendFile(path.join(__dirname, filePath))
})

module.exports = app