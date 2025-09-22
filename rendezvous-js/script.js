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