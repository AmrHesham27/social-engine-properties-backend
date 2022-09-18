const mongoose = require('mongoose')
require("dotenv").config()

const dbConnect = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    .then( () => console.log("DB connection is Successful!!") )
    .catch( (err) => console.log(err) )
}

const dbClose = () => {
    mongoose.disconnect()
}

module.exports = {
    dbConnect, 
    dbClose
}