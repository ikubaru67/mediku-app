import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { path: '/home', label: 'Home', icon: 'home' },
  { path: '/konsultasi', label: 'Konsultasi', icon: 'chat' },
  { path: '/rekam-medis', label: 'Rekam Medis', icon: 'file' },
  { path: '/artikel', label: 'Artikel', icon: 'article' },
  { path: '/profil', label: 'Profil', icon: 'user' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-16 bg-white border-t border-[rgba(193,198,215,0.30)] backdrop-blur-[6px] z-50">
      <div className="flex items-center justify-around h-full px-4">
        {tabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path)
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-0.5 relative p-1"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={isActive ? 'text-[#0059BB]' : 'text-[rgba(65,71,84,0.60)]'}>
                {tab.icon === 'home' && <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
                {tab.icon === 'chat' && <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
                {tab.icon === 'file' && <g><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" /><path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" /></g>}
                {tab.icon === 'article' && <g><path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth="2" /><path d="M8 7h8M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></g>}
                {tab.icon === 'user' && <g><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" /></g>}
              </svg>
              <span className={`text-[12px] font-medium leading-4 ${isActive ? 'text-[#0059BB]' : 'text-[#9A9A9A]'}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
