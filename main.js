// Mobile navigation toggle
function toggleNav() {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('open');
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(e) {
  const nav = document.getElementById('mainNav');
  const toggle = document.querySelector('.nav-toggle');
  if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('Unité Pastorale Notre-Dame-du-Sacré-Cœur — Site prêt');
