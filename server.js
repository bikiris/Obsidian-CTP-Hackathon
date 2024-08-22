// server.js
const express = require('express');
const app = express();
const port = 8000;


// Serving static files (HTML, CSS, JS)
app.use(express.json());
app.use(express.static('public'));

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Add other headers here
  res.setHeader('Access-Control-Allow-Methods', 'POST'); // Add other methods here
  res.send();
});

// Defining a route for handling client communication
app.post('/api/message', (req, res) => {
    const message = 'Hello Geek. This Message is From Server';
    console.log(req);
    console.log(req.body.message); // undefined
    // req.body = {}
    console.log(message);
    res.json({ message });
});

// Starting the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
