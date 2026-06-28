# Cloudinary Migration Report

All local image imports migrated to `IMAGES` from `src/config/images.ts`.

## Files modified

| File | Changes |
|------|---------|
| `index.html` | Replaced `/favicon.ico` with Cloudinary favicon URL |
| `src/config/images.ts` | Already existed with all Cloudinary URLs |
| `src/mocks/artikel.ts` | Normalized `penulis` keys to match `doctorNameMap` (added trailing `.`) |
| `src/features/onboarding/OnboardingPage.tsx` | Removed 4 local PNG imports → `IMAGES.onboarding[0..3]` |
| `src/features/auth/LoginPage.tsx` | Removed `mediKuLogo` import → `IMAGES.logo` |
| `src/features/home/HomePage.tsx` | Removed 3 feed imports + `feedImages` array → `IMAGES.feed[idx]` |
| `src/features/konsultasi/KonsultasiPage.tsx` | Removed 6 doctor photo imports + `dokterFoto` map → `IMAGES.doctorNameMap` |
| `src/features/konsultasi/ProfilPsikologPage.tsx` | Removed 6 imports + `dokterFoto` map → `IMAGES.doctorNameMap` |
| `src/features/konsultasi/ChatPage.tsx` | Removed 6 imports + `dokterFoto` map → `IMAGES.doctorNameMap` |
| `src/features/konsultasi/VideoCallPage.tsx` | Removed 5 video bg imports + `videoBg` map → `IMAGES.videoBgMap`; `/images/video-bg.png` → `IMAGES.videoBg` |
| `src/features/artikel/ArtikelPage.tsx` | Removed 16 feed imports + `feedImages` + `penulisFoto` → `IMAGES.feed` + `IMAGES.doctorNameMap` |
| `src/features/artikel/DetailArtikelPage.tsx` | Same pattern as ArtikelPage |
| `src/features/jadwal/PesanJadwalPage.tsx` | Removed 6 imports + `dokterFoto` → `IMAGES.doctorNameMap` |
| `src/features/jadwal/JadwalSayaPage.tsx` | Removed 6 imports + `dokterFoto` → `IMAGES.doctorNameMap` |
| `src/features/pembayaran/KonfirmasiPage.tsx` | Removed 6 doctor imports + `dokterFoto` → `IMAGES.doctorNameMap`; removed 6 payment logo imports + `paymentLogos` → `IMAGES.paymentLogo` |
| `src/features/pembayaran/PembayaranSuksesPage.tsx` | Removed 6 imports + `dokterFoto` → `IMAGES.doctorNameMap` |

## Edge cases handled

- `as any` casts used for dynamic string-keyed lookups against typed `IMAGES` objects (TypeScript strict mode)
- Mock data `penulis` key normalized from `'Dr. Aulia Rahman, M.Psi'` → `'Dr. Aulia Rahman, M.Psi.'` to match `doctorNameMap`
- `penulisInfo` record keys updated accordingly in both article page files

## Build result

`npm run build` — passes with zero errors.
