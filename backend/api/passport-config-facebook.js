const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
const facebook = require("./db-facebook-login");

function initializePassportFacebook(passport) {
  passport.use(new FacebookStrategy({
    clientID: '539946144789992',
    clientSecret: '8b2bbb28bf014d13912ffefc589b0d7c',
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'first_name', 'last_name', 'email']
  },
    async function (accessToken, refreshToken, profile, done) {
      let user;
      try {
        user = await facebook.findUserByFacebookId(profile.id);
        if (!user) {
          const userData = {
            id: profile.id,
            firstName: profile.first_name,
            lastName: profile.last_name,
            email: profile.email
          }
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