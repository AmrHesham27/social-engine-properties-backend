const app = require('./routes/index')
const { dbConnect } = require('./models/dbconnection/dbconnection')

dbConnect()

app.listen(process.env.PORT , () => {
    console.log(`your project is running`)
})
