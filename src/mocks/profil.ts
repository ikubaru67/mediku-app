export const profileSections = [
  {
    title: 'PENGATURAN AKUN',
    color: 'rgba(0,89,187,0.10)',
    iconColor: '#0059BB',
    items: [
      { id: 'ps-1', icon: 'user', label: 'Informasi Pribadi', path: '/profil/informasi-pribadi' },
      { id: 'ps-2', icon: 'link', label: 'Akun Tertaut', path: '#' },
      { id: 'ps-3', icon: 'lock', label: 'Keamanan', path: '#' },
    ],
  },
  {
    title: 'AKTIVITAS SAYA',
    color: 'rgba(0,109,67,0.10)',
    iconColor: '#006D43',
    items: [
      { id: 'ps-4', icon: 'clock', label: 'Riwayat Konsultasi', path: '/jadwal?tab=riwayat' },
      { id: 'ps-5', icon: 'file', label: 'Rekam Medis', path: '/rekam-medis' },
      { id: 'ps-6', icon: 'article', label: 'Artikel Favorit', path: '#' },
    ],
  },
  {
    title: 'BANTUAN',
    color: '#E0E3E6',
    iconColor: '#717786',
    items: [
      { id: 'ps-7', icon: 'helpCircle', label: 'FAQ', path: '/profil/faq' },
      { id: 'ps-8', icon: 'phone', label: 'Hubungi Kami', path: '/profil/hubungi-kami' },
      { id: 'ps-9', icon: 'shield', label: 'Kebijakan Privasi', path: '/profil/kebijakan-privasi' },
    ],
  },
]

export const healthStats = [
  { id: 'hs-1', label: 'Berat', value: '54kg', icon: 'activity' },
  { id: 'hs-2', label: 'Tinggi', value: '162cm', icon: 'activity' },
  { id: 'hs-3', label: 'Darah', value: 'O+', icon: 'activity' },
]
