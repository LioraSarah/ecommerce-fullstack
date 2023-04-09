const express = require('express');
const app = express();
const session = require("express-session");
const passport = require("passport");
const verifyMail = require("./backend/api/verify-email");
const catalogue = require("./backend/api/db-catalogue");
const initializePassport = require("./backend/api/passport-config");
const initializePassportGoogle = require("./backend/api/passport-config-google");
const initializePassportFacebook = require("./backend/api/passport-config-facebook");
const corsOptions = require('./backend/config/corsOptions');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cartRouter = require("./backend/api/cart-router");
const catalogueRouter = require("./backend/api/catalogue-router");
const registerRouter = require("./backend/api/register-router");

const path = require("path");
const PORT = process.env.PORT || 4000;

var cors = require('cors');
app.use(cors(corsOptions));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//routers (need improve, in progress)
app.use('/shopcart', cartRouter);
app.use('/catalogue', catalogueRouter);
app.use("/register", registerRouter)

//passport initialization
initializePassport(passport);
initializePassportGoogle(passport);
initializePassportFacebook(passport);

//session init
app.use(
    session({
        secret: 'sessionsecret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(cookieParser('sessionsecret'));

app.use(passport.initialize());
app.use(passport.session());

//passport-google
app.get("/auth/google", passport.authenticate('google', {scope:["profile","https://www.googleapis.com/auth/userinfo.email"], prompt: 'select_account'}));

app.get("/loginfail", (req, res) => {
    res.status(400).send();
});

app.get("/logingoogle", (req, res)=> {
    if (req.user) {
        const user = {
            id: req.user.id,
            firstName: req.user.first_name,
            lastName: req.user.last_name,
            email: req.user.email
        }
        res.status(200).send(user);
    } else {
        res.status(400).send();
    }
});

app.get('/auth/google/callback', 
  passport.authenticate('google', {
    failureRedirect: "https://knitlove.herokuapp.com/login",
    successRedirect: "https://knitlove.herokuapp.com/"
}));

//passport-facebook
app.get("/auth/facebook", passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', {
    failureRedirect: "https://knitlove.herokuapp.com/login",
    successRedirect: "https://knitlove.herokuapp.com/"
}));

//user email verification
app.get("/verify/user/:id/:token", async (req, res) => {
    const id = req.params.id;
    const token = req.params.token;
    console.log("request params:");
    console.log(req.params);
    const verifiedUser = await verifyMail.verifyUser(token, id);
    if (verifiedUser) {
        res.status(200).send(true);
    } else {
        res.status(200).send(false);
    }
});

//passport local login
app.post("/login", passport.authenticate('local', {
    failureRedirect: "/loginfail"
}), (req, res) => {
    console.log(req.user);
    if (req.user && req.user.verified) {
        const user = {
            id: req.user.id,
            firstName: req.user.first_name,
            lastName: req.user.last_name,
            email: req.user.email,
            verified: req.user.verified
        }
        res.status(200).send(user);
    } else if (req.user) {
        res.status(400).send(req.user.verified);
    } else {
        res.status(500).send();
    }
});

//get user info from current session
app.get("/user", (req, res)=>{
    console.log(req.user);
    if (req.user) {
        console.log("in api");
          console.log(req.user.email);
        const user = {
            id: req.user.id,
            firstName: req.user.first_name,
            lastName: req.user.last_name,
            email: req.user.email,
            verified: req.user.verified,
            userType: req.user.user_type
        }
        res.status(200).send(user);
    } else {
        console.log('none');
        res.status(200).send();
    }
});

//passport logout
app.delete("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            res.status(500).send();
        }
        res.status(200).send();
    });
});

//get current product info
app.get("/product", async (req, res) => {
    const { productId } = req.query;
    try {
        const response = await catalogue.getItem(productId);
        console.log(response)
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

//catch all other routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is now listening at port ${PORT}`);
});
