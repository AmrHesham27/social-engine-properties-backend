const app = require('./app/app')
const dbConnect = require('./models/dbconnection/dbconnection')

dbConnect()

app.listen(process.env.PORT , () => {
    console.log(`your project is running`)
})