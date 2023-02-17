const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

function initializePassportGoogle (passport) {
    passport.use(new GoogleStrategy({
        clientID: '504948731334-bkoesvifmjg80dvnka7iccr21hdifum4.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "/auth/google/callback"
      },
      function (req, accessToken, refreshToken, profile, done) {
        console.log("profile:");
        console.log(profile);
        // const userData = {
        //   id: profile.id,
        //   email: profile.emails[0],
        //   firstname: profile.name.givenName,
        //   lastname: profile.name.familyName,
        //   picture: profile.photos[0],
        //   authType: 'oauth'
        // }
        // req._user = userData;
        return done(null, profile);
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