import type { PengingatObat } from '../types'
export const mockPengingatObat: PengingatObat[] = [
  { id: 'ob-1', namaObat: 'Antidepresan', dosis: '1 tablet', waktu: '08:00', frekuensi: 'Setiap hari', aktif: true },
  { id: 'ob-2', namaObat: 'Vitamin C', dosis: '1 tablet', waktu: '08:00', frekuensi: 'Setiap hari', aktif: true },
  { id: 'ob-3', namaObat: 'Benzodiaseoin', dosis: '1 tablet', waktu: '13:00', frekuensi: 'Setiap hari', aktif: true },
  { id: 'ob-4', namaObat: 'Metformin', dosis: '1 tablet', waktu: '20:00', frekuensi: 'Setiap hari', aktif: true },
]

export const obatSections = [
  { title: 'PAGI', time: '08:00', items: ['ob-1', 'ob-2'] },
  { title: 'SIANG', time: '13:00', items: ['ob-3'] },
  { title: 'MALAM', time: '20:00', items: ['ob-4'] },
]
