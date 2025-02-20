const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
    res.send("Hello world");
});

router.post('/test', (req, res) => {
    const { username } = req.body;
    res.send(`Hello ${username}`);
});

module.exports = router;
