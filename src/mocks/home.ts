import type { Artikel } from '../types'

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
