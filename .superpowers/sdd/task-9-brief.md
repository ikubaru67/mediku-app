### Task 9: Rekam Medis, Klinik, Obat, Artikel

**Files:**
- Create: `src/features/rekam-medis/RekamMedisPage.tsx`
- Create: `src/features/klinik/KlinikPage.tsx`
- Create: `src/features/klinik/MapsKlinikPage.tsx`
- Create: `src/features/obat/PengingatObatPage.tsx`
- Create: `src/features/artikel/ArtikelPage.tsx`
- Create: `src/features/artikel/DetailArtikelPage.tsx`
- Modify: `src/App.tsx`

#### RekamMedisPage.tsx

```tsx
import Card from '../../components/Card'
import Icon from '../../components/Icon'
import TopAppBar from '../../components/TopAppBar'
import { mockRekamMedis } from '../../mocks/rekam-medis'

export default function RekamMedisPage() {
  return (
    <div className="min-h-screen bg-surface pb-20">
      <TopAppBar title="Rekam Medis" />
      <div className="px-5 pt-4 space-y-3">
        {mockRekamMedis.length === 0 ? (
          <div className="flex flex-col items-center py-16"><Icon name="file" size={48} className="text-gray-300 mb-4" /><p className="text-gray-400 text-sm">Belum ada rekam medis</p></div>
        ) : mockRekamMedis.map(rm => (
          <Card key={rm.id}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0"><Icon name="file" size={18} className="text-primary-500" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-primary-500 font-bold uppercase">{rm.type}</p>
                <h3 className="font-semibold text-sm text-gray-600 mt-0.5">{rm.diagnosis}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400"><span>{rm.dokter}</span><span>•</span><span>{rm.tanggal}</span></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <button className="fixed bottom-24 right-1/2 translate-x-[180px] w-14 h-14 bg-gradient-to-br from-primary-600 to-accent-blue rounded-full flex items-center justify-center shadow-lg">
        <Icon name="plus" size={24} className="text-white" />
      </button>
    </div>
  )
}
```

#### KlinikPage.tsx

```tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/SearchBar'
import Card from '../../components/Card'
import Icon from '../../components/Icon'
import RatingStars from '../../components/RatingStars'
import { mockKlinikList } from '../../mocks/klinik'

export default function KlinikPage() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface pb-20">
      <div className="bg-white rounded-b-3xl px-5 pt-4 pb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-600">Klinik Terdekat</h1>
          <button onClick={() => navigate('/klinik/map')} className="text-primary-500 text-sm font-semibold">Map</button>
        </div>
        <SearchBar value={search} onChange={setSearch} placeholder="Cari klinik..." />
      </div>
      <div className="px-5 pt-6 space-y-3">
        {mockKlinikList.map(k => (
          <Card key={k.id}>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center shrink-0"><Icon name="location" size={24} className="text-primary-500" /></div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-600">{k.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{k.alamat}</p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="text-gray-400 flex items-center gap-1"><Icon name="location" size={12} className="text-accent-blue" /> {k.jarak}</span>
                  <span className="text-gray-400">{k.jam}</span>
                  <RatingStars rating={Math.round(k.rating)} size={10} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

#### MapsKlinikPage.tsx

```tsx
import TopAppBar from '../../components/TopAppBar'

export default function MapsKlinikPage() {
  return (
    <div className="min-h-screen bg-surface">
      <TopAppBar showBack title="Peta Klinik" />
      <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-gray-100 mx-5 rounded-2xl">
        <p className="text-gray-400 text-sm text-center px-8">
          Peta akan ditampilkan di sini<br /><span className="text-xs">(Integrasi Google Maps)</span>
        </p>
      </div>
    </div>
  )
}
```

#### PengingatObatPage.tsx

```tsx
import { useState } from 'react'
import Card from '../../components/Card'
import Icon from '../../components/Icon'
import TopAppBar from '../../components/TopAppBar'
import { mockPengingatObat } from '../../mocks/obat'

export default function PengingatObatPage() {
  const [obatList] = useState(mockPengingatObat)

  return (
    <div className="min-h-screen bg-surface pb-20">
      <TopAppBar title="Pengingat Obat" showBack />
      <div className="px-5 pt-4 space-y-3">
        {obatList.map(obat => (
          <Card key={obat.id}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${obat.aktif ? 'bg-secondary-50' : 'bg-gray-100'}`}>
                <Icon name="pill" size={20} className={obat.aktif ? 'text-secondary-500' : 'text-gray-400'} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-semibold text-sm ${obat.aktif ? 'text-gray-600' : 'text-gray-400'}`}>{obat.namaObat}</h3>
                  <div className={`w-8 h-4 rounded-full transition-colors ${obat.aktif ? 'bg-secondary-500' : 'bg-gray-200'} relative cursor-pointer`}>
                    <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${obat.aktif ? 'translate-x-4' : 'translate-x-0.5'} shadow-sm`} />
                  </div>
                </div>
                <p className="text-xs text-gray-400">{obat.dosis} • {obat.waktu}</p>
                <p className="text-[10px] text-gray-300">{obat.frekuensi}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <button className="fixed bottom-24 right-1/2 translate-x-[180px] w-14 h-14 bg-gradient-to-br from-primary-600 to-accent-blue rounded-full flex items-center justify-center shadow-lg">
        <Icon name="plus" size={24} className="text-white" />
      </button>
    </div>
  )
}
```

#### ArtikelPage.tsx

```tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/SearchBar'
import Icon from '../../components/Icon'
import { mockArtikelList } from '../../mocks/artikel'

export default function ArtikelPage() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const filtered = mockArtikelList.filter(a => a.judul.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-surface pb-20">
      <div className="bg-white rounded-b-3xl px-5 pt-4 pb-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-600 mb-4">Artikel</h1>
        <SearchBar value={search} onChange={setSearch} placeholder="Cari artikel..." />
      </div>
      <div className="px-5 pt-6 grid grid-cols-2 gap-3">
        {filtered.map(artikel => (
          <button key={artikel.id} onClick={() => navigate(`/artikel/${artikel.id}`)}
            className="bg-white rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden text-left">
            <div className="w-full h-28 bg-gray-100 flex items-center justify-center"><Icon name="article" size={32} className="text-gray-300" /></div>
            <div className="p-3">
              <span className="text-[10px] font-bold text-primary-500 uppercase tracking-wider">{artikel.kategori}</span>
              <h3 className="font-semibold text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">{artikel.judul}</h3>
              <p className="text-[10px] text-gray-400 mt-2">{artikel.tanggal}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
```

#### DetailArtikelPage.tsx

```tsx
import { useParams } from 'react-router-dom'
import TopAppBar from '../../components/TopAppBar'
import Icon from '../../components/Icon'
import { mockArtikelList } from '../../mocks/artikel'

export default function DetailArtikelPage() {
  const { id } = useParams()
  const artikel = mockArtikelList.find(a => a.id === id)

  if (!artikel) return (
    <div className="min-h-screen bg-surface"><TopAppBar showBack title="Not Found" /><div className="p-5 text-center text-gray-400">Artikel tidak ditemukan</div></div>
  )

  return (
    <div className="min-h-screen bg-surface">
      <TopAppBar showBack />
      <div className="px-5">
        <span className="text-[10px] font-bold text-primary-500 uppercase tracking-wider">{artikel.kategori}</span>
        <h1 className="text-xl font-bold text-gray-600 mt-1 mb-2">{artikel.judul}</h1>
        <p className="text-xs text-gray-400 mb-4">{artikel.penulis} • {artikel.tanggal}</p>
        <div className="w-full h-48 bg-gray-100 rounded-2xl flex items-center justify-center mb-6"><Icon name="article" size={48} className="text-gray-300" /></div>
        <article className="text-sm text-gray-500 leading-relaxed space-y-4 pb-8" dangerouslySetInnerHTML={{ __html: artikel.konten }} />
      </div>
    </div>
  )
}
```

#### Update App.tsx

Add imports and routes:

```tsx
import RekamMedisPage from './features/rekam-medis/RekamMedisPage'
import KlinikPage from './features/klinik/KlinikPage'
import MapsKlinikPage from './features/klinik/MapsKlinikPage'
import PengingatObatPage from './features/obat/PengingatObatPage'
import ArtikelPage from './features/artikel/ArtikelPage'
import DetailArtikelPage from './features/artikel/DetailArtikelPage'

// Inside MainLayout:
<Route path="/rekam-medis" element={<RekamMedisPage />} />
<Route path="/klinik" element={<KlinikPage />} />
<Route path="/pengingat-obat" element={<PengingatObatPage />} />
<Route path="/artikel" element={<ArtikelPage />} />

// Outside MainLayout:
<Route path="/klinik/map" element={<MapsKlinikPage />} />
<Route path="/artikel/:id" element={<DetailArtikelPage />} />
```
