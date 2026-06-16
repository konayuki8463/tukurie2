/* ============================================================
   TukuriE LP — script.js
   ============================================================ */

'use strict';

// ── Copyright year ──────────────────────────────────────────
const yearEl = document.getElementById('copyright-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Header scroll state ──────────────────────────────────────
const header = document.getElementById('site-header');
const onScroll = () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Hamburger / Mobile menu ──────────────────────────────────
const hamburgerBtn = document.getElementById('hamburger-btn');

// Create mobile menu dynamically
const mobileMenu = document.createElement('nav');
mobileMenu.className = 'mobile-menu';
mobileMenu.setAttribute('aria-label', 'モバイルナビゲーション');
mobileMenu.innerHTML = `
  <a href="#about"       class="mobile-menu-link">コンセプト</a>
  <a href="#features"    class="mobile-menu-link">設備・機材</a>
  <a href="#how-to-use"  class="mobile-menu-link">ご利用の流れ</a>
  <a href="#calendar"    class="mobile-menu-link">空き状況</a>
  <a href="#cta"         class="mobile-menu-link">予約する</a>
`;
document.body.appendChild(mobileMenu);

const toggleMenu = () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburgerBtn.classList.toggle('active', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
};

hamburgerBtn.addEventListener('click', toggleMenu);

// Close on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close on outside click
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) toggleMenu();
});

// ── Smooth anchor scroll ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const headerH = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Scroll reveal ────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Attach reveal to key elements
const revealSelectors = [
  '.section-label',
  '.section-title',
  '.section-lead',
  '.about-body p',
  '.about-tags',
  '.feature-card',
  '.step',
  '.calendar-placeholder',
  '.cta-inner > *',
  '.footer-grid > *',
];

revealSelectors.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    // Staggered delay for grids
    if (sel === '.feature-card' || sel === '.step') {
      el.style.transitionDelay = `${i * 0.08}s`;
    }
    revealObserver.observe(el);
  });
});

// Hero items appear immediately
document.querySelectorAll('.hero-content > *').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.1}s,
                          transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.1}s`;
  requestAnimationFrame(() => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  });
});
