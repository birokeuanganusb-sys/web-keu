/**
 * DATA MANAGER & SEED DATA - PORTAL BAKP UNIVERSITAS SETIA BUDI
 * Menangani penyimpanan, pembaruan, dan pengambilan data dinamis
 * untuk Pengumuman, Berita, Dokumen Unduhan, Informasi Semester,
 * Visibilitas Section, dan Urutan Posisi Section.
 */

const USB_STORAGE_KEY = 'USB_BAKP_PORTAL_DATA_V1';

const DEFAULT_SECTION_ORDER = [
  'hero',          // 1. Hero Banner & Slider Kampus
  'layananCepat',  // 2. Layanan Utama & Akses Cepat
  'alurLayanan',   // 3. Alur Layanan Baku (SOP Tabs)
  'pengumuman',    // 4. Pengumuman Resmi & Berita Kegiatan
  'statistik',     // 5. Statistik & Capaian Kinerja
  'unduhan',       // 6. Pusat Unduhan Regulasi & SPJ
  'faq',           // 7. FAQ (Tanya Jawab Layanan)
  'kontak'         // 8. Footer, Jam Loket & Kontak Helpdesk
];

const DEFAULT_PORTAL_DATA = {
  sectionOrder: [...DEFAULT_SECTION_ORDER],
  sectionVisibility: {
    hero: true,
    layananCepat: true,
    alurLayanan: true,
    pengumuman: true,
    statistik: true,
    unduhan: true,
    faq: true,
    kontak: true
  },
  infoSemester: {
    semester: 'Tahun Akademik 2025/2026',
    statusBadge: 'Aktif',
    items: [
      {
        id: 'sem-1',
        title: 'Batas Pembayaran SPP Tahap II',
        date: '30 April 2026',
        desc: 'Batas akhir pembayaran SPP dan angsuran registrasi akademik mahasiswa.',
        color: 'blue'
      },
      {
        id: 'sem-2',
        title: 'Pengajuan Usulan Pengadaan',
        date: 'Setiap Hari Kerja',
        desc: 'Pengusulan barang ATK / Operasional unit via form KAK online.',
        color: 'slate'
      },
      {
        id: 'sem-3',
        title: 'Pelaporan SPJ Keuangan Unit',
        date: 'Maks. H+7 Kegiatan',
        desc: 'Penyerahan berkas fisik & kuitansi sah ke Bagian Verifikasi Keuangan.',
        color: 'blue'
      }
    ]
  },
  announcements: [
    {
      id: 'ann-1',
      type: 'pengumuman-resmi',
      badge: 'PENGUMUMAN PENTING',
      badgeColor: 'blue',
      date: '20 Maret 2026',
      docNumber: 'No. Surat: 142/BAKP-USB/III/2026',
      title: 'Jadwal & Mekanisme Pengajuan Dispensasi Pembayaran SPP Semester Genap TA 2025/2026',
      summary: 'Diberitahukan kepada seluruh mahasiswa Universitas Setia Budi bahwa pengajuan dispensasi penundaan atau angsuran SPP Semester Genap dibuka mulai tanggal 25 Maret s.d. 10 April 2026 melalui formulir online SIMKEU.',
      content: '<p class="text-slate-700 text-sm leading-relaxed mb-3">Pengajuan dispensasi pembayaran SPP dan biaya pendidikan lainnya dapat diajukan oleh mahasiswa dengan ketentuan:</p><ul class="list-disc pl-5 space-y-1.5 text-xs text-slate-600 mb-3"><li>Mengisi formulir permohonan dispensasi resmi yang ditandatangani orang tua/wali.</li><li>Mendapat persetujuan dan tanda tangan Dekan Fakultas atau Kaprodi terkait.</li><li>Melampirkan bukti kuitansi pembayaran SPP tahap sebelumnya.</li></ul><p class="text-slate-700 text-sm leading-relaxed">Seluruh berkas persyaratan diunggah melalui formulir digital pada sistem SIMKEU USB.</p>',
      actionUrl: '#',
      actionText: 'Unduh Surat Edaran (PDF)'
    },
    {
      id: 'ann-2',
      type: 'pengumuman-resmi',
      badge: 'PENGADAAN',
      badgeColor: 'slate',
      date: '14 Maret 2026',
      docNumber: 'No. Surat: 098/PENG-BAKP/III/2026',
      title: 'Pemberitahuan Batas Akhir Penyerahan Berkas SPJ Kegiatan Triwulan I Tahun 2026',
      summary: 'Seluruh unit kerja, fakultas, dan lembaga di lingkungan Universitas Setia Budi wajib menyerahkan seluruh bukti pertanggungjawaban keuangan Triwulan I paling lambat tanggal 31 Maret 2026 pukul 15.00 WIB.',
      content: '<p class="text-slate-700 text-sm leading-relaxed mb-3">Kepada Yth. Pimpinan Unit Kerja, Fakultas, dan Lembaga di lingkungan Universitas Setia Budi Surakarta.</p><p class="text-slate-700 text-sm leading-relaxed mb-3">Sehubungan dengan penutupan pembukuan anggaran Triwulan I TA 2026, kami mengingatkan agar seluruh berkas SPJ (Surat Pertanggungjawaban) kegiatan yang telah terlaksana diserahkan ke Bagian Keuangan dengan ketentuan:</p><ul class="list-disc pl-5 space-y-1.5 text-xs text-slate-600 mb-3"><li>Kuitansi asli bermeterai cukup dan cap basah penyedia/toko.</li><li>Faktur pajak (jika belanja kena PPN/PPh).</li><li>Dokumen BAST (Berita Acara Serah Terima Barang).</li></ul><p class="text-slate-700 text-sm leading-relaxed">Keterlambatan penyerahan SPJ dapat mengakibatkan penangguhan pencairan dana pada triwulan berikutnya.</p>',
      actionUrl: '#',
      actionText: 'Unduh Format Checklist SPJ'
    },
    {
      id: 'ann-3',
      type: 'pengumuman-resmi',
      badge: 'TARIF & REGULASI',
      badgeColor: 'blue',
      date: '01 Maret 2026',
      docNumber: 'SK Rektor No. 045/SK/USB/2026',
      title: 'Pemberlakuan Standar Biaya Masukan (SBM) dan Tarif Honorarium Kegiatan Tahun 2026',
      summary: 'Sosialisasi buku pedoman Standar Biaya Masukan terbaru sebagai acuan resmi penyusunan Rencana Anggaran Biaya (RAB) kegiatan seminar, workshop, dan operasional unit.',
      content: '<p class="text-slate-700 text-sm leading-relaxed mb-3">Telah diterbitkan SK Rektor No. 045/SK/USB/2026 mengenai Pedoman Standar Biaya Masukan (SBM) Tahun Anggaran 2026.</p><p class="text-slate-700 text-sm leading-relaxed mb-3">Buku pedoman ini mengatur batas pagu tertinggi untuk honorarium narasumber, konsumsi rapat/kegiatan, akomodasi perjalanan dinas, dan pengadaan inventaris kantor.</p>',
      actionUrl: '#',
      actionText: 'Unduh Buku Pedoman SBM 2026 (PDF)'
    },
    {
      id: 'news-1',
      type: 'berita-kegiatan',
      badge: 'WORKSHOP',
      badgeColor: 'blue',
      date: '18 Maret 2026',
      docNumber: 'Humas BAKP USB',
      title: 'Sosialisasi Sistem E-Procurement dan Tata Kelola Anggaran Berbasis Kinerja Tahun 2026',
      summary: 'BAKP menggelar bimbingan teknis implementasi portal pengadaan barang digital bagi seluruh kepala tata usaha dan bendahara unit di Ruang Sidang Rektorat USB.',
      content: '<p class="text-slate-700 text-sm leading-relaxed mb-3">Biro Keuangan dan Pengadaan Universitas Setia Budi sukses menyelenggarakan Workshop Pengelolaan Anggaran Berbasis Kinerja dan Implementasi E-Procurement pada hari Rabu, 18 Maret 2026.</p><p class="text-slate-700 text-sm leading-relaxed">Acara ini dihadiri oleh 40 perwakilan bendahara fakultas dan unit kerja guna mempercepat digitalisasi proses belanja barang serta memperketat akuntabilitas pelaporan SPJ.</p>',
      actionUrl: '#',
      actionText: 'Lihat Dokumentasi Kegiatan'
    },
    {
      id: 'news-2',
      type: 'berita-kegiatan',
      badge: 'PRESTASI',
      badgeColor: 'slate',
      date: '10 Februari 2026',
      docNumber: 'Audit Eksternal',
      title: 'Universitas Setia Budi Raih Kembali Opini Wajar Tanpa Pengecualian (WTP) Atas Laporan Keuangan 2025',
      summary: 'Hasil audit Kantor Akuntan Publik (KAP) independen menyatakan laporan keuangan tahun buku 2025 disajikan secara wajar dan memenuhi standar akuntansi keuangan.',
      content: '<p class="text-slate-700 text-sm leading-relaxed mb-3">Universitas Setia Budi kembali mempertahankan predikat Opini Wajar Tanpa Pengecualian (WTP) dari Kantor Akuntan Publik Independen untuk Laporan Keuangan Tahun Buku 2025.</p><p class="text-slate-700 text-sm leading-relaxed">Pencapaian ini membuktikan komitmen transparansi, integritas, dan keandalan tata kelola finansial institusi di bawah kepemimpinan rektorat dan tim keuangan BAKP.</p>',
      actionUrl: '#',
      actionText: 'Baca Berita Lengkap'
    }
  ],
  downloads: [
    {
      id: 'doc-1',
      title: 'Template Format Laporan Pertanggungjawaban (LPJ/SPJ) Kegiatan Unit 2026',
      category: 'spj',
      fileType: 'XLSX',
      fileSize: '184 KB',
      updatedDate: 'Februari 2026',
      downloadUrl: '#',
      categoryLabel: 'Format SPJ'
    },
    {
      id: 'doc-2',
      title: 'Format Kuitansi Resmi Pembayaran & Surat Pernyataan Tanggung Jawab Mutlak (SPTJM)',
      category: 'spj',
      fileType: 'DOCX',
      fileSize: '96 KB',
      updatedDate: 'Januari 2026',
      downloadUrl: '#',
      categoryLabel: 'Format SPJ'
    },
    {
      id: 'doc-3',
      title: 'SOP Pengadaan Barang & Jasa di Lingkungan Universitas Setia Budi Surakarta',
      category: 'sop',
      fileType: 'PDF',
      fileSize: '1.2 MB',
      updatedDate: 'Januari 2026',
      downloadUrl: '#',
      categoryLabel: 'Standar SOP'
    },
    {
      id: 'doc-4',
      title: 'SK Rektor: Pedoman Standar Biaya Masukan (SBM) & Honorarium Tahun Anggaran 2026',
      category: 'sk',
      fileType: 'PDF',
      fileSize: '2.4 MB',
      updatedDate: 'Maret 2026',
      downloadUrl: '#',
      categoryLabel: 'SK & Edaran Tarif'
    },
    {
      id: 'doc-5',
      title: 'Formulir Permohonan Dispensasi Angsuran & Penundaan Pembayaran SPP Mahasiswa',
      category: 'spj',
      fileType: 'DOCX',
      fileSize: '78 KB',
      updatedDate: 'Januari 2026',
      downloadUrl: '#',
      categoryLabel: 'Format SPJ'
    },
    {
      id: 'doc-6',
      title: 'SOP Pengajuan Uang Muka Kerja (UMK) dan Mekanisme Rekonsiliasi Anggaran',
      category: 'sop',
      fileType: 'PDF',
      fileSize: '850 KB',
      updatedDate: 'Februari 2026',
      downloadUrl: '#',
      categoryLabel: 'Standar SOP'
    }
  ]
};

// Data Manager Class
class PortalDataManager {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(USB_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!parsed.sectionVisibility) {
          parsed.sectionVisibility = { ...DEFAULT_PORTAL_DATA.sectionVisibility };
        }
        if (!parsed.sectionOrder || !Array.isArray(parsed.sectionOrder) || parsed.sectionOrder.length === 0) {
          parsed.sectionOrder = [...DEFAULT_SECTION_ORDER];
        } else {
          // Pastikan semua key ada
          DEFAULT_SECTION_ORDER.forEach(key => {
            if (!parsed.sectionOrder.includes(key)) {
              parsed.sectionOrder.push(key);
            }
          });
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Gagal membaca data dari localStorage, menggunakan data default:', e);
    }
    this.saveData(DEFAULT_PORTAL_DATA);
    return JSON.parse(JSON.stringify(DEFAULT_PORTAL_DATA));
  }

  saveData(dataToSave) {
    try {
      this.data = dataToSave || this.data;
      localStorage.setItem(USB_STORAGE_KEY, JSON.stringify(this.data));
      window.dispatchEvent(new CustomEvent('usb_data_updated', { detail: this.data }));
      return true;
    } catch (e) {
      console.error('Gagal menyimpan data ke localStorage:', e);
      return false;
    }
  }

  // --- Section Order (Urutan Posisi) API ---
  getSectionOrder() {
    if (!this.data.sectionOrder || !Array.isArray(this.data.sectionOrder) || this.data.sectionOrder.length === 0) {
      this.data.sectionOrder = [...DEFAULT_SECTION_ORDER];
    }
    return this.data.sectionOrder;
  }

  saveSectionOrder(newOrderArray) {
    if (Array.isArray(newOrderArray) && newOrderArray.length > 0) {
      this.data.sectionOrder = newOrderArray;
      this.saveData();
    }
    return this.getSectionOrder();
  }

  moveSection(sectionKey, direction) {
    const currentOrder = [...this.getSectionOrder()];
    const index = currentOrder.indexOf(sectionKey);
    if (index === -1) return currentOrder;

    if (direction === 'up' && index > 0) {
      const temp = currentOrder[index - 1];
      currentOrder[index - 1] = currentOrder[index];
      currentOrder[index] = temp;
    } else if (direction === 'down' && index < currentOrder.length - 1) {
      const temp = currentOrder[index + 1];
      currentOrder[index + 1] = currentOrder[index];
      currentOrder[index] = temp;
    }

    return this.saveSectionOrder(currentOrder);
  }

  // --- Section Visibility API ---
  getSectionVisibility() {
    return {
      ...DEFAULT_PORTAL_DATA.sectionVisibility,
      ...(this.data.sectionVisibility || {})
    };
  }

  saveSectionVisibility(visibilityObj) {
    this.data.sectionVisibility = {
      ...this.getSectionVisibility(),
      ...visibilityObj
    };
    this.saveData();
    return this.data.sectionVisibility;
  }

  toggleSection(sectionKey, isVisible) {
    if (!this.data.sectionVisibility) {
      this.data.sectionVisibility = { ...DEFAULT_PORTAL_DATA.sectionVisibility };
    }
    const current = this.data.sectionVisibility[sectionKey] !== false;
    this.data.sectionVisibility[sectionKey] = isVisible !== undefined ? isVisible : !current;
    this.saveData();
    return this.data.sectionVisibility[sectionKey];
  }

  // --- Announcements API ---
  getAnnouncements() {
    return this.data.announcements || [];
  }

  saveAnnouncement(announcement) {
    if (!announcement.id) {
      announcement.id = 'ann-' + Date.now();
      this.data.announcements.unshift(announcement);
    } else {
      const idx = this.data.announcements.findIndex(item => item.id === announcement.id);
      if (idx !== -1) {
        this.data.announcements[idx] = announcement;
      } else {
        this.data.announcements.unshift(announcement);
      }
    }
    this.saveData();
    return announcement;
  }

  deleteAnnouncement(id) {
    this.data.announcements = this.data.announcements.filter(item => item.id !== id);
    this.saveData();
  }

  // --- Downloads API ---
  getDownloads() {
    return this.data.downloads || [];
  }

  saveDownload(downloadItem) {
    if (!downloadItem.id) {
      downloadItem.id = 'doc-' + Date.now();
      this.data.downloads.unshift(downloadItem);
    } else {
      const idx = this.data.downloads.findIndex(item => item.id === downloadItem.id);
      if (idx !== -1) {
        this.data.downloads[idx] = downloadItem;
      } else {
        this.data.downloads.unshift(downloadItem);
      }
    }
    this.saveData();
    return downloadItem;
  }

  deleteDownload(id) {
    this.data.downloads = this.data.downloads.filter(item => item.id !== id);
    this.saveData();
  }

  // --- Info Semester API ---
  getInfoSemester() {
    return this.data.infoSemester || DEFAULT_PORTAL_DATA.infoSemester;
  }

  saveInfoSemester(info) {
    this.data.infoSemester = info;
    this.saveData();
  }

  // --- Reset & Backup Tools ---
  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_PORTAL_DATA));
    this.saveData();
  }

  exportJSON() {
    return JSON.stringify(this.data, null, 2);
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.announcements && parsed.downloads && parsed.infoSemester) {
        if (!parsed.sectionVisibility) {
          parsed.sectionVisibility = { ...DEFAULT_PORTAL_DATA.sectionVisibility };
        }
        if (!parsed.sectionOrder || !Array.isArray(parsed.sectionOrder)) {
          parsed.sectionOrder = [...DEFAULT_SECTION_ORDER];
        }
        this.data = parsed;
        this.saveData();
        return true;
      }
      return false;
    } catch (e) {
      console.error('Format JSON tidak valid:', e);
      return false;
    }
  }
}

// Global instance
window.portalDataManager = new PortalDataManager();
