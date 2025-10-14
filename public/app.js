// Handle add-product form
const form = document.getElementById('productForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const price = document.getElementById('price').value.trim();

  if (!name || !price) return alert('Please enter both fields.');

  try {
    const res = await fetch('/add-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price })
    });

    const data = await res.json();
    alert(data.message || 'Product added!');
    form.reset();
    loadProducts(); // refresh list
  } catch (err) {
    console.error(err);
    alert('Error adding product.');
  }
});

// Load-products button
document.getElementById('loadProductsBtn').addEventListener('click', loadProducts);

async function loadProducts() {
  try {
    const res = await fetch('/products');
    const products = await res.json();

    const list = document.getElementById('productList');
    list.innerHTML = '';

    products.forEach(p => {
      const item = document.createElement('div');
      item.innerHTML = `<strong>${p.name}</strong> — Rs.${p.price}`;
      list.appendChild(item);
    });
  } catch (err) {
    console.error('Error fetching products:', err);
  }
}
