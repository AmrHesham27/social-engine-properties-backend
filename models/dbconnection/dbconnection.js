const mongoose = require('mongoose')

// use this code to connect to mongo on your machine
/* try{mongoose.connect(process.env.DBURL)}
catch(e){
    console.log(e.message)
} */

// use this code to connect to mongo by heroku
try{ mongoose.connect( process.env.MONGODB_URI, {useNewUrlParser: true}) }
catch(e){ console.error('Error while connecting to DB', e) }