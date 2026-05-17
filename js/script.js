// ========== EVER4EST — Main Script ==========

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initLanguage();
  initContactForm();
});

// ========== NAVBAR SCROLL EFFECT ==========
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ========== SCROLL REVEAL (Intersection Observer) ==========
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

// ========== LANGUAGE TOGGLE ==========
function initLanguage() {
  const savedLang = localStorage.getItem('ever4est-lang') || 'tr';
  setLanguage(savedLang);

  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
      localStorage.setItem('ever4est-lang', lang);
    });
  });
}

function setLanguage(lang) {
  // Update toggle buttons
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update html lang attribute
  document.documentElement.lang = lang === 'tr' ? 'tr' : 'en';

  // Update all translatable elements
  document.querySelectorAll('[data-tr][data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        // skip — handled by placeholder logic below
      } else {
        el.innerHTML = text;
      }
    }
  });

  // Update placeholders
  document.querySelectorAll(`[data-${lang}-placeholder]`).forEach(el => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
  });

  // Update page title based on current page
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const titles = {
    'index.html': { tr: 'Ever4est — IT Çözüm Hizmetleri', en: 'Ever4est — IT Solution Services' },
    'about.html': { tr: 'Hakkımızda — Ever4est', en: 'About Us — Ever4est' },
    'services.html': { tr: 'Hizmetlerimiz — Ever4est', en: 'Our Services — Ever4est' },
    'contact.html': { tr: 'İletişim — Ever4est', en: 'Contact — Ever4est' }
  };
  if (titles[page]) {
    document.title = titles[page][lang];
  }
}

// ========== CONTACT FORM ==========
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple validation
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      return;
    }

    // Hide form, show success
    form.style.display = 'none';
    success.classList.add('show');

    // Reset after 5 seconds
    setTimeout(() => {
      form.reset();
      form.style.display = '';
      success.classList.remove('show');
    }, 5000);
  });
}
