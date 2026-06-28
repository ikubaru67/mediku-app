import type { JadwalKonsultasi } from '../types'
export const mockJadwal: JadwalKonsultasi[] = [
  { id: 'jd-1', psikologId: 'psi-1', psikologName: 'Dr. Sarah Wijaya', tanggal: '28 Jun 2026', jam: '10:00 - 11:00', status: 'akan-datang', type: 'video' },
  { id: 'jd-2', psikologId: 'psi-2', psikologName: 'Andi Pratama', tanggal: '25 Jun 2026', jam: '14:00 - 15:00', status: 'selesai', type: 'chat' },
  { id: 'jd-3', psikologId: 'psi-3', psikologName: 'Dr. Maya Putri', tanggal: '20 Jun 2026', jam: '09:00 - 10:00', status: 'selesai', type: 'video' },
]
