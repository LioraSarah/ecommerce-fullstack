const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

function initializePassportGoogle (passport) {
    passport.use(new GoogleStrategy({
        clientID: '504948731334-bkoesvifmjg80dvnka7iccr21hdifum4.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
          done(err, profile);
      }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

module.exports = initializePassportGoogle;