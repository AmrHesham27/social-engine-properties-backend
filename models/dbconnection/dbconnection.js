const mongoose = require('mongoose')

// use this code to connect to mongo on your machine
/* try{mongoose.connect(process.env.DBURL)}
catch(e){
    console.log(e.message)
} */

// use this code to connect to mongo by heroku
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4 // Use IPv4, skip trying IPv6
  };
mongoose.connect( process.env.MONGODB_URI, options ) 