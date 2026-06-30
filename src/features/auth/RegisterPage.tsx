import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../services/firebase'
import Button from '../../components/Button'
import SplashScreen from '../../components/SplashScreen'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSplash, setShowSplash] = useState(false)
  const [splashName, setSplashName] = useState('')
  const navigate = useNavigate()

  const goHome = (name: string) => {
    setSplashName(name)
    setShowSplash(true)
    setTimeout(() => navigate('/home'), 1200)
  }

  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!agreed) { setError('Harap setujui Syarat & Ketentuan'); return }
    setLoading(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await updateProfile(cred.user, { displayName: form.name })
      localStorage.setItem(`mediku_profile_${cred.user.uid}`, JSON.stringify({ phone: form.phone }))
      goHome(form.name)
    } catch (err: any) {
      const msg =
        err.code === 'auth/email-already-in-use'
          ? 'Email sudah terdaftar'
          : err.code === 'auth/weak-password'
            ? 'Password minimal 6 karakter'
            : err.code === 'auth/invalid-email'
              ? 'Format email tidak valid'
              : err.message || 'Daftar gagal'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      await signInWithPopup(auth, provider)
      goHome(auth.currentUser?.displayName || 'Pengguna')
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Daftar dengan Google gagal')
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col">
      <div className="px-5 pt-3">
        <button onClick={() => navigate(-1)} aria-label="Kembali" className="p-1 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 pt-6 stagger-fade">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center mb-4">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        <h1 className="text-[28px] font-bold text-[#191C1E] mb-1">Buat Akun Baru</h1>
        <p className="text-[#414754] text-base mb-6 text-center">Mulai perjalanan sehat Anda bersama MediKu</p>

        <div className="w-full bg-white/80 rounded-[32px] shadow-[0px_10px_30px_rgba(0,123,255,0.05)] p-6 backdrop-blur-[10px]">
          <form onSubmit={handleRegister} className="space-y-5">
            {error && <div role="alert" className="bg-red-50 text-red-500 text-sm p-3 rounded-xl">{error}</div>}

            <div>
              <label htmlFor="register-name" className="text-[#414754] text-sm font-semibold block mb-1">Nama Lengkap</label>
              <input id="register-name" type="text" value={form.name} onChange={e => updateField('name', e.target.value)}
                className="w-full bg-[#F2F4F7] border border-[#C1C6D7] rounded-full px-6 py-3 outline-none text-sm text-[#191C1E] placeholder:text-[#9A9A9A]"
                placeholder="Masukkan nama lengkap" required />
            </div>

            <div>
              <label htmlFor="register-email" className="text-[#414754] text-sm font-semibold block mb-1">Email</label>
              <input id="register-email" type="email" value={form.email} onChange={e => updateField('email', e.target.value)}
                className="w-full bg-[#F2F4F7] border border-[#C1C6D7] rounded-full px-6 py-3 outline-none text-sm text-[#191C1E] placeholder:text-[#9A9A9A]"
                placeholder="contoh@email.com" required />
            </div>

            <div>
              <label htmlFor="register-phone" className="text-[#414754] text-sm font-semibold block mb-1">Nomor Telepon</label>
              <input id="register-phone" type="text" value={form.phone} onChange={e => updateField('phone', e.target.value)}
                className="w-full bg-[#F2F4F7] border border-[#C1C6D7] rounded-full px-6 py-3 outline-none text-sm text-[#191C1E] placeholder:text-[#9A9A9A]"
                placeholder="+62 812..." />
            </div>

            <div>
              <label htmlFor="register-password" className="text-[#414754] text-sm font-semibold block mb-1">Password</label>
              <div className="relative">
                <input id="register-password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => updateField('password', e.target.value)}
                  className="w-full bg-[#F2F4F7] border border-[#C1C6D7] rounded-full px-6 py-3 outline-none text-sm text-[#191C1E] placeholder:text-[#9A9A9A] pr-12"
                  placeholder="Min. 6 karakter" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#717786] focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-[#C1C6D7] accent-[#0059BB]" />
              <span className="text-xs text-[#414754] leading-4">
                Saya menyetujui <span className="text-[#0059BB]">Syarat & Ketentuan</span> serta{' '}
                <span className="text-[#0059BB]">Kebijakan Privasi</span> MediKu.
              </span>
            </label>

            <Button type="submit" fullWidth loading={loading} className="text-2xl font-bold py-4">Daftar</Button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#C1C6D7]" />
            <span className="text-sm text-[#717786] shrink-0">Atau daftar dengan</span>
            <div className="flex-1 h-px bg-[#C1C6D7]" />
          </div>

          <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-2 py-3 border border-[#9A9A9A] rounded-full text-sm text-[#414754] hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Daftar dengan Google
          </button>

          <p className="text-center mt-6 text-sm text-[#717786]">
            Sudah punya akun? <Link to="/login" className="text-[#0059BB] font-semibold">Masuk di sini</Link>
          </p>

          <div className="flex items-center justify-center gap-1 mt-6 text-xs text-[#717786]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            Data Anda terenkripsi & aman
          </div>
        </div>
      </div>
      
      <SplashScreen show={showSplash} name={splashName} />
    </div>
  )
}
