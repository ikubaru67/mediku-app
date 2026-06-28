### Task 5: Auth Pages

**Files:**
- Create: `src/features/auth/LoginPage.tsx`
- Create: `src/features/auth/RegisterPage.tsx`
- Modify: `src/App.tsx`

**Depends on:** Task 3 (mockUser, mockSignIn, mockSignUp), Task 4 (MainLayout, App.tsx)

#### LoginPage

```tsx
// src/features/auth/LoginPage.tsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../../components/Button'
import TopAppBar from '../../components/TopAppBar'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { mockSignIn } = await import('../../mocks/auth')
      await mockSignIn(email, password)
      localStorage.setItem('token', 'mock-token-123')
      navigate('/home')
    } catch (err: any) {
      setError(err.message || 'Login gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      <TopAppBar showBack title="Masuk" />
      <div className="px-5 pt-8">
        <h1 className="text-2xl font-bold text-gray-600 mb-2">Selamat Datang Kembali</h1>
        <p className="text-gray-400 mb-8">Masuk untuk melanjutkan</p>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="bg-red-50 text-accent-red text-sm p-3 rounded-xl">{error}</div>}
          <div>
            <label className="text-sm font-medium text-gray-500 mb-1 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 rounded-full px-4 py-3 outline-none text-sm" placeholder="Masukkan email" required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 mb-1 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 rounded-full px-4 py-3 outline-none text-sm" placeholder="Masukkan password" required />
          </div>
          <Button type="submit" fullWidth loading={loading}>Masuk</Button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          Belum punya akun?{' '}
          <Link to="/register" className="text-primary-500 font-semibold">Daftar</Link>
        </p>
      </div>
    </div>
  )
}
```

#### RegisterPage

```tsx
// src/features/auth/RegisterPage.tsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../../components/Button'
import TopAppBar from '../../components/TopAppBar'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) { setError('Password tidak cocok'); return }
    setLoading(true)
    try {
      const { mockSignUp } = await import('../../mocks/auth')
      await mockSignUp({ name: form.name, email: form.email, phone: form.phone, password: form.password })
      localStorage.setItem('token', 'mock-token-123')
      navigate('/home')
    } catch (err: any) {
      setError(err.message || 'Daftar gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      <TopAppBar showBack title="Daftar" />
      <div className="px-5 pt-8">
        <h1 className="text-2xl font-bold text-gray-600 mb-2">Buat Akun Baru</h1>
        <p className="text-gray-400 mb-8">Daftar untuk memulai perjalananmu</p>
        <form onSubmit={handleRegister} className="space-y-4">
          {error && <div className="bg-red-50 text-accent-red text-sm p-3 rounded-xl">{error}</div>}
          {(['name', 'email', 'phone'] as const).map(field => (
            <div key={field}>
              <label className="text-sm font-medium text-gray-500 mb-1 block capitalize">{field === 'phone' ? 'No. HP' : field}</label>
              <input type={field === 'email' ? 'email' : 'text'} value={form[field]}
                onChange={e => updateField(field, e.target.value)}
                className="w-full bg-gray-100 rounded-full px-4 py-3 outline-none text-sm"
                placeholder={`Masukkan ${field === 'phone' ? 'nomor HP' : field}`} required />
            </div>
          ))}
          <div>
            <label className="text-sm font-medium text-gray-500 mb-1 block">Password</label>
            <input type="password" value={form.password} onChange={e => updateField('password', e.target.value)}
              className="w-full bg-gray-100 rounded-full px-4 py-3 outline-none text-sm" placeholder="Min. 6 karakter" required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 mb-1 block">Konfirmasi Password</label>
            <input type="password" value={form.confirmPassword} onChange={e => updateField('confirmPassword', e.target.value)}
              className="w-full bg-gray-100 rounded-full px-4 py-3 outline-none text-sm" placeholder="Ulangi password" required />
          </div>
          <Button type="submit" fullWidth loading={loading}>Daftar</Button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-400">
          Sudah punya akun? <Link to="/login" className="text-primary-500 font-semibold">Masuk</Link>
        </p>
      </div>
    </div>
  )
}
```

#### Update App.tsx

Read current `src/App.tsx`. Add imports and routes for login/register:

```tsx
import LoginPage from './features/auth/LoginPage'
import RegisterPage from './features/auth/RegisterPage'

// Add before MainLayout routes:
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
```
