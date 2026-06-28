### Task 8: Jadwal & Pembayaran

**Files:**
- Create: `src/features/jadwal/JadwalSayaPage.tsx`
- Create: `src/features/jadwal/PesanJadwalPage.tsx`
- Create: `src/features/pembayaran/KonfirmasiPage.tsx`
- Create: `src/features/pembayaran/PembayaranSuksesPage.tsx`
- Modify: `src/App.tsx`

#### JadwalSayaPage.tsx

```tsx
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import Icon from '../../components/Icon'
import TopAppBar from '../../components/TopAppBar'
import { mockJadwal } from '../../mocks/jadwal'

export default function JadwalSayaPage() {
  const navigate = useNavigate()
  const akanDatang = mockJadwal.filter(j => j.status === 'akan-datang')
  const selesai = mockJadwal.filter(j => j.status === 'selesai')

  return (
    <div className="min-h-screen bg-surface pb-20">
      <TopAppBar title="Jadwal Saya" showBack />
      <div className="px-5 pt-4 space-y-4">
        {akanDatang.length > 0 && (
          <div>
            <h2 className="font-bold text-sm text-gray-500 mb-3 uppercase tracking-wider">Akan Datang</h2>
            {akanDatang.map(j => (
              <Card key={j.id} className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Icon name={j.type === 'video' ? 'video' : 'chat'} size={20} className="text-primary-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-600">{j.psikologName}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Icon name="calendar" size={12} />{j.tanggal}</span>
                    <span className="flex items-center gap-1"><Icon name="clock" size={12} />{j.jam}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-primary-500 bg-primary-50 px-2 py-1 rounded-full capitalize">{j.type}</span>
              </Card>
            ))}
          </div>
        )}
        <div>
          <h2 className="font-bold text-sm text-gray-500 mb-3 uppercase tracking-wider">Riwayat</h2>
          {selesai.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-8">Belum ada jadwal</p>
          ) : selesai.map(j => (
            <Card key={j.id} className="flex items-center gap-4 mb-3 opacity-70">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Icon name={j.type === 'video' ? 'video' : 'chat'} size={20} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-gray-500">{j.psikologName}</h3>
                <p className="text-xs text-gray-300">{j.tanggal} • {j.jam}</p>
              </div>
              <span className="text-[10px] text-gray-300 capitalize">{j.status}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
```

#### PesanJadwalPage.tsx

```tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopAppBar from '../../components/TopAppBar'
import Button from '../../components/Button'
import { mockPsikologList } from '../../mocks/konsultasi'

export default function PesanJadwalPage() {
  const navigate = useNavigate()
  const [selectedPsikolog, setSelectedPsikolog] = useState('')
  const [tanggal, setTanggal] = useState('')
  const [jam, setJam] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = () => {
    const id = selectedPsikolog || 'psi-1'
    navigate(`/pembayaran/${id}`)
  }

  return (
    <div className="min-h-screen bg-surface">
      <TopAppBar showBack title="Pesan Jadwal" />
      <div className="px-5 pt-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-gray-500 mb-2 block">Pilih Psikolog</label>
          <select value={selectedPsikolog} onChange={e => setSelectedPsikolog(e.target.value)}
            className="w-full bg-gray-100 rounded-full px-4 py-3 text-sm outline-none">
            <option value="">Pilih psikolog...</option>
            {mockPsikologList.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 mb-2 block">Tanggal</label>
          <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)}
            className="w-full bg-gray-100 rounded-full px-4 py-3 text-sm outline-none" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 mb-2 block">Jam</label>
          <input type="time" value={jam} onChange={e => setJam(e.target.value)}
            className="w-full bg-gray-100 rounded-full px-4 py-3 text-sm outline-none" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 mb-2 block">Catatan (opsional)</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none resize-none h-24" placeholder="Ceritakan keluhan Anda..." />
        </div>
        <Button fullWidth onClick={handleSubmit}>Lanjut ke Pembayaran</Button>
      </div>
    </div>
  )
}
```

#### KonfirmasiPage.tsx

```tsx
import { useNavigate, useParams } from 'react-router-dom'
import TopAppBar from '../../components/TopAppBar'
import Button from '../../components/Button'
import Card from '../../components/Card'
import { mockPsikologList } from '../../mocks/konsultasi'

export default function KonfirmasiPage() {
  const navigate = useNavigate()
  const psikolog = mockPsikologList[0]

  return (
    <div className="min-h-screen bg-surface">
      <TopAppBar showBack title="Konfirmasi Pembayaran" />
      <div className="px-5 pt-6 space-y-4">
        <Card>
          <h3 className="font-semibold text-sm text-gray-600 mb-3">Ringkasan Sesi</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Psikolog</span><span className="text-gray-600 font-medium">{psikolog.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Jenis</span><span className="text-gray-600 font-medium">Konsultasi Video</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Durasi</span><span className="text-gray-600 font-medium">60 menit</span></div>
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold text-sm text-gray-600 mb-3">Metode Pembayaran</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-500 font-bold text-sm">💳</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Transfer Bank</p>
              <p className="text-xs text-gray-400">BCA Virtual Account</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">Total</span>
            <span className="text-xl font-bold text-primary-600">Rp{psikolog.harga.toLocaleString()}</span>
          </div>
        </Card>
        <Button fullWidth onClick={() => navigate('/pembayaran/sukses')}>Bayar Sekarang</Button>
      </div>
    </div>
  )
}
```

#### PembayaranSuksesPage.tsx

```tsx
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Icon from '../../components/Icon'

export default function PembayaranSuksesPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-8">
      <div className="w-20 h-20 rounded-full bg-secondary-50 flex items-center justify-center mb-6">
        <Icon name="checkCircle" size={48} className="text-secondary-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-600 mb-2">Pembayaran Berhasil!</h1>
      <p className="text-sm text-gray-400 text-center mb-2">Sesi konsultasi telah dikonfirmasi.</p>
      <p className="text-xs text-gray-300 mb-8">Rp150.000 • BCA Virtual Account</p>
      <Button fullWidth variant="gradient" onClick={() => navigate('/jadwal')} className="mb-3">Lihat Jadwal Saya</Button>
      <Button fullWidth variant="outline" onClick={() => navigate('/home')}>Kembali ke Beranda</Button>
    </div>
  )
}
```

#### Update App.tsx

Add imports and routes:

```tsx
import JadwalSayaPage from './features/jadwal/JadwalSayaPage'
import PesanJadwalPage from './features/jadwal/PesanJadwalPage'
import KonfirmasiPage from './features/pembayaran/KonfirmasiPage'
import PembayaranSuksesPage from './features/pembayaran/PembayaranSuksesPage'

// Inside MainLayout:
<Route path="/jadwal" element={<JadwalSayaPage />} />

// Outside MainLayout:
<Route path="/jadwal/baru" element={<PesanJadwalPage />} />
<Route path="/pembayaran/:id" element={<KonfirmasiPage />} />
<Route path="/pembayaran/sukses" element={<PembayaranSuksesPage />} />
```
