import { ProductService } from './script.js';

const svc = new ProductService();
const params = new URLSearchParams(window.location.search);
const idParam = params.get('productId');

const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const showLoading = () => {
  const main = document.querySelector('main');
  if (!main) return;
  const desc = document.getElementById('description');
  if (desc) desc.textContent = 'Loading product details…';
};

const populate = async (productId) => {
  showLoading();

  if (!productId) {
    const titleEl = document.getElementById('event-title');
    if (titleEl) titleEl.textContent = 'No product selected';
    document.querySelectorAll('.amount').forEach(el => el.textContent = '');
    return;
  }

  try {
    const product = await svc.getProductById(productId);

    // ttile
    const titleEl = document.getElementById('event-title');
    if (titleEl) titleEl.textContent = product.title ?? '';
    // Hero image
    const heroImg = document.getElementById('hero-img');
    if (heroImg) {
      heroImg.src = product.image ?? '';
      heroImg.alt = product.title ?? 'Product image';
      heroImg.classList.remove('object-cover');
      heroImg.classList.add('object-contain');
      heroImg.style.maxHeight = '420px';
    }
    // Category and Price
    const categoryEl = document.getElementById('event-category');
    if (categoryEl) categoryEl.textContent = product.category ? `${product.category}` : 'Uncategorized';

    // descriptions
    const desc = document.getElementById('description');
    if (desc) desc.textContent = product.description ?? '';

    // Ticket amounts
    const amounts = Array.from(document.querySelectorAll('.amount'));
    if (amounts[0]) amounts[0].textContent = formatPrice(product.price ?? 0);
    if (amounts[1]) amounts[1].textContent = formatPrice((product.price ?? 0) * 1.8);

    // Buy button
    const buyBtn = document.getElementById('buy-now');
    if (buyBtn) {
      buyBtn.dataset.productId = product.id;
      buyBtn.onclick = () => {
        // placeholder action
        alert(`Buying product: ${product.title} — ${formatPrice(product.price ?? 0)}`);
      };
    }
  } catch (err) {
    console.error('Failed to load product details', err);
    const titleEl = document.getElementById('event-title');
    if (titleEl) titleEl.textContent = 'Product not found';
    const desc = document.getElementById('description');
    if (desc) desc.textContent = '';
  }
};

// usage
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => populate(idParam));
} else {
  populate(idParam);
}
