(function () {
  const favicon = document.createElement('link');
  favicon.rel = 'icon'; favicon.type = 'image/svg+xml'; favicon.href = 'favicon.svg';
  document.head.appendChild(favicon);

  const page = window.location.pathname.split('/').pop() || 'index.html';
  const pages = [
    { href: 'index.html', label: 'Main' },
    { href: 'research.html', label: 'Papers' },
    { href: 'code.html', label: 'Code' },
    { href: 'writing.html', label: 'Writing' },
    { href: 'cv.html', label: 'Cv' }
  ];
  const links = pages.map(({ href, label }) => {
    const active = page === href || (page === '' && href === 'index.html');
    return `<a href="${href}"${active ? ' class="active" aria-current="page"' : ''}>${label}</a>`;
  }).join('');

  const header = `<header class="site-header"><div class="site-header-inner"><a href="index.html" class="masthead-name"><em>Suraj</em> Yadav</a><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span><span class="sr-only">Toggle navigation</span></button><nav class="site-nav" id="primary-nav" aria-label="Primary navigation">${links}</nav></div></header>`;
  (document.querySelector('.page') || document.body).insertAdjacentHTML('afterbegin', header);

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };

  toggle.addEventListener('click', function () {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
  nav.addEventListener('click', closeMenu);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('DOMContentLoaded', function () {
    const footer = `<footer class="site-footer"><span>© ${new Date().getFullYear()} Suraj Yadav</span><span class="footer-ornament">·</span><a href="contact.html">Contact</a></footer>`;
    (document.querySelector('.page') || document.body).insertAdjacentHTML('beforeend', footer);

    document.querySelectorAll('.paper-abstract').forEach(details => {
      const summary = details.querySelector('summary');
      const label = summary.querySelector('.sr-only');
      const updateLabel = () => {
        const text = details.open ? 'Collapse abstract' : 'Expand abstract';
        summary.title = text;
        label.textContent = text;
      };
      details.addEventListener('toggle', updateLabel);
      updateLabel();
    });
  });
})();
