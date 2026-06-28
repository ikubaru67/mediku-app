import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { auth } from '../../services/firebase'
import { IMAGES } from '../../config/images'
import { mockPsikologList } from '../../mocks/konsultasi'

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const weekdayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

function btnAnim() { return 'active:scale-[0.97] hover:shadow-md transition-all duration-200 ease-out' }

export default function PembayaranSuksesPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const dayNum = searchParams.get('day') || '14'
  const monthIdx = parseInt(searchParams.get('month') || '9')
  const time = searchParams.get('time') || '11:00'
  const price = parseInt(searchParams.get('price') || '400000')
  const dokterName = searchParams.get('dokter') || 'Dr. Aulia Rahman, M.Psi'
  const spesialisasi = searchParams.get('spesialisasi') || 'Psikolog'
  const dokterId = searchParams.get('id') || ''
  const psikolog = mockPsikologList.find(p => p.id === dokterId)
  const foto = psikolog ? (IMAGES.doctorNameMap as any)[psikolog.name] : (IMAGES.doctorNameMap as any)[dokterName] || ''
  const inisial = psikolog ? psikolog.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : dokterName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const selectedDate = new Date(new Date().getFullYear(), monthIdx, parseInt(dayNum))
  const weekday = weekdayNames[selectedDate.getDay()]
  const monthName = monthNames[monthIdx]
  const year = new Date().getFullYear()

  const savedRef = useRef(false)

  useEffect(() => {
    if (savedRef.current) return
    savedRef.current = true
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0059BB', '#0070EA', '#006D43', '#56FBAB'],
    })
    const key = `mediku_jadwal_${auth.currentUser?.uid || 'temp'}`
    let existing = JSON.parse(localStorage.getItem(key) || '[]')
    if (!Array.isArray(existing)) existing = []
    existing.push({
      id: Date.now().toString(),
      dokter: dokterName,
      spesialisasi,
      dokterId: searchParams.get('id') || '',
      status: 'akan-datang',
      tanggal: `${weekday}, ${dayNum} ${monthName} ${year}`,
      waktu: `${time} WIB`,
      type: searchParams.get('type') || 'video',
      dayNum,
      monthIdx,
      time,
    })
    localStorage.setItem(key, JSON.stringify(existing))

    // Save notifications
    const notifKey = `mediku_notifikasi_${auth.currentUser?.uid || 'temp'}`
    let notifs = JSON.parse(localStorage.getItem(notifKey) || '[]')
    if (!Array.isArray(notifs)) notifs = []
    const now = Date.now()
    const tipe = searchParams.get('type') === 'video' ? 'Video Call' : 'Chat'
    notifs.push(
      {
        id: `notif-${now}-1`,
        title: 'Pembayaran Berhasil',
        body: `Pembayaran sesi ${tipe} dengan ${dokterName} sebesar Rp${price.toLocaleString()} berhasil.`,
        waktu: 'Baru saja',
        dibaca: false,
        icon: 'checkCircle',
        timestamp: now,
      },
      {
        id: `notif-${now}-2`,
        title: 'Pengingat Jadwal Konsultasi',
        body: `Jadwal ${tipe} dengan ${dokterName} pada ${weekday}, ${dayNum} ${monthName} ${year} pukul ${time} WIB.`,
        waktu: 'Baru saja',
        dibaca: false,
        icon: 'calendar',
        timestamp: now + 1,
      }
    )
    localStorage.setItem(notifKey, JSON.stringify(notifs))
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F9FC] overflow-hidden">
      <div className="bg-[#F7F9FC] px-5 h-16 flex items-center justify-center">
        <span className="text-[#0059BB] text-2xl font-bold">Confirmation</span>
      </div>

      <div className="flex flex-col items-center px-5">
        <div className="relative mt-12 mb-6 animate-pop-in">
          <div className="w-24 h-24 rounded-full bg-[#56FBAB] shadow-[0px_0px_50px_rgba(86,251,171,0.30)] flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#007146" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>
          </div>
        </div>

        <h1 className="text-[40px] font-extrabold text-[#191C1E] leading-[48px] text-center animate-fade-up" style={{ animationDelay: '0.3s' }}>Pembayaran<br/>Berhasil!</h1>
        <p className="text-[#414754] text-sm text-center mt-2 leading-6 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          Terima kasih! Pembayaran Anda telah<br/>dikonfirmasi dan jadwal konsultasi telah<br/>berhasil dipesan.
        </p>

        <div className="w-full mt-8 bg-[rgba(255,255,255,0.80)] backdrop-blur-[10px] rounded-[32px] p-6 shadow-[0px_10px_30px_rgba(0,123,255,0.05)] outline-1 outline-[rgba(255,255,255,0.40)] space-y-4 animate-fade-up" style={{ animationDelay: '0.7s' }}>
          <div className="flex items-center gap-4 pb-4 border-b border-[#E0E3E6]">
            <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-[#ECEEF1]">
              {foto ? (
                <img src={foto} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center text-white font-bold text-sm">{inisial}</div>
              )}
            </div>
            <div>
              <p className="text-[#191C1E] text-sm font-semibold">{dokterName}</p>
              <p className="text-[#0059BB] text-xs">{spesialisasi}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-[#414754] text-xs font-medium">Tanggal</p>
              <div className="flex items-center gap-2 mt-0.5">
                <svg width="12" height="14" viewBox="0 0 24 24" fill="none" className="text-[#0059BB] shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                <span className="text-[#191C1E] text-sm">{weekday}, {dayNum} {monthName} {year}</span>
              </div>
            </div>
            <div>
              <p className="text-[#414754] text-xs font-medium">Waktu</p>
              <div className="flex items-center gap-2 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#0059BB] shrink-0"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                <span className="text-[#191C1E] text-sm">{time} WIB</span>
              </div>
            </div>
            <div>
              <p className="text-[#414754] text-xs font-medium">Total Pembayaran</p>
              <p className="text-[#0059BB] text-2xl font-bold mt-0.5">Rp {price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[#414754] text-xs font-medium">ID Transaksi</p>
              <p className="text-[#191C1E] text-sm mt-0.5">MK-9872410</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-8 pb-8 space-y-3 animate-fade-up" style={{ animationDelay: '1s' }}>
          <button onClick={() => navigate('/jadwal')}
            className={`w-full bg-[#0079FF] text-white rounded-full py-4 text-sm font-semibold shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10),0px_10px_15px_-3px_rgba(0,0,0,0.10)] ${btnAnim()}`}>
            Lihat Jadwal Saya
          </button>
          <button onClick={() => navigate('/home')}
            className={`w-full bg-white text-[#0059BB] rounded-full py-4 text-sm font-semibold border-2 border-[#0059BB] ${btnAnim()}`}>
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  )
}
