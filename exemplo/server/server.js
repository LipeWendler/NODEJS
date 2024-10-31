const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: 'Hello from Server!' });
})

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/message`);
})