/**
 * PORTAL BIRO KEUANGAN DAN PENGADAAN
 * UNIVERSITAS SETIA BUDI SURAKARTA
 * Main Interactive Script (main.js)
 */

// =============================================================================
// GLOBAL MODAL & HELPER FUNCTIONS (Exposed immediately on window)
// =============================================================================
window.openModalWithContent = function (data) {
  const globalModal = document.getElementById('globalModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDate = document.getElementById('modalDate');
  const modalBody = document.getElementById('modalBody');
  const modalActionBtn = document.getElementById('modalActionBtn');

  if (!globalModal) return;

  if (modalTitle) modalTitle.textContent = data.title || 'Informasi Biro Keuangan & Pengadaan';
  if (modalCategory) modalCategory.textContent = data.category || 'PENGUMUMAN';
  if (modalDate) modalDate.textContent = data.date || 'Universitas Setia Budi';
  if (modalBody) modalBody.innerHTML = data.content || '<p class="text-slate-600">Informasi detail dokumen belum tersedia.</p>';

  if (modalActionBtn) {
    if (data.actionUrl && data.actionUrl !== '#') {
      modalActionBtn.href = data.actionUrl;
      modalActionBtn.textContent = data.actionText || 'Unduh Dokumen';
      modalActionBtn.classList.remove('hidden');
    } else {
      modalActionBtn.classList.add('hidden');
    }
  }

  globalModal.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
};

window.closeAnyModal = function () {
  const globalModal = document.getElementById('globalModal');
  if (globalModal) {
    globalModal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

window.openAnnouncementModal = function (id) {
  if (!window.portalDataManager) return;
  const item = window.portalDataManager.getAnnouncements().find(x => x.id === id);
  if (!item) return;

  window.openModalWithContent({
    title: item.title,
    category: item.badge || (item.type === 'berita-kegiatan' ? 'BERITA KEGIATAN' : 'PENGUMUMAN RESMI'),
    date: `${item.date || ''} ${item.docNumber ? `| ${item.docNumber}` : ''}`,
    content: item.content || `<p class="text-slate-700 text-sm leading-relaxed">${item.summary || ''}</p>`,
    actionUrl: (item.actionUrl && item.actionUrl !== '#') ? item.actionUrl : undefined,
    actionText: item.actionText || 'Unduh Lampiran'
  });
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi Lucide Icons
  const refreshIcons = () => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };
  refreshIcons();

  /* ==========================================================================
     2. DYNAMIC COLOR THEME SWITCHER (Institutional Navy & Slate)
     ========================================================================== */
  const themeButtons = document.querySelectorAll('.theme-select-btn');
  const currentThemeLabel = document.getElementById('currentThemeLabel');
  const themeNames = {
    'navy-steel': 'Institutional Navy',
    'oxford-gold': 'Oxford Navy & Gold',
    'slate-monochrome': 'Slate Monokrom',
    'pine-emerald': 'Pine & Emerald'
  };

  const applyTheme = (themeName) => {
    if (!themeNames[themeName]) themeName = 'navy-steel';

    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('usb_bakp_theme', themeName);

    if (currentThemeLabel) {
      currentThemeLabel.textContent = themeNames[themeName];
    }

    themeButtons.forEach((btn) => {
      const val = btn.getAttribute('data-theme-val');
      const check = btn.querySelector('.theme-check');
      if (val === themeName) {
        btn.classList.add('bg-slate-100', 'font-bold');
        if (check) check.classList.remove('hidden');
      } else {
        btn.classList.remove('bg-slate-100', 'font-bold');
        if (check) check.classList.add('hidden');
      }
    });

    refreshIcons();
  };

  const savedTheme = localStorage.getItem('usb_bakp_theme') || 'navy-steel';
  applyTheme(savedTheme);

  themeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedTheme = btn.getAttribute('data-theme-val');
      applyTheme(selectedTheme);
    });
  });

  /* ==========================================================================
     3. STICKY NAVBAR DYNAMIC SCROLL BEHAVIOR (60FPS Optimized with rAF)
     ========================================================================== */
  const mainNavbar = document.getElementById('mainNavbar');
  const backToTopBtn = document.getElementById('backToTopBtn');
  let isNavScrolled = false;
  let isBackToTopVisible = false;
  let scrollTicking = false;

  const updateScrollState = () => {
    const scrollY = window.scrollY;

    if (mainNavbar) {
      const shouldScrollNav = scrollY > 30;
      if (shouldScrollNav !== isNavScrolled) {
        isNavScrolled = shouldScrollNav;
        if (isNavScrolled) {
          mainNavbar.classList.add('glass-nav-scrolled');
        } else {
          mainNavbar.classList.remove('glass-nav-scrolled');
        }
      }
    }

    if (backToTopBtn) {
      const shouldShowBackToTop = scrollY > 400;
      if (shouldShowBackToTop !== isBackToTopVisible) {
        isBackToTopVisible = shouldShowBackToTop;
        if (isBackToTopVisible) {
          backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
          backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
        } else {
          backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
          backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
        }
      }
    }

    scrollTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollState);
      scrollTicking = true;
    }
  }, { passive: true });
  updateScrollState();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     3.1 HERO CAROUSEL / SLIDER INTERACTION WITH FADE IN & 4S ZOOM OUT ANIMATION
     ========================================================================== */
  const heroPrevBtn = document.getElementById('heroPrevBtn');
  const heroNextBtn = document.getElementById('heroNextBtn');
  const heroHeadline = document.getElementById('heroHeadline');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const heroBgLayer1 = document.getElementById('heroBgLayer1');
  const heroBgLayer2 = document.getElementById('heroBgLayer2');
  let currentBgLayer = 1;
  const heroSection = document.querySelector('.hero-campus-container');

  const heroActionsContainer = document.getElementById('heroActionsContainer');

  const heroSlides = [
    {
      title: 'Selamat Datang di <br />Website Biro Keuangan <br />& Pengadaan USB',
      desc: 'Menyediakan pelayanan keuangan dan tata kelola pengadaan Universitas Setia Budi yang transparan, akuntabel, dan profesional.',
      image: 'assets/images/hero-campus.jpg',
      primaryBtn: {
        text: 'Panduan Pembayaran',
        icon: 'book-open-check',
        href: '#layanan-cepat',
        modalTrigger: 'payment-guide'
      },
      secondaryBtn: {
        text: 'Layanan Pengadaan',
        icon: 'shopping-bag',
        href: '#pengadaan',
        modalTrigger: 'procurement-guide'
      }
    },
    {
      title: 'Layanan Pembayaran <br />SPP & Angsuran <br />Mahasiswa Terpadu',
      desc: 'Kemudahan verifikasi pembayaran kuliah secara otomatis via Virtual Account Bank Mitra 24 jam dan pengajuan dispensasi terstruktur.',
      image: 'assets/images/hero-payment.jpg',
      primaryBtn: {
        text: 'Petunjuk Virtual Account (VA)',
        icon: 'credit-card',
        href: '#layanan-cepat',
        modalTrigger: 'payment-guide'
      },
      secondaryBtn: {
        text: 'Alur Pembayaran & KRS',
        icon: 'layers',
        href: '#serviceWorkflowSection',
        modalTrigger: null,
        tabTarget: 'keuangan-flow'
      }
    },
    {
      title: 'Tata Kelola Pengadaan <br />Barang & Jasa <br />Modern & Akuntabel',
      desc: 'Standardisasi proses pengusulan belanja unit, pedoman Standar Biaya Masukan (SBM), dan sistem e-procurement transparan di lingkungan USB.',
      image: 'assets/images/hero-procurement.jpg',
      primaryBtn: {
        text: 'SOP & Alur Pengadaan',
        icon: 'shopping-bag',
        href: '#pengadaan',
        modalTrigger: 'procurement-guide'
      },
      secondaryBtn: {
        text: 'Format SPJ & Dokumen',
        icon: 'file-spreadsheet',
        href: '#unduhan',
        modalTrigger: null
      }
    }
  ];

  let currentHeroSlide = 0;
  let heroAutoTimer = null;

  const heroPrimaryBtn = document.getElementById('heroPrimaryBtn');
  const heroSecondaryBtn = document.getElementById('heroSecondaryBtn');
  const heroPrimaryIcon = document.getElementById('heroPrimaryIcon');
  const heroSecondaryIcon = document.getElementById('heroSecondaryIcon');
  const heroPrimaryText = document.getElementById('heroPrimaryText');
  const heroSecondaryText = document.getElementById('heroSecondaryText');

  const updateHeroSlide = (index) => {
    if (!heroHeadline || !heroSubtitle) return;
    currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[currentHeroSlide];
    
    // 1. Smoothly fade out text & buttons together (zero visual snapping)
    heroHeadline.classList.add('is-fading-out');
    heroSubtitle.classList.add('is-fading-out');
    if (heroActionsContainer) {
      heroActionsContainer.classList.add('is-fading-out');
    }

    // 2. Seamless Dual-Layer Background Cross-Fade with 8s linear zoom out
    if (heroBgLayer1 && heroBgLayer2) {
      const activeLayer = currentBgLayer === 1 ? heroBgLayer1 : heroBgLayer2;
      const nextLayer = currentBgLayer === 1 ? heroBgLayer2 : heroBgLayer1;

      // Prepare next layer with new image and fresh zoom animation
      nextLayer.style.backgroundImage = `url('${slide.image}')`;
      nextLayer.classList.remove('is-zooming');
      void nextLayer.offsetWidth; // Force reflow
      nextLayer.classList.add('is-zooming');

      // Cross-fade: smoothly fade in next layer, fade out active layer
      nextLayer.classList.add('hero-bg-active');
      activeLayer.classList.remove('hero-bg-active');

      currentBgLayer = currentBgLayer === 1 ? 2 : 1;
    } else if (heroBgLayer1) {
      // Single layer fallback
      heroBgLayer1.style.animation = 'none';
      heroBgLayer1.style.backgroundImage = `url('${slide.image}')`;
      void heroBgLayer1.offsetWidth;
      heroBgLayer1.style.animation = 'heroZoomOut 8s linear forwards';
    }
    
    // 3. Swap content while opacity is 0 (completely invisible - zero flicker!)
    setTimeout(() => {
      heroHeadline.innerHTML = slide.title;
      heroSubtitle.textContent = slide.desc;
      
      if (heroPrimaryBtn && slide.primaryBtn) {
        heroPrimaryBtn.href = slide.primaryBtn.href;
        if (slide.primaryBtn.modalTrigger) {
          heroPrimaryBtn.setAttribute('data-modal-trigger', slide.primaryBtn.modalTrigger);
        } else {
          heroPrimaryBtn.removeAttribute('data-modal-trigger');
        }
        if (slide.primaryBtn.tabTarget) {
          heroPrimaryBtn.setAttribute('data-tab-target', slide.primaryBtn.tabTarget);
        } else {
          heroPrimaryBtn.removeAttribute('data-tab-target');
        }
        if (heroPrimaryText) heroPrimaryText.textContent = slide.primaryBtn.text;
        if (heroPrimaryIcon) heroPrimaryIcon.innerHTML = `<i data-lucide="${slide.primaryBtn.icon}" class="w-4 h-4"></i>`;
      }

      if (heroSecondaryBtn && slide.secondaryBtn) {
        heroSecondaryBtn.href = slide.secondaryBtn.href;
        if (slide.secondaryBtn.modalTrigger) {
          heroSecondaryBtn.setAttribute('data-modal-trigger', slide.secondaryBtn.modalTrigger);
        } else {
          heroSecondaryBtn.removeAttribute('data-modal-trigger');
        }
        if (slide.secondaryBtn.tabTarget) {
          heroSecondaryBtn.setAttribute('data-tab-target', slide.secondaryBtn.tabTarget);
        } else {
          heroSecondaryBtn.removeAttribute('data-tab-target');
        }
        if (heroSecondaryText) heroSecondaryText.textContent = slide.secondaryBtn.text;
        if (heroSecondaryIcon) heroSecondaryIcon.innerHTML = `<i data-lucide="${slide.secondaryBtn.icon}" class="w-4 h-4 text-blue-300"></i>`;
      }

      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      // 4. Smoothly fade in with the new content (staggered)
      requestAnimationFrame(() => {
        heroHeadline.classList.remove('is-fading-out');
        heroSubtitle.classList.remove('is-fading-out');
        if (heroActionsContainer) {
          heroActionsContainer.classList.remove('is-fading-out');
        }
      });
    }, 220);
  };

  const startHeroAutoSlide = () => {
    if (heroAutoTimer) clearInterval(heroAutoTimer);
    heroAutoTimer = setInterval(() => {
      updateHeroSlide(currentHeroSlide + 1);
    }, 5000);
  };

  const stopHeroAutoSlide = () => {
    if (heroAutoTimer) {
      clearInterval(heroAutoTimer);
      heroAutoTimer = null;
    }
  };

  if (heroPrevBtn) {
    heroPrevBtn.addEventListener('click', () => {
      stopHeroAutoSlide();
      updateHeroSlide(currentHeroSlide - 1);
      startHeroAutoSlide();
    });
  }
  if (heroNextBtn) {
    heroNextBtn.addEventListener('click', () => {
      stopHeroAutoSlide();
      updateHeroSlide(currentHeroSlide + 1);
      startHeroAutoSlide();
    });
  }

  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopHeroAutoSlide);
    heroSection.addEventListener('mouseleave', startHeroAutoSlide);
  }

  // Start auto-slide
  startHeroAutoSlide();

  /* ==========================================================================
     4. MOBILE DRAWER NAVIGATION
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileDrawerBtn = document.getElementById('closeMobileDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');

  const openMobileMenu = () => {
    if (mobileDrawer && mobileDrawerOverlay) {
      mobileDrawer.classList.remove('translate-x-full');
      mobileDrawerOverlay.classList.remove('opacity-0', 'pointer-events-none');
      mobileDrawerOverlay.classList.add('opacity-100', 'pointer-events-auto');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMobileMenu = () => {
    if (mobileDrawer && mobileDrawerOverlay) {
      mobileDrawer.classList.add('translate-x-full');
      mobileDrawerOverlay.classList.remove('opacity-100', 'pointer-events-auto');
      mobileDrawerOverlay.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (closeMobileDrawerBtn) closeMobileDrawerBtn.addEventListener('click', closeMobileMenu);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeMobileMenu);

  const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');
  mobileDropdownTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetSubmenu = document.getElementById(targetId);
      const chevron = btn.querySelector('.mobile-chevron');

      if (targetSubmenu) {
        const isClosed = targetSubmenu.classList.contains('hidden');
        if (isClosed) {
          targetSubmenu.classList.remove('hidden');
          if (chevron) chevron.style.transform = 'rotate(180deg)';
        } else {
          targetSubmenu.classList.add('hidden');
          if (chevron) chevron.style.transform = 'rotate(0deg)';
        }
      }
    });
  });

  /* ==========================================================================
     5. DESKTOP DROPDOWN BEHAVIOR & CLICK OUTSIDE
     ========================================================================== */
  const dropdownGroups = document.querySelectorAll('.desktop-dropdown-group');

  dropdownGroups.forEach((group) => {
    const btn = group.querySelector('.desktop-dropdown-btn');
    const menu = group.querySelector('.dropdown-menu-desktop');

    if (btn && menu) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.contains('active');

        document.querySelectorAll('.dropdown-menu-desktop').forEach((m) => {
          if (m !== menu) m.classList.remove('active');
        });

        if (isOpen) {
          menu.classList.remove('active');
        } else {
          menu.classList.add('active');
        }
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.desktop-dropdown-group')) {
      document.querySelectorAll('.dropdown-menu-desktop').forEach((m) => {
        m.classList.remove('active');
      });
    }
  });

  /* ==========================================================================
     6. TAB SWITCHING: ANNOUNCEMENTS vs NEWS & WORKFLOW TABS
     ========================================================================== */
  const setupTabPanes = (tabButtonSelector, paneSelector) => {
    const buttons = document.querySelectorAll(tabButtonSelector);
    const panes = document.querySelectorAll(paneSelector);

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tabTarget = btn.getAttribute('data-tab');

        buttons.forEach((b) => {
          b.classList.remove('active', 'text-slate-900', 'font-bold', 'border-emerald-500', 'bg-emerald-50', 'text-emerald-800');
          b.classList.add('text-slate-500', 'font-medium');
        });
        btn.classList.add('active', 'text-slate-900', 'font-bold');
        btn.classList.remove('text-slate-500');

        panes.forEach((pane) => {
          if (pane.getAttribute('data-pane') === tabTarget || pane.id === tabTarget) {
            pane.classList.remove('hidden');
          } else {
            pane.classList.add('hidden');
          }
        });

        refreshIcons();
      });
    });
  };

  setupTabPanes('.news-tab-btn', '.news-tab-pane');
  setupTabPanes('.workflow-tab-btn', '.workflow-tab-pane');

  /* ==========================================================================
     7. DYNAMIC CMS DATA RENDERING (Pengumuman, Berita, Unduhan, & Semester Info)
     ========================================================================== */

  // 7.1 Render Semester Highlights in Hero Banner
  const renderDynamicSemester = () => {
    if (!window.portalDataManager) return;
    const info = window.portalDataManager.getInfoSemester();

    const subTitleEl = document.getElementById('heroSemesterSubTitle');
    const badgeEl = document.getElementById('heroSemesterBadge');
    const highlightsContainer = document.getElementById('heroSemesterHighlights');

    if (subTitleEl) subTitleEl.textContent = info.semester || 'Tahun Akademik 2025/2026';
    if (badgeEl) badgeEl.textContent = info.statusBadge || 'Aktif';

    if (highlightsContainer && info.items) {
      highlightsContainer.innerHTML = info.items.map((item) => `
        <div class="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/40 transition">
          <div class="flex items-center justify-between text-slate-300 text-[11px] mb-1">
            <span class="text-blue-300 font-semibold">${item.title}</span>
            <span class="text-slate-400">${item.date}</span>
          </div>
          <p class="text-white font-medium text-xs">${item.desc}</p>
        </div>
      `).join('');
    }
  };

  // 7.2 Render Announcements & News
  const renderDynamicAnnouncements = () => {
    if (!window.portalDataManager) return;
    const items = window.portalDataManager.getAnnouncements();

    const pengumumanPane = document.querySelector('[data-pane="pengumuman-resmi"]');
    const beritaPane = document.querySelector('[data-pane="berita-kegiatan"]');

    // Filter Pengumuman Resmi
    const pengumumanList = items.filter(x => x.type === 'pengumuman-resmi');
    if (pengumumanPane) {
      if (pengumumanList.length === 0) {
        pengumumanPane.innerHTML = `
          <div class="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
            <p class="text-sm font-medium">Belum ada pengumuman resmi yang dipublikasikan.</p>
          </div>
        `;
      } else {
        pengumumanPane.innerHTML = pengumumanList.map(item => {
          const badgeText = (item.badge || 'PENGUMUMAN').toUpperCase();
          let badgeClass = 'bg-blue-50 text-blue-700 border-blue-200';
          if (badgeText.includes('PENTING') || badgeText.includes('DISPENSASI') || badgeText.includes('DEADLINE')) {
            badgeClass = 'bg-amber-50 text-amber-800 border-amber-300 font-extrabold';
          } else if (badgeText.includes('PENGADAAN')) {
            badgeClass = 'bg-indigo-50 text-indigo-700 border-indigo-200';
          } else if (badgeText.includes('TARIF') || badgeText.includes('REGULASI') || badgeText.includes('SBM')) {
            badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
          }

          return `
          <div class="p-5 sm:p-6 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-blue-400/60 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-2">
              <div class="flex flex-wrap items-center gap-2.5">
                <span class="px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${badgeClass}">
                  ${item.badge || 'PENGUMUMAN'}
                </span>
                <span class="text-xs text-slate-500 flex items-center gap-1">
                  <i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-400"></i>
                  ${item.date || '-'}
                </span>
                ${item.docNumber ? `<span class="text-xs text-slate-400">• ${item.docNumber}</span>` : ''}
              </div>
              <h3 onclick="openAnnouncementModal('${item.id}')" class="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition">
                ${item.title}
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 line-clamp-2 max-w-4xl">
                ${item.summary || ''}
              </p>
            </div>
            <div class="flex-shrink-0 flex items-center gap-2">
              <button onclick="openAnnouncementModal('${item.id}')" class="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-800 border border-slate-300 text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                <span>Baca Detail</span>
              </button>
            </div>
          </div>
        `;
        }).join('');
      }
    }

    // Filter Berita & Kegiatan
    const beritaList = items.filter(x => x.type === 'berita-kegiatan');
    if (beritaPane) {
      if (beritaList.length === 0) {
        beritaPane.innerHTML = `
          <div class="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
            <p class="text-sm font-medium">Belum ada berita kegiatan yang dipublikasikan.</p>
          </div>
        `;
      } else {
        beritaPane.innerHTML = `
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${beritaList.map((news) => `
              <div onclick="openAnnouncementModal('${news.id}')" class="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-blue-400/60 transition cursor-pointer flex flex-col justify-between">
                <div>
                  <div class="h-36 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex flex-col justify-end text-white relative">
                    <span class="px-2.5 py-0.5 rounded text-[10px] font-bold bg-white/15 text-slate-100 border border-white/10 absolute top-4 left-4">
                      ${news.badge || 'KEGIATAN'}
                    </span>
                    <span class="text-[11px] text-slate-300 flex items-center gap-1">
                      <i data-lucide="calendar" class="w-3 h-3 text-slate-400"></i>
                      ${news.date || '-'}
                    </span>
                  </div>
                  <div class="p-5">
                    <h4 class="font-bold text-slate-900 text-sm hover:text-blue-600 transition line-clamp-2">
                      ${news.title}
                    </h4>
                    <p class="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      ${news.summary || ''}
                    </p>
                  </div>
                </div>
                <div class="px-5 pb-5 pt-0">
                  <span class="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <span>Baca Selengkapnya</span>
                    <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }
    }

    refreshIcons();
  };

  // 7.3 Render Download Center Items
  const renderDynamicDownloads = () => {
    if (!window.portalDataManager) return;
    const downloadsContainer = document.getElementById('downloadsContainer');
    if (!downloadsContainer) return;

    const list = window.portalDataManager.getDownloads();
    if (list.length === 0) {
      downloadsContainer.innerHTML = `
        <div class="p-8 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
          <p class="text-sm font-medium">Belum ada dokumen yang tersedia untuk diunduh.</p>
        </div>
      `;
      return;
    }

    downloadsContainer.innerHTML = list.map(doc => {
      const isExternal = doc.downloadUrl && doc.downloadUrl.startsWith('http');
      return `
        <div class="download-item bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-400/60 transition" 
             data-category="${doc.category || 'spj'}" 
             data-title="${(doc.title || '').toLowerCase()} ${(doc.fileType || '').toLowerCase()}">
          <div class="flex items-start sm:items-center gap-3.5">
            <div class="w-10 h-10 rounded-lg ${
              doc.fileType === 'PDF' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
              doc.fileType === 'XLSX' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
              'bg-blue-50 text-blue-700 border border-blue-200'
            } flex items-center justify-center flex-shrink-0 font-bold text-xs">
              ${doc.fileType || 'FILE'}
            </div>
            <div>
              <h4 class="text-sm font-bold text-slate-900 hover:text-blue-600 transition">
                ${doc.title}
              </h4>
              <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-slate-500 mt-1">
                <span>Kategori: ${doc.categoryLabel || doc.category}</span>
                <span>• Ukuran: ${doc.fileSize || '-'}</span>
                <span>• Diperbarui: ${doc.updatedDate || '-'}</span>
              </div>
            </div>
          </div>
          <a href="${doc.downloadUrl || '#'}" ${isExternal ? 'target="_blank"' : 'download'} class="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-semibold text-xs transition border border-slate-200 hover:border-blue-600 flex-shrink-0">
            <i data-lucide="download" class="w-3.5 h-3.5"></i>
            <span>Unduh ${doc.fileType || 'File'}</span>
          </a>
        </div>
      `;
    }).join('');

    refreshIcons();
    setupDownloadFilters();
  };

  // 7.4 Live Filter and Search for Download Center
  const setupDownloadFilters = () => {
    const filterButtons = document.querySelectorAll('.download-filter-btn');
    const searchInput = document.getElementById('downloadSearchInput');
    const downloadItems = document.querySelectorAll('.download-item');

    let currentCategory = 'all';
    let searchQuery = '';

    const applyDownloadFilter = () => {
      downloadItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');
        const itemTitle = (item.getAttribute('data-title') || '').toLowerCase();

        const matchesCategory = currentCategory === 'all' || itemCategory === currentCategory;
        const matchesSearch = !searchQuery || itemTitle.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    };

    filterButtons.forEach((btn) => {
      btn.onclick = () => {
        const cat = btn.getAttribute('data-category');
        currentCategory = cat;

        filterButtons.forEach((b) => {
          b.classList.remove('active', 'bg-slate-900', 'text-white', 'font-bold');
          b.classList.add('bg-slate-200/80', 'text-slate-700', 'font-medium');
        });
        btn.classList.add('active', 'bg-slate-900', 'text-white', 'font-bold');
        btn.classList.remove('bg-slate-200/80', 'text-slate-700', 'font-medium');

        applyDownloadFilter();
      };
    });

    if (searchInput) {
      searchInput.oninput = (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        applyDownloadFilter();
      };
    }
  };

  /* ==========================================================================
     7.3 DYNAMIC SECTION ORDER & VISIBILITY (Controlled from CMS Admin)
     ========================================================================== */
  const sectionMap = {
    hero: document.getElementById('heroSection'),
    layananCepat: document.getElementById('layanan-cepat'),
    alurLayanan: document.getElementById('serviceWorkflowSection'),
    pengumuman: document.getElementById('newsAnnouncementSection'),
    statistik: document.getElementById('statisticsSection'),
    unduhan: document.getElementById('unduhan'),
    faq: document.getElementById('faqSection'),
    kontak: document.getElementById('kontak')
  };

  const navLinkMap = {
    layananCepat: document.querySelectorAll('a[href="#layanan-cepat"]'),
    alurLayanan: document.querySelectorAll('a[href="#serviceWorkflowSection"]'),
    pengumuman: document.querySelectorAll('a[href="#pengumuman"]'),
    unduhan: document.querySelectorAll('a[href="#unduhan"]'),
    kontak: document.querySelectorAll('a[href="#kontak"]')
  };

  const applySectionVisibilityAndOrder = () => {
    if (!window.portalDataManager) return;
    const visibility = window.portalDataManager.getSectionVisibility();
    const order = window.portalDataManager.getSectionOrder();
    const container = document.getElementById('pageSectionsContainer');

    // 1. Terapkan Urutan Posisi Section dalam DOM
    if (container && Array.isArray(order)) {
      order.forEach((key) => {
        const el = sectionMap[key];
        if (el && el.parentElement === container) {
          container.appendChild(el);
        }
      });
    }

    // 2. Terapkan display show/hide ke tiap section
    Object.keys(sectionMap).forEach((key) => {
      const el = sectionMap[key];
      if (el) {
        const isVisible = visibility[key] !== false;
        if (isVisible) {
          el.style.display = '';
          el.classList.remove('hidden');
        } else {
          el.style.display = 'none';
          el.classList.add('hidden');
        }
      }
    });

    // 3. Sinkronisasi menu navigasi jika section disembunyikan
    Object.keys(navLinkMap).forEach((key) => {
      const links = navLinkMap[key];
      const isVisible = visibility[key] !== false;
      if (links) {
        links.forEach((link) => {
          if (link.closest('nav') || link.closest('aside')) {
            link.style.display = isVisible ? '' : 'none';
          }
        });
      }
    });
  };

  // Initial CMS Renderings
  applySectionVisibilityAndOrder();
  renderDynamicSemester();
  renderDynamicAnnouncements();
  renderDynamicDownloads();

  // Listen for Cross-Window / Admin Updates
  window.addEventListener('usb_data_updated', () => {
    applySectionVisibilityAndOrder();
    renderDynamicSemester();
    renderDynamicAnnouncements();
    renderDynamicDownloads();
  });

  window.addEventListener('storage', (e) => {
    if (e.key === 'USB_BAKP_PORTAL_DATA_V1' && window.portalDataManager) {
      window.portalDataManager.data = window.portalDataManager.loadData();
      applySectionVisibilityAndOrder();
      renderDynamicSemester();
      renderDynamicAnnouncements();
      renderDynamicDownloads();
    }
  });

  /* ==========================================================================
     8. METRIC COUNTER ANIMATIONS
     ========================================================================== */
  const metricCounters = document.querySelectorAll('.metric-counter');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;
    countersAnimated = true;

    metricCounters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const isDecimal = target % 1 !== 0;
      const duration = 1800;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = target * easeOut;

        counter.textContent = isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = isDecimal ? target.toFixed(1) : target;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const metricsSection = document.getElementById('capaianKinerja');
  if (metricsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(metricsSection);
  } else {
    animateCounters();
  }

  /* ==========================================================================
     9. FAQ ACCORDION INTERACTION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (header && content) {
      header.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');

        faqItems.forEach((otherItem) => {
          const otherContent = otherItem.querySelector('.faq-content');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherContent) otherContent.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          content.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  /* ==========================================================================
     10. MODAL EVENT LISTENERS
     ========================================================================== */
  const globalModal = document.getElementById('globalModal');
  const modalCloseBtns = document.querySelectorAll('.modal-close-trigger');

  modalCloseBtns.forEach((btn) => {
    btn.addEventListener('click', window.closeAnyModal);
  });

  if (globalModal) {
    globalModal.addEventListener('click', (e) => {
      if (e.target === globalModal) {
        window.closeAnyModal();
      }
    });
  }

  // Pre-configured Modal & Tab Triggers with Event Delegation
  document.addEventListener('click', (e) => {
    // 1. Tab Target Trigger
    const tabTargetBtn = e.target.closest('[data-tab-target]');
    if (tabTargetBtn) {
      const tabName = tabTargetBtn.getAttribute('data-tab-target');
      const targetWorkflowTab = document.querySelector(`.workflow-tab-btn[data-tab="${tabName}"]`);
      if (targetWorkflowTab) {
        targetWorkflowTab.click();
      }
    }

    // 2. Modal Trigger
    const modalTriggerBtn = e.target.closest('[data-modal-trigger]');
    if (modalTriggerBtn) {
      e.preventDefault();
      const type = modalTriggerBtn.getAttribute('data-modal-trigger');

      if (type === 'payment-guide') {
        window.openModalWithContent({
          title: 'Petunjuk Teknis Pembayaran Biaya Kuliah Mahasiswa TA 2025/2026',
          category: 'PANDUAN KEUANGAN',
          date: 'Dipublikasikan: 15 Maret 2026',
          content: `
            <div class="space-y-4 text-sm text-slate-700 leading-relaxed">
              <div class="p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded text-emerald-900">
                <strong>Penting:</strong> Pastikan Anda menggunakan Kode Virtual Account (VA) resmi atas nama Universitas Setia Budi yang tertera di akun SIAKAD masing-masing.
              </div>
              <h4 class="font-bold text-slate-900 text-base">A. Metode Pembayaran Virtual Account (VA):</h4>
              <ol class="list-decimal pl-5 space-y-2">
                <li><strong>Bank BNI:</strong> Akses BNI Mobile / ATM > Menu Pembayaran > Virtual Account Billing > Masukkan Nomor VA Mahasiswa USB.</li>
                <li><strong>Bank Mandiri:</strong> Akses Livin' by Mandiri > Menu Bayar > Cari Penyedia Jasa "Universitas Setia Budi" > Masukkan NIM.</li>
                <li><strong>Bank Jateng / Bank Syariah Indonesia (BSI):</strong> Tersedia melalui teller cabang atau mobile banking mitra.</li>
              </ol>
              <h4 class="font-bold text-slate-900 text-base mt-4">B. Verifikasi Otomatis:</h4>
              <p>Sistem SIMKEU USB terhubung secara real-time. Status pembayaran pada SIAKAD akan langsung aktif dalam kurun waktu 1–5 menit setelah transaksi berhasil.</p>
              <h4 class="font-bold text-slate-900 text-base mt-4">C. Bantuan & Loket:</h4>
              <p>Jika dalam 1x24 jam status belum berubah, kirim bukti setor ke WhatsApp Helpdesk Keuangan: <strong>+62 812-3456-7890</strong>.</p>
            </div>
          `,
          actionUrl: '#',
          actionText: 'Unduh Buku Panduan (PDF)'
        });
      } else if (type === 'procurement-guide') {
        window.openModalWithContent({
          title: 'Standar Operasional Prosedur Pengadaan Barang & Jasa Unit Kerja',
          category: 'LAYANAN PENGADAAN',
          date: 'Dipublikasikan: 10 Maret 2026',
          content: `
            <div class="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>Seluruh pengadaan barang inventaris, ATK, dan jasa pemeliharaan di lingkungan Universitas Setia Budi wajib mengikuti alur baku e-Procurement BAKP:</p>
              <h4 class="font-bold text-slate-900 text-base">Tahapan Pengajuan:</h4>
              <ul class="list-disc pl-5 space-y-1.5">
                <li><strong>Tahap 1:</strong> Pengajuan Form Rencana Anggaran Biaya (RAB) dan Kerangka Acuan Kerja (KAK) minimal 14 hari sebelum kegiatan.</li>
                <li><strong>Tahap 2:</strong> Verifikasi pagu anggaran unit oleh Bagian Keuangan dan persetujuan Wakil Rektor II.</li>
                <li><strong>Tahap 3:</strong> Proses pengadaan / pemilihan penyedia oleh Bagian Pengadaan (E-Katalog / Rekanan Terdaftar).</li>
                <li><strong>Tahap 4:</strong> Berita Acara Serah Terima (BAST) & Pengujian Fisik Barang/Jasa.</li>
                <li><strong>Tahap 5:</strong> Pelaporan SPJ Keuangan maksimal 7 hari kalender pasca BAST.</li>
              </ul>
            </div>
          `,
          actionUrl: '#',
          actionText: 'Unduh Template Pengajuan (ZIP)'
        });
      }
    }
  });

  // Delegated Smooth scroll for anchor links
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor && !anchor.closest('[data-modal-trigger]')) {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#' && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 85;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    }
  });
});
