document.getElementById('loadProductsBtn').addEventListener('click', async () => {
  try {
    const response = await fetch('/products'); // This calls your backend API
    const products = await response.json();

    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // clear old data

    products.forEach(p => {
      const item = document.createElement('div');
      item.className = 'product-item';
      item.innerHTML = `<strong>${p.name}</strong> - Price: Rs.${p.price}`;
      productList.appendChild(item);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});
