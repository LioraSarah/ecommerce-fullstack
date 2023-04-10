const express = require('express');
const registerRouter = express.Router();
const randomstring = require("randomstring");
const bcrypt = require('bcrypt');
const login = require("./db-login");
const verifyMail = require("./verify-email");

registerRouter.post("/", async (req, res) => {
    const { newUser } = req.body;
    console.log("user register:");
    console.log(newUser);
    const verification_token = randomstring.generate();
    newUser.verification_token = verification_token;
    newUser.verified = false;
    newUser.userType = 'local';

    console.log("user token:");
    console.log(newUser.verification_token);

    const password = newUser.password;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.password = hashedPassword;
        const response = await login.createUser(newUser);
        await verifyMail.sendVerificationEmail(verification_token, newUser.email);
        res.status(201).send(response);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = registerRouter;