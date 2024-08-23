const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

// Serving static files (HTML, CSS, JS)
app.use(express.static('public'));


app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Add other headers here
  res.setHeader('Access-Control-Allow-Methods', 'POST'); // Add other methods here
  res.send();
});

// Defining a route for handling client communication
app.post('/api/message', async (req, res) => {
  try {
    const { getAiResponse } = require('./Service/openaiService');
    console.log("received message");
    const message = await getAiResponse(req.body.model, req.body.messages);
    console.log("got response");
    console.log(message);
    res.json( message );
  }catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


// Starting the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
