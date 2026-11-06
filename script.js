/* ═══════════════════════════════════════════════════════════
   SUBASH CHANDRA BOSE K — Portfolio JavaScript
   Full Interactivity, Animations & Theme Toggle
═══════════════════════════════════════════════════════════ */

'use strict';

// ── DOM Ready ──
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initTheme();
  initFullscreen();
  initNavbar();
  initTypewriter();
  initScrollReveal();
  initSkillBars();
  initCounters();
  initBackToTop();
  initContactForm();
  initHamburger();
  initParticles();
  initNavHighlight();
  hideNetlifyTab();
});

// ═══════════════════════════════════════════════════════════
// LOADER
// ═══════════════════════════════════════════════════════════
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'visible';

      // Trigger hero animations
      document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 150);
      });
    }, 2200);
  });

  document.body.style.overflow = 'hidden';
}

// ═══════════════════════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════════════════════
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth follower
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Click effect
  document.addEventListener('mousedown', () => {
    cursor.classList.add('clicked');
    follower.classList.add('clicked');
  });
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicked');
    follower.classList.remove('clicked');
  });

  // Hover effect on interactive elements
  const hoverEls = document.querySelectorAll('a, button, .project-card, .about-card, .cert-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      follower.style.opacity = '1';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.opacity = '0.6';
    });
  });
}

// ═══════════════════════════════════════════════════════════
// THEME TOGGLE
// ═══════════════════════════════════════════════════════════
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Load saved theme
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);

    // Add ripple animation
    toggle.style.transform = 'scale(0.9)';
    setTimeout(() => toggle.style.transform = '', 150);
  });
}

// ═══════════════════════════════════════════════════════════
// FULLSCREEN TOGGLE
// ═══════════════════════════════════════════════════════════
function initFullscreen() {
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (!fullscreenBtn) return;

  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  });

  const updateIcon = () => {
    const icon = fullscreenBtn.querySelector('i');
    if (!icon) return;
    if (document.fullscreenElement) {
      icon.className = 'fas fa-compress';
      fullscreenBtn.setAttribute('title', 'Exit Fullscreen');
      fullscreenBtn.setAttribute('aria-label', 'Exit Fullscreen');
    } else {
      icon.className = 'fas fa-expand';
      fullscreenBtn.setAttribute('title', 'Toggle Fullscreen');
      fullscreenBtn.setAttribute('aria-label', 'Toggle Fullscreen');
    }
  };

  document.addEventListener('fullscreenchange', updateIcon);
  document.addEventListener('webkitfullscreenchange', updateIcon);
}

// ═══════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;

    if (current > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide on scroll down, show on scroll up
    if (current > lastScroll && current > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScroll = current;
  }, { passive: true });
}

// ═══════════════════════════════════════════════════════════
// TYPEWRITER
// ═══════════════════════════════════════════════════════════
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const words = [
    'UI/UX Developer',
    'Figma Designer',
    'Web Developer',
    'Problem Solver',
    'Creative Thinker'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const word = words[wordIndex];

    if (!isDeleting) {
      el.textContent = word.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === word.length) {
        isPaused = true;
        setTimeout(() => { isPaused = false; isDeleting = true; type(); }, 2000);
        return;
      }
    } else {
      el.textContent = word.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    const speed = isDeleting ? 60 : 110;
    setTimeout(type, speed);
  }

  setTimeout(type, 1500);
}

// ═══════════════════════════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════════════════════════
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(el => {
    // Skip hero elements (handled by loader)
    if (!el.closest('.hero')) {
      observer.observe(el);
    }
  });
}

// ═══════════════════════════════════════════════════════════
// SKILL BARS ANIMATION
// ═══════════════════════════════════════════════════════════
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill, .edu-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.dataset.width || '0';
        // Small delay for stagger
        setTimeout(() => {
          target.style.width = width + '%';
        }, 200);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// ═══════════════════════════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════════════════════════
function initCounters() {
  const counters = document.querySelectorAll('.stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + (el.closest('.stat-card') && el.nextElementSibling.textContent === 'Diploma %' ? '%' : '');
    }
  }

  requestAnimationFrame(update);
}

// ═══════════════════════════════════════════════════════════
// BACK TO TOP
// ═══════════════════════════════════════════════════════════
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ═══════════════════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════════════════
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    // Loading state
    btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    // Simulate send (replace with real API)
    setTimeout(() => {
      btn.innerHTML = '<span>Sent!</span><i class="fas fa-check"></i>';
      btn.style.background = '#22c55e';

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
      }, 3000);
    }, 1500);
  });

  // Floating label effect on inputs
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      if (!input.value) input.parentElement.classList.remove('focused');
    });
  });
}

// ═══════════════════════════════════════════════════════════
// HAMBURGER MENU
// ═══════════════════════════════════════════════════════════
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
}

// ═══════════════════════════════════════════════════════════
// NAV HIGHLIGHT ON SCROLL
// ═══════════════════════════════════════════════════════════
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// ═══════════════════════════════════════════════════════════
// FLOATING PARTICLES (subtle background effect)
// ═══════════════════════════════════════════════════════════
function initParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 0; opacity: 0.3;
  `;
  hero.querySelector('.hero-bg').appendChild(canvas);

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const count = 50;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1
    });
  }

  function getColor() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'light' ? '0, 0, 0' : '255, 255, 255';
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const color = getColor();

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
      ctx.fill();
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const alpha = (1 - dist / 100) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${color}, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}

// ═══════════════════════════════════════════════════════════
// TILT EFFECT ON PROJECT CARDS
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card, .about-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = ((y - centerY) / centerY) * 5;
      const tiltY = ((x - centerX) / centerX) * -5;

      card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease, border-color 0.4s, box-shadow 0.4s';
    });
  });
});

// ═══════════════════════════════════════════════════════════
// SMOOTH SCROLL PROGRESS INDICATOR
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px;
    background: var(--text-primary); z-index: 10001;
    transform-origin: left; transform: scaleX(0);
    transition: transform 0.1s ease;
    width: 100%;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrolled / total;
    progressBar.style.transform = `scaleX(${progress})`;
  }, { passive: true });
});

// ═══════════════════════════════════════════════════════════
// GLITCH TEXT EFFECT ON HERO NAME (subtle)
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  heroTitle.addEventListener('mouseenter', () => {
    heroTitle.style.animation = 'glitch 0.3s ease';
    setTimeout(() => heroTitle.style.animation = '', 300);
  });
});

// Add glitch keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(2px, -2px); }
    60% { transform: translate(-1px, 1px); }
    80% { transform: translate(1px, -1px); }
    100% { transform: translate(0); }
  }
`;
document.head.appendChild(style);

// ═══════════════════════════════════════════════════════════
// HIDE NETLIFY BADGE / DRAWER / FEEDBACK TAB
// ═══════════════════════════════════════════════════════════
function hideNetlifyTab() {
  const targetSelectors = [
    'netlify-drawer',
    '#netlify-drawer',
    '.netlify-drawer',
    '#netlify-badge',
    '.netlify-badge',
    '[data-netlify-drawer]',
    '[data-netlify-badge]',
    '[data-netlify-feedback]',
    'iframe[src*="netlify"]',
    'iframe[title*="Netlify"]',
    'iframe[title*="netlify"]',
    'div[id*="netlify"]',
    'div[class*="netlify"]',
    '[aria-label*="Netlify"]',
    '[aria-label*="netlify"]'
  ];

  const purge = () => {
    targetSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.closest('.container') && !el.closest('.navbar') && !el.closest('.footer-container')) {
          el.remove();
        } else if (el.classList.contains('netlify-badge') || el.id === 'netlify-badge') {
          el.remove();
        }
      });
    });
  };

  purge();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', purge);
  }
  window.addEventListener('load', purge);

  const observer = new MutationObserver(() => purge());
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
}
hideNetlifyTab();
