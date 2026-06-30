import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface ChatMessage {
  id: string; text: string; isUser: boolean; time: string
}

const mockMessages: ChatMessage[] = [
  { id: 'a1', text: 'Halo, selamat datang di Konsultasi Anonim MediKu. Ada yang bisa kami bantu hari ini?', isUser: false, time: '00:01' },
  { id: 'a2', text: 'Saya merasa cemas akhir-akhir ini dan butuh seseorang untuk mendengarkan.', isUser: true, time: '00:05' },
  { id: 'a3', text: 'Terima kasih sudah berbagi. Ceritakan lebih lanjut apa yang membuat Anda merasa cemas? Kami di sini untuk mendengarkan tanpa menghakimi.', isUser: false, time: '00:07' },
]

export default function AnonimChatPage() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [input, setInput] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages([...messages, {
      id: `a-${Date.now()}`, text: input.trim(), isUser: true,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `a-${Date.now()}-r`, text: 'Terima kasih sudah berbagi. Apakah ada hal lain yang ingin Anda sampaikan?',
        isUser: false,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }])
    }, 2000)
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
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/></svg>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#59FEAD] rounded-full border-2 border-[#F7F9FC]" />
          </div>
          <div>
            <p className="text-[#0059BB] text-sm font-bold leading-5">Konsultasi Anonim</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#006D43]" />
              <span className="text-[#191C1E] text-xs">Online • 24/7</span>
            </div>
          </div>
        </div>
        <button onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 bg-[#BA1A1A] text-white text-sm font-semibold rounded-full px-4 py-2 shrink-0 focus-visible:ring-2 focus-visible:ring-[#BA1A1A] focus-visible:outline-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          Akhiri
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="flex justify-center">
          <span className="bg-[#E6E8EB] text-[#414754] text-sm px-4 py-1 rounded-full">Hari ini</span>
        </div>

        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {!msg.isUser && (
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/></svg>
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

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-[rgba(247,249,252,0.90)] backdrop-blur-[6px] px-4 py-3 border-t border-[rgba(193,198,215,0.30)]">
        <div className="flex items-end gap-2 max-w-[768px] mx-auto">
          <div className="flex-1 flex items-center bg-white rounded-[48px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-1 outline-[#C1C6D7] px-4 py-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Tulis pesan..."
              className="flex-1 bg-transparent outline-none text-sm text-[#191C1E] placeholder:text-[#6B7280]" />
          </div>
          <button onClick={sendMessage} aria-label="Kirim" className="w-12 h-12 bg-[#0059BB] rounded-full flex items-center justify-center shrink-0 shadow-md focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <svg width="19" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
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
            <p className="text-[#414754] text-sm mb-6">Apakah Anda yakin ingin mengakhiri sesi konsultasi anonim?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 bg-white text-[#414754] text-sm font-semibold rounded-full py-3 border-2 border-[#C1C6D7] focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
                Batal
              </button>
              <button onClick={() => navigate('/home')}
                className="flex-1 bg-[#BA1A1A] text-white text-sm font-semibold rounded-full py-3 focus-visible:ring-2 focus-visible:ring-[#BA1A1A] focus-visible:outline-none">
                Ya, Akhiri
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
