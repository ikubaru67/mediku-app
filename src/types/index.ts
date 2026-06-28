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
  kategori: string
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
  lat?: number
  lng?: number
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
