const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

// Serving static files (HTML, CSS, JS)
app.use(express.static('public'));

app.use('/api/response', require('./Router/openaiRouter'));

// Defining a route for handling client communication
app.get('/api/message', (req, res) => {
    const message = 'Hello Geek. This Message is From Server';
    console.log(message);
    res.json({ message });
});


// Starting the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
