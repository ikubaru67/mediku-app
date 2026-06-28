import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../../components/Button'

export default function LupaPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col">
      <div className="px-5 pt-3">
        <button onClick={() => navigate(-1)} className="p-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 pt-12">
        <div className="w-20 h-20 rounded-full bg-[#E8F0FE] flex items-center justify-center mb-6">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0059BB" strokeWidth="1.5" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>

        <h1 className="text-[28px] font-bold text-[#191C1E] mb-2">Lupa Password?</h1>
        <p className="text-[#414754] text-base text-center mb-8">
          {sent
            ? 'Tautan reset password telah dikirim ke email Anda.'
            : 'Masukkan email terdaftar. Kami akan kirim tautan reset password.'}
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <label className="text-[#414754] text-sm font-semibold block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F2F4F7] border border-[#C1C6D7] rounded-full px-6 py-3 outline-none text-sm text-[#191C1E] placeholder:text-[#9A9A9A]"
                placeholder="contoh@email.com"
                required
              />
            </div>
            <Button type="submit" fullWidth>Kirim Tautan Reset</Button>
          </form>
        ) : (
          <div className="w-full space-y-6 text-center">
            <div className="bg-[#E8F9ED] rounded-2xl p-4 text-sm text-[#006D43]">
              Tautan telah dikirim ke <strong>{email}</strong>. Cek inbox atau folder spam Anda.
            </div>
            <Button fullWidth variant="outline" onClick={() => navigate('/login')}>
              Kembali ke Login
            </Button>
          </div>
        )}

        <p className="text-center mt-8 text-sm text-[#717786]">
          Ingat password?{' '}
          <Link to="/login" className="text-[#0059BB] font-semibold">Masuk</Link>
        </p>
      </div>
    </div>
  )
}
