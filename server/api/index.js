const router = require('express').Router();
const cors = require('cors');
const User = require('../../db/model/user.js');
require('dotenv').config({ path: '../../env.env' });
// const helpers = require('./helpers.js');

const passport = require('passport');/* http://www.passportjs.org/docs */

router.get('/users', (req, res) => {
  User.find().exec((err, users) => {
    res.send({ users });
  });
});
// very simple test to verify router functionality
router.get('/me', (req, res) => {
  console.log('Getting me');
  res.send({});
});
// see https://github.com/jmperez/passport-spotify#readme for passport
// spotify OAuth strategy
router.get(
  '/auth/spotify',
  (req, res, next) => {
    console.log('inside /auth/spotify');
    passport.authenticate('spotify', { showDialog: true })(req, res, next);
  },
  (req, res) => {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  },
);
// spotify OAuth callback for authorization process
router.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('Inside /auth/spotify/callback');
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

// add new user
/* Example POST data
{
  "username": "newuser",
  "password": (hashed via bcrypt)
}
*/
router.post(
  '/signup',
  (req, res, next) => {
    passport.authenticate(
      'local-signup',
      (err, user) => {
        if (err) {
          return next(err);
        }
        console.log('successful passport authenticate: ', user);
        res.send({ user });
        return true;
      },
    )(req, res, next);
  },
);

// var generateRandomString = function(length) {
//   var text = '';
//   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//
//   for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };
//
// var stateKey = 'spotify_auth_state';
// var redirect_uri = 'http://localhost:3001/callback'; // Your redirect uri


// router.get('/login', function(req, res) {
//
//   var state = generateRandomString(16);
//   res.cookie(stateKey, state);
//
//   // your application requests authorization
//   var scope = 'user-read-private user-read-email';
//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: process.env.SPOTIFY_CLIENT_ID,
//       scope: 'user-read-private user-read-email',
//       redirect_uri: 'http://localhost:3001/callback',
//       state: '013747suhqlxJA73'
//     }));
// });


router.get('/callback', (req, res) => {
  console.log('inside of api/callback')
});

module.exports = router;
