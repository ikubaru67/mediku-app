### Task 3: Types & Mock Data

**Files:**
- Create: `src/types/index.ts`
- Create: `src/mocks/auth.ts`
- Create: `src/mocks/home.ts`
- Create: `src/mocks/konsultasi.ts`
- Create: `src/mocks/artikel.ts`
- Create: `src/mocks/jadwal.ts`
- Create: `src/mocks/rekam-medis.ts`
- Create: `src/mocks/klinik.ts`
- Create: `src/mocks/obat.ts`
- Create: `src/mocks/profil.ts`
- Create: `src/mocks/notifikasi.ts`

**Interfaces:**
- Produces: All TypeScript types and mock data used by all features

#### Step 1: Write types/index.ts

```ts
export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatarUrl?: string
  isVerified: boolean
}

export interface Psikolog {
  id: string
  name: string
  spesialisasi: string
  foto: string
  rating: number
  reviewCount: number
  harga: number
  isVerified: boolean
  about?: string
  pengalaman?: string
}

export interface Ulasan {
  id: string
  userId: string
  userName: string
  rating: number
  komentar: string
  tanggal: string
}

export interface Artikel {
  id: string
  judul: string
  kategori: string
  thumbnail: string
  penulis: string
  tanggal: string
  konten: string
}

export interface JadwalKonsultasi {
  id: string
  psikologId: string
  psikologName: string
  tanggal: string
  jam: string
  status: 'akan-datang' | 'selesai' | 'dibatalkan'
  type: 'chat' | 'video'
}

export interface RekamMedis {
  id: string
  tanggal: string
  diagnosis: string
  dokter: string
  type: string
}

export interface Klinik {
  id: string
  name: string
  alamat: string
  jarak: string
  jam: string
  rating: number
  foto: string
}

export interface PengingatObat {
  id: string
  namaObat: string
  dosis: string
  waktu: string
  frekuensi: string
  aktif: boolean
}

export interface Notifikasi {
  id: string
  title: string
  body: string
  waktu: string
  dibaca: boolean
  icon: string
}

export interface Pembayaran {
  id: string
  psikologName: string
  tanggal: string
  jam: string
  metode: string
  total: number
  status: 'sukses' | 'pending' | 'gagal'
}
```

#### Step 2: Write mocks/auth.ts

```ts
import { User } from '../types'

export const mockUser: User = {
  id: 'user-1',
  name: 'Alexa',
  email: 'alexa@email.com',
  phone: '08123456789',
  avatarUrl: '',
  isVerified: true,
}

export async function mockSignIn(email: string, _password: string): Promise<{ user: User; token: string }> {
  await delay(500)
  if (!email) throw new Error('Email harus diisi')
  return { user: mockUser, token: 'mock-token-123' }
}

export async function mockSignUp(data: Partial<User> & { password: string }): Promise<{ user: User; token: string }> {
  await delay(500)
  return { user: { ...mockUser, ...data }, token: 'mock-token-123' }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
```

#### Step 3: Write mocks/home.ts

```ts
import { Artikel } from '../types'

export const mockHomeArtikel: Artikel[] = [
  {
    id: 'artikel-1',
    judul: 'Mengenal Kesehatan Mental: Panduan Lengkap untuk Pemula',
    kategori: 'Kesehatan Mental',
    thumbnail: '/images/artikel-1.jpg',
    penulis: 'Dr. Sarah Wijaya',
    tanggal: '12 Jun 2026',
    konten: '',
  },
  {
    id: 'artikel-2',
    judul: '5 Teknik Relaksasi untuk Mengurangi Stres Sehari-hari',
    kategori: 'Tips',
    thumbnail: '/images/artikel-2.jpg',
    penulis: 'Psikolog Andi',
    tanggal: '10 Jun 2026',
    konten: '',
  },
  {
    id: 'artikel-3',
    judul: 'Pentingnya Istirahat bagi Kesehatan Otak',
    kategori: 'Edukasi',
    thumbnail: '/images/artikel-3.jpg',
    penulis: 'Dr. Budi Hartono',
    tanggal: '8 Jun 2026',
    konten: '',
  },
]

export const mockQuickActions = [
  { id: '1', title: 'Konsultasi', icon: 'chat', path: '/konsultasi', color: 'from-primary-600 to-secondary-500' },
  { id: '2', title: 'Klinik Terdekat', icon: 'location', path: '/klinik', color: 'from-primary-500 to-accent-blue' },
  { id: '3', title: 'Pengingat Obat', icon: 'pill', path: '/pengingat-obat', color: 'from-secondary-500 to-accent-green' },
]
```

#### Step 4: Write mocks/konsultasi.ts

```ts
import { Psikolog, Ulasan } from '../types'

export const mockPsikologList: Psikolog[] = [
  {
    id: 'psi-1',
    name: 'Dr. Sarah Wijaya, M.Psi.',
    spesialisasi: 'Psikolog Klinis',
    foto: '',
    rating: 4.8,
    reviewCount: 124,
    harga: 150000,
    isVerified: true,
    about: 'Psikolog klinis dengan pengalaman 10+ tahun dalam menangani kecemasan, depresi, dan trauma.',
    pengalaman: '10 tahun',
  },
  {
    id: 'psi-2',
    name: 'Andi Pratama, M.Psi.',
    spesialisasi: 'Psikolog Anak & Remaja',
    foto: '',
    rating: 4.6,
    reviewCount: 89,
    harga: 130000,
    isVerified: true,
    about: 'Spesialis psikologi anak dan remaja, fokus pada masalah perkembangan dan pendidikan.',
    pengalaman: '7 tahun',
  },
  {
    id: 'psi-3',
    name: 'Dr. Maya Putri, M.Psi.',
    spesialisasi: 'Psikolog Keluarga',
    foto: '',
    rating: 4.9,
    reviewCount: 156,
    harga: 175000,
    isVerified: true,
    about: 'Membantu pasangan dan keluarga mengatasi konflik serta membangun komunikasi yang sehat.',
    pengalaman: '12 tahun',
  },
]

export const mockUlasan: Record<string, Ulasan[]> = {
  'psi-1': [
    { id: 'ul-1', userId: 'u-1', userName: 'Budi', rating: 5, komentar: 'Sangat membantu! Dokternya ramah dan profesional.', tanggal: '1 Jun 2026' },
    { id: 'ul-2', userId: 'u-2', userName: 'Siti', rating: 4, komentar: 'Sesi yg bermanfaat, recommended!', tanggal: '28 Mei 2026' },
  ],
}
```

#### Step 5: Write mocks/artikel.ts

```ts
import { Artikel } from '../types'

export const mockArtikelList: Artikel[] = [
  {
    id: 'artikel-1',
    judul: 'Mengenal Kesehatan Mental: Panduan Lengkap untuk Pemula',
    kategori: 'Kesehatan Mental',
    thumbnail: '',
    penulis: 'Dr. Sarah Wijaya',
    tanggal: '12 Jun 2026',
    konten: '<h2>Apa itu Kesehatan Mental?</h2><p>Kesehatan mental adalah kondisi kesejahteraan di mana individu menyadari kemampuan dirinya...</p>',
  },
  {
    id: 'artikel-2',
    judul: '5 Teknik Relaksasi untuk Mengurangi Stres Sehari-hari',
    kategori: 'Tips',
    thumbnail: '',
    penulis: 'Psikolog Andi',
    tanggal: '10 Jun 2026',
    konten: '<h2>1. Pernapasan Dalam (Deep Breathing)</h2><p>Tarik napas dalam melalui hidung selama 4 detik...</p>',
  },
  {
    id: 'artikel-3',
    judul: 'Pentingnya Istirahat bagi Kesehatan Otak',
    kategori: 'Edukasi',
    thumbnail: '',
    penulis: 'Dr. Budi Hartono',
    tanggal: '8 Jun 2026',
    konten: '<h2>Mengapa Istirahat Penting?</h2><p>Istirahat yang cukup memungkinkan otak untuk memproses informasi...</p>',
  },
  {
    id: 'artikel-4',
    judul: 'Cara Berkomunikasi Efektif dengan Pasangan',
    kategori: 'Hubungan',
    thumbnail: '',
    penulis: 'Dr. Maya Putri',
    tanggal: '5 Jun 2026',
    konten: '<p>Komunikasi adalah kunci hubungan yang sehat...</p>',
  },
  {
    id: 'artikel-5',
    judul: 'Mengatasi Kecemasan Sosial di Tempat Kerja',
    kategori: 'Kesehatan Mental',
    thumbnail: '',
    penulis: 'Psikolog Andi',
    tanggal: '3 Jun 2026',
    konten: '<p>Kecemasan sosial di tempat kerja adalah hal yang umum...</p>',
  },
  {
    id: 'artikel-6',
    judul: 'Manfaat Olahraga bagi Kesehatan Mental',
    kategori: 'Edukasi',
    thumbnail: '',
    penulis: 'Dr. Budi Hartono',
    tanggal: '1 Jun 2026',
    konten: '<p>Olahraga tidak hanya baik untuk fisik...</p>',
  },
]
```

#### Step 6: Write remaining mock files

**mocks/jadwal.ts:**

```ts
import { JadwalKonsultasi } from '../types'
export const mockJadwal: JadwalKonsultasi[] = [
  { id: 'jd-1', psikologId: 'psi-1', psikologName: 'Dr. Sarah Wijaya', tanggal: '28 Jun 2026', jam: '10:00 - 11:00', status: 'akan-datang', type: 'video' },
  { id: 'jd-2', psikologId: 'psi-2', psikologName: 'Andi Pratama', tanggal: '25 Jun 2026', jam: '14:00 - 15:00', status: 'selesai', type: 'chat' },
  { id: 'jd-3', psikologId: 'psi-3', psikologName: 'Dr. Maya Putri', tanggal: '20 Jun 2026', jam: '09:00 - 10:00', status: 'selesai', type: 'video' },
]
```

**mocks/rekam-medis.ts:**

```ts
import { RekamMedis } from '../types'
export const mockRekamMedis: RekamMedis[] = [
  { id: 'rm-1', tanggal: '25 Jun 2026', diagnosis: 'Konsultasi awal - anxiety ringan', dokter: 'Andi Pratama', type: 'Konsultasi' },
  { id: 'rm-2', tanggal: '20 Jun 2026', diagnosis: 'Sesi lanjutan terapi kognitif', dokter: 'Dr. Sarah Wijaya', type: 'Terapi' },
  { id: 'rm-3', tanggal: '15 Jun 2026', diagnosis: 'Evaluasi perkembangan', dokter: 'Dr. Sarah Wijaya', type: 'Evaluasi' },
]
```

**mocks/klinik.ts:**

```ts
import { Klinik } from '../types'
export const mockKlinikList: Klinik[] = [
  { id: 'kl-1', name: 'Klinik Psikologi Sehat Jiwa', alamat: 'Jl. Merdeka No. 123', jarak: '1.2 km', jam: '08:00 - 20:00', rating: 4.5, foto: '' },
  { id: 'kl-2', name: 'RS Jiwa Damai Sentosa', alamat: 'Jl. Sudirman No. 45', jarak: '2.5 km', jam: '24 Jam', rating: 4.3, foto: '' },
  { id: 'kl-3', name: 'Pusat Konseling Keluarga Bahagia', alamat: 'Jl. Gatot Subroto No. 78', jarak: '3.1 km', jam: '09:00 - 21:00', rating: 4.7, foto: '' },
]
```

**mocks/obat.ts:**

```ts
import { PengingatObat } from '../types'
export const mockPengingatObat: PengingatObat[] = [
  { id: 'ob-1', namaObat: 'Vitamin D3', dosis: '1 kapsul', waktu: '08:00', frekuensi: 'Setiap hari', aktif: true },
  { id: 'ob-2', namaObat: 'Magnesium Glycinate', dosis: '2 kapsul', waktu: '20:00', frekuensi: 'Setiap hari', aktif: true },
  { id: 'ob-3', namaObat: 'Omega-3', dosis: '1 kapsul', waktu: '12:00', frekuensi: 'Setiap hari', aktif: false },
]
```

**mocks/profil.ts:**

```ts
import { User } from '../types'
export const mockProfileMenu = [
  { id: '1', icon: 'bell', label: 'Notifikasi', path: '/notifikasi' },
  { id: '2', icon: 'settings', label: 'Pengaturan', path: '#' },
  { id: '3', icon: 'helpCircle', label: 'Bantuan', path: '#' },
  { id: '4', icon: 'logOut', label: 'Keluar', path: '/login' },
]
```

**mocks/notifikasi.ts:**

```ts
import { Notifikasi } from '../types'
export const mockNotifikasiList: Notifikasi[] = [
  { id: 'nt-1', title: 'Pengingat Konsultasi', body: 'Sesi konsultasi dengan Dr. Sarah dalam 1 jam', waktu: '1 jam yang lalu', dibaca: false, icon: 'calendar' },
  { id: 'nt-2', title: 'Pembayaran Berhasil', body: 'Pembayaran sesi konsultasi sebesar Rp150.000 berhasil', waktu: '3 jam yang lalu', dibaca: false, icon: 'checkCircle' },
  { id: 'nt-3', title: 'Artikel Baru', body: 'Mengenal Kesehatan Mental - baca sekarang!', waktu: '1 hari yang lalu', dibaca: true, icon: 'article' },
]
```

## Verify

```bash
cd "E:\File Ikhbal\Tugas - Kuliah\Semester 6\Interaksi Manusia Komputer\Design IMK\mediku-app"
npx tsc --noEmit
```

Expected: No TypeScript errors.
