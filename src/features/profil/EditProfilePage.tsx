import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth'

function profileKey(uid?: string) { return `mediku_profile_${uid || 'temp'}` }

function loadProfile(uid?: string) {
  try { return JSON.parse(localStorage.getItem(profileKey(uid)) || '{}') } catch { return {} }
}

export default function EditProfilePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const saved = loadProfile(user?.uid)

  const [form, setForm] = useState({
    name: user?.displayName || saved.name || '',
    email: user?.email || saved.email || '',
    phone: saved.phone || user?.phoneNumber || '',
    tanggalLahir: saved.tanggalLahir || '',
    jenisKelamin: saved.jenisKelamin || 'Wanita',
    berat: saved.berat || '',
    tinggi: saved.tinggi || '',
    goldar: saved.goldar || 'O',
  })

  useEffect(() => {
    if (!user) return
    const s = loadProfile(user.uid)
    setForm({
      name: user.displayName || s.name || '',
      email: user.email || s.email || '',
      phone: s.phone || user.phoneNumber || '',
      tanggalLahir: s.tanggalLahir || '',
      jenisKelamin: s.jenisKelamin || 'Wanita',
      berat: s.berat || '',
      tinggi: s.tinggi || '',
      goldar: s.goldar || 'O',
    })
  }, [user?.uid])

  const [saving, setSaving] = useState(false)
  const initials = user?.displayName?.split(' ').map(n => n[0]).join('') || '?'

  const update = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }))

  const handleSave = async () => {
    if (!auth.currentUser) return
    setSaving(true)
    localStorage.setItem(profileKey(user?.uid), JSON.stringify(form))
    try {
      if (form.name !== user?.displayName) {
        await updateProfile(auth.currentUser, { displayName: form.name })
      }
    } catch {}
    navigate('/profil')
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-8">
      <div className="bg-white rounded-b-[32px] px-5 h-20 flex items-center justify-between shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)]">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} aria-label="Kembali" className="w-10 h-10 rounded-full bg-[#0486F1] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1 className="text-[#0486F1] text-base font-extrabold">Edit Profil</h1>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="bg-[#0486F1] text-white text-sm font-semibold rounded-full px-6 py-2 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      <div className="px-5 pt-8 stagger-fade">
        {/* Avatar */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10),0px_10px_15px_-3px_rgba(0,0,0,0.10)] bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center">
              {user?.photoURL ? <img src={user.photoURL} alt="Foto profil" className="w-full h-full object-cover" /> : <span className="text-white font-bold text-xl">{initials}</span>}
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#0070EA] rounded-full flex items-center justify-center border-2 border-white shadow-md">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </div>
          </div>
        </div>

        {/* INFORMASI DASAR */}
        <div className="bg-white rounded-[32px] p-6 mb-4 shadow-[0px_10px_30px_rgba(0,89,187,0.05)] outline-1 outline-[rgba(193,198,215,0.30)]">
          <div className="flex items-center gap-2 mb-5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            <span className="text-[#0059BB] text-sm font-semibold uppercase tracking-[0.70px]">INFORMASI DASAR</span>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="edit-name" className="text-[#414754] text-xs font-medium mb-1 block">Nama Lengkap</label>
              <input id="edit-name" type="text" value={form.name} onChange={e => update('name', e.target.value)}
                className="w-full bg-[#F2F4F7] border border-[rgba(193,198,215,0.50)] rounded-full px-4 py-3 outline-none text-sm text-[#191C1E]" />
            </div>
            <div>
              <label htmlFor="edit-email" className="text-[#414754] text-xs font-medium mb-1 block">Email</label>
              <input id="edit-email" type="email" value={form.email} onChange={e => update('email', e.target.value)}
                className="w-full bg-[#F2F4F7] border border-[rgba(193,198,215,0.50)] rounded-full px-4 py-3 outline-none text-sm text-[#191C1E]" />
            </div>
            <div>
              <label htmlFor="edit-phone" className="text-[#414754] text-xs font-medium mb-1 block">Nomor Telepon</label>
              <input id="edit-phone" type="text" value={form.phone} onChange={e => update('phone', e.target.value)}
                className="w-full bg-[#F2F4F7] border border-[rgba(193,198,215,0.50)] rounded-full px-4 py-3 outline-none text-sm text-[#191C1E]" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="edit-tanggalLahir" className="text-[#414754] text-xs font-medium mb-1 block">Tanggal Lahir</label>
                <input id="edit-tanggalLahir" type="date" value={form.tanggalLahir} onChange={e => update('tanggalLahir', e.target.value)}
                  className="w-full bg-[#F2F4F7] border border-[rgba(193,198,215,0.50)] rounded-full px-4 py-3 outline-none text-sm text-[#191C1E]" />
              </div>
              <div className="flex-1">
                <label htmlFor="edit-jenisKelamin" className="text-[#414754] text-xs font-medium mb-1 block">Jenis Kelamin</label>
                <select id="edit-jenisKelamin" value={form.jenisKelamin} onChange={e => update('jenisKelamin', e.target.value)}
                  className="w-full bg-[#F2F4F7] border border-[rgba(193,198,215,0.50)] rounded-full px-4 py-3 outline-none text-sm text-[#191C1E] appearance-none">
                  <option>Wanita</option>
                  <option>Pria</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* INFORMASI KESEHATAN */}
        <div className="bg-white rounded-[32px] p-6 mb-4 shadow-[0px_10px_30px_rgba(0,89,187,0.05)] outline-1 outline-[rgba(193,198,215,0.30)]">
          <div className="flex items-center gap-2 mb-5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#006D43]"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="text-[#006D43] text-sm font-semibold uppercase tracking-[0.70px]">INFORMASI KESEHATAN</span>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="edit-berat" className="text-[#414754] text-xs font-medium mb-1 block">Berat Badan</label>
              <div className="relative">
                <input id="edit-berat" type="text" value={form.berat} onChange={e => update('berat', e.target.value)}
                  className="w-full bg-[#F2F4F7] border border-[rgba(193,198,215,0.50)] rounded-full px-4 py-3 outline-none text-sm text-[#191C1E]" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#414754] text-sm">kg</span>
              </div>
            </div>
            <div>
              <label htmlFor="edit-tinggi" className="text-[#414754] text-xs font-medium mb-1 block">Tinggi Badan</label>
              <div className="relative">
                <input id="edit-tinggi" type="text" value={form.tinggi} onChange={e => update('tinggi', e.target.value)}
                  className="w-full bg-[#F2F4F7] border border-[rgba(193,198,215,0.50)] rounded-full px-4 py-3 outline-none text-sm text-[#191C1E]" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#414754] text-sm">cm</span>
              </div>
            </div>
            <div>
              <label htmlFor="edit-goldar" className="text-[#414754] text-xs font-medium mb-1 block">Gol. Darah</label>
              <select id="edit-goldar" value={form.goldar} onChange={e => update('goldar', e.target.value)}
                className="w-full bg-[#F2F4F7] border border-[rgba(193,198,215,0.50)] rounded-full px-4 py-3 outline-none text-sm text-[#191C1E] appearance-none">
                <option>O</option><option>A</option><option>B</option><option>AB</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hapus Akun */}
        <div className="bg-[rgba(255,218,214,0.20)] rounded-[32px] p-4 outline-1 outline-[rgba(186,26,26,0.10)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="16" height="18" viewBox="0 0 24 24" fill="none" className="text-[#BA1A1A]"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            <span className="text-[#BA1A1A] text-sm font-semibold">Hapus Akun permanently</span>
          </div>
          <svg width="8" height="12" viewBox="0 0 24 24" fill="none" className="text-[rgba(186,26,26,0.50)]"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      </div>
    </div>
  )
}
