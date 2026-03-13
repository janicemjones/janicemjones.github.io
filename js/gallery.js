// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  links.classList.toggle('open');
});
links.querySelectorAll('a').forEach(l =>
  l.addEventListener('click', () => {
    toggle.classList.remove('open');
    links.classList.remove('open');
  })
);

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const items = document.querySelectorAll('.gallery-item');
let currentIndex = 0;

items.forEach((item, i) => {
  item.addEventListener('click', () => {
    currentIndex = i;
    openLightbox();
  });
});

function openLightbox() {
  const img = items[currentIndex].querySelector('img');
  lightboxImg.src = img.dataset.full || img.src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigate(dir) {
  currentIndex = (currentIndex + dir + items.length) % items.length;
  openLightbox();
}

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
document.getElementById('lightboxNext').addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});

// Visitor counter
fetch('data/hits.json')
  .then(r => r.json())
  .then(data => {
    document.querySelectorAll('.visitor-count').forEach(el => {
      el.textContent = data.total.toLocaleString();
    });
  })
  .catch(() => {});
