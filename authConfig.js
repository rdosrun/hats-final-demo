const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/auth/microsoft/callback';
const POST_LOGOUT_REDIRECT_URI = process.env.POST_LOGOUT_REDIRECT_URI || 'http://localhost:3000/';

module.exports = {
    
    auth: {
        clientId: '95e880e8-e54d-4d01-a26c-052cff7e9592',
        authority: 'https://login.microsoftonline.com/6ba30675-1170-422f-89c3-0a43af4a4534',
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
