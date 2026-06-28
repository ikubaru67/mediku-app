import { useParams, useNavigate } from 'react-router-dom'
import { mockArtikelList } from '../../mocks/artikel'
import { IMAGES } from '../../config/images'

const penulisInfo: Record<string, { role: string }> = {
  'Dr. Aulia Rahman, M.Psi.': { role: 'Psikolog Klinis' },
  'Budi Kusuma, M.Psi': { role: 'Mental Health Expert' },
  'Dr. Sarah Wijaya, Sp.KJ': { role: 'Psikiater' },
  'Dr. Faisal Akbar': { role: 'Psikolog' },
  'Lina Safitri, M.Psi': { role: 'Psikolog' },
}

export default function DetailArtikelPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const artikel = mockArtikelList.find(a => a.id === id)

  if (!artikel) return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="p-5 text-center text-gray-400 pt-20">Artikel tidak ditemukan</div>
    </div>
  )

  const foto = IMAGES.doctorNameMap[artikel.penulis as keyof typeof IMAGES.doctorNameMap]
  const inisial = artikel.penulis.split(' ').map(w => w[0]).join('')
  const role = penulisInfo[artikel.penulis]?.role || 'Penulis'
  const imgIdx = Math.min(parseInt(artikel.id.replace('artikel-', '')) - 1, IMAGES.feed.length - 1)

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="px-5 pt-3 pb-2">
        <button onClick={() => navigate(-1)} className="p-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      <div className="px-5 pb-8 stagger-fade">
        <div className="flex items-center gap-2 text-xs text-[#717786] mb-3">
          <span className="font-medium">{artikel.kategori}</span>
          <span className="w-1 h-1 rounded-full bg-[#C1C6D7]" />
          <span className="font-medium">8 menit baca</span>
        </div>

        <h1 className="text-[28px] font-bold text-[#191C1E] mb-6 leading-[35px]">{artikel.judul}</h1>

        <div className="flex items-center justify-between bg-[#F2F4F7] rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#D8E2FF] flex items-center justify-center shrink-0">
              {foto ? (
                <img src={foto} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#0059BB] font-bold text-sm">{inisial}</span>
              )}
            </div>
            <div>
              <p className="font-semibold text-sm text-[#191C1E]">{artikel.penulis}</p>
              <p className="text-xs text-[#717786]">{role} • {artikel.tanggal}</p>
            </div>
          </div>
          <button className="px-4 py-2 border-2 border-[#0059BB] rounded-full text-[#0059BB] text-sm font-semibold">Ikuti</button>
        </div>

        <div className="w-full rounded-[32px] overflow-hidden mb-6 shadow-[0px_10px_30px_rgba(0,123,255,0.05)]">
          <img src={IMAGES.feed[imgIdx]} alt="" className="w-full h-auto object-cover" />
        </div>

        <article className="text-[#414754] text-[18px] leading-[29.25px] space-y-3">
          <div dangerouslySetInnerHTML={{ __html: artikel.konten }} />
        </article>
      </div>
    </div>
  )
}
