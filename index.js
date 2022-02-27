const app = require('./app/app')

// use this line on your local machine
//const PORT = process.env.PORT || 3000

// use this line for heroku deployment
const PORT = process.env.MONGODB_URI

app.listen(PORT , () => {
    console.log(`your project is running on http://localhost:${PORT}`)
})