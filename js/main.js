/**
 * Biro Keuangan Universitas Setia Budi - Portal JavaScript
 * Handles Lucide icons, Mobile Menu, Dropdown Accordion, and Smart Sticky Navbar.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // Elements
  const navbar = document.getElementById('main-navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelectorAll('.nav-item');

  // Mobile Menu Toggle
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking any navigation link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Mobile Accordion Toggle (Biaya Kuliah)
  const mobileBiayaBtn = document.getElementById('mobile-biaya-btn');
  const mobileBiayaSubmenu = document.getElementById('mobile-biaya-submenu');
  const mobileBiayaChevron = document.getElementById('mobile-biaya-chevron');
  if (mobileBiayaBtn && mobileBiayaSubmenu) {
    mobileBiayaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileBiayaSubmenu.classList.toggle('hidden');
      if (mobileBiayaChevron) {
        mobileBiayaChevron.classList.toggle('rotate-180');
      }
    });
  }

  // Active state update for desktop nav items
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ================= SMART STICKY NAVBAR SCRIPT =================
  if (navbar) {
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let ticking = false;
    const scrollThreshold = 8; // Minimal delta threshold to prevent jitter
    const topThreshold = 45;    // Top boundary threshold

    function updateSmartNavbar() {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      // Handle mobile rubber-banding / negative scroll on iOS
      const safeScrollY = Math.max(0, currentScrollY);

      if (safeScrollY <= topThreshold) {
        // At Top: Reset to natural hero style (transparent, no shadow)
        navbar.classList.add('is-top');
        navbar.classList.remove('nav-hidden', 'nav-scrolled');
      } else {
        navbar.classList.remove('is-top');

        const delta = safeScrollY - lastScrollY;

        if (Math.abs(delta) > scrollThreshold) {
          if (delta > 0 && safeScrollY > 100) {
            // Scrolling DOWN -> Hide navbar (slide up)
            navbar.classList.add('nav-hidden');
            navbar.classList.remove('nav-scrolled');

            // Auto close mobile menu when scrolling down
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
              mobileMenu.classList.add('hidden');
            }
          } else if (delta < 0) {
            // Scrolling UP -> Reveal floating sticky navbar
            navbar.classList.remove('nav-hidden');
            navbar.classList.add('nav-scrolled');
          }
        }
      }

      lastScrollY = safeScrollY;
      ticking = false;
    }

    // Passive scroll listener with requestAnimationFrame throttling
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateSmartNavbar);
        ticking = true;
      }
    }, { passive: true });

    // Initial check on page load
    updateSmartNavbar();
  }
});
