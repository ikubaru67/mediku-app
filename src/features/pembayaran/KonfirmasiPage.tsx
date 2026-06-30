import { useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { mockPsikologList } from '../../mocks/konsultasi'
import { IMAGES } from '../../config/images'

const paymentMethods = {
  ewallet: [
    { id: 'gopay', name: 'Gopay' },
    { id: 'ovo', name: 'OVO' },
    { id: 'dana', name: 'Dana' },
  ],
  va: [
    { id: 'bca', name: 'Bank BCA' },
    { id: 'mandiri', name: 'Bank Mandiri' },
    { id: 'bni', name: 'Bank BNI' },
  ],
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const weekdayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

function btnAnim() { return 'active:scale-[0.97] hover:shadow-md transition-all duration-200 ease-out' }

export default function KonfirmasiPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const psikolog = mockPsikologList.find(p => p.id === id) || mockPsikologList[0]
  const foto = (IMAGES.doctorNameMap as any)[psikolog.name]
  const inisial = psikolog.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const [selectedPayment, setSelectedPayment] = useState('gopay')

  const dayNum = searchParams.get('day') || '14'
  const monthIdx = parseInt(searchParams.get('month') || '9')
  const time = searchParams.get('time') || '11:00'
  const price = parseInt(searchParams.get('price') || '400000')
  const selectedDate = new Date(new Date().getFullYear(), monthIdx, parseInt(dayNum))
  const weekday = weekdayNames[selectedDate.getDay()]
  const monthName = monthNames[monthIdx]

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col">
      {/* Header */}
      <div className="bg-[rgba(247,249,252,0.80)] backdrop-blur-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] px-5 h-16 flex items-center gap-4">
        <button onClick={() => navigate(-1)} aria-label="Kembali" className={`p-1 ${btnAnim()} focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <h1 className="text-[#0059BB] text-2xl font-bold">Pembayaran</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-32 space-y-6 stagger-fade">
        {/* Ringkasan Pesanan */}
        <p className="text-[#414754] text-sm font-normal uppercase tracking-[0.80px]">RINGKASAN PESANAN</p>

        <div className="bg-white rounded-[32px] p-6 shadow-[0px_10px_30px_rgba(0,123,255,0.05)] outline-1 outline-[rgba(193,198,215,0.30)] flex gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 outline-2 outline-[rgba(0,112,234,0.20)]">
            {foto ? <img src={foto} alt={'Foto ' + psikolog.name} className="w-full h-full object-cover" /> : (
              <div className="w-full h-full bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center text-white font-bold text-base">{inisial}</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#191C1E] text-xl leading-6">{psikolog.name}</p>
            <p className="text-[#414754] text-sm mt-0.5">{psikolog.spesialisasi}</p>
            <div className="flex items-center gap-2 mt-2">
              <svg width="14" height="15" viewBox="0 0 24 24" fill="none" className="text-[#0059BB] shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="text-[#0059BB] text-sm">{weekday} {dayNum} {monthName}, {time} WIB</span>
            </div>
          </div>
        </div>

        {/* Total Pembayaran */}
        <div className="bg-[rgba(216,226,255,0.30)] rounded-[32px] px-6 py-4 flex items-center justify-between">
          <span className="text-[#191C1E] text-sm">Total Pembayaran</span>
          <span className="text-[#0059BB] text-base">Rp{price.toLocaleString()}</span>
        </div>

        {/* E-WALLET */}
        <div>
          <p className="text-[#414754] text-sm font-normal uppercase tracking-[0.80px] mb-4">DOMPET ELEKTRONIK</p>
          <div className="space-y-3">
            {paymentMethods.ewallet.map(pm => {
              const active = selectedPayment === pm.id
              return (
                <button key={pm.id} onClick={() => setSelectedPayment(pm.id)}
                  className={`w-full flex items-center justify-between px-4 py-4 rounded-[32px] ${btnAnim()} focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none ${
                    active ? 'bg-[rgba(0,89,187,0.05)] outline outline-1 outline-[#0059BB]' : 'bg-white outline outline-1 outline-[#C1C6D7]'
                  }`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <img src={(IMAGES.paymentLogo as any)[pm.id]} alt={pm.name} className="w-8 h-8 object-contain" />
                    </div>
                    <span className="text-[#191C1E] text-sm">{pm.name}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full ${active ? 'border-[6px] border-[#0059BB]' : 'border-2 border-[#C1C6D7]'}`} />
                </button>
              )
            })}
          </div>
        </div>

        {/* VIRTUAL ACCOUNT */}
        <div>
          <p className="text-[#414754] text-sm font-normal uppercase tracking-[0.80px] mb-4">REKENING VIRTUAL BANK</p>
          <div className="space-y-3">
            {paymentMethods.va.map(pm => (
              <button key={pm.id} onClick={() => setSelectedPayment(pm.id)}
                className={`w-full flex items-center justify-between px-4 py-4 rounded-[32px] ${btnAnim()} focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none ${
                  selectedPayment === pm.id ? 'bg-[rgba(0,89,187,0.05)] outline outline-1 outline-[#0059BB]' : 'bg-white outline outline-1 outline-[#C1C6D7]'
                }`}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <img src={(IMAGES.paymentLogo as any)[pm.id]} alt={pm.name} className="w-8 h-8 object-contain" />
                  </div>
                  <span className="text-[#191C1E] text-sm">{pm.name}</span>
                </div>
                <div className={`w-5 h-5 rounded-full ${selectedPayment === pm.id ? 'border-[6px] border-[#0059BB]' : 'border-2 border-[#C1C6D7]'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="flex items-center justify-center gap-2">
          <svg width="12" height="14" viewBox="0 0 24 24" fill="none" className="text-[rgba(65,71,84,0.60)]"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2"/></svg>
          <span className="text-[rgba(65,71,84,0.60)] text-sm">Transaksi terenkripsi dan aman</span>
        </div>
      </div>

      {/* Bottom */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[rgba(247,249,252,0.90)] backdrop-blur-[12px] px-5 py-5 rounded-t-[32px] shadow-[0px_-4px_20px_rgba(0,0,0,0.05)]">
        <button onClick={() => navigate(`/pembayaran/sukses?day=${dayNum}&month=${monthIdx}&time=${time}&price=${price}&type=${searchParams.get('type') || 'video'}&dokter=${encodeURIComponent(psikolog.name)}&spesialisasi=${encodeURIComponent(psikolog.spesialisasi)}&id=${id}`)}
          className={`w-full bg-[#007AFF] text-white rounded-full py-4 text-lg font-semibold shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10),0px_10px_15px_-3px_rgba(0,0,0,0.10)] flex items-center justify-center gap-2 ${btnAnim()} focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none`}>
          Bayar Sekarang
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  )
}
