### Rebuild Home Page — Pixel Perfect from Figma HTML

Replace `src/features/home/HomePage.tsx` with exact Figma HTML conversion.

**Key specs from HTML (lines 510-697):**

**Header:**
- White bg, rounded-b-3xl
- Greeting: "Selamat pagi 👋" in `#0486F1`, font-size 14px, font-weight 600
- Name: "Nadia Putri" in `#0486F1`, font-size 16px, font-weight 800
- Avatar: 48x48 circle `#0486F1` fill, white "N" letter
- Bell icon: 15.20x19px `#0486F1`, red dot (11.40px, `#BA1A1A`, border 2px `#0059BB`)

**SearchBar:**
- Full width, bg `#F2F4F7`, rounded-full
- Padding: 17px 48px
- Placeholder: color `rgba(65,71,84,0.50)`, text "Cari psikolog, artikel, klinik..."
- Search icon: 18x18px `#717786`

**Banner Card:**
- Gradient: `linear-gradient(158deg, #0059BB 0%, #31E193 100%)`
- Rounded-2xl (32px), padding 24px
- "Jadwal Saya" badge: white bg, `#0059BB` text, rounded-full
- "Dr. Aulia, M.Psi — 16.00 WIB" in white, font-size 16px
- "Video Call · Hari ini" in `rgba(255,255,255,0.90)`, font-size 14px
- Right arrow button: `rgba(255,255,255,0.20)` bg, rounded-full
- Decorative: 160px circle `rgba(255,255,255,0.10)` blur at right top

**Quick Actions (4 items):**
- Konsultasi: icon 25x25px `#0059BB`, label color `#191C1E` 12px
- Rekam Medis: icon 22.50x25px `#007146`, label color same
- Klinik: icon 20x25px `#BA1A1A`, label color same
- Obat: icon 26.63x24.56px `#225BAA`, label color same
- Each has 64x64 white circle with shadow `0px 2px 4px -2px rgba(0,0,0,0.10), 0px 4px 6px -1px rgba(0,0,0,0.10)`

**Articles Section:**
- Header: "Artikel Untukmu" in `#191C1E`, "Lihat semua" in `#0059BB`
- Article cards: white bg, rounded-2xl (32px), overflow hidden
- Card thumbnail: 274x160px, gradient bg (varies per article), icon overlay
- Card text: title in `#191C14px`, "4 menit baca" in `rgba(65,71,84,0.60)`
- Second card: title "Tips Tidur Berkualitas..."

```tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockUser } from '../../mocks/auth'

const mockArtikel = [
  { id: '1', judul: '5 Teknik Mengelola Cemas Harian', kategori: 'Kesehatan Mental', waktu: '4 menit baca', bg: 'rgba(86,251,171,0.20)' },
  { id: '2', judul: 'Tips Tidur Berkualitas untuk Kesehatan Mental', kategori: 'Tips', waktu: '3 menit baca', bg: 'rgba(0,112,234,0.10)' },
]

const quickActionsData = [
  { id: '1', name: 'Konsultasi', icon: 'chat', color: '#0059BB', path: '/konsultasi' },
  { id: '2', name: 'Rekam Medis', icon: 'file', color: '#007146', path: '/rekam-medis' },
  { id: '3', name: 'Klinik', icon: 'location', color: '#BA1A1A', path: '/klinik' },
  { id: '4', name: 'Obat', icon: 'pill', color: '#225BAA', path: '/pengingat-obat' },
]

function QAIcon({ name, color }: { name: string; color: string }) {
  const icons: Record<string, JSX.Element> = {
    chat: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    file: <svg width="20" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke={color} strokeWidth="1.5"/><path d="M14 2v6h6" stroke={color} strokeWidth="1.5"/></svg>,
    location: <svg width="20" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={color} strokeWidth="1.5"/><circle cx="12" cy="10" r="3" stroke={color} strokeWidth="1.5"/></svg>,
    pill: <svg width="24" height="22" viewBox="0 0 24 24" fill="none"><path d="M10.5 20.5l10-10a4.95 4.95 0 00-7-7l-10 10a4.95 4.95 0 007 7z" stroke={color} strokeWidth="1.5"/><path d="M8.5 8.5l7 7" stroke={color} strokeWidth="1.5"/></svg>,
  }
  return <>{icons[name] || null}</>
}

export default function HomePage() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-20">
      {/* Header */}
      <div className="bg-white rounded-b-3xl px-5 pt-4 pb-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#0486F1] flex items-center justify-center">
              <span className="text-white font-extrabold text-base">N</span>
            </div>
            <div>
              <p className="text-[#0486F1] text-sm font-semibold leading-5">Selamat pagi 👋</p>
              <p className="text-[#0486F1] text-base font-extrabold leading-5">Nadia Putri</p>
            </div>
          </div>
          <button className="relative w-[45.6px] h-[45.6px] flex items-center justify-center">
            <svg width="18" height="22" viewBox="0 0 24 24" fill="none" className="text-[#0486F1]">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="absolute top-[7.6px] right-[7.6px] w-[11.4px] h-[11.4px] bg-[#BA1A1A] rounded-full border-2 border-[#0059BB]" />
          </button>
        </div>
        <div className="flex items-center bg-[#F2F4F7] rounded-full pl-12 pr-4 py-[17px]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#717786] -ml-8 mr-3">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-[#717786] text-base">{search || 'Cari psikolog, artikel, klinik...'}</span>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-6">
        {/* Banner */}
        <div className="relative bg-gradient-to-br from-[#0059BB] to-[#31E193] rounded-[32px] p-6 overflow-hidden shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10),0px_20px_25px_-5px_rgba(0,0,0,0.10)]">
          <div className="absolute w-40 h-40 rounded-full bg-white/10 blur-[32px] -top-10 right-0" />
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <span className="inline-block bg-white rounded-full px-3 py-1 text-[#0059BB] text-xs font-medium">Jadwal Saya</span>
              <p className="text-white text-base">Dr. Aulia, M.Psi — 16.00 WIB</p>
              <div className="flex items-center gap-1 text-white/90 text-sm font-semibold">
                <svg width="12" height="10" viewBox="0 0 24 24" fill="none" className="text-white/90"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M10 12l-2 2 4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                <span>Video Call · Hari ini</span>
              </div>
            </div>
            <button className="bg-white/20 rounded-full p-3">
              <svg width="21" height="20" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <p className="text-[#191C1E] text-base mb-4">Akses Cepat</p>
          <div className="grid grid-cols-4 gap-4">
            {quickActionsData.map((a) => (
              <button key={a.id} onClick={() => navigate(a.path)} className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 bg-white rounded-[32px] flex items-center justify-center shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10),0px_4px_6px_-1px_rgba(0,0,0,0.10)]">
                  <QAIcon name={a.icon} color={a.color} />
                </div>
                <span className="text-[#191C1E] text-xs font-medium">{a.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#191C1E] text-base">Artikel Untukmu</h2>
            <button onClick={() => navigate('/artikel')} className="text-[#0059BB] text-sm font-semibold">Lihat semua</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5">
            {mockArtikel.map((artikel) => (
              <button key={artikel.id} onClick={() => navigate(`/artikel/${artikel.id}`)}
                className="min-w-[274px] bg-white rounded-[32px] overflow-hidden shadow-[0px_10px_30px_rgba(0,123,255,0.05)] text-left shrink-0">
                <div className="h-40" style={{ backgroundColor: artikel.bg }} />
                <div className="p-6">
                  <p className="text-[rgba(65,71,84,0.60)] text-xs font-medium">{artikel.waktu}</p>
                  <h3 className="text-[#191C1E] text-sm font-semibold mt-1">{artikel.judul}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Verify:**
```bash
npx tsc --noEmit
```
