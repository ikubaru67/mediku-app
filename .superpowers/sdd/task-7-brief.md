### Task 7: Konsultasi Pages

**Files:**
- Create: `src/features/konsultasi/KonsultasiPage.tsx`
- Create: `src/features/konsultasi/ProfilPsikologPage.tsx`
- Create: `src/features/konsultasi/ChatPage.tsx`
- Create: `src/features/konsultasi/VideoCallPage.tsx`
- Modify: `src/App.tsx`

**Depends on:** Task 3 (mockPsikologList, mockUlasan), Task 4 (MainLayout), shared components

#### KonsultasiPage.tsx — List of psychologists

```tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/SearchBar'
import Card from '../../components/Card'
import Icon from '../../components/Icon'
import RatingStars from '../../components/RatingStars'
import { mockPsikologList } from '../../mocks/konsultasi'

export default function KonsultasiPage() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const filtered = mockPsikologList.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-surface pb-20">
      <div className="bg-white rounded-b-3xl px-5 pt-4 pb-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-600 mb-4">Konsultasi</h1>
        <SearchBar value={search} onChange={setSearch} placeholder="Cari psikolog..." />
      </div>
      <div className="px-5 pt-6 space-y-3">
        {filtered.map(p => (
          <Card key={p.id} onClick={() => navigate(`/konsultasi/${p.id}`)} className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
              <Icon name="user" size={24} className="text-primary-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-gray-600 truncate">{p.name}</h3>
                {p.isVerified && (
                  <span className="text-[10px] font-bold text-secondary-500 bg-secondary-50 px-2 py-0.5 rounded-full shrink-0">TERVERIFIKASI</span>
                )}
              </div>
              <p className="text-xs text-gray-400">{p.spesialisasi}</p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <RatingStars rating={Math.round(p.rating)} size={12} />
                  <span className="text-xs text-gray-400">({p.reviewCount})</span>
                </div>
                <span className="text-xs font-semibold text-primary-500">Rp{p.harga.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

#### ProfilPsikologPage.tsx

```tsx
import { useParams, useNavigate } from 'react-router-dom'
import TopAppBar from '../../components/TopAppBar'
import Button from '../../components/Button'
import RatingStars from '../../components/RatingStars'
import Icon from '../../components/Icon'
import { mockPsikologList, mockUlasan } from '../../mocks/konsultasi'

export default function ProfilPsikologPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const psikolog = mockPsikologList.find(p => p.id === id)
  const ulasan = id ? mockUlasan[id] || [] : []

  if (!psikolog) return (
    <div className="min-h-screen bg-surface">
      <TopAppBar showBack title="Not Found" />
      <div className="p-5 text-center text-gray-400">Psikolog tidak ditemukan</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-surface pb-8">
      <TopAppBar showBack />
      <div className="flex flex-col items-center px-5 pb-6">
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mb-3">
          <Icon name="user" size={36} className="text-primary-500" />
        </div>
        <h1 className="text-xl font-bold text-gray-600">{psikolog.name}</h1>
        <p className="text-sm text-gray-400">{psikolog.spesialisasi}</p>
        <div className="flex items-center gap-2 mt-1">
          <RatingStars rating={Math.round(psikolog.rating)} size={14} />
          <span className="text-xs text-gray-400">{psikolog.rating} ({psikolog.reviewCount} ulasan)</span>
        </div>
        <div className="flex gap-3 mt-4">
          <Button variant="gradient" onClick={() => navigate(`/konsultasi/chat/${id}`)}>
            <span className="flex items-center gap-2"><Icon name="chat" size={16} className="text-white" /> Chat</span>
          </Button>
          <Button variant="outline" onClick={() => navigate(`/konsultasi/video/${id}`)}>
            <span className="flex items-center gap-2"><Icon name="video" size={16} /> Video Call</span>
          </Button>
        </div>
      </div>

      <div className="px-5 mb-6">
        <h2 className="font-bold text-gray-600 mb-2">Tentang</h2>
        <p className="text-sm text-gray-400 leading-relaxed">{psikolog.about}</p>
        <p className="text-sm text-gray-500 mt-2">Pengalaman: {psikolog.pengalaman}</p>
      </div>

      <div className="px-5">
        <h2 className="font-bold text-gray-600 mb-3">Ulasan ({ulasan.length})</h2>
        {ulasan.map(u => (
          <div key={u.id} className="bg-white rounded-2xl p-4 mb-3 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-gray-600">{u.userName}</span>
              <RatingStars rating={u.rating} size={12} />
            </div>
            <p className="text-sm text-gray-400">{u.komentar}</p>
            <p className="text-[10px] text-gray-300 mt-2">{u.tanggal}</p>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/80 backdrop-blur-md p-4 border-t border-gray-100">
        <Button fullWidth variant="gradient" onClick={() => navigate('/jadwal/baru')}>Buat Janji Konsultasi</Button>
      </div>
    </div>
  )
}
```

#### ChatPage.tsx

```tsx
import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Icon from '../../components/Icon'
import { mockPsikologList } from '../../mocks/konsultasi'

interface ChatMessage {
  id: string; text: string; isUser: boolean; time: string
}

const mockMessages: ChatMessage[] = [
  { id: 'm1', text: 'Halo, ada yang bisa saya bantu?', isUser: false, time: '10:00' },
  { id: 'm2', text: 'Saya ingin konsultasi tentang kecemasan yang saya rasakan akhir-akhir ini.', isUser: true, time: '10:01' },
  { id: 'm3', text: 'Tentu, bisa ceritakan lebih detail? Sudah berapa lama Anda merasakan hal ini?', isUser: false, time: '10:02' },
  { id: 'm4', text: 'Sudah sekitar 2 bulan terakhir, terutama saat di tempat kerja.', isUser: true, time: '10:03' },
  { id: 'm5', text: 'Saya mengerti. Apa saja gejala yang Anda rasakan?', isUser: false, time: '10:04' },
]

export default function ChatPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const psikolog = mockPsikologList.find(p => p.id === id)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages([...messages, {
      id: `m-${Date.now()}`, text: input.trim(), isUser: true,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }])
    setInput('')
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1"><Icon name="chevronLeft" size={24} className="text-gray-600" /></button>
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center"><Icon name="user" size={18} className="text-primary-500" /></div>
        <div>
          <h2 className="font-semibold text-sm text-gray-600">{psikolog?.name || 'Chat'}</h2>
          <p className="text-[10px] text-accent-green font-medium">Online</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.isUser ? 'bg-primary-500 text-white rounded-br-md' : 'bg-white text-gray-600 shadow-sm rounded-bl-md'}`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-[10px] mt-1 ${msg.isUser ? 'text-white/70' : 'text-gray-300'}`}>{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="bg-white/80 backdrop-blur-md p-3 border-t border-gray-100 flex items-center gap-3">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ketik pesan..." className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm outline-none" />
        <button onClick={sendMessage} className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
          <Icon name="send" size={18} className="text-white" />
        </button>
      </div>
    </div>
  )
}
```

#### VideoCallPage.tsx

```tsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Icon from '../../components/Icon'

export default function VideoCallPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [muted, setMuted] = useState(false)
  const [speaker, setSpeaker] = useState(true)

  return (
    <div className="min-h-screen bg-black relative flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-gray-800 mx-auto mb-4 flex items-center justify-center">
            <Icon name="user" size={48} className="text-gray-600" />
          </div>
          <h2 className="text-white font-semibold text-lg">Dr. Sarah Wijaya</h2>
          <p className="text-gray-400 text-sm mt-1">Video Call</p>
        </div>
      </div>

      <div className="absolute top-4 right-4 w-24 h-36 bg-gray-800 rounded-2xl overflow-hidden border-2 border-white/20">
        <div className="w-full h-full flex items-center justify-center">
          <Icon name="user" size={32} className="text-gray-600" />
        </div>
      </div>

      <div className="relative z-10 px-5 pt-12">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Icon name="chevronLeft" size={20} className="text-white" />
          </button>
          <span className="text-white font-mono text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">00:00</span>
        </div>
      </div>

      <div className="relative z-10 mt-auto px-5 pb-12">
        <div className="flex items-center justify-center gap-6">
          <button onClick={() => setMuted(!muted)} className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm ${muted ? 'bg-accent-red' : 'bg-white/10'}`}>
            <Icon name="mic" size={22} className={muted ? 'text-white' : 'text-white/80'} />
          </button>
          <button onClick={() => navigate(-1)} className="w-16 h-16 bg-accent-red rounded-full flex items-center justify-center">
            <Icon name="phone" size={24} className="text-white rotate-135" />
          </button>
          <button onClick={() => setSpeaker(!speaker)} className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm ${speaker ? 'bg-primary-500' : 'bg-white/10'}`}>
            <Icon name="phone" size={22} className="text-white/80" />
          </button>
        </div>
      </div>
    </div>
  )
}
```

#### Update App.tsx

Read current `src/App.tsx`. Add imports and routes:

```tsx
import KonsultasiPage from './features/konsultasi/KonsultasiPage'
import ProfilPsikologPage from './features/konsultasi/ProfilPsikologPage'
import ChatPage from './features/konsultasi/ChatPage'
import VideoCallPage from './features/konsultasi/VideoCallPage'

// Inside MainLayout route group:
<Route path="/konsultasi" element={<KonsultasiPage />} />
<Route path="/konsultasi/:id" element={<ProfilPsikologPage />} />

// Outside MainLayout (full-screen, no bottom nav):
<Route path="/konsultasi/chat/:id" element={<ChatPage />} />
<Route path="/konsultasi/video/:id" element={<VideoCallPage />} />
```

## Verify

```bash
npx tsc --noEmit
```
