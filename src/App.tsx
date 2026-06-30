import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'

import OnboardingPage from './features/onboarding/OnboardingPage'
import LoginPage from './features/auth/LoginPage'
import RegisterPage from './features/auth/RegisterPage'
import LupaPasswordPage from './features/auth/LupaPasswordPage'
import HomePage from './features/home/HomePage'
import KonsultasiPage from './features/konsultasi/KonsultasiPage'
import ProfilPsikologPage from './features/konsultasi/ProfilPsikologPage'
import ChatPage from './features/konsultasi/ChatPage'
import VideoCallPage from './features/konsultasi/VideoCallPage'
import AnonimChatPage from './features/konsultasi/AnonimChatPage'
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
import InformasiPribadiPage from './features/profil/InformasiPribadiPage'
import HubungiKamiPage from './features/profil/HubungiKamiPage'
import KebijakanPrivasiPage from './features/profil/KebijakanPrivasiPage'
import FAQPage from './features/profil/FAQPage'
import NotifikasiPage from './features/profil/NotifikasiPage'

export default function App() {
  const location = useLocation()

  return (
    <div tabIndex={-1} className="max-w-[430px] mx-auto min-h-screen bg-white shadow-sm relative focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:bg-white focus:text-[#0059BB] focus:px-4 focus:py-2 focus:rounded-full focus:shadow-lg">
        Skip to content
      </a>
      <div id="main-content" key={location.pathname} className="animate-page-in">
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lupa-password" element={<LupaPasswordPage />} />

        {/* Full screen (no bottom nav) */}
        <Route path="/konsultasi/chat/:id" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/konsultasi/chat/anonim" element={<ProtectedRoute><AnonimChatPage /></ProtectedRoute>} />
        <Route path="/konsultasi/video/:id" element={<ProtectedRoute><VideoCallPage /></ProtectedRoute>} />
        <Route path="/jadwal/baru" element={<ProtectedRoute><PesanJadwalPage /></ProtectedRoute>} />
        <Route path="/pembayaran/:id" element={<ProtectedRoute><KonfirmasiPage /></ProtectedRoute>} />
        <Route path="/pembayaran/sukses" element={<ProtectedRoute><PembayaranSuksesPage /></ProtectedRoute>} />
        <Route path="/artikel/:id" element={<ProtectedRoute><DetailArtikelPage /></ProtectedRoute>} />
        <Route path="/profil/edit" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
        <Route path="/profil/informasi-pribadi" element={<ProtectedRoute><InformasiPribadiPage /></ProtectedRoute>} />
        <Route path="/profil/hubungi-kami" element={<ProtectedRoute><HubungiKamiPage /></ProtectedRoute>} />
        <Route path="/profil/kebijakan-privasi" element={<ProtectedRoute><KebijakanPrivasiPage /></ProtectedRoute>} />
        <Route path="/profil/faq" element={<ProtectedRoute><FAQPage /></ProtectedRoute>} />
        <Route path="/notifikasi" element={<ProtectedRoute><NotifikasiPage /></ProtectedRoute>} />
        <Route path="/klinik/map" element={<ProtectedRoute><MapsKlinikPage /></ProtectedRoute>} />
        <Route path="/konsultasi/:id" element={<ProtectedRoute><ProfilPsikologPage /></ProtectedRoute>} />

        {/* Bottom nav pages */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/konsultasi" element={<KonsultasiPage />} />
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
    </div>
  )
}
