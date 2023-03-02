const express = require('express');
const app = express();
const session = require("express-session");
// const cookieSession = require("cookie-session");
const store = new session.MemoryStore();
const passport = require("passport");
const login = require("./backend/api/db-login");
const verifyMail = require("./backend/api/verify-email");
const catalogue = require("./backend/api/db-catalogue");
const cart = require("./backend/api/db-cart");
const initializePassport = require("./backend/api/passport-config");
const initializePassportGoogle = require("./backend/api/passport-config-google");
const bcrypt = require('bcrypt');
const corsOptions = require('./backend/config/corsOptions');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const nodemailer = require('nodemailer');
const {v4: uuidv4} = require('uuid');
var randomstring = require("randomstring");

const path = require("path");
const PORT = process.env.PORT || 4000;

var cors = require('cors');
app.use(cors(corsOptions));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}

const bodyParser = require("body-parser");
const { constants } = require('http2');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// app.use(cookieSession({
//     maxAge: 1000 * 60 * 60 * 24,
//     keys: [process.env.COOKIE_KEY]
// }));

initializePassport(passport);
initializePassportGoogle(passport);

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

app.get("/", (req, res) => {
    res.send("Hello!");
});

app.get("/auth/google", passport.authenticate('google', {scope:["profile","https://www.googleapis.com/auth/userinfo.email"]}));

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
})

app.get('/auth/google/callback', 
  passport.authenticate('google', {
    failureRedirect: "https://knitlove.herokuapp.com/login",
    successRedirect: "https://knitlove.herokuapp.com/"
}));

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

app.post("/login", passport.authenticate('local', {
    failureRedirect: "/loginfail"
}), (req, res) => {
    if (req.user && req.user.verified) {
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

app.get("/user", (req, res)=>{
    if (req.user) {
        console.log("in api");
          console.log(req.user.email);
        const user = {
            id: req.user.id,
            firstName: req.user.first_name,
            lastName: req.user.last_name,
            email: req.user.email,
            verified: req.user.verified
        }
        res.status(200).send(user);
    } else {
        console.log('none');
        res.status(200).send();
    }
});

app.delete("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            res.status(500).send();
        }
        res.status(200).send();
    });
});
//     if ()
//     });

app.post("/register", async (req, res) => {
    const { newUser } = req.body;
    console.log("user register:");
    console.log(newUser);
    const verification_token = randomstring.generate();
    newUser.verification_token = verification_token;
    newUser.verified = false;

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

app.get("/catalogue", async (req, res) => {
    const { category } = req.query;
    try {
        const response = await catalogue.getCategory(category);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

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

app.post("/shopcart", async (req, res) => {
    const { userId } = req.body;
    const { productId } = req.body;
    const { quantity } = req.body;
    const productSize = req.body.size;
    console.log(productSize);
    console.log("in api");
    try {
        const response = await cart.addToCart({ userId, productId, quantity, productSize });
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.get("/shopcart", async (req, res) => {
    const { userId } = req.query;
    const userCart = await cart.getCart(userId);
    res.status(200).send(userCart);
});

app.delete("/shopcart", async (req, res) => {
    const { itemInfo } = req.body;
    const response = cart.deleteItem(itemInfo);
    res.status(204).send();
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is now listening at port ${PORT}`);
});


