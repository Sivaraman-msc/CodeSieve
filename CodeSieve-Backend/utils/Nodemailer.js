const nodemailer=require('nodemailer')
require('dotenv').config()

const EMAIL_USER=process.env.EMAIL_USER
const EMAIL_PASS=process.env.EMAIL_PASS

const transport=nodemailer.createTransport({
    secure:true,
    service:'gmail',
    auth:{
        user:EMAIL_USER,
        pass:EMAIL_PASS
    }
})

exports.Sendmail=async(to,sub,msg)=>{
    try{
       const info= await transport.sendMail({
        to,
        subject:sub,
        html:msg
       })
       console.log('Email Sent : ',info.response)
    }catch(err){
        console.log(`Error sending mail ${err}`)
    }
}