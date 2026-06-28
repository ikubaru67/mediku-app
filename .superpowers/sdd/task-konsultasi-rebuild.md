### Rebuild Konsultasi Page — Pixel Perfect from Figma HTML

Replace `src/features/konsultasi/KonsultasiPage.tsx` to match Figma HTML (lines 698-959).

**Key specs:**
- Search bar: bg `#F2F4F7`, border `1px #C1C6D7`, placeholder "Cari nama atau spesialisasi" color `#6B7280`
- Filter pills: horizontal scroll with "Semua" (active `#0079FF`), "Psikilog", "Psikieater", "Depresi"
- Psychologist cards: white bg, shadow `0px 10px 30px rgba(0,123,255,0.05)`, outline `1px rgba(193,198,215,0.10)`, padding 16px, gap 16px
- Avatar: 64x64 rounded-full, gradient initials
  - Dr. Aulia Rahman: gradient `#0059BB → #006D43`, text "DA"
  - Budi Santoso: bg `#225BAA`, text "BS"
  - Siti Nurhaliza: bg `#006D43`, text "SN"
- Name: `#191C1E`, 16px font-weight 400 (note: not bold! even though it looks like a name)
- Verified badge: bg `rgba(86,251,171,0.20)`, text `#007146`, 10px bold
- Specialization: `#414754`, 12px, "Psikolog • Stres & Kecemasan"
- Rating: star icon 15x14.25px `#EAB308`, number `#191C1E` 12px bold, count `#717786` 12px "(320)"
- Experience: icon 15.75x15.75px `#717786`, text "8 thn pengalaman" `#414754`
- "Pilih Psikolog" button: `#0079FF` (or `#0085FF` for second), white text, rounded-full
- Emergency banner: gradient `#0059BB → #006D43`, "Butuh bantuan segera?" white 18px, "Konsultasi anonim tersedia 24/7" white/80 12px, "Hubungi Sekarang" button white bg blue text

Bottom nav: Same as BottomNav component but with "Konsultasi" tab active (#0059BB)

The page is inside MainLayout which provides BottomNav, so don't add separate BottomNav.

**Verify:** `npx tsc --noEmit`
