import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function profileKey(uid?: string) { return `mediku_profile_${uid || 'temp'}` }

function loadProfile(uid?: string) {
  try { return JSON.parse(localStorage.getItem(profileKey(uid)) || '{}') } catch { return {} }
}

export default function InformasiPribadiPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const saved = loadProfile(user?.uid)

  const data = {
    name: user?.displayName || saved.name || '-',
    email: user?.email || saved.email || '-',
    phone: saved.phone || user?.phoneNumber || '-',
    tanggalLahir: saved.tanggalLahir || '-',
    jenisKelamin: saved.jenisKelamin || '-',
    berat: saved.berat || '-',
    tinggi: saved.tinggi || '-',
    goldar: saved.goldar || '-',
  }

  const initials = user?.displayName?.split(' ').map(n => n[0]).join('') || '?'

  const fields = [
    { label: 'Nama Lengkap', value: data.name },
    { label: 'Email', value: data.email },
    { label: 'Nomor Telepon', value: data.phone },
    { label: 'Tanggal Lahir', value: data.tanggalLahir },
    { label: 'Jenis Kelamin', value: data.jenisKelamin },
    { label: 'Berat Badan', value: data.berat ? `${data.berat} kg` : '-' },
    { label: 'Tinggi Badan', value: data.tinggi ? `${data.tinggi} cm` : '-' },
    { label: 'Gol. Darah', value: data.goldar },
  ]

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-8">
      <div className="bg-white rounded-b-[32px] px-5 h-20 flex items-center justify-between shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)]">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} aria-label="Kembali" className="w-10 h-10 rounded-full bg-[#0486F1] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1 className="text-[#0486F1] text-base font-extrabold">Informasi Pribadi</h1>
        </div>
        <button onClick={() => navigate('/profil/edit')}
          className="bg-[#0486F1] text-white text-sm font-semibold rounded-full px-6 py-2 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
          Edit
        </button>
      </div>

      <div className="px-5 pt-8 stagger-fade">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10),0px_10px_15px_-3px_rgba(0,0,0,0.10)] bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Foto profil" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white font-bold text-xl">{initials}</span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-6 shadow-[0px_10px_30px_rgba(0,89,187,0.05)] outline-1 outline-[rgba(193,198,215,0.30)]">
          <div className="space-y-5">
            {fields.map((f, idx) => (
              <div key={idx}>
                <p className="text-[#414754] text-xs font-medium mb-1">{f.label}</p>
                <p className="text-[#191C1E] text-sm">{f.value}</p>
                {idx < fields.length - 1 && <div className="h-px bg-[#ECEEF1] mt-3" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
