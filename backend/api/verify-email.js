const nodemailer = require('nodemailer');
const login = require("./db-login");
  
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_VERIFICATION,
        pass: process.env.EMAIL_PASSWORD
    }
});  

const sendVerificationEmail = async (token, email) => {

    const user = await login.findUserByMail(email);

    const mailConfigurations = {
  
        from: process.env.EMAIL_VERIFICATION,
      
        to: email,
      
        // Subject of Email
        subject: 'Knit Love Email Verification',
          
        text: `Hi there! You have recently visited 
               our website and entered your email.
               Please follow the given link to verify your email
               https://knitlove.herokuapp.com/verify/${user.id}/${token} 
               Thank you.`
          
    };

    transporter.sendMail(mailConfigurations, function(error, info){
        if (error) {
        console.log("error in sendmail");
        console.log(error);
        throw new Error(error);
    }
        console.log('Email Sent Successfully');
        console.log(info);
    });
};

const verifyUser = async (token, userId) => {
    const id = Number(userId);
    const user = await login.findUserById(id);
    const userToken = user.verification_token;
    if (token === userToken) {
        await login.setVerified(id);
        return user;
    } else {
        return null;
    }
};

module.exports = { sendVerificationEmail, verifyUser };