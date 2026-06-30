import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

interface Place {
  id: string
  name: string
  lat: number
  lng: number
  type: string
  alamat: string
}

function haversine(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return Number((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1))
}

const typeLabels: Record<string, string> = {
  hospital: 'RS',
  clinic: 'Klinik',
  doctors: 'Dokter',
  pharmacy: 'Apotek',
}

const typeColors: Record<string, string> = {
  hospital: 'bg-[#0059BB]',
  clinic: 'bg-[#0079FF]',
  doctors: 'bg-[#006D43]',
  pharmacy: 'bg-[#0486F1]',
}

function addr(el: any): string {
  const t = el.tags || {}
  const parts: string[] = []
  if (t['addr:full']) parts.push(t['addr:full'])
  let street = t['addr:street'] || ''
  if (t['addr:housenumber']) street += ' ' + t['addr:housenumber']
  if (street) parts.push(street.trim())
  if (!parts.length && t['addr:place']) parts.push(t['addr:place'])
  const city = t['addr:city'] || t['addr:suburb'] || t['addr:district'] || t['addr:municipality'] || ''
  if (city) parts.push(city)
  if (!parts.length) {
    const tags = Object.keys(t).filter(k => k.startsWith('addr:')).map(k => t[k]).filter(Boolean)
    if (tags.length) parts.push(tags.join(', '))
  }
  return parts.length ? parts.join(', ') : ''
}

export default function KlinikPage() {
  const [search, setSearch] = useState('')
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null)
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)
  const [gpsError, setGpsError] = useState('')
  const navigate = useNavigate()
  const watchIdRef = useRef<number | null>(null)

  const startWatching = useCallback(() => {
    setGpsError('')
    setLoading(true)
    if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current)
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => {
        if (err.code === 1) setGpsError('Izin lokasi ditolak.')
        else if (err.code === 3) setGpsError('Waktu habis mencari lokasi. Coba lagi.')
        else setGpsError('Gagal mendapatkan lokasi.')
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 5000 }
    )
  }, [])

  useEffect(() => {
    startWatching()
    return () => { if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current) }
  }, [startWatching])

  useEffect(() => {
    if (!userPos) return
    setLoading(true)

    const query = `
      [out:json][timeout:25];
      (
        node["amenity"~"hospital|clinic|doctors|pharmacy"](around:5000,${userPos.lat},${userPos.lng});
        way["amenity"~"hospital|clinic|doctors|pharmacy"](around:5000,${userPos.lat},${userPos.lng});
      );
      out center;
    `

    fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: query })
      .then((r) => r.json())
      .then((data) => {
        const results: Place[] = []
        const seen = new Set<string>()
        for (const el of data.elements) {
          const name = el.tags?.name
          if (!name) continue
          const key = name.toLowerCase().trim()
          if (seen.has(key)) continue
          seen.add(key)
          results.push({
            id: String(el.id),
            name,
            lat: el.center?.lat || el.lat,
            lng: el.center?.lon || el.lon,
            type: el.tags?.amenity || 'clinic',
            alamat: addr(el),
          })
        }
        results.sort((a, b) => haversine(userPos.lat, userPos.lng, a.lat, a.lng) - haversine(userPos.lat, userPos.lng, b.lat, b.lng))
        setPlaces(results.slice(0, 30))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [userPos])

  const filtered = search
    ? places.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.alamat.toLowerCase().includes(search.toLowerCase()))
    : places

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-20">
      {/* Header */}
      <div className="bg-white rounded-b-3xl px-5 pt-4 pb-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <h1 className="text-[#0059BB] text-2xl font-bold">Klinik Terdekat</h1>
        </div>
        <div className="flex items-center gap-3 bg-[#F2F4F7] rounded-full px-6 py-3.5 mb-4" style={{ border: '1px solid #C1C6D7' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#717786] shrink-0">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama klinik atau lokasi..."
            className="bg-transparent outline-none text-sm text-[#191C1E] placeholder:text-[#717786] w-full" />
        </div>
        <div className="flex justify-center">
          <div className="flex bg-[#F2F4F7] rounded-full p-1">
            <button className="rounded-full px-5 py-2 text-sm font-semibold bg-gradient-to-r from-[#0059BB] to-[#0070EA] text-white shadow-md">Daftar</button>
            <button onClick={() => navigate('/klinik/map')} className="rounded-full px-5 py-2 text-sm font-semibold text-[#717786]">Peta</button>
          </div>
        </div>
      </div>

      {/* GPS Error */}
      {gpsError && !userPos && (
        <div className="px-5 pt-6">
          <div className="bg-red-50 rounded-3xl p-6 text-center">
            <p className="text-[#BA1A1A] text-sm font-medium mb-3">{gpsError}</p>
            <button onClick={startWatching} className="bg-[#0079FF] text-white rounded-full px-6 py-2 text-sm font-semibold">Coba Lagi</button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="px-5 pt-6">
          <div className="flex items-center justify-center gap-3 py-12">
            <div className="w-5 h-5 border-2 border-[#0059BB] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-[#414754]">Mencari fasilitas kesehatan terdekat...</span>
          </div>
        </div>
      )}

      {/* List */}
      {!loading && !gpsError && (
        <div className="px-5 pt-6 space-y-4 stagger-fade">
          {filtered.length === 0 && (
            <p className="text-center text-[#717786] text-sm py-12">
              {search ? 'Tidak ditemukan. Coba kata kunci lain.' : 'Tidak ada fasilitas kesehatan di sekitar.'}
            </p>
          )}
          {filtered.map((p) => {
            const typeLabel = typeLabels[p.type] || 'Faskes'
            const dist = userPos ? haversine(userPos.lat, userPos.lng, p.lat, p.lng) : 0
            return (
              <div key={p.id} className="bg-white rounded-[32px] overflow-hidden shadow-[0px_10px_30px_rgba(0,123,255,0.05)]">
                <div className="h-10 bg-gradient-to-br from-[#0059BB]/5 to-[#0070EA]/5 flex items-center px-4">
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full text-white ${typeColors[p.type] || 'bg-[#414754]'}`}>{typeLabel}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-[#0059BB] text-base font-bold leading-tight mb-1">{p.name}</h3>
                  {p.alamat && (
                    <div className="flex items-start gap-1.5 mb-3">
                      <svg width="12" height="15" viewBox="0 0 24 24" fill="none" className="text-[#717786] shrink-0 mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                      <p className="text-[#414754] text-xs leading-4">{p.alamat}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-[rgba(193,198,215,0.20)]">
                    <span className="text-[#0059BB] text-sm font-bold">{dist > 0 ? `${dist} km` : '-'}</span>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`}
                      target="_blank" rel="noopener noreferrer"
                      className="bg-[#0079FF] text-white text-xs font-semibold rounded-full px-4 py-2 flex items-center gap-1.5 shadow-md"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      Petunjuk Arah
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
