const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const requestForm = document.querySelector('#project-request');
requestForm.addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(requestForm);
  const message = [
    'Hi #Creators, I’d like to request a project.',
    `Name: ${fields.get('name')}`,
    `Email: ${fields.get('email')}`,
    `Phone: ${fields.get('phone') || 'Not provided'}`,
    `Service: ${fields.get('service')}`,
    `Project details: ${fields.get('details')}`
  ].join('\n');
  const whatsappUrl = `https://wa.me/918870582806?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});

// Light / dark theme toggle
const root = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const THEME_COLORS = { dark: '#09090f', light: '#fbf8f4' };
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  if (themeMeta) themeMeta.setAttribute('content', THEME_COLORS[theme]);
  themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}
applyTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});
