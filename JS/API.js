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
      const cards = grouped[sectionName].map(product => `
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
        </div>`).join("");

      html += `
        <div class="product-section mb-5">
          <h3 class="mb-3">${sectionName}</h3>
          <div class="row g-4">${cards}</div>
        </div>`;
    });

    all_products.innerHTML = html;
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
         <button onclick="history.back()" class="btn btn-outline-dark mt-3">
  <i class="fa-solid fa-arrow-left"></i> رجوع للمنتجات
</button>
        </div>
      </div>`;
  } catch (error) {
    console.error(error);
    box.innerHTML = `<p class="text-danger text-center">حصلت مشكلة في تحميل المنتج.</p>`;
  }
}