# Portal Web & CMS Biro Keuangan - Universitas Setia Budi

Sistem informasi portal publik dan Content Management System (CMS) resmi Biro Administrasi Keuangan (BKU) Universitas Setia Budi Surakarta. Portal ini dirancang untuk memberikan kemudahan akses informasi biaya kuliah (UKT/SPP), panduan pembayaran Virtual Account perbankan mitra, verifikasi transaksi, dispensasi, serta sistem pengelolaan berita dan pengumuman akademik terpadu.

---

## 📑 Daftar Isi

- [Struktur Direktori](#-struktur-direktori)
- [Fitur Utama](#-fitur-utama)
  - [1. Portal Publik](#1-portal-publik-indexhtml)
  - [2. CMS Admin Portal](#2-cms-admin-portal-adminindexhtml)
- [Kredensial Akses CMS Admin](#-kredensial-akses-cms-admin)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Petunjuk Menjalankan Project](#-petunjuk-menjalankan-project)
- [Konfigurasi Web Server & URL Bersih](#-konfigurasi-web-server--url-bersih)
- [Lisensi & Hak Cipta](#-lisensi--hak-cipta)

---

## 📁 Struktur Direktori

```text
web-keu/
│
├── .htaccess                 # Konfigurasi Apache (URL rewrite, clean routing /admin)
├── README.md                 # Dokumentasi proyek
├── index.html                # Halaman utama portal publik Biro Keuangan USB
│
├── admin/                    # Modul CMS Administrator
│   └── index.html            # Dashboard CMS Admin & Layar Login Terproteksi
│
├── assets/                   # Aset statis lokal
│   ├── docs/                 # Berkas unduhan (panduan PDF, SK tarif, formulir)
│   └── images/               # Gambar lokal portal (hero, features, background)
│       ├── fav.png           # Favicon logo resmi Biro Keuangan USB
│       ├── hero-campus.jpg
│       ├── feature-spp.jpg
│       ├── feature-verifikasi.jpg
│       ├── feature-beasiswa.jpg
│       └── cta-bg.jpg
│
├── css/                      # Stylesheet modular
│   └── style.css             # Custom styles, styling dropdown, animations, scrollbar
│
└── js/                       # Script interaktif modular
    └── main.js               # Logika navbar, dropdown, modal kalkulator/cek tagihan, scroll
```

---

## 🚀 Fitur Utama

### 1. Portal Publik (`index.html`)
- **Top Bar & Navigation Header**:
  - Logo resmi Universitas Setia Budi & Biro Keuangan.
  - Menu navigasi interaktif dengan dropdown **"BIAYA KULIAH"** (*Panduan UKT* & *Tarif Kuliah*).
  - Tautan langsung ke sistem **SIARTA** dan kontak bantuan.
  - Menu drawer responsif untuk perangkat mobile / smartphone.
- **Hero Section**:
  - Banner foto gedung kampus USB lokal berkualitas tinggi dengan overlay biru navy USB (`#034a78`).
  - Headline informatif dengan tipografi *Plus Jakarta Sans*.
  - Quick badges: Layanan Terintegrasi, VA Bank Resmi, dan Status Operasional Loket.
- **Layanan Keuangan Unggulan**:
  - Rincian informasi biaya kuliah (SPP/UKT), verifikasi pembayaran otomatis, permohonan dispensasi/beasiswa, serta surat bebas tanggungan keuangan.
- **Panduan Pembayaran 4 Langkah & Tabel Bank Mitra**:
  - Alur pembayaran sistematis: Cek Tagihan SIAKAD &rarr; Pilih Bank Mitra &rarr; Salin Nomor VA &rarr; Simpan Bukti Transaksi.
  - Tabel bank mitra resmi: **BNI, Mandiri, BRI, dan Bank Jateng** lengkap dengan kode virtual account.
- **Bottom CTA Banner**:
  - Banner ajakan terpadu berlatar belakang visual kampus dengan gradasi biru gelap elegan.
- **Footer Terpadu (3 Kolom)**:
  - Profil & alamat resmi Biro Keuangan USB.
  - Tautan cepat ke layanan unggulan keuangan.
  - Tautan ke ekosistem kampus terintegrasi: Portal USB Utama, SIAKAD, PMB Online, dan Perpustakaan.

---

### 2. CMS Admin Portal (`admin/index.html`)
- **Sistem Autentikasi & Session Guard**:
  - Layar login terproteksi sebelum masuk ke dalam dashboard admin.
  - Validasi ketat (*strict verification*) terhadap data pengguna administrator.
  - Feedback visual animasi getar (*shake effect*) & banner peringatan jika kredensial salah.
  - Pilihan penyimpanan session: `sessionStorage` atau `localStorage` (*Ingat Saya*).
- **Dashboard Ringkasan & Manajemen Konten**:
  - Ringkasan statistik (Total Konten, Pengumuman Aktif, Draft, Dokumen Terunduh).
  - Tabel data interaktif dengan fitur pencarian instan, filter kategori (SPP, Beasiswa, Dispensasi, dsb), dan filter status publikasi.
  - Form modal tambah & edit konten/dokumen.
  - Fitur bulk action (pilih beberapa baris untuk ubah status atau hapus massal).
  - Shortcut keyboard (misal `Ctrl + K` / `Cmd + K` untuk fokus pencarian cepat).
- **Mekanisme Logout Terintegrasi**:
  - Tombol logout di sidebar untuk menghapus session dan mengembalikan tampilan ke layar login secara aman.

---

## 🔑 Kredensial Akses CMS Admin

Gunakan salah satu akun terdaftar berikut untuk mengakses dashboard CMS Administrator pada URL `/admin`:

| Role | Username | Password | Keterangan |
| :--- | :--- | :--- | :--- |
| **Super Administrator** | `admin` | `admin123` | Akses penuh seluruh modul CMS & data |
| **Staff Keuangan** | `staff_keu` | `keuanganusb2026` | Akses manajemen konten & pengumuman |

---

## 🛠 Teknologi yang Digunakan

- **HTML5 & CSS3** (Semantic HTML & Vanilla CSS)
- **Tailwind CSS v3 (CDN)** untuk utility-first layouting yang responsif & clean
- **JavaScript Modern (ES6+)** untuk manajemen DOM, event listener, dan session authentication
- **Lucide Icons** untuk ikon antarmuka yang tajam dan konsisten
- **Google Fonts**: *Plus Jakarta Sans*
- **Apache `.htaccess`** untuk konfigurasi web server dan URL rewrite

---

## 💻 Petunjuk Menjalankan Project

Project ini berbasis *static web architecture* murni sehingga sangat fleksibel dan dapat dijalankan di berbagai lingkungan:

### Cara 1: Menggunakan Web Server Lokal (XAMPP / Laragon / Apache)
1. Salin folder `web-keu` ke direktori root server:
   - XAMPP: `C:/xampp/htdocs/web-keu/`
   - Laragon: `C:/laragon/www/web-keu/`
2. Buka browser dan akses:
   - **Portal Publik**: `http://localhost/web-keu/`
   - **CMS Admin**: `http://localhost/web-keu/admin`

### Cara 2: Menggunakan PHP Built-in Server
Jalankan perintah berikut di PowerShell atau terminal dari dalam folder project:
```bash
php -S localhost:8000
```
Lalu buka:
- **Portal Publik**: `http://localhost:8000/`
- **CMS Admin**: `http://localhost:8000/admin/`

### Cara 3: Menggunakan VS Code Live Server
1. Buka folder `web-keu` di VS Code / Antigravity IDE.
2. Klik kanan pada berkas `index.html` &rarr; pilih **"Open with Live Server"**.

---

## 🌐 Konfigurasi Web Server & URL Bersih

File [`.htaccess`](.htaccess) telah disiapkan di root folder untuk mengaktifkan:
1. Akses modul admin menggunakan URL bersih tanpa ekstensi `.html` (`/admin`).
2. Directory indexing default yang memprioritaskan `index.html`.
3. Proteksi berkas konfigurasi internal.

---

## 📄 Lisensi & Hak Cipta

Hak Cipta &copy; 2026 **Biro Administrasi Keuangan (BKU) - Universitas Setia Budi Surakarta**.  
Seluruh hak cipta dilindungi undang-undang.
