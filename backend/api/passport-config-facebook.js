const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
const facebook = require("./db-facebook-login");

function initializePassportFacebook(passport) {
  passport.use(new FacebookStrategy({
    clientID: '539946144789992',
    clientSecret: '8b2bbb28bf014d13912ffefc589b0d7c',
    callbackURL: "https://knitlove.herokuapp.com/auth/facebook/callback",
    profileFields: ['id', 'first_name', 'last_name', 'email']
  },
    async function (accessToken, refreshToken, profile, done) {
      let user;
      try {
        //check if user already exists in database
        user = await facebook.findUserByFacebookId(profile.id);
        if (!user) { // if user doesn't exist - create it in database
          const userData = { //gather all neccessary information from the facebook registration to save in databse
            id: profile.id,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            userType: 'facebook'
          }
          if (profile.emails) { //if the user has provided email information to facebook, add it to the user details above
            userData.email = profile.emails[0].value;
          } else { //otherwise, set a default value to the email information
            userData.email = 'Not Provided';
          }
          await facebook.createFacebookUser(userData); //create user in database with the information we gathered
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
      const user = await facebook.findUserByFacebookId(id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
}

module.exports = initializePassportFacebook;