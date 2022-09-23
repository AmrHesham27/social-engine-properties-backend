/* in this system of routes you do not have to change any files to add routes 
    you just add new file in this folder */

const express = require('express')
const fs = require('fs');

const app = require('../app/app.js')

fs.readdirSync(__dirname).forEach(file => {
    if (file === "index.js") return
    const routerModule = require('./' + file)
    app.use(express.json())
    app.use('/' + routerModule.path, routerModule.router)
})

module.exports = app