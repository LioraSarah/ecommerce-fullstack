const nodemailer = require('nodemailer');
const login = require("./db-login");
  
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_VERIFICATION,
        pass: process.env.EMAIL_PASSWORD
    }
});  

//send a verification link to the newely register user
//the link includes his user id and a verification token for later comparison
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

//verify user by comparing the token he sent to the server with the token saved ib db
const verifyUser = async (token, userId) => {
    const id = Number(userId);
    const user = await login.findUserById(id);
    const userToken = user.verification_token;
    if (token === userToken) { //if tokens match, set the user to verified
        await login.setVerified(id);
        return user;
    } else {
        return null;
    }
};

module.exports = { sendVerificationEmail, verifyUser };