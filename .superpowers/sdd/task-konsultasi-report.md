# Task: Konsultasi Page Rebuild

## Status: ✅ Complete

**File replaced:** `src/features/konsultasi/KonsultasiPage.tsx`
**Data source:** `src/mocks/konsultasi.ts` (mockPsikologList)

### Changes
- Removed shared component imports (SearchBar, Card, RatingStars)
- Replaced entire structure with pixel-perfect Figma match:
  - **Header**: "Konsultasi" title, search bar with `#F2F4F7` bg / `#C1C6D7` outline / "Cari nama atau spesialisasi" placeholder
  - **Filter pills**: horizontal scroll, "Semua" active `#0079FF`, inactive `#F2F4F7` bg
  - **Cards**: white bg, `32px` radius, `0px 10px 30px rgba(0,123,255,0.05)` shadow, `1px rgba(193,198,215,0.10)` outline, 16px padding
  - **Avatars**: 64x64 rounded, gradient per index (from `#0059BB`→`#006D43`, `#225BAA`, `#006D43`)
  - **Name**: `#191C1E`, 16px, font-normal
  - **Verified badge**: `rgba(86,251,171,0.20)` bg, `#007146` text, 10px bold
  - **Specialization**: `#414754`, 12px
  - **Rating**: single filled star `#EAB308` 15x14.25px, number `#191C1E` 12px bold, count `#717786`
  - **Experience**: clock icon `#717786`, text `#414754`
  - **Button**: `#0079FF` / `#0085FF`, white text, rounded-full
  - **Emergency banner**: gradient `#0059BB`→`#006D43`, "Butuh bantuan segera?" 18px, "Hubungi Sekarang" white button

### Verification
- `npx tsc --noEmit` → no errors ✅
