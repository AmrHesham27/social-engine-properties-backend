const express = require("express")
const app = express()
const cors = require('cors')
const path = require('path')

require("dotenv").config()
require("../models/dbconnection/dbconnection")

const corsOptions ={
    origin:'https://social-engine-frontend.herokuapp.com', 
    credentials:true,      
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const userRoutes = require("../routes/user.routes")
app.use("/",userRoutes)

// path to get images 
app.get('/images/:id/:ext', async(req,res)=>{
    let id = req.params.id
    let ext = req.params.ext
    let filePath = `../images/${id}.${ext}`
    res.sendFile(path.join(__dirname, filePath))
})

module.exports = app