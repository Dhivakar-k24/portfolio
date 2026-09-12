/* ====================================================================
   DHIVAKAR K — PORTFOLIO SCRIPT
   Handles: nav scroll state, mobile menu, theme toggle, typing effect,
   scroll-reveal, animated counters/skill bars, project filtering,
   contact form, back-to-top, scroll progress bar.
   ==================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Navbar scroll state + progress bar ---------------- */
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progressBar');
  const backToTop = document.getElementById('backToTop');

  /* Declared up front so onScroll (called immediately below) can use them */
  const sections = document.querySelectorAll('main section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let currentId = sections[0] ? sections[0].id : '';
    const scrollPos = window.scrollY + window.innerHeight * 0.3;

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop) currentId = sec.id;
    });

    navItems.forEach(link => {
      link.classList.toggle('active', link.dataset.section === currentId);
    });
  }

  function onScroll() {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 10);
    backToTop.classList.toggle('visible', scrollY > 500);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';

    updateActiveNav();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Mobile menu ---------------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ---------------- Theme toggle (dark / light) ---------------- */
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const THEME_KEY = 'dk-portfolio-theme';

  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* storage unavailable */ }
  }

  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem(THEME_KEY) || 'dark'; } catch (e) { /* default to dark */ }
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ---------------- Typing animation in hero ---------------- */
  const typedRoleEl = document.getElementById('typedRole');
  const roles = [
    'Computer Science Student',
    'Aspiring Software Developer',
    'Machine Learning Enthusiast'
  ];
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typedRoleEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      charIndex--;
      typedRoleEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  if (typedRoleEl) typeLoop();

  /* ---------------- Scroll reveal (IntersectionObserver) ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------- Animated stat counters ---------------- */
  const statEls = document.querySelectorAll('.stat-number');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statEls.forEach(el => statObserver.observe(el));

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1100;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------------- Animated skill bars ---------------- */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillFills.forEach(el => skillObserver.observe(el));

  /* ---------------- Project filtering ---------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const categories = card.dataset.category.split(' ');
        const show = filter === 'all' || categories.includes(filter);
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* ---------------- Contact form (client-side only) ---------------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const subject = contactForm.subject.value.trim();
      const message = contactForm.message.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !subject || !message) {
        formStatus.textContent = 'Please fill in every field before sending.';
        formStatus.classList.add('error');
        return;
      }
      if (!emailPattern.test(email)) {
        formStatus.textContent = 'That email address doesn\'t look right.';
        formStatus.classList.add('error');
        return;
      }

      // No backend is connected yet — this opens the user's mail client
      // pre-filled with the message as a reliable fallback.
      const mailto = `mailto:dhiva2430@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
      window.location.href = mailto;

      formStatus.classList.remove('error');
      formStatus.textContent = 'Opening your email client to send this message...';
      contactForm.reset();
    });
  }

});
