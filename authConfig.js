const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/auth/microsoft/callback';
const POST_LOGOUT_REDIRECT_URI = process.env.POST_LOGOUT_REDIRECT_URI || 'http://localhost:3000/';

module.exports = {
    auth: {
        clientId: process.env.MICROSOFT_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 'info',
        },
    },
    REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI,
};
