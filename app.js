let products = [];
const cart = [];

const catalog = document.getElementById('catalog');
const cartCount = document.getElementById('cart-count');
const cartSum = document.getElementById('cart-sum');

function renderProducts() {
  catalog.innerHTML = products.map(p => `
    <div class="card">
      <div class="category">${p.category}</div>
      <h3>${p.title}</h3>
      <div class="price">${Number(p.price).toLocaleString('ru-RU')} ₽</div>
      <button data-id="${p.id}">В корзину</button>
    </div>
  `).join('');
}

function renderCart() {
  cartCount.textContent = cart.length;
  cartSum.textContent = cart
    .reduce((sum, p) => sum + Number(p.price), 0)
    .toLocaleString('ru-RU');
}

catalog.addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') return;
  const product = products.find(p => p.id === Number(e.target.dataset.id));
  cart.push(product);
  renderCart();
});

async function loadProducts() {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) throw new Error('Ошибка сервера: ' + response.status);
    products = await response.json();
    renderProducts();
  } catch (err) {
    catalog.innerHTML = '<p>Не удалось загрузить товары. Запущен ли сервер?</p>';
    console.error(err);
  }
}

loadProducts();
