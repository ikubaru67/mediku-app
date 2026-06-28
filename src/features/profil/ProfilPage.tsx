import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth'
import Icon from '../../components/Icon'
import ComingSoonPopup from '../../components/ComingSoonPopup'
import { profileSections } from '../../mocks/profil'

export default function ProfilPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [comingSoon, setComingSoon] = useState<string | null>(null)
  const initials = user?.displayName?.split(' ').map(n => n[0]).join('') || '?'

  const saved = (() => {
    try {
      const key = `mediku_profile_${user?.uid || 'temp'}`
      return JSON.parse(localStorage.getItem(key) || '{}')
    } catch { return {} }
  })()
  const berat = saved.berat || '-'
  const tinggi = saved.tinggi || '-'
  const goldar = saved.goldar || '-'

  const healthStats = [
    { id: 'weight', icon: 'activity', label: 'Weight', value: `${berat} kg` },
    { id: 'height', icon: 'activity', label: 'Height', value: `${tinggi} cm` },
    { id: 'blood', icon: 'activity', label: 'Blood', value: goldar },
  ]

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-20">
      <div className="bg-white rounded-b-3xl px-5 pt-8 pb-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-br from-[#0059BB] to-[#006D43]">
              <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Foto profil" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#0059BB] font-extrabold text-3xl">{initials}</span>
                )}
              </div>
            </div>
            <div className="absolute bottom-1 right-1 w-8 h-8 bg-[#0059BB] rounded-full flex items-center justify-center shadow-md">
              <Icon name="camera" size={16} className="text-white" />
            </div>
          </div>
          <h1 className="text-[#191C1E] text-2xl font-bold">{user?.displayName || 'Pengguna'}</h1>
          <p className="text-[#414754] text-base mt-1">{user?.email || '-'}</p>
          <button onClick={() => navigate('/profil/edit')}
            className="mt-4 bg-[#0079FF] text-white text-sm font-semibold rounded-full px-6 py-3 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="px-5 pt-6 stagger-fade">
        <div className="flex items-center justify-center gap-8 mb-6">
          {healthStats.map(stat => (
            <div key={stat.id} className="flex flex-col items-center gap-1">
              <Icon name={stat.icon} size={20} className="text-[#717786]" />
              <span className="text-[#191C1E] text-sm font-bold">{stat.value}</span>
              <span className="text-[#717786] text-xs">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {profileSections.map((section) => (
            <div key={section.title}
              className="bg-white rounded-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-4"
              style={{ outline: '1px rgba(193,198,215,0.20)' }}>
              <p className="text-[#717786] text-xs font-semibold tracking-wider mb-3 px-1">{section.title}</p>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button key={item.id} onClick={() => item.path === '#' ? setComingSoon(item.label) : navigate(item.path)}
                    className="w-full flex items-center gap-6 py-2.5 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none rounded-lg">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: section.color }}>
                      <Icon name={item.icon} size={18} className="shrink-0"
                        style={{ color: section.iconColor }} />
                    </div>
                    <span className="flex-1 text-[#191C1E] text-sm font-medium text-left">{item.label}</span>
                    <Icon name="chevronRight" size={16} className="text-[#C1C6D7]" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button onClick={() => { signOut(auth); navigate('/login') }}
            className="w-full flex items-center gap-6 py-3 px-4 rounded-[32px] focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none"
            style={{ backgroundColor: '#FFDAD6' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#FFDAD6]">
              <Icon name="logOut" size={18} className="text-[#93000A]" />
            </div>
            <span className="flex-1 text-[#93000A] text-sm font-medium text-left">Keluar</span>
          </button>
        </div>

        <p className="text-center text-[#717786] text-xs mt-6">MediKu App Version 0.5.0 (2026)</p>
      </div>

      {comingSoon && <ComingSoonPopup feature={comingSoon} onClose={() => setComingSoon(null)} />}
    </div>
  )
}
