const LocalStrategy = require('passport-local').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('./model/user.js');
require('dotenv').config({ path: '../../env.env' });


module.exports = (passport) => {
  // Local Signup Strategy
  passport.use('local-signup', new LocalStrategy(
    { // http://www.passportjs.org/docs/login/ for more info
      usernameField: 'username', // I don't think this field is necessary
      passwordField: 'password', // I don't think this field is necessary
      passReqToCallback: true, // req will be passed as the first argument to the verify callback
    },
    (req, username, password, done) => { // this is the verify callback mentioned above
      // Check to see if there is already a user with provided username
      console.log('Username: ', username, ' Password: ', password);
      return done(null, password);
    },
  ));
  passport.use(new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:3001/api/auth/spotify/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('Spotify accessToken: ', accessToken);
      console.log('Spotify refreshToken: ', refreshToken);
      console.log('Spotify profile: ', profile);


      // User.findOrCreate(
      //   { spotifyId: profile.id },
      //   (err, user) => done(err, user),
      // );
      return done(null, accessToken);
    },
  ));
};
