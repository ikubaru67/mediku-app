### Task 6: Home Page

**Files:**
- Create: `src/features/home/HomePage.tsx`
- Modify: `src/App.tsx`

**Depends on:** Task 3 (mockUser, mockHomeArtikel, mockQuickActions), Task 4 (MainLayout)

#### HomePage.tsx

```tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/SearchBar'
import Card from '../../components/Card'
import Icon from '../../components/Icon'
import { mockUser } from '../../mocks/auth'
import { mockHomeArtikel, mockQuickActions } from '../../mocks/home'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const user = mockUser

  return (
    <div className="min-h-screen bg-surface pb-20">
      {/* Header */}
      <div className="bg-white rounded-b-3xl px-5 pt-4 pb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-400 text-xs">Halo,</p>
            <h1 className="text-xl font-bold text-gray-600">{user.name} 👋</h1>
          </div>
          <button onClick={() => navigate('/profil')} className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <Icon name="user" size={20} className="text-primary-500" />
          </button>
        </div>
        <SearchBar value={search} onChange={setSearch} placeholder="Cari psikolog, artikel..." />
      </div>

      <div className="px-5 pt-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          {mockQuickActions.map((action) => (
            <button key={action.id} onClick={() => navigate(action.path)}
              className="bg-white rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-4 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                <Icon name={action.icon} size={18} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-500 text-center leading-tight">{action.title}</span>
            </button>
          ))}
        </div>

        {/* Artikel Terbaru */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-600">Artikel Terbaru</h2>
            <button onClick={() => navigate('/artikel')} className="text-primary-500 text-xs font-semibold">Lihat Semua</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5">
            {mockHomeArtikel.map((artikel) => (
              <Card key={artikel.id} onClick={() => navigate(`/artikel/${artikel.id}`)} className="min-w-[220px] shrink-0">
                <div className="w-full h-28 bg-gray-100 rounded-xl mb-3 flex items-center justify-center">
                  <Icon name="article" size={32} className="text-gray-300" />
                </div>
                <span className="text-[10px] font-bold text-primary-500 uppercase tracking-wider">{artikel.kategori}</span>
                <h3 className="font-semibold text-sm text-gray-600 mt-1 line-clamp-2">{artikel.judul}</h3>
                <p className="text-[10px] text-gray-400 mt-2">{artikel.tanggal}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

#### Update App.tsx

Read current `src/App.tsx`. Add:
```tsx
import HomePage from './features/home/HomePage'

// Inside the MainLayout route group, add/replace /home:
<Route path="/home" element={<HomePage />} />
```

## Verify

```bash
npx tsc --noEmit
```
