const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const google = require("./db-google-login");

function initializePassportGoogle(passport) {
  passport.use(new GoogleStrategy({
    clientID: '504948731334-bkoesvifmjg80dvnka7iccr21hdifum4.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "/auth/google/callback"
  },
    async function (req, accessToken, refreshToken, profile, done) {
      let user;
      console.log("profile mail:");
      console.log(profile.emails);
      try {
        user = await google.findUserByGoogleId(profile.id);
        if (!user) {
          const userData = {
            id: profile.id,
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            email: ''
          }
          await google.createGoogleUser(userData);
          user = userData;
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
      const user = await google.findUserByGoogleId(id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
}

module.exports = initializePassportGoogle;