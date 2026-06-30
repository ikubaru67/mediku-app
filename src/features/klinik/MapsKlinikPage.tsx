import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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
  hospital: 'RS', clinic: 'Klinik', doctors: 'Dokter', pharmacy: 'Apotek',
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

function fetchOverpass(lat: number, lng: number, radius: number): Promise<Place[]> {
  const cacheKey = `mediku_overpass_${lat.toFixed(2)}_${lng.toFixed(2)}_${radius}`
  const cached = (() => {
    try {
      const raw = JSON.parse(localStorage.getItem(cacheKey) || 'null')
      if (raw && Date.now() - raw.ts < 300000) return raw.data
    } catch {}
    return null
  })()
  if (cached) return Promise.resolve(cached)

  const query = `[out:json][timeout:20];(node["amenity"~"hospital|clinic|doctors|pharmacy"](around:${radius},${lat},${lng});way["amenity"~"hospital|clinic|doctors|pharmacy"](around:${radius},${lat},${lng}););out center;`
  return fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: query })
    .then(r => {
      if (r.status === 429) throw new Error('rate-limit')
      if (!r.ok) throw new Error('fetch-fail')
      return r.json()
    })
    .then(data => {
      const results: Place[] = []
      const seen = new Set<string>()
      for (const el of data.elements) {
        const name = el.tags?.name
        if (!name) continue
        const key = name.toLowerCase().trim()
        if (seen.has(key)) continue
        seen.add(key)
        results.push({
          id: String(el.id), name,
          lat: el.center?.lat || el.lat, lng: el.center?.lon || el.lon,
          type: el.tags?.amenity || 'clinic', alamat: addr(el),
        })
      }
      results.sort((a, b) => haversine(lat, lng, a.lat, a.lng) - haversine(lat, lng, b.lat, b.lng))
      const sliced = results.slice(0, 30)
      try { localStorage.setItem(cacheKey, JSON.stringify({ data: sliced, ts: Date.now() })) } catch {}
      return sliced
    })
}

export default function MapsKlinikPage() {
  const navigate = useNavigate()
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const circlesRef = useRef<L.Circle[]>([])
  const watchIdRef = useRef<number | null>(null)
  const [userPos, setUserPos] = useState<{ lat: number; lng: number; acc: number } | null>(null)
  const [places, setPlaces] = useState<Place[]>([])
  const [selected, setSelected] = useState<Place | null>(null)
  const [loading, setLoading] = useState<'gps' | 'data' | 'empty' | 'ready' | 'error'>('gps')
  const [gpsMsg, setGpsMsg] = useState('')
  const [searchRadius, setSearchRadius] = useState(5000)
  const [mapReady, setMapReady] = useState(false)

  const doFetch = useCallback((lat: number, lng: number, radius: number) => {
    setLoading('data')
    setGpsMsg('')
    fetchOverpass(lat, lng, radius)
      .then(results => {
        if (results.length === 0 && radius < 10000) {
          setSearchRadius(radius * 2)
          return doFetch(lat, lng, radius * 2)
        }
        setPlaces(results)
        if (results.length > 0) setSelected(results[0])
        setLoading(results.length > 0 ? 'ready' : 'empty')
        if (radius > 5000) setGpsMsg(`Radius pencarian diperbesar ke ${(radius / 1000).toFixed(0)} km`)
        else setGpsMsg('')
      })
      .catch((err) => {
        setLoading('error')
        if (err.message === 'rate-limit') {
          setGpsMsg('Server peta sibuk. Coba lagi dalam beberapa menit.')
        } else {
          setGpsMsg('Gagal mengambil data. Periksa koneksi internet.')
        }
      })
  }, [])

  const startWatching = useCallback(() => {
    setGpsMsg('')
    setLoading('gps')
    if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current)
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setLoading('data')
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy })
        setGpsMsg('')
      },
      (err) => {
        if (err.code === 1) { setLoading('error'); setGpsMsg('Izin lokasi ditolak. Izinkan akses lokasi di pengaturan browser.') }
        else if (err.code === 3) { setLoading('error'); setGpsMsg('Waktu habis mencari lokasi. Coba lagi.') }
        else { setLoading('error'); setGpsMsg('Gagal mendapatkan lokasi. Coba lagi.') }
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 5000 }
    )
  }, [])

  useEffect(() => { startWatching(); return () => { if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current) } }, [startWatching])

  useEffect(() => {
    if (!userPos) return
    doFetch(userPos.lat, userPos.lng, searchRadius)
  }, [userPos])

  // Init map once
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return
    const map = L.map(mapRef.current, { zoomControl: false }).setView([-6.186, 106.834], 14)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map)
    mapInstance.current = map
    setMapReady(true)
    return () => { map.remove(); mapInstance.current = null; setMapReady(false) }
  }, [])

  // Add markers when userPos or places change
  useEffect(() => {
    const map = mapInstance.current
    if (!map || !mapReady || !userPos) return

    markersRef.current.forEach(m => map.removeLayer(m))
    circlesRef.current.forEach(c => map.removeLayer(c))
    markersRef.current = []
    circlesRef.current = []

    map.setView([userPos.lat, userPos.lng], 14)

    L.circle([userPos.lat, userPos.lng], { radius: userPos.acc, color: '#0079FF', fillColor: '#0079FF', fillOpacity: 0.08, weight: 1, opacity: 0.3 }).addTo(map)
    circlesRef.current.push(L.circle([userPos.lat, userPos.lng], { radius: userPos.acc, color: '#0079FF', fillColor: '#0079FF', fillOpacity: 0.08, weight: 1, opacity: 0.3 }).addTo(map))
    const uIcon = L.divIcon({ html: '<div style="width:14px;height:14px;background:#0079FF;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>', className: '', iconSize: [14, 14] })
    markersRef.current.push(L.marker([userPos.lat, userPos.lng], { icon: uIcon, zIndexOffset: 1000 }).addTo(map))

    places.forEach(p => {
      const active = selected?.id === p.id
      const icon = L.divIcon({
        html: active
          ? `<div style="width:48px;height:48px;background:linear-gradient(135deg,#0059BB,#006D43);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 4px white,0 4px 6px -4px rgba(0,0,0,0.1),0 10px 15px -3px rgba(0,0,0,0.1);font-size:9px;font-weight:700;color:white;font-family:Manrope,sans-serif;text-align:center;line-height:1.1">${(typeLabels[p.type] || 'Faskes').split(' ')[0]}<br/>${p.name.substring(0,3)}</div>`
          : `<div style="width:40px;height:40px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #0059BB;box-shadow:0 2px 4px -2px rgba(0,0,0,0.1),0 4px 6px -1px rgba(0,0,0,0.1);font-size:8px;font-weight:600;color:#0059BB;font-family:Manrope,sans-serif;text-align:center;line-height:1.1">${(typeLabels[p.type] || 'Faskes').split(' ')[0]}<br/>${p.name.substring(0,3)}</div>`,
        className: '', iconSize: active ? [48, 48] : [40, 40], iconAnchor: active ? [24, 48] : [20, 40],
      })
      const m = L.marker([p.lat, p.lng], { icon }).addTo(map)
      m.on('click', () => setSelected(p))
      markersRef.current.push(m)
    })
  }, [places, selected?.id, mapReady, userPos])

  const handleRefresh = () => {
    if (userPos) { setSearchRadius(5000); setPlaces([]); doFetch(userPos.lat, userPos.lng, 5000) }
    else startWatching()
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col relative">
      <div ref={mapRef} className="absolute inset-0 z-0" />

      <div className="absolute right-3 top-20 z-[1000] flex flex-col gap-3">
        <button onClick={() => mapInstance.current?.zoomIn()} className="w-12 h-12 bg-white/85 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10),0px_4px_6px_-1px_rgba(0,0,0,0.10)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#191C1E" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
        <button onClick={() => mapInstance.current?.zoomOut()} className="w-12 h-12 bg-white/85 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10),0px_4px_6px_-1px_rgba(0,0,0,0.10)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#191C1E" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/></svg>
        </button>
      </div>

      <div className="relative z-10 bg-[rgba(247,249,252,0.80)] backdrop-blur-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] px-5 pt-3 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <h1 className="text-[#0059BB] text-2xl font-bold">Klinik Terdekat</h1>
        </div>
        <div className="flex justify-center">
          <div className="inline-flex bg-[#E6E8EB] rounded-full p-1 items-center gap-1">
            <button onClick={() => navigate(-1)} className="px-5 py-1.5 rounded-full text-sm font-semibold text-[#414754]">Daftar</button>
            <button className="px-5 py-1.5 rounded-full text-sm font-bold text-[#0059BB] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">Peta</button>
            <button onClick={handleRefresh} aria-label="Refresh"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0059BB" strokeWidth="2" strokeLinecap="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* GPS Error overlay */}
      {loading === 'error' && !userPos && (
        <div className="absolute inset-0 z-[2000] flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-3xl p-6 mx-5 shadow-xl text-center max-w-xs">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BA1A1A" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            </div>
            <p className="text-[#414754] text-sm mb-1">Lokasi tidak ditemukan</p>
            <p className="text-[#717786] text-xs mb-5">{gpsMsg}</p>
            <button onClick={startWatching} className="bg-[#0079FF] text-white rounded-full px-8 py-3 text-sm font-semibold w-full">Coba Lagi</button>
          </div>
        </div>
      )}

      {/* GPS info bar */}
      {gpsMsg && loading !== 'error' && (
        <div className="absolute top-32 left-5 right-5 z-[1001]">
          <div className="bg-[rgba(255,255,255,0.9)] backdrop-blur-md rounded-2xl px-4 py-2 shadow text-center text-xs text-[#414754]">
            {gpsMsg}
          </div>
        </div>
      )}

      {/* Loading */}
      {(loading === 'gps' || loading === 'data') && (
        <div className="absolute inset-0 z-[1001] flex items-center justify-center bg-black/10 pointer-events-none">
          <div className="bg-white rounded-2xl px-6 py-4 shadow-lg flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-[#0059BB] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-[#414754]">{loading === 'gps' ? 'Mencari lokasi Anda...' : 'Mencari fasilitas kesehatan terdekat...'}</span>
          </div>
        </div>
      )}

      {/* Empty state */}
      {loading === 'empty' && (
        <div className="absolute bottom-40 left-5 right-5 z-[1001]">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 text-center shadow-lg">
            <p className="text-[#414754] text-sm font-medium">Tidak ditemukan fasilitas kesehatan di sekitar</p>
            <p className="text-[#717786] text-xs mt-1">Radius pencarian: {(searchRadius / 1000).toFixed(0)} km</p>
            <button onClick={handleRefresh} className="mt-4 bg-[#0079FF] text-white rounded-full px-6 py-2 text-sm font-semibold">Cari Lagi</button>
          </div>
        </div>
      )}

      {/* Overpass error */}
      {loading === 'error' && userPos && (
        <div className="absolute bottom-40 left-5 right-5 z-[1001]">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 text-center shadow-lg">
            <p className="text-[#BA1A1A] text-sm font-medium">{gpsMsg}</p>
            <button onClick={handleRefresh} className="mt-4 bg-[#0079FF] text-white rounded-full px-6 py-2 text-sm font-semibold">Coba Lagi</button>
          </div>
        </div>
      )}

      {/* Info Card */}
      {selected && (loading === 'ready' || loading === 'empty') && (
        <div className="absolute left-5 right-5 z-[1000]" style={{ bottom: '100px' }}>
          <div className="bg-[rgba(255,255,255,0.85)] backdrop-blur-[6px] rounded-[32px] p-5 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] outline-1 outline-white/50 -outline-offset-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#56FBAB] text-[#007146] tracking-[0.5px]">{typeLabels[selected.type] || 'Faskes'}</span>
                </div>
                <h2 className="text-[#191C1E] text-xl font-bold leading-6 line-clamp-2">{selected.name}</h2>
                <div className="flex items-center gap-1 mt-1">
                  <svg width="12" height="15" viewBox="0 0 24 24" fill="none" className="text-[#414754] shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                  <span className="text-[#414754] text-xs font-semibold leading-4 line-clamp-2">{selected.alamat || 'Alamat tidak tersedia'}</span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-[36px] bg-gradient-to-br from-primary-100 to-primary-200 shrink-0 ml-3 flex items-center justify-center shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]/40"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/></svg>
              </div>
            </div>
            <div className="border-t border-[rgba(193,198,215,0.30)] pt-4 flex items-center justify-between">
              <div>
                <p className="text-[#414754] text-xs font-medium">Jarak dari Anda</p>
                <p className="text-[#0059BB] text-lg font-bold">{userPos ? `${haversine(userPos.lat, userPos.lng, selected.lat, selected.lng)} km` : '-'}</p>
              </div>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`} target="_blank" rel="noopener noreferrer" className="bg-[#0079FF] text-white rounded-full px-6 py-2.5 flex items-center gap-2 shadow-md text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Petunjuk Arah
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
