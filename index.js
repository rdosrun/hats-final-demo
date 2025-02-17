// Import necessary modules
const conf = require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const cors = require('cors');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const pageRoutes = require('./routes/pages');
// Create an instance of an Express app
const app = express();

app.use(cors({
    origin: '*', // Allow all origins
}));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.use('/', authRoutes);
app.use('/', pageRoutes);

// Passport configuration
passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: process.env.MICROSOFT_CALLBACK_URL,
    scope: ['user.read']
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

app.use(passport.initialize());

// Serve static files (e.g., CSS, JavaScript, images) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));



var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'MSAL Node & Express Web App',
        isAuthenticated: req.session.isAuthenticated,
        username: req.session.account?.username,
    });
});

module.exports = router;


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Accessible on the LAN at http://<your-lan-ip>:${PORT}`);
});

