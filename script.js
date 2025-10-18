// script.js (module used by index.html)
// exports ProductService and renders the 6 product cards

export class ProductService {
  #handlePromise = async ({ url = '', method = "GET", body = null } = {}) => {
    const response = await fetch(`https://fakestoreapi.com/products/${url}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`Network error: ${response.status} ${response.statusText} ${text}`);
    }

    return await response.json();
  };

  getProductById = async (id) => {
    return await this.#handlePromise({ url: id });
  };

  getProducts = async () => {
    return await this.#handlePromise({});
  };

  addProduct = async (product = null) => {
    const payload = product ?? {
      title: "new product",
      price: 13.5,
      description: "lorem ipsum set",
      image: "https://i.pravatar.cc",
      category: "electronic",
    };
    return await this.#handlePromise({ method: "POST", body: payload });
  };

  deleteProduct = async (id) => {
    if (id === undefined || id === null) throw new Error('deleteProduct: id is required');
    return await this.#handlePromise({ url: id, method: 'DELETE' });
  };

  updateProduct = async (id, updates = {}) => {
    if (id === undefined || id === null) throw new Error('updateProduct: id is required');
    if (Object.keys(updates).length === 0) throw new Error('updateProduct: updates object is empty');
    return await this.#handlePromise({ url: id, method: 'PUT', body: updates });
  };
}

const productService = new ProductService();

const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

// Build a product card
const createContainer = (item) => {
  const article = document.createElement('article');
  article.className = `flex flex-col rounded-lg border border-gray-200 overflow-hidden bg-white`;
  article.dataset.eventId = item.id;

  // image
  const img = document.createElement('img');
  img.src = item.image;
  img.className = `w-full h-60 object-contain bg-white`;
  img.alt = item.title || 'product image';
  img.loading = 'lazy';
  img.style.cursor = 'pointer';
  // details page
  img.addEventListener('click', () => {
    window.location.href = `product-details.html?productId=${encodeURIComponent(item.id)}`;
  });
  article.appendChild(img);

  // info
  const info = document.createElement('div');
  info.className = 'p-6 flex flex-col flex-grow';

  const header = document.createElement('div');
  header.className = 'mb-3';

  const h3 = document.createElement('h3');
  h3.className = 'text-[#432361] font-semibold text-[16px] leading-none';
  h3.textContent = item.title;

  const meta = document.createElement('div');
  meta.className = 'text-gray-500 text-sm mt-1';
  meta.textContent = item.category ?? '';

  const priceEl = document.createElement('div');
  priceEl.className = 'text-gray-800 font-medium mt-1';
  priceEl.textContent = formatPrice(item.price ?? 0);

  header.appendChild(h3);
  header.appendChild(meta);
  header.appendChild(priceEl);

  const desc = document.createElement('p');
  desc.className = 'text-gray-600 text-sm leading-relaxed mb-6';
  desc.textContent = item.description;

  // actions
  const btnDiv = document.createElement('div');
  btnDiv.className = 'mt-auto';

  const viewBtn = document.createElement('button');
  viewBtn.className = 'inline-flex items-center px-0.5 gap-2 text-[#783EAD] font-medium text-sm hover:outline-none hover:ring-2 hover:ring-[#783EAD]';
  viewBtn.type = 'button';
  viewBtn.dataset.productId = item.id;
  viewBtn.style.cursor = 'pointer';
  viewBtn.innerHTML = `View details
    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17L17 7M7 7h10v10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  // details page
  viewBtn.addEventListener('click', () => {
    window.location.href = `product-details.html?productId=${encodeURIComponent(item.id)}`;
  });

  btnDiv.appendChild(viewBtn);

  info.appendChild(header);
  info.appendChild(desc);
  info.appendChild(btnDiv);
  article.appendChild(info);

  return article;
};

// Render products
const renderProducts = async (selector) => {
  const container = document.querySelector(selector);
  if (!container) return;

  container.innerHTML = '<p class="p-6 text-center text-gray-500">Loading products…</p>';

  try {
    const products = await productService.getProducts();
    const six = Array.isArray(products) ? products.slice(0, 6) : [];

    container.innerHTML = '';
    const frag = document.createDocumentFragment();
    six.forEach(p => frag.appendChild(createContainer(p)));
    container.appendChild(frag);
  } catch (err) {
    console.error('Failed to load products', err);
    container.innerHTML = `<p class="p-6 text-center text-red-500">Failed to load products</p>`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderProducts('#events-container');
});


// (function () {
//   const btn = document.getElementById('mobile-toggle');
//   const menu = document.getElementById('mobile-menu');
//   let open = false;

//   function setState(val) {
//     open = val;
//     btn.setAttribute('aria-expanded', String(val));
//     if (val) {
//       menu.style.maxHeight = menu.scrollHeight + 'px';
//     } else {
//       menu.style.maxHeight = '0';
//     }
//   }

//   btn.addEventListener('click', () => setState(!open));
//   // close on Esc
//   document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape' && open) setState(false);
//   });
// })();