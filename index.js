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

app.use('/api', apiRoutes);
app.use('/', authRoutes);
app.use('/', pageRoutes);
// Create an instance of an Express app
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: '*', // Allow all origins
}));

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
/*
// Route for unauthorized users
app.get('/unauthorized', (req, res) => {
    res.status(401).json({ error: 'Unauthorized access' });
});

// Microsoft OAuth login route
app.get('/auth/microsoft', passport.authenticate('microsoft'));

// Microsoft OAuth callback route
app.get('/auth/microsoft/callback', passport.authenticate('microsoft', {
    failureRedirect: '/unauthorized'
}), (req, res) => {
    res.redirect('/');
});

// Example endpoint that requires Microsoft OAuth login
app.get('/profile', passport.authenticate('microsoft'), (req, res) => {
    res.json({ profile: req.user });
});

// Handle 404 errors for unrecognized routes
app.use((req, res) => {
    res.status(404).send('Page not found');
});*/



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Accessible on the LAN at http://<your-lan-ip>:${PORT}`);
});

