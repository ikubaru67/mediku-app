import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const faqs = [
  {
    q: 'Apa itu MediKu?',
    a: 'MediKu adalah platform konsultasi kesehatan mental yang menghubungkan Anda dengan tenaga kesehatan profesional seperti psikolog, psikiater, dan dokter umum melalui layanan chat dan video call.',
  },
  {
    q: 'Bagaimana cara konsultasi di MediKu?',
    a: 'Pilih tenaga kesehatan di halaman Konsultasi, lalu tekan Pilih dan atur jadwal sesuai keinginan Anda. Setelah memilih tanggal dan waktu, lakukan pembayaran melalui metode yang tersedia. Setelah pembayaran berhasil, jadwal akan muncul di halaman Jadwal Saya. Pada waktu yang sudah dijadwalkan, tekan Mulai Konsultasi untuk memulai sesi chat atau video call dengan tenaga kesehatan.',
  },
  {
    q: 'Bagaimana cara resep obat di sini?',
    a: 'Resep obat hanya dapat diberikan oleh Psikiater setelah sesi konsultasi. Jika Psikiater meresepkan obat, resep akan dikirimkan melalui chat. Anda bisa membawa resep tersebut ke apotek terdekat untuk menebus obat yang diresepkan.',
  },
  {
    q: 'Apakah data kesehatan saya aman?',
    a: 'Ya, semua data pribadi dan kesehatan Anda dilindungi dengan enkripsi standar industri. Kami tidak akan membagikan data Anda tanpa persetujuan. Detail lebih lanjut dapat dilihat di halaman Kebijakan Privasi.',
  },
  {
    q: 'Bagaimana cara memilih tenaga kesehatan?',
    a: 'Anda dapat melihat daftar tenaga kesehatan di halaman Konsultasi. Setiap profil menampilkan spesialisasi, rating, harga, dan pengalaman. Pilih yang sesuai dengan kebutuhan Anda.',
  },
  {
    q: 'Apa perbedaan Psikolog, Psikiater, dan Dokter Umum?',
    a: 'Psikolog menangani konseling dan terapi psikologis. Psikiater adalah dokter spesialis yang dapat meresepkan obat. Dokter Umum melayani konsultasi kesehatan umum dan diagnosis awal. Pilih sesuai dengan kebutuhan Anda.',
  },
  {
    q: 'Bagaimana cara membatalkan jadwal?',
    a: 'Anda dapat membatalkan jadwal konsultasi melalui halaman Jadwal Saya dengan menekan tombol Batalkan pada jadwal yang ingin dibatalkan. Pembatalan dapat dilakukan sebelum sesi dimulai.',
  },
  {
    q: 'Metode pembayaran apa saja yang tersedia?',
    a: 'Kami menerima pembayaran melalui Gopay, OVO, Dana, dan transfer bank melalui BCA, Mandiri, serta BNI. Semua transaksi aman dan terenkripsi.',
  },
  {
    q: 'Apaya yang harus dilakukan jika mengalami masalah teknis?',
    a: 'Jika mengalami masalah teknis, coba refresh halaman atau periksa koneksi internet Anda. Jika masalah berlanjut, hubungi kami melalui halaman Hubungi Kami atau email ke halo@mediku.id.',
  },
]

export default function FAQPage() {
  const navigate = useNavigate()
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-8">
      <div className="bg-white rounded-b-[32px] px-5 h-20 flex items-center shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)]">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} aria-label="Kembali" className="w-10 h-10 rounded-full bg-[#0486F1] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1 className="text-[#0486F1] text-base font-extrabold">FAQ</h1>
        </div>
      </div>

      <div className="px-5 pt-6 stagger-fade">
        <div className="bg-gradient-to-br from-[#0059BB] to-[#006D43] rounded-[32px] p-6 mb-6 text-center shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10),0px_20px_25px_-5px_rgba(0,0,0,0.10)]">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><path d="M12 17h.01" strokeWidth="3"/></svg>
          </div>
          <p className="text-white/80 text-xs">Pertanyaan yang sering diajukan</p>
        </div>

        <div className="bg-white rounded-[32px] p-4 shadow-[0px_10px_30px_rgba(0,89,187,0.05)] outline-1 outline-[rgba(193,198,215,0.30)] space-y-1">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div key={idx}>
                <button onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between py-3 px-2 text-left focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none rounded-xl">
                  <span className="text-[#191C1E] text-sm font-medium flex-1 pr-4">{faq.q}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`text-[#717786] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
                {isOpen && (
                  <div className="px-2 pb-3 animate-fade-up">
                    <p className="text-[#414754] text-sm leading-6">{faq.a}</p>
                  </div>
                )}
                {idx < faqs.length - 1 && <div className="h-px bg-[#ECEEF1] mx-2" />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
