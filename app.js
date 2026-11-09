const products = [
    { id: 1, title: 'Ноутбук 15"',       category: 'Компьютеры', price: 85000 },
    { id: 2, title: 'Монитор 27"',       category: 'Компьютеры', price: 28000 },
    { id: 3, title: 'Клавиатура',        category: 'Аксессуары', price: 6500 },
    { id: 4, title: 'Мышь беспроводная', category: 'Аксессуары', price: 2500 },
    { id: 5, title: 'Коврик', category: 'Аксессуары', price: 1150 },
    { id: 6, title: 'Микрофон', category: 'Аксессуары', price: 5000 },
    { id: 7, title: 'Наушники беспроводные', category: 'Аксессуары', price: 67000 },
    { id: 8, title: 'Видеокарта RTX 5090 TI', category: 'Компьютерь', price: 1760000 },
    { id: 9, title: 'SSD M.2 ADATA 960', category: 'Компьютерь', price: 21000 }
  ];
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
  
  renderProducts();
const clearCartBtn = document.getElementById('clear-cart-btn');

clearCartBtn.addEventListener('click', () => {
  cart.length = 0; 
  renderCart();    
});
const cartItemsContainer = document.getElementById('cart-items');

function renderCart() {
  cartCount.textContent = cart.length;
  cartSum.textContent = cart
    .reduce((sum, p) => sum + Number(p.price), 0)
    .toLocaleString('ru-RU');


  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
    return;
  }
 
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span>${item.title} (${item.category})</span>
      <strong>${Number(item.price).toLocaleString('ru-RU')} ₽</strong>
    </div>
  `).join('');
}

