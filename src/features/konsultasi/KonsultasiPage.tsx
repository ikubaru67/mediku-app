import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockPsikologList } from '../../mocks/konsultasi'
import ComingSoonPopup from '../../components/ComingSoonPopup'
import { IMAGES } from '../../config/images'

const filters = ['Semua', 'Psikolog', 'Psikiater', 'Dokter Umum']

const kategoriColors: Record<string, string> = {
  Psikolog: 'bg-blue-100 text-[#0059BB]',
  Psikiater: 'bg-green-100 text-[#006D43]',
  'Dokter Umum': 'bg-purple-100 text-[#7C3AED]',
}

export default function KonsultasiPage() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('Semua')
  const [comingSoon, setComingSoon] = useState<string | null>(null)
  const navigate = useNavigate()

  const filtered = mockPsikologList.filter(p => {
    const q = search.toLowerCase()
    if (!p.name.toLowerCase().includes(q) && !p.spesialisasi.toLowerCase().includes(q)) return false
    if (activeFilter === 'Semua') return true
    return p.kategori === activeFilter
  })

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24">
      <div className="bg-white rounded-b-3xl px-5 pt-4 pb-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <div className="mb-4">
          <h1 className="text-[#0059BB] text-2xl font-bold">Daftar Tenaga Kesehatan</h1>
        </div>

        <div className="flex items-center gap-3 bg-[#F2F4F7] rounded-full px-6 py-3 outline-1 outline-[#C1C6D7] mb-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#6B7280] shrink-0">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama atau spesialisasi" aria-label="Cari dokter"
            className="bg-transparent outline-none text-sm text-[#191C1E] placeholder:text-[#6B7280] w-full" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none ${
                activeFilter === f ? 'bg-[#0079FF] text-white' : 'bg-[#F2F4F7] text-[#414754]'
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-6 space-y-4 stagger-fade">
        {filtered.length === 0 && (
          <p className="text-center text-[#717786] text-sm pt-10">Tidak ada hasil ditemukan</p>
        )}
        {filtered.map((p) => {
          const foto = (IMAGES.doctorNameMap as any)[p.name]
          return (
          <div key={p.id} className="bg-white rounded-[32px] shadow-[0px_10px_30px_rgba(0,123,255,0.05)] outline-1 outline-[rgba(193,198,215,0.10)] p-4">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-[#F2F4F7]">
                {foto ? (
                  <img src={foto} alt={'Foto ' + p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center text-white font-bold text-sm ${
                    p.kategori === 'Psikolog' ? 'bg-gradient-to-br from-[#0059BB] to-[#0070EA]' : p.kategori === 'Dokter Umum' ? 'bg-gradient-to-br from-[#7C3AED] to-[#A78BFA]' : 'bg-gradient-to-br from-[#006D43] to-[#31E193]'
                  }`}>
                    {p.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[#191C1E] text-base font-normal truncate">{p.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {p.isVerified && (
                    <span className="text-[10px] font-bold text-[#007146] bg-[rgba(86,251,171,0.20)] px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">TERVERIFIKASI</span>
                  )}
                  <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full ${kategoriColors[p.kategori] || 'bg-gray-100 text-gray-500'}`}>
                    {p.kategori}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <svg width="15" height="14.25" viewBox="0 0 24 24" fill="#EAB308"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span className="text-[#191C1E] text-xs font-bold">{p.rating}</span>
                    <span className="text-[#717786] text-xs">({p.reviewCount})</span>
                  </div>
                  {p.pengalaman && (
                    <div className="flex items-center gap-1">
                      <svg width="15.75" height="15.75" viewBox="0 0 24 24" fill="none" className="text-[#717786]"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      <span className="text-[#414754] text-xs">{p.pengalaman} pengalaman</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button onClick={() => navigate(`/konsultasi/${p.id}`)}
              className="w-full mt-4 py-3 rounded-full text-sm font-semibold text-white bg-[#0079FF] focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
              Pilih {p.kategori}
            </button>
          </div>
          )
        })}
      </div>

      <div className="mx-5 mt-6 bg-gradient-to-r from-[#0059BB] to-[#006D43] rounded-[32px] p-6">
        <h2 className="text-white text-lg">Butuh bantuan segera?</h2>
        <p className="text-white/80 text-xs mt-1">Konsultasi anonim tersedia 24/7</p>
        <button onClick={() => setComingSoon('Konsultasi Anonim')} className="mt-4 bg-white text-[#0059BB] rounded-full px-6 py-2 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">Hubungi Sekarang</button>
      </div>

      {comingSoon && <ComingSoonPopup feature={comingSoon} onClose={() => setComingSoon(null)} />}
    </div>
  )
}
