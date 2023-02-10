const LocalStrategy = require("passport-local").Strategy;
const login = require("./db-login");
const bcrypt = require('bcrypt');

function initializePassport (passport) {

    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'} , async function (username, password, done) {
        try {
            const user = await login.findUserByMail(username);
            const userPass = await bcrypt.compare(password, user.password);
            if (!user && !userPass) {
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await login.findUserById(id);
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    });

};

module.exports = initializePassport;