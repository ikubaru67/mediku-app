import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockPengingatObat, obatSections } from '../../mocks/obat'

const dayLabels = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

function getDays() {
  const today = new Date()
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return { label: dayLabels[d.getDay()], date: String(d.getDate()).padStart(2, '0') }
  })
}

export default function PengingatObatPage() {
  const [selectedDay, setSelectedDay] = useState(0)
  const [completed, setCompleted] = useState<Set<string>>(new Set(['ob-1', 'ob-2']))
  const navigate = useNavigate()
  const today = new Date()
  const days = useMemo(() => getDays(), [])

  const total = mockPengingatObat.length
  const done = completed.size
  const pct = Math.round((done / total) * 100)

  const toggleComplete = (id: string) => {
    setCompleted(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-28">
      {/* Header */}
      <div className="bg-[rgba(247,249,252,0.80)] backdrop-blur-[6px] shadow-[0px_10px_30px_rgba(0,123,255,0.05)] px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} aria-label="Kembali" className="p-1 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <h1 className="text-[#0059BB] text-2xl font-bold">Pengingat Obat</h1>
        </div>
      </div>

      {/* Date + Day Picker */}
      <div className="px-5 pt-6">
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-[#414754] text-sm font-semibold">Hari ini</p>
            <h2 className="text-[#191C1E] text-2xl font-bold">{today.getDate()} {monthNames[today.getMonth()]}</h2>
          </div>
          <p className="text-[#0059BB] text-sm font-semibold">{monthNames[today.getMonth()]}</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5">
          {days.map((day, idx) => {
            const active = idx === selectedDay
            return (
              <button key={day.label} onClick={() => setSelectedDay(idx)}
                className={`flex flex-col items-center rounded-full min-w-[56px] h-20 py-2 px-4 transition-all shrink-0 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none ${
                  active
                    ? 'bg-gradient-to-b from-[#0059BB] to-[#0070EA] text-white shadow-[0px_4px_12px_rgba(0,89,187,0.30)]'
                    : idx < 2 ? 'bg-[#ECEEF1]' : 'bg-[#E6E8EB]'
                }`}>
                <span className={`text-xs font-medium ${active ? 'text-white' : 'text-[#414754]'}`}>{day.label}</span>
                <span className={`text-lg font-bold ${active ? 'text-white' : 'text-[#191C1E]'}`}>{day.date}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="px-5 mt-6 space-y-4 stagger-fade">
        {/* Compliance Card */}
        <div className="bg-[#0070EA] rounded-[32px] p-6 shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10),0px_10px_15px_-3px_rgba(0,0,0,0.10)] relative overflow-hidden">
          <div className="w-32 h-32 rounded-full bg-white/10 absolute -right-8 top-4" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <h2 className="text-[#FEFCFF] text-2xl font-bold">Kepatuhan Obat</h2>
              <p className="text-[#FEFCFF]/90 text-sm mt-1">{done} dari {total} obat telah diminum hari ini.</p>
            </div>
            <div className="relative w-20 h-20">
              <svg width="80" height="80" viewBox="0 0 36 36" className="transform -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#FEFCFF" strokeWidth="3" strokeOpacity="0.2" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#FEFCFF" strokeWidth="3" strokeDasharray="97.4"
                  strokeDashoffset={97.4 - (pct / 100) * 97.4} strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[#FEFCFF] text-sm font-bold">{pct}%</span>
            </div>
          </div>
        </div>

        {/* Medication List */}
        {obatSections.map(section => {
          const meds = section.items.map(id => mockPengingatObat.find(m => m.id === id)).filter(Boolean)
          if (meds.length === 0) return null
          const isGreen = section.title === 'PAGI'

          return (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#414754]"><circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2"/></svg>
                <span className="text-[#414754] text-sm font-semibold uppercase tracking-[0.70px]">{section.title} • {section.time}</span>
              </div>
              <div className="space-y-3">
                {meds.map(obat => {
                  if (!obat) return null
                  const isDone = completed.has(obat.id)
                  return (
                    <div key={obat.id}
                      className="bg-white rounded-[32px] p-5 flex items-center gap-4 shadow-[0px_10px_30px_rgba(0,123,255,0.05)]"
                      style={{ borderLeft: `4px solid ${isDone ? '#006D43' : isGreen ? '#006D43' : '#0059BB'}` }}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                        isGreen ? 'bg-[rgba(86,251,171,0.30)]' : 'bg-[rgba(0,112,234,0.10)]'
                      }`}>
                        {isGreen ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#006D43]"><path d="M10.5 20.5l10-10a4.95 4.95 0 00-7-7l-10 10a4.95 4.95 0 007 7z" stroke="currentColor" strokeWidth="2"/><path d="M8.5 8.5l7 7" stroke="currentColor" strokeWidth="2"/></svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><path d="M10.5 20.5l10-10a4.95 4.95 0 00-7-7l-10 10a4.95 4.95 0 007 7z" stroke="currentColor" strokeWidth="2"/><path d="M8.5 8.5l7 7" stroke="currentColor" strokeWidth="2"/></svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-lg font-normal ${isDone ? 'text-[#717786] line-through' : 'text-[#191C1E]'}`}>{obat.namaObat}</h3>
                        <p className="text-[#414754] text-xs mt-0.5">{obat.dosis} • {obat.waktu}</p>
                      </div>
                      {isDone ? (
                        <div className="w-8 h-8 rounded-full bg-[#006D43] flex items-center justify-center shrink-0">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>
                        </div>
                      ) : (
                        <button onClick={() => toggleComplete(obat.id)}
                          className="h-10 px-4 rounded-full text-xs font-medium text-[#0059BB] border border-[#0059BB] whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
                          Selesai
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* FAB */}
      <button aria-label="Tambah obat" className="fixed bottom-24 right-1/2 translate-x-[155px] w-14 h-14 bg-gradient-to-br from-[#0059BB] to-[#0070EA] rounded-full flex items-center justify-center shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10),0px_20px_25px_-5px_rgba(0,0,0,0.10)] focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
      </button>
    </div>
  )
}
