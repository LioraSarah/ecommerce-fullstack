const express = require('express');
const app = express();
const session = require("express-session");
// const cookieSession = require("cookie-session");
const store = new session.MemoryStore();
const passport = require("passport");
const login = require("./backend/api/db-login");
const catalogue = require("./backend/api/db-catalogue");
const cart = require("./backend/api/db-cart");
const initializePassport = require("./backend/api/passport-config");
const bcrypt = require('bcrypt');
const corsOptions = require('./backend/config/corsOptions');
const cookieParser = require('cookie-parser');

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

// app.use(cookieSession({
//     maxAge: 1000 * 60 * 60 * 24,
//     keys: [process.env.COOKIE_KEY]
// }));

initializePassport(passport);

app.use(
    session({
        secret: process.env.SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            secure: true,
        },
        resave: false,
        saveUninitialized: false,
        store
    })
);

app.use(cookieParser(process.env.SECRET));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("Hello!");
});

app.get("/login", (req, res) => {
    res.send("Oh no!");
});

app.post("/login", passport.authenticate('local', {
    failureRedirect: "/login"
}), (req, res) => {
    const user = {
        id: req.user.id,
        firstName: req.user.first_name,
        lastName: req.user.last_name,
        email: req.user.email
    }
    res.status(200).send(user);
});

app.get("/user", (res,req)=>{
    let user = null;
    if (req.user) {
        user = {
            id: req.user.id,
            firstName: req.user.first_name,
            lastName: req.user.last_name,
            email: req.user.email
        }
    };
    res.status(200).send(user);
})

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
    const password = newUser.password;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.password = hashedPassword;
        const response = await login.createUser(newUser);
        res.status(201).send();
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

app.post("/cart", async (req, res) => {
    const { userId } = req.body;
    const { productId } = req.body;
    const { quantity } = req.body;
    try {
        const response = await cart.addToCart({ userId, productId, quantity });
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.get("/cart", async (req, res) => {
    const { userId } = req.query;
    const userCart = await cart.getCart(userId);
    res.status(200).send(userCart);
});

app.delete("/cart", async (req, res) => {
    const { itemInfo } = req.body;
    const response = cart.deleteItem(itemInfo);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is now listening at port ${PORT}`);
});


