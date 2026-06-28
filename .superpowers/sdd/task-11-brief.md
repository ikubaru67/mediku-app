### Task 11: Final App.tsx & Build Verification

**Files:**
- Modify: `src/App.tsx` (final version with ALL 24 screens, all routes)
- Verify: Full build

Read the current `src/App.tsx`. Replace with final version that includes ALL imports and routes:

```tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

import OnboardingPage from './features/onboarding/OnboardingPage'
import LoginPage from './features/auth/LoginPage'
import RegisterPage from './features/auth/RegisterPage'
import HomePage from './features/home/HomePage'
import KonsultasiPage from './features/konsultasi/KonsultasiPage'
import ProfilPsikologPage from './features/konsultasi/ProfilPsikologPage'
import ChatPage from './features/konsultasi/ChatPage'
import VideoCallPage from './features/konsultasi/VideoCallPage'
import JadwalSayaPage from './features/jadwal/JadwalSayaPage'
import PesanJadwalPage from './features/jadwal/PesanJadwalPage'
import KonfirmasiPage from './features/pembayaran/KonfirmasiPage'
import PembayaranSuksesPage from './features/pembayaran/PembayaranSuksesPage'
import RekamMedisPage from './features/rekam-medis/RekamMedisPage'
import KlinikPage from './features/klinik/KlinikPage'
import MapsKlinikPage from './features/klinik/MapsKlinikPage'
import PengingatObatPage from './features/obat/PengingatObatPage'
import ArtikelPage from './features/artikel/ArtikelPage'
import DetailArtikelPage from './features/artikel/DetailArtikelPage'
import ProfilPage from './features/profil/ProfilPage'
import EditProfilePage from './features/profil/EditProfilePage'
import NotifikasiPage from './features/profil/NotifikasiPage'

export default function App() {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-white shadow-sm relative">
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Full screen (no bottom nav) */}
        <Route path="/konsultasi/chat/:id" element={<ChatPage />} />
        <Route path="/konsultasi/video/:id" element={<VideoCallPage />} />
        <Route path="/jadwal/baru" element={<PesanJadwalPage />} />
        <Route path="/pembayaran/:id" element={<KonfirmasiPage />} />
        <Route path="/pembayaran/sukses" element={<PembayaranSuksesPage />} />
        <Route path="/artikel/:id" element={<DetailArtikelPage />} />
        <Route path="/profil/edit" element={<EditProfilePage />} />
        <Route path="/notifikasi" element={<NotifikasiPage />} />
        <Route path="/klinik/map" element={<MapsKlinikPage />} />

        {/* Bottom nav pages */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/konsultasi" element={<KonsultasiPage />} />
          <Route path="/konsultasi/:id" element={<ProfilPsikologPage />} />
          <Route path="/jadwal" element={<JadwalSayaPage />} />
          <Route path="/rekam-medis" element={<RekamMedisPage />} />
          <Route path="/klinik" element={<KlinikPage />} />
          <Route path="/pengingat-obat" element={<PengingatObatPage />} />
          <Route path="/artikel" element={<ArtikelPage />} />
          <Route path="/profil" element={<ProfilPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
```

## Verify

```bash
cd "E:\File Ikhbal\Tugas - Kuliah\Semester 6\Interaksi Manusia Komputer\Design IMK\mediku-app"
npx tsc --noEmit
npm run build
```

## Report

Write to: `.superpowers\sdd\task-11-report.md`

Report build output and any errors.
