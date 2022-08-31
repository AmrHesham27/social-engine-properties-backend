require("dotenv").config()
const nodemailer = require("nodemailer")
const smtpCongfig = {
    host: "smtp.sendgrid.net",
    port: process.env.ENV == 'production' ? "465" : "587",
    auth:{
        user:'apikey',
        pass: process.env.SENDGRID_PASSWORD
    }
}
const sendMeEMail = (reciverEmail, EmailContent)=>{
    try{
        const transporter = nodemailer.createTransport(smtpCongfig)
        const myEmailOptions= {
            from:"eng.amrhesham.22@gmail.com",
            to: reciverEmail,
            subject:"Activation Email",
            html:EmailContent
        }
        transporter.sendMail(myEmailOptions)
    }
    catch(e){
        console.log(e.message)
    }
}
module.exports = sendMeEMail