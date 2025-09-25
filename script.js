// Mobile menu toggle
document.getElementById('menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Load default home page content
async function loadPage(page) {
  const res = await fetch(page);
  const html = await res.text();
  document.getElementById('content').innerHTML = html;
}

// Load home by default
window.addEventListener('DOMContentLoaded', () => {
  loadPage('home.html');
});

// Handle navigation clicks
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = e.target.getAttribute('href');
    loadPage(page);
    if (!document.getElementById('mobile-menu').classList.contains('hidden')) {
      document.getElementById('mobile-menu').classList.add('hidden');
    }
  });
});
