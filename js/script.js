// Reveal-on-scroll for elements with the .reveal class
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => observer.observe(el));
});

```javascript
/* ==============================================
   MOBILE MENU — OPEN / CLOSE
   ============================================== */

const header = document.querySelector('header');
const nav = document.querySelector('.navlinks');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelectorAll('.navlinks a');

function openMenu() {
  nav.classList.add('open');
  menuBtn.classList.add('open');
  menuBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  nav.classList.remove('open');
  menuBtn.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

menuBtn?.addEventListener('click', () => {
  if (nav.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});


/* ==============================================
   CLOSE MENU ON LINK CLICK
   ============================================== */

navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});


/* ==============================================
   ESC KEY CLOSE
   ============================================== */

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    menuBtn.focus();
  }
});


/* ==============================================
   HEADER SCROLL STATE
   ============================================== */

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });


/* ==============================================
   ACTIVE LINK — SAFE FOR GITHUB PAGES
   ============================================== */

const currentPage =
  window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
  const href = link.getAttribute('href');

  if (href === currentPage) {
    link.classList.add('active');
  }
});
```
