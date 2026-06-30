import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../services/firebase'
import Button from '../../components/Button'
import SplashScreen from '../../components/SplashScreen'
import { IMAGES } from '../../config/images'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      goHome(auth.currentUser?.displayName || '')
    } catch (err: any) {
      const msg =
        err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential'
          ? 'Email atau password salah'
          : err.code === 'auth/invalid-email'
            ? 'Format email tidak valid'
            : err.message || 'Login gagal'
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
        setError('Login Google gagal')
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
        <img src={IMAGES.logo} alt="MediKu" className="w-[120px] h-[114px] object-contain mb-6" />

        <h1 className="text-[28px] font-bold text-[#191C1E] mb-1">Halo, Selamat Datang!</h1>
        <p className="text-[#414754] text-base mb-8">Masuk untuk memantau kesehatanmu hari ini.</p>

        <div className="w-full bg-white rounded-[48px] shadow-[0px_10px_30px_rgba(0,123,255,0.05)] p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <div role="alert" className="bg-red-50 text-red-500 text-sm p-3 rounded-xl">{error}</div>}

            <div>
              <label htmlFor="login-email" className="text-[#414754] text-sm font-semibold block mb-2">Email</label>
              <div className="relative">
                <svg className="absolute left-0 top-1/2 -translate-y-1/2 text-[#717786]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-[#C1C6D7] pl-7 pb-2 outline-none text-sm text-[#191C1E] placeholder:text-[#9A9A9A]"
                  placeholder="contoh@email.com" required />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="login-password" className="text-[#414754] text-sm font-semibold">Password</label>
                <Link to="/lupa-password" className="text-[#0059BB] text-sm">Lupa Password?</Link>
              </div>
              <div className="relative">
                <svg className="absolute left-0 top-1/2 -translate-y-1/2 text-[#717786]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input id="login-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-[#C1C6D7] pl-7 pb-2 outline-none text-sm text-[#191C1E] placeholder:text-[#9A9A9A]"
                  placeholder="Masukkan password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#717786] focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" fullWidth loading={loading} className="text-2xl font-bold py-4">Masuk</Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#C1C6D7]" />
            <span className="text-sm text-[#717786] shrink-0">Atau masuk dengan</span>
            <div className="flex-1 h-px bg-[#C1C6D7]" />
          </div>

          <div>
            <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-2 py-3 border border-[#9A9A9A] rounded-full text-sm text-[#414754] hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Masuk dengan Google
            </button>
          </div>

          <p className="text-center mt-6 text-sm text-[#717786]">
            Belum punya akun?{' '}
            <Link to="/register" className="text-[#0059BB] font-semibold">Daftar sekarang</Link>
          </p>
        </div>
      </div>

      <footer className="px-6 pb-6 pt-4 text-center">
        <p className="text-[#717786] text-sm font-semibold mb-2">MediKu Health</p>
        <div className="flex justify-center gap-4 text-xs text-[#717786] mb-2">
          <a href="#" className="hover:underline">Kebijakan Privasi</a>
          <a href="#" className="hover:underline">Syarat & Ketentuan</a>
        </div>
        <p className="text-xs text-[#717786]">&copy; 2026 MediKu. Hak cipta dilindungi.</p>
      </footer>

      <SplashScreen show={showSplash} name={splashName} />
    </div>
  )
}
