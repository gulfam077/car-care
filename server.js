// Step 1: Import the express library
const express = require('express');

const mongoose = require('mongoose');


// Step 2: Create an express app
const app = express();



// Step 3: Choose a port (a number for your server to listen on)
const PORT = process.env.PORT || 4000;

mongoose.connect('mongodb+srv://raiadmin:Rai12345@carcare.5mzgoli.mongodb.net/?retryWrites=true&w=majority&appName=CarCare', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully!'))
.catch(err => console.error('❌ MongoDB connection error:', err));

const Product = mongoose.model('Product', {
  name: String,
  price: Number
});

// Allow Express to read form data sent from the browser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add-product route (for form submissions)
app.post('/add-product', async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const product = new Product({ name, price });
    await product.save();
    res.json({ message: '✅ Product added successfully!' });
  } catch (error) {
    console.error('❌ Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});


app.use(express.static('public'));


// --- ADD SAMPLE PRODUCTS ROUTE ---
app.get('/add-sample', async (req, res) => {
  try {
    // First, clear old products (optional)
    await Product.deleteMany({});

    // Add 3 new sample products
    await Product.insertMany([
      { name: 'Car Wash', price: 1000 },
      { name: 'Engine Oil Change', price: 2500 },
      { name: 'Full Service Package', price: 6000 }
    ]);

    res.send('✅ Sample products added successfully!');
  } catch (error) {
    console.error('❌ Error adding sample products:', error);
    res.status(500).send('Something went wrong while adding sample products.');
  }
});


// --- FETCH PRODUCTS ROUTE ---
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // fetch all from MongoDB
    res.json(products); // return JSON to browser
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// --- DELETE PRODUCT ROUTE ---
app.delete('/delete-product/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.json({ message: '🗑 Product deleted successfully!' });
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// --- UPDATE PRODUCT ROUTE ---
app.put('/update-product/:id', async (req, res) => {
  try {
    const { name, price } = req.body;
    const { id } = req.params;

    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price required' });
    }

    await Product.findByIdAndUpdate(id, { name, price });
    res.json({ message: '✏️ Product updated successfully!' });
  } catch (error) {
    console.error('❌ Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

