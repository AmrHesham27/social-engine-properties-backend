const nodemailer = require("nodemailer")
const smtpCongfig = {
    service: "gmail",
    auth:{
        user:'socialenginetest123@gmail.com',
        pass:'ig*&wer54'
    }
}
const sendMeEMail = (reciverEmail, EmailContent)=>{
    try{
        const transporter = nodemailer.createTransport(smtpCongfig)
        const myEmailOptions= {
            from:"Social Engine",
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