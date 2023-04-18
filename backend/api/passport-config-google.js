const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const google = require("./db-google-login");

function initializePassportGoogle(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
    async function (req, accessToken, refreshToken, profile, done) {
      let user;
      try {
        //check if user already exists in database
        user = await google.findUserByGoogleId(profile.id);
        if (!user) { // if user doesn't exist - create it in database
          const userData = { //gather all neccessary information from the google registration to save in databse
            id: profile.id,
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            email: profile.emails[0].value,
            userType: 'google'
          }
          await google.createGoogleUser(userData); //create user in database with the information we gathered
          user = userData;
        }
        return done(null, user); //give the user we created to passport library for further actions (login in)
      } catch (err) {
        return done(err, null);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await google.findUserByGoogleId(id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
}

module.exports = initializePassportGoogle;