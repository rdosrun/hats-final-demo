const express = require('express');
const router = express.Router();

// Example API endpoint
router.get('/greeting', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

// API endpoint to handle POST requests
router.post('/echo', (req, res) => {
    const { input } = req.body;
    res.json({ echoedInput: input });
});

module.exports = router;
