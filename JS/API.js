const API_URL = "https://schoolhub-api-production-1dfc.up.railway.app";

async function showProducts(storeId) {
  const all_products = document.getElementById("all_products");
  if (!all_products) return;

  try {
    const result = await fetch(`${API_URL}/products?storeId=${storeId}`);
    const data = await result.json();

    // فلترة احتياطية لو الـ API مش بيفلتر من نفسه
    const products = data.filter(p => p.storeId == storeId);

    // تجميع المنتجات حسب اسم القسم
    const grouped = {};
    products.forEach((product) => {
      if (!grouped[product.section]) grouped[product.section] = [];
      grouped[product.section].push(product);
    });

    let html = "";

   Object.keys(grouped).forEach((sectionName) => {
  let cards = grouped[sectionName].map(product => `
    <div class="col-12 col-md-6 col-lg-3 for-space">
      <a href="products-details.html?id=${product.id}" class="product-link">
        <div class="product">
          <div class="img-prod">
            <img src="${product.image}" class="w-100" alt="${product.name}">
          </div>
          <div class="mt-3 px-2">
            <h6 class="text-success">${product.price} EGP</h6>
            <h6>${product.name.substring(0, 40)}</h6>
          </div>
          <i class="fa-regular fa-star star-num">
            <span class="num">${product.rating?.rate ?? "—"}</span>
          </i>
        </div>
      </a>
      <button class="btn btn-success w-100 mt-2 buy-btn" data-id="${product.id}">
        <i class="fa-solid fa-cart-shopping"></i> Buy Now
      </button>
    </div>`).join('');

  html += `
    <div class="product-section mb-5">
      <h3 class="mb-3">${sectionName}</h3>
      <div class="row g-4">${cards}</div>
    </div>`;
});

all_products.innerHTML = html;

// ⬇️ ضيف السطر ده بعد ما تحط الـ html في الصفحة
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    buyProduct(btn.dataset.id);
  });
});
  } catch (error) {
    console.error(error);
    all_products.innerHTML =
      `<p class="text-danger text-center">حصلت مشكلة في تحميل المنتجات، حاول تاني.</p>`;
  }
}
async function showProductDetails() {
  const box = document.getElementById("product_details");
  if (!box) return;

  // نجيب الـ id من الرابط: products-details.html?id=1
  const id = new URLSearchParams(window.location.search).get("id");

  if (!id) {
    box.innerHTML = `<p class="text-danger text-center">المنتج غير موجود</p>`;
    return;
  }

  try {
    const result = await fetch(`${API_URL}/products/${id}`);
    const p = await result.json();

    box.innerHTML = `
  <div class="row g-4 align-items-center">
    <div class="col-12 col-md-6">
      <img src="${p.image}" class="w-100 rounded" alt="${p.name}">
    </div>
    <div class="col-12 col-md-6">
      <span class="badge bg-secondary mb-2">${p.section}</span>
      <h2>${p.name}</h2>
      <p class="text-muted">${p.description}</p>
      <h4 class="text-success">${p.price} EGP</h4>
      <p>
        <i class="fa-solid fa-star text-warning"></i>
        ${p.rating?.rate ?? "—"}
        <small class="text-muted">(${p.rating?.count ?? 0} تقييم)</small>
      </p>
      <div class="d-flex gap-2 mt-3">
        <button onclick="history.back()" class="btn btn-outline-dark">
          <i class="fa-solid fa-arrow-left"></i> رجوع للمنتجات
        </button>
        <button class="btn btn-success buy-btn" data-id="${p.id}">
          <i class="fa-solid fa-cart-shopping"></i> Buy Now
        </button>
      </div>
    </div>
  </div>`;

// ⬇️ ضيف السطر ده بعد الـ innerHTML مباشرة
document.querySelector('.buy-btn').addEventListener('click', () => {
  buyProduct(p.id);
});
  } catch (error) {
    console.error(error);
    box.innerHTML = `<p class="text-danger text-center">حصلت مشكلة في تحميل المنتج.</p>`;
  }
}
// ============ Cart Logic ============
function buyProduct(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id == id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: id, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showToast('تمت إضافة المنتج إلى السلة ✅');
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cartCount');
  if (badge) badge.textContent = totalQty;
}

function showToast(message) {
  let toast = document.createElement('div');
  toast.className = 'buy-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// يشتغل في أي صفحة فيها الزرار العائم// ============ Cart Page Logic ============
async function renderCart() {
  const cartBox = document.getElementById("cart_items");
  const emptyMsg = document.getElementById("empty_cart");
  const summaryBox = document.getElementById("cart_summary");
  if (!cartBox) return;

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartBox.innerHTML = "";
    if (summaryBox) summaryBox.style.display = "none";
    if (emptyMsg) emptyMsg.style.display = "block";
    return;
  }

  if (emptyMsg) emptyMsg.style.display = "none";

  try {
    // نجيب كل المنتجات مرة واحدة ونفلتر اللي في السلة
    const result = await fetch(`${API_URL}/products`);
    const allProducts = await result.json();

    let html = "";
    let total = 0;

    cart.forEach(item => {
      const product = allProducts.find(p => p.id == item.id);
      if (!product) return;

      const lineTotal = product.price * item.qty;
      total += lineTotal;

      html += `
        <div class="cart-item d-flex align-items-center gap-3 p-3 mb-3 border rounded" data-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" class="cart-item-img">
          <div class="flex-grow-1">
            <h6 class="mb-1">${product.name}</h6>
            <p class="text-success mb-1">${product.price} EGP</p>
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-sm btn-outline-secondary qty-btn" data-action="decrease">-</button>
              <span class="qty-num">${item.qty}</span>
              <button class="btn btn-sm btn-outline-secondary qty-btn" data-action="increase">+</button>
            </div>
          </div>
          <div class="text-end">
            <p class="fw-bold mb-2 line-total">${lineTotal.toFixed(2)} EGP</p>
            <button class="btn btn-sm btn-outline-danger remove-btn">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>`;
    });

    cartBox.innerHTML = html;

    if (summaryBox) {
      summaryBox.style.display = "block";
      document.getElementById("cart_total").textContent = total.toFixed(2) + " EGP";
    }

    attachCartEvents(allProducts);

  } catch (error) {
    console.error(error);
    cartBox.innerHTML = `<p class="text-danger text-center">حصلت مشكلة في تحميل السلة.</p>`;
  }
}

function attachCartEvents(allProducts) {
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const itemBox = btn.closest('.cart-item');
      const id = itemBox.dataset.id;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const item = cart.find(i => i.id == id);

      if (btn.dataset.action === 'increase') {
        item.qty += 1;
      } else {
        item.qty -= 1;
        if (item.qty <= 0) {
          cart = cart.filter(i => i.id != id);
        }
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      renderCart(); // نعيد الرسم عشان الإجمالي يتحدث
    });
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const itemBox = btn.closest('.cart-item');
      const id = itemBox.dataset.id;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart = cart.filter(i => i.id != id);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      renderCart();
    });
  });
}


// ============ Floating Cart (Fixed Position) ============
function injectFloatingCart() {
  if (document.getElementById('floatingCart')) return;
  if (document.getElementById('cart_items')) return; // متظهرش في صفحة السلة نفسها

  const cartHTML = `
    <a href="cart.html" id="floatingCart" class="floating-cart">
      <i class="fa-solid fa-cart-shopping"></i>
      <span id="cartCount" class="cart-badge">0</span>
    </a>`;

  document.body.insertAdjacentHTML('beforeend', cartHTML);
}

document.addEventListener('DOMContentLoaded', () => {
  injectFloatingCart();
  updateCartCount();
});