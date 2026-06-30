import { useNavigate } from 'react-router-dom'
import { auth } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth'
import { mockArtikelList } from '../../mocks/artikel'
import { IMAGES } from '../../config/images'

const quickActionsData = [
  { id: '1', name: 'Konsultasi', icon: 'chat', color: '#0059BB', path: '/konsultasi' },
  { id: '2', name: 'Rekam Medis', icon: 'file', color: '#007146', path: '/rekam-medis' },
  { id: '3', name: 'Klinik', icon: 'location', color: '#BA1A1A', path: '/klinik' },
  { id: '4', name: 'Obat', icon: 'pill', color: '#225BAA', path: '/pengingat-obat' },
]

function QAIcon({ name, color }: { name: string; color: string }) {
  const icons: Record<string, React.ReactNode> = {
    chat: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    file: <svg width="20" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke={color} strokeWidth="1.5"/><path d="M14 2v6h6" stroke={color} strokeWidth="1.5"/></svg>,
    location: <svg width="20" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={color} strokeWidth="1.5"/><circle cx="12" cy="10" r="3" stroke={color} strokeWidth="1.5"/></svg>,
    pill: <svg width="24" height="22" viewBox="0 0 24 24" fill="none"><path d="M10.5 20.5l10-10a4.95 4.95 0 00-7-7l-10 10a4.95 4.95 0 007 7z" stroke={color} strokeWidth="1.5"/><path d="M8.5 8.5l7 7" stroke={color} strokeWidth="1.5"/></svg>,
  }
  return <>{icons[name] || null}</>
}

export default function HomePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const hour = new Date().getHours()
  const greeting = hour < 11 ? 'Selamat Pagi' : hour < 15 ? 'Selamat Siang' : hour < 18 ? 'Selamat Sore' : 'Selamat Malam'

  const notifKey = `mediku_notifikasi_${auth.currentUser?.uid || 'temp'}`
  const hasUnread = (() => {
    try {
      const data = JSON.parse(localStorage.getItem(notifKey) || '[]')
      return Array.isArray(data) && data.some((n: any) => !n.dibaca)
    } catch { return false }
  })()

  const jadwal = (() => {
    try { 
      const data = JSON.parse(localStorage.getItem(`mediku_jadwal_${auth.currentUser?.uid || 'temp'}`) || '[]')
      const list = Array.isArray(data) ? data : []
      const aktif = list.filter((b: any) => (b.status || 'akan-datang') !== 'selesai')
      return aktif.length > 0 ? aktif[aktif.length - 1] : null
    } catch { return null }
  })()
  const hasJadwal = jadwal && jadwal.dokter

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-20">
      {/* Header */}
      <div className="bg-white rounded-b-3xl px-5 pt-4 pb-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => navigate('/profil')} className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[#0486F1] flex items-center justify-center relative">
              <span className="text-white font-extrabold text-base">{user?.displayName?.charAt(0).toUpperCase() || '?'}</span>
              {user?.photoURL && (
                <img src={user.photoURL} alt="Foto profil" className="absolute inset-0 w-full h-full object-cover"
                  onError={e => { (e.target as HTMLElement).style.display = 'none' }} />
              )}
            </div>
            <div>
              <p className="text-[#0486F1] text-sm font-semibold leading-5">{greeting} 👋</p>
              <p className="text-[#0486F1] text-base font-extrabold leading-5">{user?.displayName || 'Pengguna'}</p>
            </div>
          </button>
          <button onClick={() => navigate('/notifikasi')} aria-label="Notifikasi" className="relative w-[45.6px] h-[45.6px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <svg width="20" height="22" viewBox="0 0 24 24" fill="none" className="text-[#0486F1]">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {hasUnread && (
              <div className="absolute top-[7.6px] right-[7.6px] w-[11.4px] h-[11.4px] bg-[#BA1A1A] rounded-full border-2 border-[#0059BB]" />
            )}
          </button>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-6 stagger-fade">
        {/* Banner */}
        <button onClick={() => navigate('/jadwal')}
          className="relative w-full bg-gradient-to-br from-[#0059BB] to-[#31E193] rounded-[32px] p-6 overflow-hidden shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10),0px_20px_25px_-5px_rgba(0,0,0,0.10)] text-left focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
          <div className="absolute w-40 h-40 rounded-full bg-white/10 blur-[32px] -top-10 right-0" />
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <span className="inline-block bg-white rounded-full px-3 py-1 text-[#0059BB] text-xs font-medium">Jadwal Saya</span>
              {hasJadwal ? (
                <>
                  <p className="text-white text-base">{jadwal.dokter}</p>
                  <p className="text-white/80 text-xs">{jadwal.tanggal}</p>
                  <div className="flex items-center gap-1 text-white/90 text-sm font-semibold">
                    <svg width="12" height="10" viewBox="0 0 24 24" fill="none" className="text-white/90"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M10 12l-2 2 4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    <span>{jadwal.type === 'video' ? 'Panggilan Video' : 'Chat'} · {jadwal.waktu}</span>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-white text-base">Belum ada jadwal</p>
                  <p className="text-white text-xs">Pesan jadwal konsultasi sekarang</p>
                </>
              )}
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <svg width="21" height="20" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </button>

        {/* Quick Actions */}
        <div>
          <h2 className="text-[#191C1E] text-base font-semibold mb-4">Akses Cepat</h2>
          <div className="grid grid-cols-4 gap-4">
            {quickActionsData.map((a) => (
              <button key={a.id} onClick={() => navigate(a.path)} className="flex flex-col items-center gap-1 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none rounded-lg">
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
            <h2 className="text-[#191C1E] text-base font-semibold">Artikel Untukmu</h2>
            <button onClick={() => navigate('/artikel')} className="text-[#0059BB] text-sm font-semibold focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">Lihat semua</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {mockArtikelList.slice(0, 6).map((artikel, idx) => (
              <button key={artikel.id} onClick={() => navigate(`/artikel/${artikel.id}`)}
                className="w-44 shrink-0 bg-white rounded-[24px] overflow-hidden shadow-[0px_10px_30px_rgba(0,123,255,0.05)] text-left focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
                <div className="h-28 bg-[#F2F4F7] overflow-hidden">
                  <img src={IMAGES.feed[idx]} alt={artikel.judul} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[#006D43] text-[9px] font-bold uppercase tracking-[0.80px]">{artikel.kategori}</span>
                    <span className="text-[#717786] text-[9px]">• 5 menit baca</span>
                  </div>
                  <h3 className="text-[#191C1E] text-xs font-semibold leading-snug line-clamp-2">{artikel.judul}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[#717786] text-[9px]">{artikel.penulis}</p>
                    <p className="text-[rgba(65,71,84,0.60)] text-[9px]">{artikel.tanggal}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
