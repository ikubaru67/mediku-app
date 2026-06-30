import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
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
  const [searchParams] = useSearchParams()
  const bookingId = searchParams.get('booking')
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [input, setInput] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const psikolog = mockPsikologList.find(p => p.id === id)
  const foto = psikolog ? (IMAGES.doctorNameMap as any)[psikolog.name] : ''
  const inisial = psikolog ? psikolog.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?'

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const handleSelesai = () => {
    const key = `mediku_jadwal_${auth.currentUser?.uid || 'temp'}`
    const list = JSON.parse(localStorage.getItem(key) || '[]')
    const updated = Array.isArray(list) ? list.map((b: any) => {
      if (bookingId ? b.id === bookingId : (b.dokterId === id || (b.dokter && psikolog && b.dokter.includes(psikolog.name.split(',')[0])))) {
        return { ...b, status: 'selesai' }
      }
      return b
    }) : []
    localStorage.setItem(key, JSON.stringify(updated))
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
        <button onClick={() => navigate(-1)} aria-label="Kembali" className="p-1 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden outline-2 outline-[#0070EA] bg-[#F2F4F7]">
              {foto ? <img src={foto} alt={'Foto ' + (psikolog?.name || 'dokter')} className="w-full h-full object-cover" /> : (
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
        <button onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 bg-[#BA1A1A] text-white text-sm font-semibold rounded-full px-4 py-2 shrink-0 focus-visible:ring-2 focus-visible:ring-[#BA1A1A] focus-visible:outline-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          Akhiri Konsultasi
        </button>
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowConfirm(false)} />
          <div className="relative bg-white rounded-[32px] p-6 w-full max-w-sm shadow-xl text-center animate-pop-in">
            <div className="w-14 h-14 rounded-full bg-[#FFDAD6] flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#BA1A1A]"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h2 className="text-[#191C1E] text-lg font-bold mb-2">Akhiri Konsultasi?</h2>
            <p className="text-[#414754] text-sm mb-6">Apakah Anda yakin ingin mengakhiri sesi konsultasi dengan {psikolog?.name.split(',')[0] || 'dokter'}?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 bg-white text-[#414754] text-sm font-semibold rounded-full py-3 border-2 border-[#C1C6D7] focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
                Batal
              </button>
              <button onClick={() => { setShowConfirm(false); handleSelesai() }}
                className="flex-1 bg-[#BA1A1A] text-white text-sm font-semibold rounded-full py-3 focus-visible:ring-2 focus-visible:ring-[#BA1A1A] focus-visible:outline-none">
                Ya, Akhiri
              </button>
            </div>
          </div>
        </div>
      )}

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
                {foto ? <img src={foto} alt={'Foto ' + (psikolog?.name || 'dokter')} className="w-full h-full object-cover" /> : (
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
              {foto ? <img src={foto} alt={'Foto ' + (psikolog?.name || 'dokter')} className="w-full h-full object-cover" /> : (
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
          <button aria-label="Lampirkan file" className="p-2 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#717786]"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="flex-1 flex items-center bg-white rounded-[48px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-1 outline-[#C1C6D7] px-4 py-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Tulis pesan..."
              className="flex-1 bg-transparent outline-none text-sm text-[#191C1E] placeholder:text-[#6B7280]" />
            <button aria-label="Unggah" className="p-1 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#717786]"><path d="M4 17l4 4 4-4M12 21V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <button onClick={sendMessage} aria-label="Kirim" className="w-12 h-12 bg-[#0059BB] rounded-full flex items-center justify-center shrink-0 shadow-md focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <svg width="19" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
