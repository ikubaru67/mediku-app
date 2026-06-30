# MediKu — Aplikasi Konsultasi Kesehatan

**Versi 0.5.6** — Platform konsultasi dengan tenaga kesehatan (Psikolog, Psikiater, Dokter Umum) melalui chat dan video call.

---

## Daftar Isi

- [Teknologi](#teknologi)
- [Struktur Folder](#struktur-folder)
- [Cara Install & Run](#cara-install--run)
- [Arsitektur](#arsitektur)
- [Proses Bisnis](#proses-bisnis)
- [Daftar Route](#daftar-route)
- [Fitur per Halaman](#fitur-per-halaman)
- [Environment Variables](#environment-variables)

---

## Teknologi

### Core Stack

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| React | ^19.2.7 | UI library |
| TypeScript | ~6.0.2 | Type checking |
| Vite | ^8.1.0 | Bundler & dev server |
| Tailwind CSS | ^4.3.1 | Utility CSS framework |
| React Router | ^7.18.0 | Client-side routing |
| Firebase | ^12.15.0 | Authentication |

### Dependencies Utama

| Library | Kegunaan |
|---------|----------|
| `react-router-dom` | Routing SPA |
| `firebase` | Auth (email/password + Google) |
| `leaflet` | Peta interaktif (halaman Klinik) |
| `canvas-confetti` | Animasi confetti saat pembayaran sukses |

### Dev Dependencies

| Library | Kegunaan |
|---------|----------|
| `@vitejs/plugin-react` | React Fast Refresh |
| `@tailwindcss/vite` | Integrasi Tailwind ke Vite |
| `oxlint` | Linter |
| `typescript` | Type checking |

### Infrastruktur

- **Cloudinary** — Hosting gambar (logo, avatar dokter, artikel, dll)
- **Vercel** — Deployment (SPA rewrite rules di `vercel.json`)
- **Overpass API** — Data fasilitas kesehatan dari OpenStreetMap
- **Leaflet** — Tampilan peta interaktif

---

## Struktur Folder

```
mediku-app/
├── index.html                 # Entry HTML (font Manrope, favicon)
├── vite.config.ts             # Vite + React + Tailwind plugin
├── tsconfig.json              # Konfigurasi TypeScript
├── vercel.json                # Aturan SPA rewrite untuk Vercel
├── .env.example               # Template environment variables
│
├── src/
│   ├── main.tsx               # Entry point (StrictMode + BrowserRouter)
│   ├── App.tsx                # Definisi semua route
│   ├── index.css              # Tailwind, tema kustom, animasi
│   │
│   ├── types/index.ts         # Interface: User, Psikolog, Artikel, dll
│   ├── config/images.ts       # URL Cloudinary untuk semua aset
│   ├── services/firebase.ts   # Inisialisasi Firebase Auth
│   ├── hooks/useAuth.ts       # Hook auth state observer
│   ├── layouts/MainLayout.tsx # Layout dengan BottomNav
│   │
│   ├── components/            # Komponen reusable
│   │   ├── BottomNav.tsx      # Navigasi bawah 5 tab
│   │   ├── Button.tsx         # Tombol dengan varian
│   │   ├── Card.tsx           # Card generic
│   │   ├── Icon.tsx           # Library SVG icon (~30 icon)
│   │   ├── ProtectedRoute.tsx # Guard autentikasi
│   │   ├── SplashScreen.tsx   # Animasi splash setelah login
│   │   └── ComingSoonPopup.tsx # Modal fitur belum tersedia
│   │
│   ├── features/              # Halaman per fitur
│   │   ├── auth/              # Login, Register, Lupa Password
│   │   ├── onboarding/        # Intro carousel 4 slide
│   │   ├── home/              # Dashboard utama
│   │   ├── konsultasi/        # Listing dokter, profil, chat, video call
│   │   ├── jadwal/            # Jadwal saya, pesan jadwal baru
│   │   ├── pembayaran/        # Konfirmasi bayar, sukses bayar
│   │   ├── rekam-medis/       # Riwayat rekam medis
│   │   ├── klinik/            # Cari klinik (list + map)
│   │   ├── obat/              # Pengingat obat
│   │   ├── artikel/           # Baca artikel
│   │   └── profil/            # Profil user, edit, pengaturan
│   │
│   └── mocks/                 # Data statis (simulasi backend)
│       ├── konsultasi.ts      # 5 mock dokter + ulasan
│       ├── artikel.ts         # 16 artikel dengan konten HTML
│       └── profil.ts          # Menu profil
```

---

## Cara Install & Run

### Prasyarat

- **Node.js** >= 18
- **npm** >= 9
- Akun **Firebase** (untuk Auth)

### Langkah

```bash
# Clone repository
git clone https://github.com/username/mediku-app.git
cd mediku-app

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Isi .env dengan konfigurasi Firebase Anda:
#   VITE_FIREBASE_API_KEY=...
#   VITE_FIREBASE_AUTH_DOMAIN=...
#   VITE_FIREBASE_PROJECT_ID=...
#   VITE_FIREBASE_STORAGE_BUCKET=...
#   VITE_FIREBASE_MESSAGING_SENDER_ID=...
#   VITE_FIREBASE_APP_ID=...

# Jalankan development server
npm run dev

# Build production
npm run build

# Preview build
npm run preview
```

### Scripts

| Script | Perintah |
|--------|----------|
| `npm run dev` | Jalankan dev server (port 5173) |
| `npm run build` | TypeScript check + build Vite |
| `npm run lint` | Linting dengan oxlint |
| `npm run preview` | Preview production build |

---

## Arsitektur

### Pola Halaman

Setiap fitur berada di folder `src/features/{nama-fitur}/` sebagai file page. Route didefinisikan di `App.tsx` dengan dua kategori:

1. **Full-screen pages** — Tanpa BottomNav, untuk halaman spesifik (chat, video call, booking, dll)
2. **Bottom nav pages** — Dibungkus `MainLayout` yang menyediakan navigasi bawah

### Aliran Data

```
Firebase Auth ─► useAuth() hook ─► ProtectedRoute ─► Pages
                                   │
localStorage  ─► Data booking, profil, notifikasi
                                   │
Mock data     ─► Dokter, artikel, jadwal (static arrays)
```

- **Firebase Auth** satu-satunya backend real
- **localStorage** menyimpan data booking, profil, notifikasi
- **Mock data** untuk daftar dokter, artikel, dll (static arrays di `src/mocks/`)
- **Cloudinary** untuk semua gambar (CDN)
- **Overpass API** untuk data klinik real-time

### Keamanan

- Route dilindungi `ProtectedRoute` — redirect ke `/login` jika belum login
- Firebase Auth untuk autentikasi email/password + Google
- `prefers-reduced-motion` dihormati untuk aksesibilitas
- `focus-visible` ring pada semua elemen interaktif

---

## Proses Bisnis

### Alur Konsultasi (Fitur Utama)

```
                    ┌─────────────────┐
                    │  Login/Register  │
                    └────────┬────────┘
                             ▼
                    ┌─────────────────┐
                    │   Home/Dashboard │
                    └────────┬────────┘
                             ▼
                    ┌─────────────────┐
                    │   Konsultasi     │
                    │ (Daftar Tenaga   │
                    │   Kesehatan)     │
                    └────────┬────────┘
                             ▼
                    ┌─────────────────┐
                    │ Profil Tenaga    │
                    │   Kesehatan      │
                    └────────┬────────┘
                             ▼
                    ┌─────────────────┐
                    │  Pesan Jadwal    │
                    │ • Pilih tanggal  │
                    │ • Pilih jam      │
                    │ • Pilih tipe     │
                    │   (Video/Chat)   │
                    └────────┬────────┘
                             ▼
                    ┌─────────────────┐
                    │  Pembayaran      │
                    │ (EWallet/VA)     │
                    └────────┬────────┘
                             ▼
                    ┌─────────────────┐
                    │  Pembayaran      │
                    │    Berhasil      │
                    │ • Jadwal tersimpan│
                    │ • Notifikasi     │
                    └────────┬────────┘
                             ▼
                    ┌─────────────────┐
                    │   Jadwal Saya    │
                    │   (Mendatang)    │
                    └────────┬────────┘
                             ▼
            ┌────────────────┴────────────────┐
            ▼                                  ▼
    ┌──────────────────┐            ┌──────────────────┐
    │  Chat Konsultasi │            │  Video Call       │
    └────────┬─────────┘            └────────┬─────────┘
             ▼                               ▼
    ┌──────────────────┐            ┌──────────────────┐
    │  Akhiri Sesi     │            │  Akhiri Sesi     │
    └────────┬─────────┘            └────────┬─────────┘
             ▼                               ▼
    ┌──────────────────────────────────────────┐
    │           Jadwal Saya (Riwayat)          │
    │           Status: SELESAI                │
    └──────────────────────────────────────────┘
```

### Alur Lainnya

**Artikel:** Filter kategori → Featured card → Baca artikel
**Klinik:** Deteksi lokasi → Cari fasilitas → List/Map → Petunjuk arah
**Rekam Medis:** Riwayat diagnosis → Filter type → Lihat detail
**Profil:** Edit data → FAQ → Hubungi Kami → Kebijakan Privasi → Logout

---

## Daftar Route

### Publik (Tanpa Login)

| Path | Halaman |
|------|---------|
| `/` | Onboarding (4 slide intro) |
| `/login` | Login (email/password + Google) |
| `/register` | Registrasi akun baru |
| `/lupa-password` | Reset password |

### Protected — Full Screen

| Path | Halaman |
|------|---------|
| `/konsultasi/:id` | Profil tenaga kesehatan |
| `/konsultasi/chat/:id` | Chat konsultasi |
| `/konsultasi/video/:id` | Video call |
| `/jadwal/baru` | Pesan jadwal baru |
| `/pembayaran/:id` | Konfirmasi pembayaran |
| `/pembayaran/sukses` | Pembayaran berhasil |
| `/artikel/:id` | Detail artikel |
| `/profil/edit` | Edit profil |
| `/profil/informasi-pribadi` | Informasi pribadi |
| `/profil/hubungi-kami` | Hubungi kami |
| `/profil/kebijakan-privasi` | Kebijakan privasi |
| `/profil/faq` | FAQ |
| `/notifikasi` | Notifikasi |
| `/klinik/map` | Peta klinik |

### Protected — Bottom Nav

| Path | Halaman | Tab |
|------|---------|-----|
| `/home` | Beranda (dashboard) | Beranda |
| `/konsultasi` | Daftar tenaga kesehatan | Konsultasi |
| `/jadwal` | Jadwal saya | — |
| `/rekam-medis` | Rekam medis | Rekam Medis |
| `/artikel` | Artikel | Artikel |
| `/profil` | Profil user | Profil |

---

## Fitur per Halaman

### Onboarding
- 4 slide carousel dengan ilustrasi
- Tombol Lewatkan, Lanjut, dan dot indikator
- Animasi slide kiri/kanan

### Auth (Login, Register, Lupa Password)
- Login email/password + Google sign-in
- Registrasi dengan nama, email, telepon, password
- Validasi error per kode Firebase
- Splash screen animasi setelah login/register

### Home (Beranda)
- Greeting berdasarkan waktu (Pagi/Siang/Sore/Malam)
- Avatar user dengan inisial fallback
- Banner jadwal mendatang (dari localStorage)
- Grid akses cepat (Konsultasi, Rekam Medis, Klinik, Obat)
- Card artikel horizontal scroll

### Konsultasi
- Daftar tenaga kesehatan dengan search + filter kategori
- Card: foto, nama, badge terverifikasi, kategori, rating, pengalaman
- Profil detail: rating, pengalaman, tentang, kredensial, ulasan
- Tombol Pilih {kategori} → booking

### Chat & Video Call
- Chat: riwayat pesan mock, input text, lampiran PDF, akhiri sesi + konfirmasi
- Video Call: kamera real (getUserMedia), kontrol mute/speaker/camera, in-call chat, end call

### Jadwal
- **Pesan Jadwal:** Pilih dokter, tanggal (6 hari), jam (slot dibooking disable), tipe konsultasi, ringkasan, bayar
- **Jadwal Saya:** Tab Mendatang + Riwayat, tombol Mulai Konsultasi / Batalkan

### Pembayaran
- Ringkasan pesanan: nama dokter, spesialisasi, tanggal, jam
- Pilih metode: E-Wallet (Gopay, OVO, Dana) + Virtual Account (BCA, Mandiri, BNI)
- Halaman sukses: confetti, simpan booking ke localStorage, generate notifikasi

### Rekam Medis
- Banner status kesehatan
- Riwayat diagnosis filterable (Hasil Lab, Resep Obat, Vaksinasi)
- Tombol Unggah Dokumen

### Klinik
- Deteksi lokasi via GPS (watchPosition)
- Cari fasilitas via Overpass API (5km radius)
- List view: nama, tipe, alamat, jarak, petunjuk arah
- Map view: Leaflet map dengan markers, info card, zoom controls

### Pengingat Obat
- Card compliance (progres % hari ini)
- Day picker (6 hari)
- Daftar obat per waktu (PAGI, SIANG, SORE/MALAM)
- Toggle selesai minum

### Artikel
- Filter kategori artikel
- Search dalam kategori
- Featured card + recommended cards + list items
- Detail artikel dengan konten HTML, profil penulis, tombol Ikuti

### Profil
- Avatar + health stats (berat, tinggi, gol. darah)
- Menu: Informasi Pribadi, Akun Tertaut, Keamanan
- Aktivitas: Riwayat Konsultasi, Rekam Medis, Artikel Favorit
- Bantuan: FAQ, Hubungi Kami, Kebijakan Privasi
- Edit profil + logout + versi app

---

## Environment Variables

Buat file `.env` di root project:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Catatan Pengembangan

- Semua data selain auth menggunakan **localStorage** dan **mock data** — belum terintegrasi dengan Firestore
- Gambar dihosting di **Cloudinary** dengan URL statis di `src/config/images.ts`
- Aplikasi dioptimalkan untuk **mobile** (max-width 430px)
- Animasi kustom didefinisikan di `src/index.css`
