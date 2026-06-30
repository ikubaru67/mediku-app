import { useParams, useNavigate } from 'react-router-dom'
import { mockPsikologList, mockUlasan } from '../../mocks/konsultasi'
import { IMAGES } from '../../config/images'

const kategoriColors: Record<string, string> = {
  Psikolog: 'text-[#007146] bg-[rgba(86,251,171,0.30)]',
  Psikiater: 'text-[#0059BB] bg-[rgba(0,89,187,0.10)]',
  'Dokter Umum': 'text-[#7C3AED] bg-[rgba(124,58,237,0.10)]',
}

export default function ProfilPsikologPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const psikolog = mockPsikologList.find(p => p.id === id)
  const ulasan = id ? mockUlasan[id] || [] : []

  if (!psikolog) return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="p-5 text-center text-[#717786] pt-20">Psikolog tidak ditemukan</div>
    </div>
  )

  const foto = (IMAGES.doctorNameMap as any)[psikolog.name]
  const inisial = psikolog.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-28">
      {/* Header */}
      <div className="bg-white rounded-b-[32px] px-5 pt-3 pb-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} aria-label="Kembali" className="p-1 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0486F1]"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <p className="text-[#0486F1] text-base font-extrabold leading-6">Profil Psikolog</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center px-5 pt-6 pb-6">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10),0px_20px_25px_-5px_rgba(0,0,0,0.10)] border-4 border-white">
            {foto ? (
              <img src={foto} alt={'Foto ' + psikolog.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center">
                <span className="text-white font-bold text-3xl">{inisial}</span>
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#006D43] rounded-full border-2 border-white flex items-center justify-center shadow-md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>
          </div>
        </div>
        <h1 className="text-[#191C1E] text-2xl font-bold text-center">{psikolog.name}</h1>
        <span className={`inline-block text-sm font-semibold px-4 py-1 rounded-full mt-1.5 ${kategoriColors[psikolog.kategori] || 'text-[#414754] bg-[#F2F4F7]'}`}>
          {psikolog.kategori}
        </span>

        {/* Stats Cards */}
        <div className="flex gap-4 mt-6 w-full max-w-[350px]">
          <div className="flex-1 bg-white rounded-[32px] p-6 text-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-1 outline-[rgba(193,198,215,0.30)]">
            <div className="flex items-center justify-center gap-1 mb-1">
              <svg width="20" height="19" viewBox="0 0 24 24" fill="#006D43"><path d="M10.5 20.5l10-10a4.95 4.95 0 00-7-7l-10 10a4.95 4.95 0 007 7z" stroke="#006D43" strokeWidth="0.5"/><path d="M8.5 8.5l7 7" stroke="white" strokeWidth="1.5"/></svg>
              <span className="text-[#006D43] text-2xl font-bold">{psikolog.rating}</span>
            </div>
            <p className="text-[rgba(65,71,84,0.70)] text-sm font-semibold">Rating</p>
          </div>
          <div className="flex-1 bg-white rounded-[32px] p-6 text-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-1 outline-[rgba(193,198,215,0.30)]">
            <div className="flex items-center justify-center gap-1 mb-1">
              <svg width="20" height="19" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="text-[#0059BB] text-2xl font-bold">{psikolog.pengalaman?.replace(' tahun', ' thn')}</span>
            </div>
            <p className="text-[rgba(65,71,84,0.70)] text-sm font-semibold">Pengalaman</p>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="px-5 mb-8 stagger-fade">
        <h2 className="text-[#191C1E] text-2xl font-bold mb-2">Tentang</h2>
        <p className="text-[#414754] text-base leading-[26px]">{psikolog.about}</p>
      </div>

      {/* Credentials */}
      <div className="px-5 mb-8 stagger-fade">
        <h2 className="text-[#191C1E] text-2xl font-bold mb-4">Kredensial & Lisensi</h2>
        <div className="space-y-3">
          {[
            { icon: 'graduation', label: 'Pendidikan', value: 'S2 Psikologi Profesi, Universitas Indonesia' },
            { icon: 'file', label: 'No. SIPP', value: '11442-2023-08-01' },
            { icon: 'shield', label: 'Status STR', value: 'Aktif s/d 2028' },
            { icon: 'building', label: 'Tempat Praktik', value: 'RS Medika Jakarta, Klinik Sehat Utama' },
            { icon: 'globe', label: 'Bahasa', value: 'Bahasa Indonesia, Inggris' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-[32px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-1 outline-[rgba(193,198,215,0.20)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#D8E2FF] flex items-center justify-center shrink-0">
                {item.icon === 'graduation' && (
                  <svg width="22" height="18" viewBox="0 0 24 24" fill="none" className="text-[#004493]"><path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="2"/></svg>
                )}
                {item.icon === 'file' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#004493]"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2"/><path d="M14 2v6h6" stroke="currentColor" strokeWidth="2"/></svg>
                )}
                {item.icon === 'shield' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#004493]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/></svg>
                )}
                {item.icon === 'building' && (
                  <svg width="22" height="20" viewBox="0 0 24 24" fill="none" className="text-[#004493]"><rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M9 6h2v2H9V6zm4 0h2v2h-2V6zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z" stroke="currentColor" strokeWidth="1.5"/></svg>
                )}
                {item.icon === 'globe' && (
                  <svg width="22" height="20" viewBox="0 0 24 24" fill="none" className="text-[#004493]"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="2"/></svg>
                )}
              </div>
              <div>
                <p className="text-[#414754] text-sm font-semibold leading-5 mb-0.5">{item.label}</p>
                <p className="text-[#191C1E] text-base leading-6">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="px-5 mb-8 stagger-fade">
        <h2 className="text-[#191C1E] text-2xl font-bold mb-3">Ulasan ({ulasan.length})</h2>
        <div className="space-y-3">
          {ulasan.length === 0 && (
            <p className="text-[#717786] text-sm">Belum ada ulasan</p>
          )}
          {ulasan.map(u => (
            <div key={u.id} className="bg-white rounded-[32px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-[#191C1E]">{u.userName}</span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= u.rating ? '#EAB308' : '#C1C6D7'}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-[#414754] leading-5">{u.komentar}</p>
              <p className="text-[10px] text-[#C1C6D7] mt-2">{u.tanggal}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[rgba(255,255,255,0.80)] backdrop-blur-[6px] px-4 py-5 border-t border-[rgba(193,198,215,0.30)]">
        <div className="flex gap-3">
          <button onClick={() => navigate(`/jadwal/baru?id=${id}`)}
            className="flex-1 bg-[#0079FF] text-white rounded-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            Chat Sekarang
          </button>
          <button onClick={() => navigate(`/jadwal/baru?id=${id}`)}
            className="flex-1 bg-white text-[#0059BB] rounded-full py-3.5 text-sm font-semibold border-2 border-[#0059BB] focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            Pesan Sekarang
          </button>
        </div>
      </div>
    </div>
  )
}
