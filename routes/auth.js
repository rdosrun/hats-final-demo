const express = require('express');
const passport = require('passport');
const router = express.Router();

//start test area
require('dotenv').config({ path: '.env.dev' });

const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID, // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        authority: process.env.CLOUD_INSTANCE + process.env.TENANT_ID, // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
        clientSecret: process.env.CLIENT_SECRET // Client secret generated from the app registration in Azure portal
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 3,
        }
    }
}

const REDIRECT_URI = process.env.REDIRECT_URI;
const POST_LOGOUT_REDIRECT_URI = process.env.POST_LOGOUT_REDIRECT_URI;
const GRAPH_ME_ENDPOINT = process.env.GRAPH_API_ENDPOINT + "v1.0/me";

module.exports = {
    msalConfig,
    REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI,
    GRAPH_ME_ENDPOINT
};

//test area end

// Microsoft OAuth login route
router.get('/auth/microsoft', passport.authenticate('microsoft', { prompt: 'select_account' }));

// Microsoft OAuth callback route
router.get('/auth/microsoft/callback', passport.authenticate('microsoft', {
    failureRedirect: '/unauthorized'
}), (req, res) => {
    res.redirect('/');
});

// Route for unauthorized users
router.get('/unauthorized', (req, res) => {
    res.status(401).json({ error: 'Unauthorized access' });
});

// Example endpoint that requires Microsoft OAuth login
router.get('/profile', passport.authenticate('microsoft', { session: false }), (req, res) => {
    res.json({ profile: req.user });
});

module.exports = router;
