/**
 * PORTFOLIO — T. Sayed Mishbahuddin Putra Nisa
 * script.js — Main JavaScript
 */

/* =====================================================
   AOS INIT
   ===================================================== */
AOS.init({
  duration: 800,
  once: true,
  offset: 60,
  easing: 'ease-out-cubic',
});

/* =====================================================
   FOOTER YEAR
   ===================================================== */
document.getElementById('footerYear').textContent = new Date().getFullYear();

/* =====================================================
   DARK MODE
   ===================================================== */
(function initDarkMode() {
  const toggle = document.getElementById('darkModeToggle');
  const icon   = document.getElementById('darkIcon');
  const html   = document.documentElement;

  const saved = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', saved);
  updateIcon(saved);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcon(next);
  });

  function updateIcon(theme) {
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
})();


/* =====================================================
   NAVBAR — ACTIVE LINK & SCROLL CLASS
   ===================================================== */
(function initNavbar() {
  const navbar  = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Add 'scrolled' class on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightNav();
  });

  // Highlight active nav link based on scroll position
  function highlightNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach((section) => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  // Smooth close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.getElementById('navMenu');
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });
})();

/* =====================================================
   TYPING EFFECT (Hero)
   ===================================================== */
(function initTyping() {
  const phrases = [
    'Web Developer',
    'Data Analyst',
    'Frontend Developer',
    'Backend Developer',
    'IT Developer',
  ];
  const el = document.getElementById('typingText');
  if (!el) return;

  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIdx === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx  = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();
})();


/* =====================================================
   COUNTER ANIMATION (Hero Stats)
   ===================================================== */
(function initCounters() {
  const counters  = document.querySelectorAll('.stat-number');
  let animated    = false;

  function animateCounters() {
    counters.forEach(counter => {
      const target   = parseInt(counter.getAttribute('data-count'), 10);
      const duration = 1500;
      const step     = Math.ceil(duration / target / 16);
      let current    = 0;

      const timer = setInterval(() => {
        current += 1;
        counter.textContent = current;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        }
      }, step);
    });
  }

  // Trigger when hero section is in view
  const heroSection = document.getElementById('home');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        setTimeout(animateCounters, 600);
      }
    });
  }, { threshold: 0.3 });

  if (heroSection) observer.observe(heroSection);
})();

/* =====================================================
   SKILL BAR ANIMATION
   ===================================================== */
(function initSkillBars() {
  const skillSection = document.getElementById('skills');
  if (!skillSection) return;

  let filled = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !filled) {
        filled = true;
        document.querySelectorAll('.skill-fill').forEach(bar => {
          const w = bar.getAttribute('data-width');
          setTimeout(() => { bar.style.width = w + '%'; }, 200);
        });
      }
    });
  }, { threshold: 0.2 });

  observer.observe(skillSection);
})();

/* =====================================================
   PROJECT MODAL HELPER
   ===================================================== */
function openModal(id) {
  const modalEl = document.getElementById(id);
  if (!modalEl) return;
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

/* =====================================================
   GALLERY LIGHTBOX
   ===================================================== */
(function initGallery() {
  const lightbox = document.getElementById('galleryLightbox');
  const lbImg    = document.getElementById('lightboxImg');
  const lbCap    = document.getElementById('lightboxCaption');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img     = item.querySelector('img');
      const caption = item.querySelector('.gallery-overlay span');
      lbImg.src     = img.src;
      lbCap.textContent = caption ? caption.textContent : '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
})();

function closeLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});


/* =====================================================
   CONTACT FORM — EmailJS Integration
   Ganti YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID
   dengan nilai dari dashboard EmailJS Anda.
   ===================================================== */
(function initContactForm() {
  // ============================================================
  // KONFIGURASI EMAILJS
  // ============================================================
  const EMAILJS_PUBLIC_KEY  = 'yD-gVgLqm0y73I60C';
  const EMAILJS_SERVICE_ID  = 'service_4vcoauq';
  const EMAILJS_TEMPLATE_ID = 'template_rv2eo2n';
  // ============================================================

  // Inisialisasi EmailJS dengan method terbaru
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  const form      = document.getElementById('contactForm');
  const alertBox  = document.getElementById('formAlert');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('contactName').value.trim();
    const email   = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    // Validasi
    if (!name || !email || !subject || !message) {
      showAlert('error', '⚠️ Harap isi semua field sebelum mengirim pesan.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showAlert('error', '⚠️ Format email tidak valid.');
      return;
    }

    // Loading state
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Mengirim...';

    // Parameter — sesuaikan nama variabel dengan template EmailJS Anda
    const templateParams = {
      from_name  : name,
      from_email : email,
      subject    : subject,
      message    : message,
      reply_to   : email,
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        showAlert('success', '✅ Pesan berhasil dikirim! Saya akan segera menghubungi Anda.');
        form.reset();
      })
      .catch((err) => {
        // Tampilkan kode error spesifik untuk debugging
        const errMsg = err && err.text ? err.text : JSON.stringify(err);
        console.error('EmailJS error:', err);
        showAlert('error', `❌ Gagal mengirim pesan. Error: ${errMsg}`);
      })
      .finally(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Kirim Pesan';
      });
  });

  function showAlert(type, msg) {
    alertBox.className = `form-alert ${type}`;
    alertBox.textContent = msg;
    alertBox.classList.remove('d-none');
    setTimeout(() => alertBox.classList.add('d-none'), 8000);
  }
})();

/* =====================================================
   BACK TO TOP BUTTON
   ===================================================== */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* =====================================================
   SMOOTH SCROLL FOR ALL ANCHOR LINKS
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 75;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

