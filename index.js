// Import necessary modules
const conf = require('dotenv').config();
const express = require('express');
const path = require('path');
const passport = require('passport');
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const cors = require('cors');

// Create an instance of an Express app
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());
let corsOptions = {
    origin: [ 'http://localhost:5500', 'http://localhost:3000', ' https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fmicrosoft%2Fcallback&scope=user.read&client_id=9be46b90-c89c-4753-8866-164131358ba6' ]
};

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

// Route to serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/views/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'views', `${page}.html`);
    console.log(filePath);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Page not found');
        }
    });
});

// Example API endpoint
app.get('/api/greeting', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

// API endpoint to handle POST requests
app.post('/api/echo', (req, res) => {
    const { input } = req.body;
    res.json({ echoedInput: input });
});

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
app.get('/profile', passport.authenticate('microsoft', { session: false }),cors(corsOptions), (req, res) => {
    res.json({ profile: req.user });
});

// Handle 404 errors for unrecognized routes
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Accessible on the LAN at http://<your-lan-ip>:${PORT}`);
});

