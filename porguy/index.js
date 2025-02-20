const express = require('express');
const router = require('./routes');

const app = express();

// ✅ Add this to parse JSON request bodies
app.use(express.json());

app.use('/api', router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
