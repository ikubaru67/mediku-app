import { useNavigate } from 'react-router-dom'

const contacts = [
  {
    icon: 'email',
    label: 'Email',
    value: 'halo@mediku.id',
    href: 'mailto:halo@mediku.id',
  },
  {
    icon: 'phone',
    label: 'Telepon',
    value: '+62 812 3456 7890',
    href: 'tel:+6281234567890',
  },
  {
    icon: 'location',
    label: 'Alamat',
    value: 'Jl. Kesehatan No. 123, Jakarta Selatan, 12950',
    href: null,
  },
  {
    icon: 'clock',
    label: 'Jam Operasional',
    value: 'Senin - Jumat, 08:00 - 20:00 WIB',
    href: null,
  },
]

export default function HubungiKamiPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-8">
      <div className="bg-white rounded-b-[32px] px-5 h-20 flex items-center shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)]">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} aria-label="Kembali" className="w-10 h-10 rounded-full bg-[#0486F1] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1 className="text-[#0486F1] text-base font-extrabold">Hubungi Kami</h1>
        </div>
      </div>

      <div className="px-5 pt-8 stagger-fade">
        <div className="bg-gradient-to-br from-[#0059BB] to-[#006D43] rounded-[32px] p-6 text-center mb-6 shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10),0px_20px_25px_-5px_rgba(0,0,0,0.10)]">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <h2 className="text-white text-lg font-bold mb-1">Butuh Bantuan?</h2>
          <p className="text-white/80 text-sm">Tim kami siap membantu Anda 24/7</p>
        </div>

        <div className="bg-white rounded-[32px] p-6 shadow-[0px_10px_30px_rgba(0,123,255,0.05)] outline-1 outline-[rgba(193,198,215,0.30)] space-y-5">
          {contacts.map((c, idx) => (
            <div key={idx}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[rgba(0,89,187,0.10)] flex items-center justify-center shrink-0">
                  {c.icon === 'email' && (
                    <svg width="20" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  )}
                  {c.icon === 'phone' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  )}
                  {c.icon === 'location' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                  )}
                  {c.icon === 'clock' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[#414754] text-xs font-medium mb-0.5">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-[#191C1E] text-sm font-semibold hover:text-[#0059BB] transition-colors">{c.value}</a>
                  ) : (
                    <p className="text-[#191C1E] text-sm font-semibold">{c.value}</p>
                  )}
                </div>
                {c.href && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#C1C6D7] shrink-0 mt-2"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                )}
              </div>
              {idx < contacts.length - 1 && <div className="h-px bg-[#ECEEF1] mt-4" />}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-[rgba(0,89,187,0.05)] rounded-[32px] p-6 text-center">
          <p className="text-[#414754] text-sm mb-2">Respons dalam 1x24 jam</p>
          <div className="flex items-center justify-center gap-1 text-[#0059BB] text-xs">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            <span>Senin - Minggu, termasuk hari libur</span>
          </div>
        </div>
      </div>
    </div>
  )
}
