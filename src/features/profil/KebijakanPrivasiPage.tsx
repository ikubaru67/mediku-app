import { useNavigate } from 'react-router-dom'

const sections = [
  {
    title: '1. Informasi yang Kami Kumpulkan',
    content: 'Kami mengumpulkan informasi pribadi yang Anda berikan secara sukarela saat mendaftar, termasuk nama, alamat email, nomor telepon, data kesehatan dasar (berat badan, tinggi badan, golongan darah), dan riwayat konsultasi. Kami juga mengumpulkan data penggunaan aplikasi seperti halaman yang dikunjungi dan fitur yang digunakan untuk meningkatkan layanan kami.',
  },
  {
    title: '2. Penggunaan Informasi',
    content: 'Informasi yang kami kumpulkan digunakan untuk: menyediakan dan memelihara layanan konsultasi, mempersonalisasi pengalaman Anda, mengirimkan pengingat jadwal konsultasi, meningkatkan kualitas layanan, dan mematuhi kewajiban hukum yang berlaku.',
  },
  {
    title: '3. Penyimpanan dan Keamanan Data',
    content: 'Data Anda disimpan secara aman menggunakan enkripsi standar industri. Kami menerapkan langkah-langkah keamanan teknis dan organisasi untuk melindungi data pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau penghancuran yang tidak sah.',
  },
  {
    title: '4. Berbagi Data dengan Pihak Ketiga',
    content: 'Kami tidak menjual data pribadi Anda kepada pihak ketiga. Data hanya dibagikan dengan: penyedia layanan pembayaran untuk memproses transaksi, tenaga kesehatan profesional yang Anda pilih untuk konsultasi, dan otoritas hukum jika diwajibkan oleh peraturan perundang-undangan.',
  },
  {
    title: '5. Hak Anda',
    content: 'Anda memiliki hak untuk: mengakses data pribadi Anda, memperbaiki data yang tidak akurat, menghapus data Anda (hak untuk dilupakan), membatasi pemrosesan data, dan menarik persetujuan kapan saja tanpa mempengaruhi legalitas pemrosesan sebelumnya.',
  },
  {
    title: '6. Penggunaan Cookie',
    content: 'Aplikasi kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman pengguna, menganalisis tren, dan mengelola preferensi. Anda dapat mengontrol penggunaan cookie melalui pengaturan perangkat Anda.',
  },
  {
    title: '7. Perubahan Kebijakan Privasi',
    content: 'Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan signifikan akan diberitahukan melalui aplikasi atau email. Dengan terus menggunakan aplikasi setelah perubahan, Anda menyetujui kebijakan yang diperbarui.',
  },
  {
    title: '8. Kontak',
    content: 'Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami melalui email di halo@mediku.id atau melalui halaman Hubungi Kami di aplikasi.',
  },
]

export default function KebijakanPrivasiPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-8">
      <div className="bg-white rounded-b-[32px] px-5 h-20 flex items-center shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)]">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} aria-label="Kembali" className="w-10 h-10 rounded-full bg-[#0486F1] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1 className="text-[#0486F1] text-base font-extrabold">Kebijakan Privasi</h1>
        </div>
      </div>

      <div className="px-5 pt-6 stagger-fade">
        <div className="bg-gradient-to-br from-[#0059BB] to-[#006D43] rounded-[32px] p-6 mb-6 shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10),0px_20px_25px_-5px_rgba(0,0,0,0.10)]">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <p className="text-white/80 text-xs text-center">Terakhir diperbarui: 1 Juli 2026</p>
        </div>

        <div className="bg-white rounded-[32px] p-6 shadow-[0px_10px_30px_rgba(0,89,187,0.05)] outline-1 outline-[rgba(193,198,215,0.30)] space-y-5">
          {sections.map((s, idx) => (
            <div key={idx}>
              <h2 className="text-[#191C1E] text-sm font-bold mb-2">{s.title}</h2>
              <p className="text-[#414754] text-sm leading-6">{s.content}</p>
              {idx < sections.length - 1 && <div className="h-px bg-[#ECEEF1] mt-4" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
