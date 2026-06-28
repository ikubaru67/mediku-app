import { useState } from 'react'
import Icon from '../../components/Icon'
import { mockRekamMedis } from '../../mocks/rekam-medis'

const typeIcons: Record<string, string> = {
  Konsultasi: 'user',
  'Hasil Lab': 'file',
  'Resep Obat': 'pill',
  Vaksinasi: 'checkCircle',
}

const typeColors: Record<string, string> = {
  Konsultasi: '#0059BB',
  'Hasil Lab': '#006D43',
  'Resep Obat': '#0059BB',
  Vaksinasi: '#0486F1',
}

const filters = ['Semua', 'Hasil Lab', 'Resep Obat', 'Vaksinasi']

export default function RekamMedisPage() {
  const [activeFilter, setActiveFilter] = useState('Semua')

  const filtered = activeFilter === 'Semua'
    ? mockRekamMedis
    : mockRekamMedis.filter(rm => rm.type === activeFilter)

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-28">
      {/* Header */}
      <div className="bg-white px-5 py-4">
        <h1 className="text-[#0059BB] text-2xl font-bold">Rekam Medis</h1>
      </div>

      {/* Health Summary Banner */}
      <div className="mx-5 rounded-[32px] bg-[#0079FF] p-6 relative overflow-hidden shadow-[0px_10px_30px_rgba(0,123,255,0.05)]">
        <div className="absolute w-40 h-40 rounded-full bg-white/10 blur-[40px] -top-10 -right-10" />
        <div className="absolute w-24 h-24 rounded-full bg-white/10 blur-[24px] bottom-0 -left-4" />
        <h2 className="text-white text-2xl font-bold mb-4 relative z-10">Ringkasan Kesehatan</h2>
        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div className="bg-white/20 rounded-2xl p-4">
            <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider">TERAKHIR CHECK-UP</p>
            <p className="text-white text-lg font-bold mt-1">12 Okt 2023</p>
          </div>
          <div className="bg-white/20 rounded-2xl p-4">
            <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider">STATUS UMUM</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-3 h-3 rounded-full bg-[#67E472]" />
              <p className="text-white text-lg font-bold">Sangat Baik</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 px-5 mt-5 overflow-x-auto">
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap ${activeFilter === f ? 'bg-[#0079FF] text-white' : 'bg-white text-[#717786]'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* History */}
      <div key={activeFilter} className="px-5 mt-6 stagger-fade">
        <h3 className="text-[#191C1E] text-2xl font-bold mb-4">Riwayat Terbaru</h3>
        <div className="space-y-4">
          {filtered.map(rm => (
            <div key={rm.id}
              className="bg-white rounded-[32px] p-4 flex items-start gap-4"
              style={{ boxShadow: '0px 10px 30px rgba(0,123,255,0.05)', outline: '1px solid #E6E8EB' }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${typeColors[rm.type] || '#0059BB'}15` }}>
                <Icon name={typeIcons[rm.type] || 'file'} size={22}
                  style={{ color: typeColors[rm.type] || '#0059BB' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#0059BB] text-xs font-bold">{rm.type}</p>
                <p className="text-[#191C1E] text-sm font-bold mt-0.5">{rm.diagnosis}</p>
                <p className="text-[#414754] text-base mt-1">{rm.dokter}</p>
                <p className="text-[#717786] text-xs mt-1">{rm.tanggal}</p>
              </div>
              <button className="flex items-center gap-1 text-[#0079FF] text-xs font-semibold mt-2 shrink-0">
                Lihat Detail <Icon name="chevronRight" size={12} className="text-[#0079FF]" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-24 right-1/2 translate-x-[140px] bg-[#008CFF] rounded-full px-5 py-3 flex items-center gap-2 shadow-lg">
        <Icon name="plus" size={18} className="text-white" />
        <span className="text-white text-sm font-semibold">Unggah Dokumen</span>
      </button>
    </div>
  )
}
