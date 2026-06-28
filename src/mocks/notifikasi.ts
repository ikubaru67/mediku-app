import type { Notifikasi } from '../types'
export const mockNotifikasiList: Notifikasi[] = [
  { id: 'nt-1', title: 'Pengingat Konsultasi', body: 'Sesi konsultasi dengan Dr. Sarah dalam 1 jam', waktu: '1 jam yang lalu', dibaca: false, icon: 'calendar' },
  { id: 'nt-2', title: 'Pembayaran Berhasil', body: 'Pembayaran sesi konsultasi sebesar Rp150.000 berhasil', waktu: '3 jam yang lalu', dibaca: false, icon: 'checkCircle' },
  { id: 'nt-3', title: 'Keamanan Akun', body: 'Percobaan login dari perangkat baru terdeteksi', waktu: '5 jam yang lalu', dibaca: true, icon: 'shield' },
  { id: 'nt-4', title: 'Artikel Baru', body: 'Mengenal Kesehatan Mental - baca sekarang!', waktu: 'Kemarin', dibaca: true, icon: 'article' },
  { id: 'nt-5', title: 'Hasil Lab Tersedia', body: 'Hasil laboratorium Anda sudah siap diunduh', waktu: 'Kemarin', dibaca: true, icon: 'file' },
  { id: 'nt-6', title: 'Tips Kesehatan', body: 'Tips menjaga kesehatan mental di masa pandemi', waktu: 'Minggu lalu', dibaca: true, icon: 'bell' },
]

export const notifikasiSections = [
  { title: 'Hari Ini', items: ['nt-1', 'nt-2', 'nt-3'] },
  { title: 'Kemarin', items: ['nt-4', 'nt-5'] },
  { title: 'Minggu Lalu', items: ['nt-6'] },
]
