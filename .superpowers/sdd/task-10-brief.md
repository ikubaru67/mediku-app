### Task 10: Profil Pages

**Files:**
- Create: `src/features/profil/ProfilPage.tsx`
- Create: `src/features/profil/EditProfilePage.tsx`
- Create: `src/features/profil/NotifikasiPage.tsx`
- Modify: `src/App.tsx`

#### ProfilPage.tsx

```tsx
import { useNavigate } from 'react-router-dom'
import Icon from '../../components/Icon'
import { mockUser } from '../../mocks/auth'
import { mockProfileMenu } from '../../mocks/profil'

export default function ProfilPage() {
  const navigate = useNavigate()

  const handleMenuClick = (path: string) => {
    if (path === '/login') localStorage.removeItem('token')
    navigate(path)
  }

  return (
    <div className="min-h-screen bg-surface pb-20">
      <div className="bg-white rounded-b-3xl px-5 pt-8 pb-6 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mb-3">
            <Icon name="user" size={36} className="text-primary-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-600">{mockUser.name}</h1>
          <p className="text-sm text-gray-400">{mockUser.email}</p>
          <button onClick={() => navigate('/profil/edit')}
            className="mt-3 text-sm text-primary-500 font-semibold border border-primary-200 rounded-full px-4 py-1.5">Edit Profile</button>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-1">
        {mockProfileMenu.map(item => (
          <button key={item.id} onClick={() => handleMenuClick(item.path)}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-white transition-colors">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.label === 'Keluar' ? 'bg-red-50' : 'bg-primary-50'}`}>
              <Icon name={item.icon} size={18} className={item.label === 'Keluar' ? 'text-accent-red' : 'text-primary-500'} />
            </div>
            <span className={`flex-1 text-sm font-medium text-left ${item.label === 'Keluar' ? 'text-accent-red' : 'text-gray-600'}`}>{item.label}</span>
            {item.label !== 'Keluar' && <Icon name="chevronRight" size={16} className="text-gray-300" />}
          </button>
        ))}
      </div>
    </div>
  )
}
```

#### EditProfilePage.tsx

```tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopAppBar from '../../components/TopAppBar'
import Button from '../../components/Button'
import Icon from '../../components/Icon'
import { mockUser } from '../../mocks/auth'

export default function EditProfilePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: mockUser.name, email: mockUser.email, phone: mockUser.phone })
  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  return (
    <div className="min-h-screen bg-surface">
      <TopAppBar showBack title="Edit Profile" />
      <div className="px-5 pt-6">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center"><Icon name="user" size={36} className="text-primary-500" /></div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center border-2 border-white">
              <Icon name="plus" size={14} className="text-white" />
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {(['name', 'email', 'phone'] as const).map(field => (
            <div key={field}>
              <label className="text-sm font-medium text-gray-500 mb-1 block capitalize">{field === 'phone' ? 'No. HP' : field}</label>
              <input type={field === 'email' ? 'email' : 'text'} value={form[field]}
                onChange={e => updateField(field, e.target.value)}
                className="w-full bg-gray-100 rounded-full px-4 py-3 outline-none text-sm" />
            </div>
          ))}
        </div>
        <div className="mt-8"><Button fullWidth onClick={() => navigate('/profil')}>Simpan</Button></div>
      </div>
    </div>
  )
}
```

#### NotifikasiPage.tsx

```tsx
import TopAppBar from '../../components/TopAppBar'
import Icon from '../../components/Icon'
import { mockNotifikasiList } from '../../mocks/notifikasi'

export default function NotifikasiPage() {
  const notifikasi = mockNotifikasiList

  return (
    <div className="min-h-screen bg-surface">
      <TopAppBar showBack title="Notifikasi" />
      <div className="px-5 pt-4 space-y-2">
        {notifikasi.length === 0 ? (
          <div className="flex flex-col items-center py-16"><Icon name="bell" size={48} className="text-gray-300 mb-4" /><p className="text-gray-400 text-sm">Tidak ada notifikasi</p></div>
        ) : notifikasi.map(n => (
          <div key={n.id} className={`bg-white rounded-2xl p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ${!n.dibaca ? 'border-l-4 border-primary-500' : ''}`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${!n.dibaca ? 'bg-primary-50' : 'bg-gray-100'}`}>
                <Icon name={n.icon} size={18} className={!n.dibaca ? 'text-primary-500' : 'text-gray-400'} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm ${!n.dibaca ? 'font-bold text-gray-600' : 'font-medium text-gray-500'}`}>{n.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{n.body}</p>
                <p className="text-[10px] text-gray-300 mt-1">{n.waktu}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

#### Update App.tsx

Add imports and routes:

```tsx
import ProfilPage from './features/profil/ProfilPage'
import EditProfilePage from './features/profil/EditProfilePage'
import NotifikasiPage from './features/profil/NotifikasiPage'

// Inside MainLayout:
<Route path="/profil" element={<ProfilPage />} />

// Outside MainLayout:
<Route path="/profil/edit" element={<EditProfilePage />} />
<Route path="/notifikasi" element={<NotifikasiPage />} />
```
