// ========== EVER4EST — GSAP Animations, Particles, Cursor Trail, Theme, WhatsApp ==========

document.addEventListener('DOMContentLoaded', () => {
  initPageTransition();
  initGSAPReveal();
  initTextReveal();
  initParticleBackground();
  initCursorTrail();
  initThemeToggle();
  initWhatsAppButton();
  initNavbarParallax();
});

// ========== PAGE TRANSITION ==========
function initPageTransition() {
  const overlay = document.getElementById('pageTransitionOverlay');
  if (!overlay) return;

  // Entry animation - reveal page
  gsap.to(overlay, {
    scaleY: 0,
    duration: 0.8,
    ease: 'power4.inOut',
    transformOrigin: 'top',
    delay: 0.1
  });

  // Intercept link clicks for page transitions
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('javascript:')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = href;

      gsap.to(overlay, {
        scaleY: 1,
        duration: 0.6,
        ease: 'power4.inOut',
        transformOrigin: 'bottom',
        onComplete: () => {
          window.location.href = target;
        }
      });
    });
  });
}

// ========== GSAP SCROLL REVEAL (replaces CSS-only reveal) ==========
function initGSAPReveal() {
  gsap.registerPlugin(ScrollTrigger);

  // Section labels
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      x: -40, opacity: 0, duration: 0.8, ease: 'power3.out'
    });
  });

  // Section titles
  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.1
    });
  });

  // Section descriptions
  gsap.utils.toArray('.section-desc').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2
    });
  });

  // Service cards - staggered
  gsap.utils.toArray('.services-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.service-card');
    gsap.from(cards, {
      scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
      y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
    });
  });

  // Stats items — reveal + counter combined
  gsap.utils.toArray('.stats-grid').forEach(grid => {
    const items = grid.querySelectorAll('.stat-item');
    items.forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: grid, start: 'top 90%', once: true },
        y: 40, opacity: 0, scale: 0.9, duration: 0.7, delay: i * 0.1, ease: 'back.out(1.5)',
        onComplete: () => {
          // Start counter after item is visible
          const stat = item.querySelector('.stat-number');
          if (!stat) return;
          const text = stat.textContent.trim();
          // Parse number and surrounding text
          const match = text.match(/(.*?)(\d+)(.*)/);
          if (!match) return;
          const prefix = match[1];
          const finalNum = parseInt(match[2]);
          const suffix = match[3];
          const obj = { val: 0 };
          gsap.to(obj, {
            val: finalNum,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              stat.textContent = prefix + Math.floor(obj.val) + suffix;
            }
          });
        }
      });
    });
  });

  // Why cards
  gsap.utils.toArray('.why-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.why-card');
    gsap.from(cards, {
      scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
      x: -40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
    });
  });

  // Value cards
  gsap.utils.toArray('.values-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.value-card');
    gsap.from(cards, {
      scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
      y: 50, opacity: 0, scale: 0.95, duration: 0.7, stagger: 0.12, ease: 'power3.out'
    });
  });

  // CTA box
  gsap.utils.toArray('.cta-box').forEach(box => {
    gsap.from(box, {
      scrollTrigger: { trigger: box, start: 'top 85%', once: true },
      y: 50, opacity: 0, scale: 0.96, duration: 0.9, ease: 'power3.out'
    });
  });

  // Service detail sections
  gsap.utils.toArray('.service-detail').forEach(detail => {
    const content = detail.querySelector('.service-detail-content');
    const img = detail.querySelector('.service-detail-img');
    if (content) {
      gsap.from(content, {
        scrollTrigger: { trigger: detail, start: 'top 80%', once: true },
        x: -50, opacity: 0, duration: 0.9, ease: 'power3.out'
      });
    }
    if (img) {
      gsap.from(img, {
        scrollTrigger: { trigger: detail, start: 'top 80%', once: true },
        x: 50, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.15
      });
    }
  });

  // About content
  gsap.utils.toArray('.about-content').forEach(section => {
    const text = section.querySelector('.about-text');
    const image = section.querySelector('.about-image');
    if (text) {
      gsap.from(text, {
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        x: -50, opacity: 0, duration: 0.9, ease: 'power3.out'
      });
    }
    if (image) {
      gsap.from(image, {
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        x: 50, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.2
      });
    }
  });

  // Contact wrapper
  gsap.utils.toArray('.contact-wrapper').forEach(wrapper => {
    const info = wrapper.querySelector('.contact-info-card');
    const form = wrapper.querySelector('.contact-form-card');
    if (info) {
      gsap.from(info, {
        scrollTrigger: { trigger: wrapper, start: 'top 80%', once: true },
        x: -50, opacity: 0, duration: 0.9, ease: 'power3.out'
      });
    }
    if (form) {
      gsap.from(form, {
        scrollTrigger: { trigger: wrapper, start: 'top 80%', once: true },
        x: 50, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.15
      });
    }
  });

  // Footer
  gsap.utils.toArray('.footer-grid').forEach(grid => {
    gsap.from(grid.children, {
      scrollTrigger: { trigger: grid, start: 'top 90%', once: true },
      y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
    });
  });
}

// ========== TEXT REVEAL ANIMATION ==========
function initTextReveal() {
  // Hero heading - split text reveal
  const heroH1 = document.querySelector('.hero h1');
  if (heroH1) {
    const tl = gsap.timeline({ delay: 0.5 });

    // Badge
    const badge = document.querySelector('.hero-badge');
    if (badge) {
      tl.from(badge, { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, 0);
    }

    // Split h1 spans for character-by-character reveal
    const h1Spans = heroH1.querySelectorAll('span');
    h1Spans.forEach((span, i) => {
      if (span.classList.contains('gradient-text')) {
        // Gradient text gets special animation
        tl.from(span, {
          clipPath: 'inset(0 100% 0 0)',
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut'
        }, 0.3 + i * 0.12);
      } else {
        tl.from(span, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out'
        }, 0.2 + i * 0.1);
      }
    });

    // Hero paragraph
    const heroP = document.querySelector('.hero p');
    if (heroP) {
      tl.from(heroP, { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.7);
    }

    // Hero buttons
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
      tl.from(heroButtons.children, {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out'
      }, 0.9);
    }
  }

  // Page headers (inner pages)
  const pageHeader = document.querySelector('.page-header');
  if (pageHeader) {
    const tl = gsap.timeline({ delay: 0.3 });
    const h1 = pageHeader.querySelector('h1');
    const p = pageHeader.querySelector('p');
    const breadcrumb = pageHeader.querySelector('.breadcrumb');

    if (h1) tl.from(h1, { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0);
    if (p) tl.from(p, { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, 0.15);
    if (breadcrumb) tl.from(breadcrumb, { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, 0.3);
  }
}

// ========== PARTICLE BACKGROUND ==========
function initParticleBackground() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let mouseX = -1000, mouseY = -1000;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  // Track mouse for interactive particles
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.maxOpacity = this.opacity;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse interaction - particles gently repel from cursor
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x += (dx / dist) * force * 1.5;
        this.y += (dy / dist) * force * 1.5;
        this.opacity = Math.min(this.maxOpacity + 0.3, 0.8);
      } else {
        this.opacity += (this.maxOpacity - this.opacity) * 0.05;
      }

      // Wrap around screen
      if (this.x < -10) this.x = canvas.width + 10;
      if (this.x > canvas.width + 10) this.x = -10;
      if (this.y < -10) this.y = canvas.height + 10;
      if (this.y > canvas.height + 10) this.y = -10;
    }

    draw() {
      const isLight = document.body.classList.contains('light-mode');
      const color = isLight ? '29, 185, 84' : '29, 185, 84';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Create particles
  const particleCount = Math.min(80, Math.floor(window.innerWidth * window.innerHeight / 15000));
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    const isLight = document.body.classList.contains('light-mode');
    const lineColor = isLight ? '29, 185, 84' : '29, 185, 84';

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const opacity = (1 - dist / 150) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    animationId = requestAnimationFrame(animate);
  }

  animate();

  // Pause when not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });
}

// ========== CURSOR BLOB (WebGL Fluid Simulation - inspired by heycalli.com) ==========
function initCursorTrail() {
  // Only on desktop with fine pointer
  if (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window) return;

  const canvas = document.getElementById('fluidCanvas');
  if (!canvas) return;

  if (typeof WebGLFluid !== 'function') {
    console.error('WebGLFluid library not loaded!');
    return;
  }

  // To allow clicking on elements behind the canvas, the canvas has pointer-events: none.
  // However, WebGLFluid binds mouse events directly to the canvas element.
  // We proxy addEventListener to the window so it still receives mouse movements.
  // We also wrap the event object in a Proxy because WebGLFluid uses e.offsetX/e.offsetY,
  // which change randomly depending on which nested DOM element is being hovered.
  // By returning e.clientX/e.clientY (which are relative to the viewport), the coordinates stay accurate.
  const originalAddEventListener = canvas.addEventListener;
  canvas.addEventListener = function(type, listener, options) {
    if (type === 'mousedown' || type === 'mousemove' || type === 'mouseup' || type.startsWith('touch')) {
      const wrappedListener = function(e) {
        const proxyEvent = new Proxy(e, {
          get(target, prop) {
            if (prop === 'offsetX') return target.clientX;
            if (prop === 'offsetY') return target.clientY;
            const value = target[prop];
            return typeof value === 'function' ? value.bind(target) : value;
          }
        });
        listener(proxyEvent);
      };
      window.addEventListener(type, wrappedListener, options);
    } else {
      originalAddEventListener.call(canvas, type, listener, options);
    }
  };

  // Initialize the fluid simulation using the CDN script
  WebGLFluid(canvas, {
    TRIGGER: 'hover',
    IMMEDIATE: false,
    NUM_DYES: 3,
    DENSITY_DISSIPATION: 3.5,
    VELOCITY_DISSIPATION: 2.0,
    PRESSURE: 0.1,
    PRESSURE_ITERATIONS: 20,
    CURL: 3,
    SPLAT_RADIUS: 0.2,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLORFUL: true,
    COLOR_UPDATE_SPEED: 10,
    PAUSED: false,
    BACK_COLOR: { r: 0, g: 0, b: 0, a: 0 },
    TRANSPARENT: true,
    BLOOM: true,
    BLOOM_ITERATIONS: 8,
    BLOOM_RESOLUTION: 256,
    BLOOM_INTENSITY: 0.8,
    BLOOM_THRESHOLD: 0.6,
    BLOOM_SOFT_KNEE: 0.7,
    SUNRAYS: true,
    SUNRAYS_RESOLUTION: 196,
    SUNRAYS_WEIGHT: 1.0,
  });
}

// ========== DARK/LIGHT MODE TOGGLE ==========
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const sunIcon = toggle.querySelector('.theme-sun');
  const moonIcon = toggle.querySelector('.theme-moon');
  const savedTheme = localStorage.getItem('ever4est-theme') || 'dark';

  function setTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    } else {
      document.body.classList.remove('light-mode');
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    }
    localStorage.setItem('ever4est-theme', theme);

    // Switch logos based on theme
    updateLogos(theme);
  }

  function updateLogos(theme) {
    const logos = document.querySelectorAll('.brand-logo');
    logos.forEach(logo => {
      if (theme === 'light') {
        logo.src = 'logolar/logo-light.png';
      } else {
        logo.src = 'logolar/logo-dark.png';
      }
    });
  }

  setTheme(savedTheme);

  toggle.addEventListener('click', () => {
    const current = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    const next = current === 'dark' ? 'light' : 'dark';

    // Animate the toggle button
    gsap.to(toggle, {
      rotation: '+=360',
      duration: 0.5,
      ease: 'power2.inOut'
    });

    setTheme(next);
  });
}

// ========== WHATSAPP BUTTON ==========
function initWhatsAppButton() {
  const btn = document.getElementById('whatsappBtn');
  if (!btn) return;

  // Pulse animation (infinite)
  gsap.to(btn, {
    boxShadow: '0 0 0 15px rgba(37, 211, 102, 0)',
    duration: 1.5,
    repeat: -1,
    ease: 'power2.out'
  });

  // Tooltip show/hide
  btn.addEventListener('mouseenter', () => {
    const tooltip = btn.querySelector('.whatsapp-tooltip');
    if (tooltip) {
      gsap.to(tooltip, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
    }
  });

  btn.addEventListener('mouseleave', () => {
    const tooltip = btn.querySelector('.whatsapp-tooltip');
    if (tooltip) {
      gsap.to(tooltip, { opacity: 0, x: 10, duration: 0.2, ease: 'power2.in' });
    }
  });
}

// ========== STATS COUNTER (handled inside initGSAPReveal) ==========

// ========== NAVBAR PARALLAX EFFECT ==========
function initNavbarParallax() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;

  const heroGrid = heroSection.querySelector('.hero-grid');
  if (heroGrid) {
    gsap.to(heroGrid, {
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 100,
      opacity: 0.3,
      ease: 'none'
    });
  }

  // Parallax on hero content
  const heroContent = heroSection.querySelector('.hero-content');
  if (heroContent) {
    gsap.to(heroContent, {
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 80,
      opacity: 0.5,
      ease: 'none'
    });
  }
}
