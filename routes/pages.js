const express = require('express');
const path = require('path');
const router = express.Router();

// Route to serve the home page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/views/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, '../views', `${page}.html`);
    console.log(filePath);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Page not found');
        }
    });
});

module.exports = router;
