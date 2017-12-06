const router = require('express').Router();
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
  passport.authenticate(
    'spotify',
    {
      scope: ['user-read-email', 'user-read-private', 'user-follow-read'],
      showDialog: true,
      successRedirect: '/',
      failureRedirect: '/login',
    },
  ),
);
// spotify OAuth callback for authorization process
router.get(
  '/auth/spotify/callback',
  passport.authenticate(
    'spotify',
    {
      scope: [
        'user-read-email',
        'user-read-private',
        'user-follow-read',
        'user-modify-playback-state',
        'user-read-playback-state',
        'playlist-modify-public',
        'playlist-modify-private',
      ],
      showDialog: true,
      failureRedirect: '/login',
      // successRedirect: '/',
    },
  ),
  (req, res) => {
    // req.user contains the data sent back from db/passport.js SpotifyStrategy
    // console.log('Inside /auth/spotify/callback: ', req.user);
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');
  },
);

module.exports = router;
