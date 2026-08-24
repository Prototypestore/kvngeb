// Loads each HTML partial into its mount point, then wires up scroll animations.
// Requires the site to be served over http(s) — see the note in index.html.

const partials = [
  { id: 'nav-mount', file: 'partials/nav.html' },
  { id: 'hero-mount', file: 'partials/hero.html' },
  { id: 'moments-mount', file: 'partials/moments.html' },
  { id: 'footer-mount', file: 'partials/footer.html' },
];

async function loadPartial({ id, file }) {
  const mount = document.getElementById(id);
  if (!mount) return;
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`);
    mount.innerHTML = await res.text();
  } catch (err) {
    mount.innerHTML = `<p style="padding:24px;color:#A85C3B;">Could not load ${file}. Are you running this from a local server?</p>`;
    console.error(err);
  }
}

function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

(async function init() {
  await Promise.all(partials.map(loadPartial));
  initScrollReveal();
})();
