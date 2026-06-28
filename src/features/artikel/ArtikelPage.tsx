import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockArtikelList } from '../../mocks/artikel'
import { IMAGES } from '../../config/images'

const categoryGradients: Record<string, string> = {
  'Mental Health': 'from-blue-400 to-indigo-500',
  'Nutrition': 'from-green-400 to-emerald-500',
  'Physical Activity': 'from-orange-400 to-rose-500',
  'Medication': 'from-purple-400 to-violet-500',
  'Sleep Hygiene': 'from-teal-400 to-cyan-500',
}

const penulisInfo: Record<string, { role: string }> = {
  'Dr. Aulia Rahman, M.Psi.': { role: 'Psychologist' },
  'Budi Kusuma, M.Psi': { role: 'Mental Health Expert' },
  'Dr. Sarah Wijaya, Sp.KJ': { role: 'Psychiatrist' },
  'Dr. Faisal Akbar': { role: 'Psychologist' },
  'Lina Safitri, M.Psi': { role: 'Psychologist' },
}

const artikelExtra: Record<string, { deskripsi: string; waktuBaca: string }> = {
  'artikel-1': { deskripsi: 'Learn how Dr. Aulia Rahman\'s proven mindfulness methods can help you find balance.', waktuBaca: '8 min read' },
  'artikel-2': { deskripsi: 'Why this simple technique can transform your stress response.', waktuBaca: '5 min read' },
  'artikel-3': { deskripsi: 'Practical strategies for thriving in hybrid workplace environments.', waktuBaca: '7 min read' },
  'artikel-4': { deskripsi: 'Start your day with clarity and purpose.', waktuBaca: '4 min read' },
  'artikel-5': { deskripsi: 'Hubungan antara nutrisi dan kesehatan mental yang optimal.', waktuBaca: '6 min read' },
  'artikel-6': { deskripsi: 'Why a 20-minute walk in nature boosts your mood.', waktuBaca: '3 min read' },
  'artikel-7': { deskripsi: 'Makanan super untuk meningkatkan fungsi otak.', waktuBaca: '5 min read' },
  'artikel-8': { deskripsi: 'Nutrisi yang tepat dapat membantu mengelola depresi.', waktuBaca: '4 min read' },
  'artikel-9': { deskripsi: 'Gerakan sederhana yang berdampak besar pada suasana hati.', waktuBaca: '6 min read' },
  'artikel-10': { deskripsi: 'Panduan yoga untuk pemula dan manfaatnya.', waktuBaca: '7 min read' },
  'artikel-11': { deskripsi: 'Manfaat jalan kaki 30 menit bagi kesehatan mental.', waktuBaca: '4 min read' },
  'artikel-12': { deskripsi: 'Informasi lengkap tentang obat antidepresan.', waktuBaca: '8 min read' },
  'artikel-13': { deskripsi: 'Panduan penggunaan obat kesehatan mental.', waktuBaca: '5 min read' },
  'artikel-14': { deskripsi: 'Sleep hygiene untuk pikiran yang lebih sehat.', waktuBaca: '6 min read' },
  'artikel-15': { deskripsi: 'Bagaimana kualitas tidur mempengaruhi depresi.', waktuBaca: '5 min read' },
  'artikel-16': { deskripsi: 'Langkah sederhana untuk tidur lebih nyenyak.', waktuBaca: '4 min read' },
}

const filters = ['Mental Health', 'Nutrition', 'Physical Activity', 'Medication', 'Sleep Hygiene']

function imgForArticle(id: string) { return Math.min(parseInt(id.replace('artikel-', '')) - 1, IMAGES.feed.length - 1) }

export default function ArtikelPage() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('Mental Health')
  const navigate = useNavigate()

  const filtered = mockArtikelList.filter(a => {
    const matchFilter = a.kategori === activeFilter
    const matchSearch = a.judul.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })
  const featured = filtered[0]
  const cards = filtered.slice(1, 4)
  const listItems = filtered.slice(4)

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-20">
      <div className="bg-[rgba(247,249,252,0.80)] backdrop-blur-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] px-5 pt-3 pb-4">
        <div className="mb-4">
          <h1 className="text-[#0059BB] text-2xl font-bold">Articles</h1>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3 -mx-5 px-5 mb-3">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-normal whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none ${
                activeFilter === f
                  ? 'bg-[#008CFF] text-white shadow-[0px_10px_30px_rgba(0,123,255,0.15)]'
                  : 'bg-white text-[#C1C6D7] border border-[#C1C6D7]'
              }`}>
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 bg-white border border-[#C1C6D7] rounded-full px-5 py-3 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#6B7280] shrink-0">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder={`Search in ${activeFilter}...`} aria-label="Cari artikel"
            className="bg-transparent outline-none text-sm text-[#191C1E] placeholder:text-[#6B7280] w-full" />
        </div>
      </div>

      <div key={activeFilter} className="px-5 stagger-fade">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-[#C1C6D7] mb-4"><path d="M6 2h8l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z M8 13h8M8 17h8M10 9h4" stroke="currentColor" strokeWidth="1.5"/></svg>
            <p className="text-[#414754] text-sm font-medium">Tidak ada artikel untuk "{activeFilter}"</p>
            <p className="text-[#717786] text-xs mt-1">Coba filter lain atau ubah kata kunci pencarian.</p>
          </div>
        )}

        {featured && (
          <button onClick={() => navigate(`/artikel/${featured.id}`)}
            className="relative w-full h-[400px] rounded-[32px] overflow-hidden mt-6 mb-8 block text-left shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10),0px_10px_15px_-3px_rgba(0,0,0,0.10)] focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <div className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[activeFilter] || 'from-blue-400 to-indigo-500'}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="bg-[#008CFF] text-white text-xs font-medium px-3 py-1 rounded-full">FEATURED</span>
              <h3 className="text-white text-xl font-bold mt-3 leading-7">{featured.judul}</h3>
              {artikelExtra[featured.id] && (
                <p className="text-white/80 text-sm mt-2 leading-6">{artikelExtra[featured.id].deskripsi}</p>
              )}
              <div className="flex items-center gap-1 text-white/80 text-sm font-semibold mt-3">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {artikelExtra[featured.id]?.waktuBaca}
              </div>
            </div>
          </button>
        )}

        {cards.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base text-[#191C1E]">Recommended for You</h2>
              <button className="flex items-center gap-1 text-[#0059BB] text-sm focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
                View all
                <svg width="6" height="9" viewBox="0 0 6 9" fill="none" className="text-[#0059BB]"><path d="M1 1l4 3.5L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="space-y-4 mb-8">
              {cards.map((artikel) => {
                const extra = artikelExtra[artikel.id]
                  const foto = IMAGES.doctorNameMap[artikel.penulis as keyof typeof IMAGES.doctorNameMap]
                const inisial = artikel.penulis.split(' ').map(w => w[0]).join('')
                const role = penulisInfo[artikel.penulis]?.role || 'Penulis'
                const imgIdx = imgForArticle(artikel.id)
                return (
                  <button key={artikel.id} onClick={() => navigate(`/artikel/${artikel.id}`)}
                    className="w-full bg-white rounded-[32px] overflow-hidden text-left shadow-[0px_10px_30px_rgba(0,123,255,0.05)] outline outline-1 outline-[rgba(193,198,215,0.50)] focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
                    <div className="w-full h-[178px] overflow-hidden bg-[#F2F4F7]">
                      <img src={IMAGES.feed[imgIdx]} alt={artikel.judul} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#006D43] text-sm font-normal uppercase tracking-[0.80px]">{artikel.kategori}</span>
                        <span className="text-[#717786]">•</span>
                        <span className="text-[#717786] text-xs">{extra?.waktuBaca}</span>
                      </div>
                      <h3 className="text-base font-normal text-[#191C1E] leading-6">{artikel.judul}</h3>
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[rgba(193,198,215,0.30)]">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-[#D8E2FF] flex items-center justify-center shrink-0">
                          {foto ? <img src={foto} alt={artikel.penulis} className="w-full h-full object-cover" /> : <span className="text-[#0059BB] text-xs font-bold">{inisial}</span>}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#191C1E]">{artikel.penulis}</p>
                          <p className="text-xs text-[#717786] font-medium">{role}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {listItems.length > 0 && (
          <div className="space-y-4 pb-8">
            {listItems.map((artikel) => {
              const extra = artikelExtra[artikel.id]
               const foto = IMAGES.doctorNameMap[artikel.penulis as keyof typeof IMAGES.doctorNameMap]
              const imgIdx = imgForArticle(artikel.id)
              return (
                <button key={artikel.id} onClick={() => navigate(`/artikel/${artikel.id}`)}
                  className="flex gap-4 w-full text-left bg-white rounded-[32px] p-4 outline outline-1 outline-[rgba(193,198,215,0.50)] focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
                  <div className="w-[96px] h-[96px] rounded-[32px] overflow-hidden shrink-0 bg-[#F2F4F7]">
                    <img src={IMAGES.feed[imgIdx]} alt={artikel.judul} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="text-[#006D43] text-xs font-normal uppercase tracking-[0.80px]">{artikel.kategori}</span>
                    <h3 className="text-sm font-normal text-[#191C1E] mt-0.5 leading-5">{artikel.judul}</h3>
                    {extra && <p className="text-xs text-[#717786] mt-0.5 line-clamp-1">{extra.deskripsi}</p>}
                    <div className="flex items-center gap-2 text-xs text-[#191C1E] font-medium mt-1">
                      <span>{artikel.penulis}</span>
                      {foto ? (
                        <div className="w-4 h-4 rounded-full overflow-hidden"><img src={foto} alt={artikel.penulis} className="w-full h-full object-cover" /></div>
                      ) : (
                        <span className="text-[#717786]">• {artikel.tanggal}</span>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
