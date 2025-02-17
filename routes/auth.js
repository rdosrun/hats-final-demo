const express = require('express');
const passport = require('passport');
const router = express.Router();

// Microsoft OAuth login route
router.get('/auth/microsoft', passport.authenticate('microsoft'));

// Microsoft OAuth callback route
router.get('/auth/microsoft/callback', passport.authenticate('microsoft', {
    failureRedirect: '/unauthorized'
}), (req, res) => {
    res.redirect('/');
});

// Example endpoint that requires Microsoft OAuth login
router.get('/profile', passport.authenticate('microsoft'), (req, res) => {
    res.json({ profile: req.user });
});

module.exports = router;
