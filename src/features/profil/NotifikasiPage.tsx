import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../services/firebase'

const iconBgs: Record<string, string> = {
  checkCircle: 'rgba(0,89,187,0.10)', calendar: 'rgba(0,89,187,0.10)', bell: 'rgba(4,134,241,0.10)',
  shield: 'rgba(186,26,26,0.10)', file: 'rgba(0,109,67,0.10)', article: 'rgba(34,91,170,0.10)',
}

function today() {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
}
function yesterday() { return today() - 86400000 }

export default function NotifikasiPage() {
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState(0)
  const [dismissing, setDismissing] = useState<Set<string>>(new Set())

  const key = `mediku_notifikasi_${auth.currentUser?.uid || 'temp'}`

  const notifs = (() => {
    try {
      const data = JSON.parse(localStorage.getItem(key) || '[]')
      return Array.isArray(data) ? [...data].reverse() : []
    } catch { return [] }
  })()

  const dismiss = (id: string) => {
    setDismissing(prev => new Set(prev).add(id))
    setTimeout(() => {
      const remove = () => {
        const list = JSON.parse(localStorage.getItem(key) || '[]')
        const updated = Array.isArray(list) ? list.filter((n: any) => n.id !== id) : []
        localStorage.setItem(key, JSON.stringify(updated))
        setDismissing(prev => { const next = new Set(prev); next.delete(id); return next })
        setRefresh(r => r + 1)
      }
      if (document.startViewTransition) {
        document.startViewTransition(remove)
      } else {
        remove()
      }
    }, 250)
  }

  const grouped = [
    { title: 'Hari Ini', items: notifs.filter((n: any) => n.timestamp >= today()) },
    { title: 'Kemarin', items: notifs.filter((n: any) => n.timestamp < today() && n.timestamp >= yesterday()) },
    { title: 'Minggu Lalu', items: notifs.filter((n: any) => n.timestamp < yesterday()) },
  ]

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="flex items-center gap-3 px-5 h-16 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <button onClick={() => navigate(-1)} className="p-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0070EA]"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <h1 className="text-[#0070EA] text-base font-extrabold">Notifikasi</h1>
      </div>

      <div className="px-5 pt-4 space-y-4 stagger-fade">
        {notifs.length === 0 && (
          <div className="text-center py-16 text-[#717786] text-sm">Belum ada notifikasi</div>
        )}

        {grouped.map((section) =>
          section.items.length > 0 ? (
            <div key={section.title}>
              <p className="text-[#717786] text-sm font-semibold mb-3">{section.title}</p>
              <div className="space-y-2">
                {section.items.map((n: any) => (
                  <div key={`${refresh}-${n.id}`} className={`bg-white rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-4 relative overflow-hidden transition-all duration-200 ${
                    dismissing.has(n.id) ? 'opacity-0 scale-90' : ''
                  }`}
                    style={{ outline: '1px rgba(193,198,215,0.30)', viewTransitionName: `notif-${String(n.id).replace(/[^a-zA-Z0-9]/g, '')}` }}>
                    <button onClick={() => dismiss(n.id)}
                      className="absolute top-2 left-2 w-6 h-6 flex items-center justify-center z-10">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#717786" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: iconBgs[n.icon] || 'rgba(0,89,187,0.10)' }}>
                        {n.icon === 'checkCircle' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        )}
                        {n.icon === 'calendar' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                        )}
                        {n.icon === 'bell' && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0486F1]"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h3 className={`text-sm font-bold text-[#191C1E]`}>{n.title}</h3>
                          <span className="text-[#717786] text-[10px] shrink-0 ml-2">{n.waktu}</span>
                        </div>
                        <p className="text-xs text-[#414754] mt-0.5 leading-5">{n.body}</p>
                      </div>
                    </div>
                    {!n.dibaca && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#0059BB]" />}
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}
