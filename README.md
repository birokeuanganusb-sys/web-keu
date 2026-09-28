# Portal Biro Keuangan dan Pengadaan - Universitas Setia Budi

Website portal informasi dan layanan publik Biro Keuangan dan Pengadaan Universitas Setia Budi (USB) Surakarta.

---

## 📁 Struktur Folder Project

```text
web-keu/
│
├── index.html                  # Halaman utama portal publik
├── README.md                   # Dokumentasi project
│
├── assets/                     # Seluruh aset statis (CSS, JS, Gambar)
│   ├── css/
│   │   └── style.css           # Styling kustom, glassmorphism, animasi slider & layout
│   │
│   ├── js/
│   │   ├── data.js             # Data master/mock (Layanan, Berita, Pengumuman, Kontak)
│   │   └── main.js             # Interaktivitas UI, slider hero, pencarian, kalkulator, filter
│   │
│   └── images/                 # Banner, foto kampus, & aset visual
│       ├── hero-campus.jpg     # Background slide 1 (Gedung Kampus USB)
│       ├── hero-payment.jpg    # Background slide 2 (Layanan Keuangan & VA)
│       └── hero-procurement.jpg# Background slide 3 (Tata Kelola Pengadaan)
│
└── admin/                      # Modul Panel Admin / CMS
    └── index.html              # Panel pengelolaan konten portal (Protected CMS)
```

---

## 🚀 Fitur Utama

1. **Header & Navigasi**: Sticky header glassmorphism responsif dengan tema dinamis (Dark / Light / High Contrast).
2. **Hero Banner Interaktif**: Slideshow cross-fade + efek *subtle zoom* (ken burns) dengan tombol aksi cepat.
3. **Pusat Layanan Mahasiswa & Unit**: Panduan Virtual Account (VA), Alur SPP, Dispensasi, Pengadaan Barang/Jasa, dan Standar Biaya Masukan (SBM).
4. **Alat Interaktif**:
   - Simulasi Kalkulator Angsuran Kuliah & Denda Keterlambatan.
   - Pengecekan Status Berkas Pengadaan / SPJ.
   - Bank Dokumen & Formulir SPJ yang dapat diunduh.
5. **Panel Admin CMS (`/admin/`)**:
   - Pengelolaan Berita, Pengumuman, Panduan Layanan, Banner, dan Feedback.
   - Fitur Ekspor Data (`JSON`) dan Reset Data ke Standar Pabrik.

---

## 🔒 Akses Panel Admin

- **URL Akses**: Buka browser dan arahkan ke `/admin/` (contoh: `http://localhost/admin/` atau `file:///.../admin/index.html`).
- **PIN / Password Akses**: `admin123` (dapat diubah di konfigurasi admin).