const products = [
  {
    id: "p1",
    name: "Everyday Knit",
    category: "Apparel",
    price: 48,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80",
    description:
      "A soft, structured knit made for slow mornings and long city walks.",
    stock: 84,
    moq: 10,
  },
  {
    id: "p2",
    name: "Studio Tote",
    category: "Accessories",
    price: 36,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
    description:
      "A roomy canvas carryall with a considered shape and everyday utility.",
    stock: 31,
    moq: 25,
  },
  {
    id: "p3",
    name: "Cloud Runner",
    category: "Footwear",
    price: 92,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description:
      "Lightweight comfort with a bright, modern silhouette for daily miles.",
    stock: 8,
    moq: 10,
  },
  {
    id: "p4",
    name: "Ceramic Dawn Set",
    category: "Home",
    price: 54,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1572119865084-43c285814d63?auto=format&fit=crop&w=900&q=80",
    description:
      "Hand-finished ceramic pieces that bring a warm ritual to your table.",
    stock: 62,
    moq: 10,
  },
  {
    id: "p5",
    name: "Linen Overshirt",
    category: "Apparel",
    price: 74,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
    description: "Breathable linen tailoring with an easy fit and clean lines.",
    stock: 0,
    moq: 20,
  },
  {
    id: "p6",
    name: "Desk Lamp No. 2",
    category: "Home",
    price: 68,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    description: "A sculptural lamp for focused work and softer evenings.",
    stock: 19,
    moq: 5,
  },
];

const money = (value) => `$${value.toFixed(2)}`;
const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
};
const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));
const getOrders = () => {
  try {
    return JSON.parse(localStorage.getItem("orders") || "[]");
  } catch {
    return [];
  }
};
const productById = (id) => products.find((product) => product.id === id);

function cartItems() {
  return getCart()
    .map((item) => ({ ...item, product: productById(item.id) }))
    .filter((item) => item.product);
}

function cartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

function updateCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach((element) => {
    element.textContent = cartCount();
  });
}

function addToCart(id, quantity = 1) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === id);
  if (item) item.quantity += quantity;
  else cart.push({ id, quantity });
  saveCart(cart);
  updateCartCount();
  showToast("Added to your bag");
}

function removeFromCart(id) {
  saveCart(getCart().filter((item) => item.id !== id));
  renderCart();
  updateCartCount();
}

function changeQuantity(id, quantity) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === id);
  if (!item) return;
  item.quantity = Math.max(1, quantity);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function productCard(product) {
  return `<article class="product-card">
    <div class="product-image-wrap"><a class="product-image" href="/html/public/product-detail.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"></a><span class="stock-badge ${product.stock ? "" : "sold-out"}">${product.stock ? `${product.stock} in stock` : "Out of stock"}</span></div>
    <div class="product-meta"><span>${product.category} / MOQ ${product.moq}</span><span>★ ${product.rating}</span></div>
    <h3><a href="/html/public/product-detail.html?id=${product.id}">${product.name}</a></h3>
    <div class="product-row"><strong>${money(product.price)} <small>/ unit</small></strong><button class="text-button" data-add="${product.id}" ${product.stock ? "" : "disabled"}>Add to bag</button></div>
  </article>`;
}

function renderProducts(list = products, target = "product-grid") {
  const grid = document.getElementById(target);
  if (!grid) return;
  grid.innerHTML = list.length
    ? list.map(productCard).join("")
    : `<p class="empty-state">No pieces match that search.</p>`;
}

function renderShop() {
  const search = document.getElementById("shop-search");
  const category = document.getElementById("category-filter");
  if (!search || !category) {
    renderProducts();
    return;
  }
  const apply = () => {
    const term = search.value.toLowerCase().trim();
    const selected = category.value;
    const inStock = document.getElementById("stock-filter")?.checked;
    const minimumOrder = Number(
      document.getElementById("moq-filter")?.value || 0,
    );
    renderProducts(
      products.filter(
        (product) =>
          (!term || product.name.toLowerCase().includes(term)) &&
          (!selected || product.category === selected) &&
          (!inStock || product.stock > 0) &&
          product.moq >= minimumOrder,
      ),
    );
  };
  search.addEventListener("input", apply);
  category.addEventListener("change", apply);
  document.getElementById("moq-filter")?.addEventListener("change", apply);
  document.getElementById("stock-filter")?.addEventListener("change", apply);
  renderProducts();
}

function renderCart() {
  const target = document.getElementById("cart-items");
  if (!target) return;
  const items = cartItems();
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  target.innerHTML = items.length
    ? items
        .map(
          ({ product, quantity }) => `<div class="cart-item">
    <img src="${product.image}" alt="${product.name}"><div class="cart-item-info"><span>${product.category}</span><h3>${product.name}</h3><strong>${money(product.price)}</strong></div>
    <div class="quantity"><button data-qty="${product.id}" data-change="-1">−</button><span>${quantity}</span><button data-qty="${product.id}" data-change="1">+</button></div>
    <button class="remove-button" data-remove="${product.id}">Remove</button></div>`,
        )
        .join("")
    : `<div class="empty-state"><h2>Your bag is quiet.</h2><p>Find something useful, beautiful, or both.</p><a class="button" href="/html/public/shop.html">Continue shopping</a></div>`;
  document
    .getElementById("cart-subtotal")
    ?.replaceChildren(document.createTextNode(money(subtotal)));
  document
    .getElementById("checkout-link")
    ?.classList.toggle("disabled", !items.length);
  document
    .getElementById("checkout-link")
    ?.toggleAttribute("aria-disabled", !items.length);
  document
    .getElementById("checkout-link")
    ?.addEventListener("click", (event) => {
      if (!items.length) event.preventDefault();
    });
}

function renderDetail() {
  const product =
    productById(new URLSearchParams(location.search).get("id")) || products[0];
  document.getElementById("detail-content").innerHTML =
    `<div><div class="detail-image"><img src="${product.image}" alt="${product.name}"></div><div class="detail-thumbs"><img src="${product.image}" alt="${product.name} alternate view"><img src="${product.image}&sat=-20" alt="${product.name} detail view"></div></div><div class="detail-copy"><span class="eyebrow">${product.category} / ${product.rating} ★</span><h1>${product.name}</h1><p>${product.description}</p><strong class="detail-price">${money(product.price)} <small>/ unit</small></strong><div class="bulk-table"><div><span>10–49 units</span><strong>${money(product.price)}</strong></div><div><span>50–99 units</span><strong>${money(product.price * 0.9)}</strong></div><div><span>100+ units</span><strong>${money(product.price * 0.82)}</strong></div></div><div class="stock-line"><span class="stock-badge">${product.stock ? `${product.stock} units ready to ship` : "Currently unavailable"}</span><span>MOQ: ${product.moq} units</span></div><div class="detail-actions"><input id="detail-quantity" type="number" min="${product.moq}" value="${product.moq}"><button class="button" data-detail-add="${product.id}" ${product.stock ? "" : "disabled"}>Add to bag</button></div><a class="quiet-link" href="/html/public/shop.html">← Back to shop</a></div><section class="specs-panel"><span class="eyebrow">Product notes</span><h2>Made for repeat buying.</h2><div class="specs-grid"><span>Availability<strong>${product.stock ? "In stock" : "Back soon"}</strong></span><span>Category<strong>${product.category}</strong></span><span>Minimum order<strong>${product.moq} units</strong></span></div></section>`;
}

function renderCheckout() {
  const items = cartItems();
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  document.getElementById("checkout-items").innerHTML = items
    .map(
      ({ product, quantity }) =>
        `<div><span>${product.name} × ${quantity}</span><strong>${money(product.price * quantity)}</strong></div>`,
    )
    .join("");
  document.getElementById("checkout-total").textContent = money(subtotal);
  document
    .getElementById("checkout-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      if (!items.length) return;
      const orders = getOrders();
      orders.unshift({
        id: `ORD-${Date.now().toString().slice(-6)}`,
        date: new Date().toLocaleDateString(),
        total: subtotal,
        status: "Processing",
        items,
      });
      localStorage.setItem("orders", JSON.stringify(orders));
      saveCart([]);
      location.href = "/html/user/user-orders.html";
    });
}

function renderOrders() {
  const target = document.getElementById("order-list");
  if (!target) return;
  const orders = getOrders();
  target.innerHTML = orders.length
    ? orders
        .map(
          (order) =>
            `<article class="order-card"><div><span>${order.id}</span><h3>${order.date}</h3></div><div><span>${order.items.length} item(s)</span><strong>${money(order.total)}</strong></div><b>${order.status}</b></article>`,
        )
        .join("")
    : `<div class="empty-state"><h2>No orders yet.</h2><p>Your next favorite thing is probably in the shop.</p><a class="button" href="/html/public/shop.html">Browse collection</a></div>`;
}

document.addEventListener("click", (event) => {
  const add = event.target.closest("[data-add]");
  if (add) addToCart(add.dataset.add);
  const detailAdd = event.target.closest("[data-detail-add]");
  if (detailAdd)
    addToCart(
      detailAdd.dataset.detailAdd,
      Number(document.getElementById("detail-quantity").value) || 1,
    );
  const remove = event.target.closest("[data-remove]");
  if (remove) removeFromCart(remove.dataset.remove);
  const qty = event.target.closest("[data-qty]");
  const cartItem = qty && getCart().find((item) => item.id === qty.dataset.qty);
  if (cartItem)
    changeQuantity(
      qty.dataset.qty,
      cartItem.quantity + Number(qty.dataset.change),
    );
});

updateCartCount();
if (document.getElementById("product-grid")) renderShop();
if (document.getElementById("cart-items")) renderCart();
if (document.getElementById("detail-content")) renderDetail();
if (document.getElementById("checkout-form")) renderCheckout();
if (document.getElementById("order-list")) renderOrders();
