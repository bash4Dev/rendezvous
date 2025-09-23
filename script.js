(function () {
  const btn = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  let open = false;

  function setState(val) {
    open = val;
    btn.setAttribute('aria-expanded', String(val));
    if (val) {
      menu.style.maxHeight = menu.scrollHeight + 'px';
    } else {
      menu.style.maxHeight = '0';
    }
  }

  btn.addEventListener('click', () => setState(!open));
  // close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) setState(false);
  });
})();

// Event data
const events = [
  {
    id: 1,
    title: "ISWIS Live show",
    date: "2025-10-03",
    dateTime: "Sun, Oct 3rd - 6pm",
    image: "./images/event-one.png",
    alt: "ISWIS Live show",
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non ab voluptas,
    illum culpa laboriosam dolorum consequatur corporis deleniti omnis eum.`,
    url: "#"
  },
  {
    id: 2,
    title: "ISWIS Live show",
    date: "2025-10-03",
    dateTime: "Sun, Oct 3rd - 6pm",
    image: "./images/event-two.jpg",
    alt: "ISWIS Live show",
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non ab voluptas,
    illum culpa laboriosam dolorum consequatur corporis deleniti omnis eum.`,
    url: "#"
  },
  {
    id: 3,
    title: "ISWIS Live show",
    date: "2025-10-03",
    dateTime: "Sun, Oct 3rd - 6pm",
    image: "./images/event-three_screenshot.png",
    alt: "ISWIS Live show",
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non ab voluptas,
    illum culpa laboriosam dolorum consequatur corporis deleniti omnis eum.`,
    url: "#"
  }
]

const createContainer = (item) => {
  // article elements
  const article = document.createElement('article');
  article.className = `flex flex-col rounded-lg border border-gray-200 overflow-hidden`;
  article.dataset.eventId = item.id;

  // img divs
  const img = document.createElement('img');
  img.src = item.image;
  img.className = `w-full h-[240px] object-cover`;
  img.alt = item.alt;
  img.loading = 'lazy';
  article.appendChild(img);

  // event info
  const eventInfo = document.createElement('div');
  eventInfo.className = `p-6 flex flex-col flex-grow`;
  // span div
  const spanDiv = document.createElement('span');
  spanDiv.className = `mb-3`;
  // head text
  const h3 = document.createElement('h3');
  h3.className = `text-[#432361] font-semibold text-[16px] leading-none`;
  h3.textContent = item.title;
  // time div
  const timeDiv = document.createElement('time');
  timeDiv.className = `text-gray-500 text-sm mt-1 block`;
  timeDiv.dateTime = item.date;
  timeDiv.textContent = item.dateTime;
  spanDiv.appendChild(h3);
  spanDiv.appendChild(timeDiv);

  // event description
  const desc = document.createElement('p');
  desc.className = `text-gray-600 text-sm leading-relaxed mb-6`;
  desc.textContent = item.description;

  // more details link
  const btnDiv = document.createElement('div');
  btnDiv.className = 'mt-auto';
  // anchor tag
  const linkDiv = document.createElement('a');
  linkDiv.className = `inline-flex items-center px-0.5 gap-2 text-[#783EAD] font-medium text-sm hover:outline-none hover:ring-2 hover:ring-[#783EAD]`;
  linkDiv.href = item.url;
  linkDiv.setAttribute('role', 'button');
  linkDiv.dataset.action = 'view-details';
  linkDiv.innerHTML = `View details
    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17L17 7M7 7h10v10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  //
  btnDiv.appendChild(linkDiv);
  eventInfo.appendChild(spanDiv);
  eventInfo.appendChild(desc);
  eventInfo.appendChild(btnDiv);
  article.appendChild(eventInfo);

  return article;
}

const renderEvents = (sel, items) => {
  const container = document.querySelector(sel);
  if (!container) return;
  // clear
  container.innerHTML = '';
  const frag = document.createDocumentFragment();
  items.forEach(item => frag.appendChild(createContainer(item)));
  container.appendChild(frag);
}

renderEvents('#events-container', events);