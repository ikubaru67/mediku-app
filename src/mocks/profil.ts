export const profileSections = [
  {
    title: 'ACCOUNT SETTINGS',
    color: 'rgba(0,89,187,0.10)',
    iconColor: '#0059BB',
    items: [
      { id: 'ps-1', icon: 'user', label: 'Personal Info', path: '#' },
      { id: 'ps-2', icon: 'link', label: 'Linked Accounts', path: '#' },
      { id: 'ps-3', icon: 'lock', label: 'Security', path: '#' },
    ],
  },
  {
    title: 'MY ACTIVITY',
    color: 'rgba(0,109,67,0.10)',
    iconColor: '#006D43',
    items: [
      { id: 'ps-4', icon: 'clock', label: 'Consultation History', path: '/jadwal?tab=riwayat' },
      { id: 'ps-5', icon: 'file', label: 'Medical Records', path: '/rekam-medis' },
      { id: 'ps-6', icon: 'article', label: 'Favorite Articles', path: '#' },
    ],
  },
  {
    title: 'HELP & SUPPORT',
    color: '#E0E3E6',
    iconColor: '#717786',
    items: [
      { id: 'ps-7', icon: 'helpCircle', label: 'FAQ', path: '#' },
      { id: 'ps-8', icon: 'phone', label: 'Contact Us', path: '#' },
      { id: 'ps-9', icon: 'shield', label: 'Privacy Policy', path: '#' },
    ],
  },
]

export const healthStats = [
  { id: 'hs-1', label: 'Weight', value: '54kg', icon: 'activity' },
  { id: 'hs-2', label: 'Height', value: '162cm', icon: 'activity' },
  { id: 'hs-3', label: 'Blood', value: 'O+', icon: 'activity' },
]
