const LocalStrategy = require("passport-local").Strategy;
const login = require("./db-login");
const bcrypt = require('bcrypt');

function initializePassport (passport) {

    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'} , async function (username, password, done) {
        try {
            //check if user exists in database
            const user = await login.findUserByMail(username);
            const userPass = await bcrypt.compare(password, user.password); //check if passpword match
            if (!user.verified || !user || !userPass) {
                return done(null, false); //if user doesnt exist or his email is not verified or the password doesnt match, dont log in
            }
            return done(null, user); // else, log in the user
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