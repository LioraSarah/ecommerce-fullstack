const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
const facebook = require("./db-facebook-login");

function initializePassportFacebook(passport) {
  passport.use(new FacebookStrategy({
    clientID: '539946144789992',
    clientSecret: '8b2bbb28bf014d13912ffefc589b0d7c',
    callbackURL: "https://knitlove.herokuapp.com/auth/facebook/callback",
    profileFields: ['id', 'first_name', 'last_name', 'email'],
    auth_type: "reauthenticate"
  },
    async function (accessToken, refreshToken, profile, done) {
      let user;
      console.log("in faceboog strategy");
      console.log(profile);
      try {
        user = await facebook.findUserByFacebookId(profile.id);
        if (!user) {
          const userData = {
            id: profile.id,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails[0].value
          }
          console.log("in faceboog strategy user");
          console.log(userData);
          await facebook.createFacebookUser(userData);
          user = userData;
          console.log("in initial facebook");
          console.log(user.email);
        }
        return done(null, user);
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
      const user = await facebook.findUserByFacebookId(id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
}

module.exports = initializePassportFacebook;