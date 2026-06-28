import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { mockPsikologList } from '../../mocks/konsultasi'
import { IMAGES } from '../../config/images'

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const weekdayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '19:00', '20:00']

function getWeekDates() {
  const today = new Date()
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return { label: dayLabels[d.getDay()], date: String(d.getDate()).padStart(2, '0'), month: d.getMonth() }
  })
}

function btnAnim() { return 'active:scale-[0.97] hover:shadow-md transition-all duration-200 ease-out' }

export default function PesanJadwalPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const preselected = searchParams.get('id') || ''
  const [selectedDokter, setSelectedDokter] = useState(preselected)
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedTime, setSelectedTime] = useState('11:00')
  const [selectedType, setSelectedType] = useState<'video' | 'chat'>('video')
  const [showDokter, setShowDokter] = useState(false)

  const today = new Date()
  const days = useMemo(() => getWeekDates(), [])
  const selDate = days[selectedDay]
  const selDayNum = parseInt(selDate.date)
  const selMonth = monthNames[selDate.month]
  const selWeekday = weekdayNames[dayLabels.indexOf(selDate.label)]
  const price = selectedType === 'video' ? 400000 : 250000

  const dokter = mockPsikologList.find(p => p.id === selectedDokter)
  const foto = dokter ? (IMAGES.doctorNameMap as any)[dokter.name] : ''
  const inisial = dokter ? dokter.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : ''

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col">
      {/* Header */}
      <div className="bg-[rgba(247,249,252,0.80)] backdrop-blur-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] px-5 h-16 flex items-center justify-between">
        <div className="w-10">
          <button onClick={() => navigate(-1)} className={`p-1 ${btnAnim()}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        <span className="bg-gradient-to-r from-[#0059BB] to-[#6DE46F] bg-clip-text text-transparent text-2xl font-bold">MediKu</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto pb-28 stagger-fade">
        {/* Select Doctor */}
        <div className="px-5 pt-5">
          <button onClick={() => setShowDokter(!showDokter)} className={`w-full flex items-center justify-between bg-white rounded-[32px] p-4 shadow-[0px_10px_30px_rgba(0,123,255,0.05)] outline-1 outline-[rgba(193,198,215,0.30)] ${btnAnim()}`}>
            <div className="flex items-center gap-3">
              {dokter ? (
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#F2F4F7]">
                  {foto ? <img src={foto} alt="" className="w-full h-full object-cover" /> : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center text-white font-bold text-sm">{inisial}</div>
                  )}
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#ECEEF1] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#717786]"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/></svg>
                </div>
              )}
              <div className="text-left">
                <p className="text-[#191C1E] text-sm font-semibold">{dokter ? dokter.name : 'Pilih Dokter'}</p>
                {dokter && <p className="text-[#414754] text-xs mt-0.5">{dokter.spesialisasi}</p>}
                {dokter && (
                  <div className="flex items-center gap-1 mt-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#EAB308"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span className="text-[#414754] text-xs font-medium">{dokter.rating}</span>
                    <span className="text-[#717786] text-xs">({dokter.reviewCount})</span>
                  </div>
                )}
              </div>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={`text-[#717786] transition-transform duration-200 ${showDokter ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          {showDokter && (
            <div className="mt-2 bg-white rounded-[32px] p-3 shadow-lg space-y-1">
              {mockPsikologList.map(p => {
                const f = (IMAGES.doctorNameMap as any)[p.name]
                return (
                  <button key={p.id} onClick={() => { setSelectedDokter(p.id); setShowDokter(false) }}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl ${btnAnim()} ${selectedDokter === p.id ? 'bg-[rgba(0,89,187,0.05)]' : ''}`}>
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F2F4F7]">
                      {f ? <img src={f} alt="" className="w-full h-full object-cover" /> : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center text-white font-bold text-xs">
                          {p.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-[#191C1E] text-sm font-semibold">{p.name}</p>
                      <p className="text-[#414754] text-xs">{p.spesialisasi}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#EAB308"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <span className="text-[#717786] text-[10px] font-medium">{p.rating} ({p.reviewCount})</span>
                      </div>
                    </div>
                    {selectedDokter === p.id && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#0059BB] shrink-0"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Date */}
        <div className="px-5 pt-6">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-[#414754] text-sm font-semibold">Today</p>
              <h2 className="text-[#191C1E] text-2xl font-bold">{today.getDate()} {monthNames[today.getMonth()]}</h2>
            </div>
            <p className="text-[#0059BB] text-sm font-semibold">{monthNames[today.getMonth()]}</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {days.map((d, idx) => {
              const active = idx === selectedDay
              return (
                <button key={d.label + d.date} onClick={() => setSelectedDay(idx)}
                  className={`flex flex-col items-center rounded-full min-w-[56px] h-20 py-2 px-4 shrink-0 ${btnAnim()} ${
                    active ? 'bg-gradient-to-b from-[#0059BB] to-[#0070EA] text-white shadow-[0px_4px_12px_rgba(0,89,187,0.30)]' : 'bg-white shadow-[0px_10px_30px_rgba(0,123,255,0.05)]'
                  }`}>
                  <span className={`text-xs font-medium ${active ? 'text-white' : 'text-[#717786]'}`}>{d.label}</span>
                  <span className={`text-lg font-bold ${active ? 'text-white' : 'text-[#191C1E]'}`}>{d.date}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Time */}
        <div className="px-5 pt-6">
          <p className="text-[#191C1E] text-sm font-semibold mb-3">Available Time</p>
          <div className="flex flex-wrap gap-2">
            {times.map(t => {
              const active = t === selectedTime
              return (
                <button key={t} onClick={() => setSelectedTime(t)}
                  className={`px-6 py-2.5 rounded-[32px] text-sm ${btnAnim()} ${
                    active
                      ? 'bg-[rgba(0,89,187,0.10)] text-[#0059BB] font-bold outline outline-1 outline-[#0059BB] shadow-[0px_0px_0px_2px_rgba(0,89,187,0.20)]'
                      : 'bg-white text-[#414754] outline outline-1 outline-[#C1C6D7]'
                  }`}>
                  {t}
                </button>
              )
            })}
          </div>
        </div>

        {/* Type */}
        <div className="px-5 pt-6">
          <p className="text-[#191C1E] text-sm font-semibold mb-3">Consultation Type</p>
          <div className="flex gap-4">
            {(['video', 'chat'] as const).map(type => {
              const active = selectedType === type
              return (
                <button key={type} onClick={() => setSelectedType(type)}
                  className={`flex-1 bg-white rounded-[32px] p-4 flex flex-col items-center gap-2 relative ${btnAnim()} ${
                    active
                      ? 'outline outline-2 outline-[#0059BB] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]'
                      : 'outline outline-1 outline-[#C1C6D7] shadow-[0px_10px_30px_rgba(0,123,255,0.05)]'
                  }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${active ? 'bg-[rgba(0,112,234,0.20)]' : 'bg-[#ECEEF1]'}`}>
                    {type === 'video' ? (
                      <svg width="24" height="20" viewBox="0 0 24 24" fill="none" className={active ? 'text-[#0059BB]' : 'text-[#717786]'}><path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="2"/><rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2"/></svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={active ? 'text-[#0059BB]' : 'text-[#717786]'}><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2"/></svg>
                    )}
                  </div>
                  <p className="text-[#191C1E] text-sm">{type === 'video' ? 'Video Call' : 'Chat'}</p>
                  <p className={`text-sm font-bold ${active ? 'text-[#0059BB]' : 'text-[#717786]'}`}>Rp{(type === 'video' ? 400000 : 250000).toLocaleString()}</p>
                  {active && (
                    <div className="absolute top-3 right-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="px-5 pt-6 pb-4">
          <div className="bg-[rgba(255,255,255,0.70)] backdrop-blur-[10px] rounded-[32px] p-4 outline-1 outline-[rgba(255,255,255,0.30)]">
            <p className="text-[#414754] text-sm mb-2">Session Summary</p>
            <div className="flex items-center gap-2">
              <svg width="14" height="15" viewBox="0 0 24 24" fill="none" className="text-[#0059BB] shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <p className="text-[#191C1E] text-sm font-semibold">{selWeekday}, {selDayNum} {selMonth} • {selectedTime} WIB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[rgba(247,249,252,0.80)] backdrop-blur-[6px] px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#717786] text-xs font-medium">Total Price</p>
            <p className="text-[#0059BB] text-lg font-bold">Rp{price.toLocaleString()}</p>
          </div>
          <button onClick={() => {
            if (!selectedDokter) {
              setShowDokter(true)
              return
            }
            navigate(`/pembayaran/${selectedDokter}?day=${selDayNum}&month=${selDate.month}&time=${selectedTime}&type=${selectedType}&price=${price}`)
          }}
            className={`bg-[#007AFF] text-white rounded-full px-10 py-3.5 text-base font-semibold shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10),0px_10px_15px_-3px_rgba(0,0,0,0.10)] flex items-center gap-2 ${btnAnim()}`}>
            Confirm Booking
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
