// Step 1: Import the express library
const express = require('express');

// Step 2: Create an express app
const app = express();



// Step 3: Choose a port (a number for your server to listen on)
const PORT = process.env.PORT || 4000;


app.use(express.static('public'));


// Step 4: Define what happens when someone visits your site
app.get('/', (req, res) => {
  res.send('✅ Hello Rai! Your first Node + Express server is running.');
});

// New route: send a list of products in JSON format
app.get('/products', (req, res) => {
  const products = [
    { id: 1, name: 'Car Wash', price: 1000 },
    { id: 2, name: 'Engine Oil Change', price: 2500 },
    { id: 3, name: 'Full Service Package', price: 6000 },
  ];
  res.json(products);
});

app.get('/time', (req, res) => {
  res.json({ currentTime: new Date().toLocaleTimeString() });
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
