import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { auth } from '../../services/firebase'
import { mockPsikologList } from '../../mocks/konsultasi'
import { IMAGES } from '../../config/images'

function getInitials(name: string) { return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() }

export default function JadwalSayaPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [tab, setTab] = useState<'mendatang' | 'riwayat'>(searchParams.get('tab') === 'riwayat' ? 'riwayat' : 'mendatang')
  const [refresh, setRefresh] = useState(0)

  const jadwalList = (() => {
    try {
      const data = JSON.parse(localStorage.getItem(`mediku_jadwal_${auth.currentUser?.uid || 'temp'}`) || '[]')
      const list = Array.isArray(data) ? data : []
      return list.map((b: any) => ({ ...b, status: b.status || 'akan-datang' }))
    } catch { return [] }
  })()

  const mendatang = jadwalList.filter((j: any) => j.status === 'akan-datang')
  const riwayat = jadwalList.filter((j: any) => j.status === 'selesai')

  const handleCancel = (bookingId: string) => {
    const key = `mediku_jadwal_${auth.currentUser?.uid || 'temp'}`
    const list = JSON.parse(localStorage.getItem(key) || '[]')
    const updated = Array.isArray(list) ? list.filter((b: any) => b.id !== bookingId) : []
    localStorage.setItem(key, JSON.stringify(updated))
    setRefresh(r => r + 1)
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Header */}
      <div className="bg-[#F7F9FC] px-5 h-16 flex items-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <h1 className="text-[#0059BB] text-2xl font-bold">Jadwal Saya</h1>
      </div>

      <div className="px-5 pt-4 pb-28">
        {/* Toggle */}
        <div className="inline-flex bg-[#ECEEF1] rounded-full p-1 w-full">
          <button onClick={() => setTab('mendatang')}
            className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all ${
              tab === 'mendatang' ? 'bg-[#007AFF] text-white shadow-sm' : 'text-[#414754]'
            }`}>
            Mendatang
          </button>
          <button onClick={() => setTab('riwayat')}
            className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all ${
              tab === 'riwayat' ? 'bg-[#007AFF] text-white shadow-sm' : 'text-[#414754]'
            }`}>
            Riwayat
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-4 stagger-fade" key={`${tab}-${refresh}`}>
          {tab === 'mendatang' && mendatang.map((j: any, idx: number) => {
            const foto = (IMAGES.doctorNameMap as any)[j.dokter]
            const inisial = getInitials(j.dokter)
            return (
              <div key={idx} className="bg-white rounded-[32px] p-6 shadow-[0px_10px_30px_rgba(0,123,255,0.05)] outline-1 outline-[rgba(193,198,215,0.30)] space-y-3">
                {/* Top row: photo + name + badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden outline-2 outline-[rgba(0,112,234,0.20)] bg-[#F2F4F7] shrink-0">
                      {foto ? (
                        <img src={foto} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center text-white font-bold text-sm">{inisial}</div>
                      )}
                    </div>
                    <div>
                      <p className="text-[#191C1E] text-sm font-semibold leading-5">{j.dokter}</p>
                      <p className="text-[#414754] text-xs mt-0.5">{j.spesialisasi}</p>
                    </div>
                  </div>
                  <span className="bg-[#56FBAB] text-[#007146] text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-[0.50px] whitespace-nowrap">MENUNGGU</span>
                </div>

                {/* Info rows */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <svg width="14" height="15" viewBox="0 0 24 24" fill="none" className="text-[#414754] shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    <span className="text-[#414754] text-xs">{j.tanggal} | {j.waktu}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {j.type === 'video' ? (
                      <svg width="15" height="12" viewBox="0 0 24 24" fill="none" className="text-[#414754] shrink-0"><path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="2"/><rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2"/></svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-[#414754] shrink-0"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2"/></svg>
                    )}
                    <span className="text-[#414754] text-xs">{j.type === 'video' ? 'Video Call' : 'Chat'}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-1">
                  {(() => {
                    const dokterId = j.dokterId || mockPsikologList.find((p: any) => p.name.includes(j.dokter.split(',')[0]))?.id || 'psi-1'
                    return (
                      <button onClick={() => navigate(j.type === 'chat' ? `/konsultasi/chat/${dokterId}` : `/konsultasi/video/${dokterId}`)}
                        className="flex-1 bg-[#007AFF] text-white text-sm font-semibold rounded-full py-3.5 shadow-[0px_10px_30px_rgba(0,123,255,0.05)] active:scale-[0.97] transition-transform">
                        Mulai Konsultasi
                      </button>
                    )
                  })()}
                  <button onClick={() => handleCancel(j.id)} className="flex-1 border-2 border-[#0059BB] text-[#0059BB] text-sm font-semibold rounded-full py-3.5 active:scale-[0.97] transition-transform">
                    Batalkan
                  </button>
                </div>
              </div>
            )
          })}

          {tab === 'mendatang' && mendatang.length === 0 && riwayat.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#717786] text-sm">Belum ada jadwal</p>
              <button onClick={() => navigate('/jadwal/baru')}
                className="mt-4 bg-[#0079FF] text-white rounded-full px-8 py-3 text-sm font-semibold">
              Pesan Jadwal
              </button>
            </div>
          )}
          {tab === 'mendatang' && mendatang.length === 0 && riwayat.length > 0 && (
            <div className="text-center py-16">
              <p className="text-[#717786] text-sm">Semua jadwal telah selesai</p>
              <button onClick={() => navigate('/jadwal/baru')}
                className="mt-4 bg-[#0079FF] text-white rounded-full px-8 py-3 text-sm font-semibold">
              Pesan Jadwal Baru
              </button>
            </div>
          )}

          {tab === 'riwayat' && riwayat.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#717786] text-sm">Belum ada riwayat</p>
            </div>
          )}
          {tab === 'riwayat' && riwayat.map((j: any, idx: number) => {
            const foto = (IMAGES.doctorNameMap as any)[j.dokter]
            const inisial = getInitials(j.dokter)
            return (
              <div key={idx} className="bg-white rounded-[32px] p-6 shadow-[0px_10px_30px_rgba(0,123,255,0.05)] outline-1 outline-[rgba(193,198,215,0.30)] space-y-3 opacity-70">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden outline-2 outline-[rgba(0,112,234,0.20)] bg-[#F2F4F7] shrink-0">
                      {foto ? <img src={foto} alt="" className="w-full h-full object-cover" /> : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center text-white font-bold text-sm">{inisial}</div>
                      )}
                    </div>
                    <div>
                      <p className="text-[#191C1E] text-sm font-semibold leading-5">{j.dokter}</p>
                      <p className="text-[#414754] text-xs mt-0.5">{j.spesialisasi}</p>
                    </div>
                  </div>
                  <span className="bg-[#ECEEF1] text-[#717786] text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-[0.50px]">SELESAI</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <svg width="14" height="15" viewBox="0 0 24 24" fill="none" className="text-[#414754] shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    <span className="text-[#414754] text-xs">{j.tanggal} | {j.waktu}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {j.type === 'video' ? (
                      <svg width="15" height="12" viewBox="0 0 24 24" fill="none" className="text-[#414754] shrink-0"><path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="2"/><rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2"/></svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-[#414754] shrink-0"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2"/></svg>
                    )}
                    <span className="text-[#414754] text-xs">{j.type === 'video' ? 'Video Call' : 'Chat'}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
