import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { auth } from '../../services/firebase'
import { mockPsikologList } from '../../mocks/konsultasi'
import { IMAGES } from '../../config/images'

export default function VideoCallPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [muted, setMuted] = useState(false)
  const [speaker, setSpeaker] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [camError, setCamError] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { id: 'vc1', text: 'Dok, saya sudah siap untuk sesi hari ini.', isUser: true, time: '12:45' },
    { id: 'vc2', text: 'Baik, mari kita mulai. Bagaimana perasaan Anda hari ini?', isUser: false, time: '12:46' },
  ])
  const [chatInput, setChatInput] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const psikolog = mockPsikologList.find(p => p.id === id)
  const bg = (IMAGES.videoBgMap as any)[psikolog?.name || ''] || IMAGES.videoBg

  const startCamera = async () => {
    try {
      setCamError(false)
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 200, height: 280 },
        audio: true,
      })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
    } catch {
      setCamError(true)
    }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
  }

  useEffect(() => {
    if (camOn) { startCamera() } else { stopCamera() }
    return () => stopCamera()
  }, [camOn])

  const handleEndCall = () => {
    const key = `mediku_jadwal_${auth.currentUser?.uid || 'temp'}`
    const list = JSON.parse(localStorage.getItem(key) || '[]')
    const updated = Array.isArray(list) ? list.map((b: any) => {
      if (b.dokterId === id || (b.dokter && psikolog && b.dokter.includes(psikolog.name.split(',')[0]))) {
        return { ...b, status: 'selesai' }
      }
      return b
    }) : []
    localStorage.setItem(key, JSON.stringify(updated))
    navigate('/jadwal')
  }

  const sendChat = () => {
    if (!chatInput.trim()) return
    setChatMessages([...chatMessages, {
      id: `vc-${Date.now()}`, text: chatInput.trim(), isUser: true,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }])
    setChatInput('')
  }

  return (
    <div className="min-h-screen bg-black relative flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" aria-label={`Video call real-time dengan ${psikolog?.name || 'psikolog'}`}>
          <img src={bg} alt="Video call background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-1 h-1 bg-[rgba(89,254,173,0.40)] rounded-full absolute top-[393px] left-[6.55px] opacity-48" />
        <div className="w-[2px] h-[2px] bg-[rgba(89,254,173,0.40)] rounded-full absolute top-[238px] left-[60px] opacity-32" />
      </div>

      {/* Top bar */}
      <div className="relative z-10 px-5 pt-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} aria-label="Kembali" className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.15)] backdrop-blur-[12px] outline-1 outline-[rgba(255,255,255,0.20)] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div>
            <p className="text-white text-lg leading-[27px] drop-shadow-[0px_4px_3px_rgba(0,0,0,0.07)]">{psikolog?.name || 'Video Call'}</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#006D43] shadow-[0px_0px_8px_rgba(0,109,67,0.80)]" />
              <span className="text-[rgba(255,255,255,0.90)] text-xs tracking-[0.80px]">12:47</span>
            </div>
          </div>
        </div>
        <button aria-label="Profil" className="px-4 py-2 rounded-full bg-[rgba(255,255,255,0.15)] backdrop-blur-[12px] outline-1 outline-[rgba(255,255,255,0.20)] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">
          <svg width="14" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>
      </div>

      {/* PIP (user camera) */}
      <div className="absolute top-32 right-5 z-20">
        <div className="w-32 h-44 rounded-[16px] overflow-hidden shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] outline-2 outline-[rgba(255,255,255,0.20)] bg-gray-800">
          {camOn && !camError ? (
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-gray-500"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/></svg>
            </div>
          )}
        </div>
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-[32px] bg-[rgba(0,0,0,0.40)] backdrop-blur-[6px]">
          <span className="text-white text-[10px] font-medium uppercase tracking-[1px]">YOU</span>
        </div>
      </div>

      {/* Bottom section */}
      <div className="relative z-10 mt-auto px-5 pb-12 flex flex-col items-center gap-8">
        {/* Status */}
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-[rgba(255,255,255,0.15)] backdrop-blur-[12px] outline-1 outline-[rgba(255,255,255,0.20)]">
          <svg width="16" height="20" viewBox="0 0 24 24" fill="none" className="text-[#59FEAD]"><rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M12 8v3l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="text-white text-sm">{psikolog?.name.split(' ')[0] || 'Doctor'} can hear you clearly</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 px-4 py-4 rounded-[40px] bg-[rgba(255,255,255,0.15)] backdrop-blur-[12px] outline-1 outline-[rgba(255,255,255,0.20)]">
          {/* Mute */}
          <button onClick={() => setMuted(!muted)} aria-label={muted ? 'Aktifkan mikrofon' : 'Nonaktifkan mikrofon'} className="w-14 h-14 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.15)] backdrop-blur-[12px] outline-1 outline-[rgba(255,255,255,0.20)] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">
            {muted ? (
              <svg width="20" height="24" viewBox="0 0 24 24" fill="none" className="text-[#BA1A1A]"><rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M12 8v3l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            ) : (
              <svg width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="3"/><path d="M12 8v3l2 2"/></svg>
            )}
          </button>

          {/* Chat */}
          <button onClick={() => setShowChat(true)} aria-label="Buka chat" className="w-14 h-14 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.15)] backdrop-blur-[12px] outline-1 outline-[rgba(255,255,255,0.20)] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">
            <svg width="20" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          </button>

          {/* End call */}
          <button onClick={handleEndCall} aria-label="Akhiri panggilan" className="w-16 h-16 rounded-full bg-[#BA1A1A] flex items-center justify-center shadow-[0px_4px_6px_-4px_rgba(186,26,26,0.40),0px_10px_15px_-3px_rgba(186,26,26,0.40)] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">
            <svg width="28" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M4 12c0-3.3 1.6-6.2 4-8M20 12c0-3.3-1.6-6.2-4-8M2 12h20"/></svg>
          </button>

          {/* Speaker */}
          <button onClick={() => setSpeaker(!speaker)} aria-label={speaker ? 'Nonaktifkan speaker' : 'Aktifkan speaker'} className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-[12px] outline-1 outline-[rgba(255,255,255,0.20)] ${speaker ? 'bg-[rgba(255,255,255,0.15)]' : 'bg-[rgba(255,255,255,0.15)]'}`}>
            <svg width="18" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>
          </button>

          {/* Camera switch */}
          <button onClick={() => setCamOn(!camOn)} aria-label={camOn ? 'Nonaktifkan kamera' : 'Aktifkan kamera'} className="w-14 h-14 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.15)] backdrop-blur-[12px] outline-1 outline-[rgba(255,255,255,0.20)] relative focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">
            <svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
            {!camOn && <div className="absolute w-[18px] h-[2px] bg-[#BA1A1A] rotate-45" />}
            {camOn && <div className="absolute -top-1 right-0 w-3 h-3 rounded-full bg-[#0059BB] border-2 border-[rgba(255,255,255,0.20)]" />}
          </button>
        </div>
      </div>

      {/* Chat Overlay */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end items-center">
          <div className="absolute inset-0 max-w-[430px] mx-auto bg-black/30" onClick={() => setShowChat(false)} />
          <div className="relative w-full max-w-[430px] bg-[rgba(247,249,252,0.95)] backdrop-blur-[12px] rounded-t-[32px] max-h-[60vh] flex flex-col animate-slide-up">
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-[#F2F4F7]">
                  {psikolog ? <img src={(IMAGES.videoBgMap as any)[psikolog.name] || IMAGES.videoBg} alt="Foto dokter" className="w-full h-full object-cover" /> : null}
                </div>
                <div>
                  <p className="text-[#191C1E] text-sm font-semibold">{psikolog?.name || 'Doctor'}</p>
                  <p className="text-[#006D43] text-xs">Online</p>
                </div>
              </div>
              <button onClick={() => setShowChat(false)} aria-label="Tutup" className="p-1 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#717786" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px]">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.isUser ? 'bg-[#0059BB] text-white rounded-br-md' : 'bg-white text-[#191C1E] shadow-sm rounded-bl-md'
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.isUser ? 'text-white/60' : 'text-gray-300'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-[rgba(193,198,215,0.30)] flex items-center gap-2">
              <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendChat()}
                placeholder="Ketik pesan..."
                className="flex-1 bg-[#F2F4F7] rounded-full px-4 py-2.5 outline-none text-sm text-[#191C1E] placeholder:text-[#717786]" />
              <button onClick={sendChat} aria-label="Kirim" className="w-9 h-9 bg-[#0059BB] rounded-full flex items-center justify-center shrink-0 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
                <svg width="16" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
