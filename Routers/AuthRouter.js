const Auth = require('express').Router();
const passport = require('passport');

Auth.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000/');
});

Auth.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

Auth.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000/nutrition/');
})

module.exports = Auth;
