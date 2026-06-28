import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { auth } from '../../services/firebase'
import { mockPsikologList } from '../../mocks/konsultasi'
import { IMAGES } from '../../config/images'

interface ChatMessage {
  id: string; text: string; isUser: boolean; time: string
}

const mockMessages: ChatMessage[] = [
  { id: 'm1', text: 'Halo, selamat pagi. Saya sudah meninjau catatan kesehatan mental Anda. Bagaimana perasaan Anda hari ini setelah sesi terapi minggu lalu?', isUser: false, time: '09:12' },
  { id: 'm2', text: 'Pagi Dok. Saya merasa sedikit lebih tenang, tapi masih ada rasa cemas saat mulai bekerja di pagi hari. Apakah itu normal?', isUser: true, time: '09:15' },
  { id: 'm3', text: 'Itu sangat wajar dalam proses adaptasi. Tubuh Anda sedang merespons antisipasi terhadap tugas.\n\nCoba lakukan teknik "Box Breathing" yang kita pelajari selama 5 menit sebelum membuka laptop. Saya lampirkan panduan visualnya di bawah ini.', isUser: false, time: '09:17' },
  { id: 'm4', text: 'Terima kasih, Dok. Saya akan segera mencobanya sekarang.', isUser: true, time: '09:20' },
]

export default function ChatPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [input, setInput] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const psikolog = mockPsikologList.find(p => p.id === id)
  const foto = psikolog ? (IMAGES.doctorNameMap as any)[psikolog.name] : ''
  const inisial = psikolog ? psikolog.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?'

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const handleSelesai = () => {
    const key = `mediku_jadwal_${auth.currentUser?.uid || 'temp'}`
    const list = JSON.parse(localStorage.getItem(key) || '[]')
    const updated = Array.isArray(list) ? list.map((b: any) => {
      if (b.dokterId === id || (b.dokter && psikolog && b.dokter.includes(psikolog.name.split(',')[0]))) {
        return { ...b, status: 'selesai' }
      }
      return b
    }) : []
    localStorage.setItem(key, JSON.stringify(updated))
    setShowMenu(false)
    navigate('/jadwal')
  }

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages([...messages, {
      id: `m-${Date.now()}`, text: input.trim(), isUser: true,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }])
    setInput('')
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col">
      {/* Header */}
      <div className="bg-[rgba(247,249,252,0.80)] backdrop-blur-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] px-4 h-20 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden outline-2 outline-[#0070EA] bg-[#F2F4F7]">
              {foto ? <img src={foto} alt="" className="w-full h-full object-cover" /> : (
                <div className="w-full h-full bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center text-white font-bold text-xs">{inisial}</div>
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#59FEAD] rounded-full border-2 border-[#F7F9FC]" />
          </div>
          <div>
            <p className="text-[#0059BB] text-sm font-bold leading-5">{psikolog?.name || 'Chat'}</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#006D43]" />
              <span className="text-[#191C1E] text-xs">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 relative">
          <button className="p-2">
            <svg width="20" height="16" viewBox="0 0 24 24" fill="none" className="text-[#414754]"><path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <button onClick={() => setShowMenu(!showMenu)} className="p-2 relative">
            <svg width="4" height="16" viewBox="0 0 4 16" fill="none"><circle cx="2" cy="2" r="2" fill="#414754"/><circle cx="2" cy="8" r="2" fill="#414754"/><circle cx="2" cy="14" r="2" fill="#414754"/></svg>
          </button>
          {showMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-full mt-1 bg-white rounded-2xl shadow-lg z-50 py-2 w-48 outline-1 outline-[rgba(193,198,215,0.30)]">
                <button onClick={handleSelesai} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#BA1A1A] font-medium">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#BA1A1A]"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  Akhiri Konsultasi
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Date separator */}
        <div className="flex justify-center">
          <span className="bg-[#E6E8EB] text-[#414754] text-sm px-4 py-1 rounded-full">Hari ini</span>
        </div>

        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {!msg.isUser && (
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-[#F2F4F7]">
                {foto ? <img src={foto} alt="" className="w-full h-full object-cover" /> : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center text-white font-bold text-[10px]">{inisial}</div>
                )}
              </div>
            )}
            <div className={`max-w-[75%] ${msg.isUser ? 'order-1' : 'order-2'}`}>
              <div className={`px-4 py-3 text-sm shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ${
                msg.isUser
                  ? 'bg-[#0059BB] text-white rounded-[16px_16px_2px_16px]'
                  : 'bg-white text-[#191C1E] rounded-[16px_16px_16px_2px] outline-1 outline-[#E0E3E6]'
              }`}>
                <p className="whitespace-pre-line leading-6">{msg.text}</p>
              </div>
              <div className={`flex items-center gap-1 mt-1 ${msg.isUser ? 'justify-end mr-1' : 'ml-1'}`}>
                <span className="text-[#717786] text-[10px]">{msg.time}</span>
                {msg.isUser && (
                  <svg width="14" height="8" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
              </div>
            </div>
            {msg.isUser && <div className="w-8 h-8 shrink-0 order-3" />}
          </div>
        ))}

        {/* PDF Attachment */}
        {messages.length > 0 && (
          <div className="flex justify-start items-end gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-[#F2F4F7]">
              {foto ? <img src={foto} alt="" className="w-full h-full object-cover" /> : (
                <div className="w-full h-full bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center text-white font-bold text-[10px]">{inisial}</div>
              )}
            </div>
            <div className="max-w-[75%] bg-white rounded-[16px] overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-1 outline-[#E0E3E6]">
              <div className="h-[150px] bg-gradient-to-br from-[#0059BB]/5 to-[#0070EA]/5 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]/40"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2"/><path d="M14 2v6h6" stroke="currentColor" strokeWidth="2"/></svg>
              </div>
              <div className="flex items-center justify-between px-3 py-3 bg-[#F2F4F7]">
                <div className="flex items-center gap-2">
                  <svg width="16" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2"/><path d="M14 2v6h6" stroke="currentColor" strokeWidth="2"/></svg>
                  <span className="text-[#191C1E] text-sm">Box_Breathing_Guide.pdf</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#717786]"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-[rgba(247,249,252,0.90)] backdrop-blur-[6px] px-4 py-3 border-t border-[rgba(193,198,215,0.30)]">
        <div className="flex items-end gap-2 max-w-[768px] mx-auto">
          <button className="p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#717786]"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="flex-1 flex items-center bg-white rounded-[48px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-1 outline-[#C1C6D7] px-4 py-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Tulis pesan..."
              className="flex-1 bg-transparent outline-none text-sm text-[#191C1E] placeholder:text-[#6B7280]" />
            <button className="p-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#717786]"><path d="M4 17l4 4 4-4M12 21V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <button onClick={sendMessage} className="w-12 h-12 bg-[#0059BB] rounded-full flex items-center justify-center shrink-0 shadow-md">
            <svg width="19" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
