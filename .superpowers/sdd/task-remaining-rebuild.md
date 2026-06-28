### Rebuild Remaining Pages — Pixel Perfect from Figma HTML

Rebuild these pages to match the exact Figma HTML. Keep existing functionality (navigation, mock data), update only the visual structure and styling.

## 1. Profil Page (`src/features/profil/ProfilPage.tsx`)

From Figma HTML lines 1142-1384:
- Large avatar: 128x128px, gradient border `#0059BB → #006D43`, inner circle with "NP" initials, camera icon overlay (32px `#0059BB`)
- Name: "Nadia Putri" `#191C1E` 24px font-weight 700
- Email: "nadia.putri@email.com" `#414754` 16px
- "Edit Profile" button: `#0079FF`, white text, rounded-full, padding 12px 24px
- Health stats row: Weight 54kg, Height 162cm, Blood O+ (with icon per stat)
- Menu sections:
  - **ACCOUNT SETTINGS** section: Personal Info, Linked Accounts, Security (each with icon, text, chevron)
  - **MY ACTIVITY** section: Consultation History, Medical Records, Favorite Articles
  - **HELP & SUPPORT** section: FAQ, Contact Us, Privacy Policy
- Menu styling: white bg, shadow `0px 1px 2px rgba(0,0,0,0.05)`, rounded-[32px], outline `1px rgba(193,198,215,0.20)`, padding 16px
- Menu items: 40x40px icon circle `rgba(0,89,187,0.10)` for blue, `rgba(0,109,67,0.10)` for green, `#E0E3E6` for gray, gap 24px
- Logout: `#FFDAD6` bg, `#93000A` text, icon `#93000A`
- Version text: "MediKu App Version 2.4.0 (2023)" `#717786` 12px

## 2. Notifikasi Page (`src/features/profil/NotifikasiPage.tsx`)

From Figma HTML lines 1695-1873:
- Header: "Notifikasi" `#0070EA` 16px font-extrabold, back button with `#0070EA` chevron
- Sections: "Hari Ini" → "Kemarin" → "Minggu Lalu" (section headers in `#717786` 14px)
- Notification cards: white bg, shadow `0px 1px 2px rgba(0,0,0,0.05)`, outline `1px rgba(193,198,215,0.30)`
- Each card: 48px icon (blue for today, red for security, green for medical, blue-dark for tips), title, description, timestamp
- Unread indicator: small blue dot `8px #0059BB` absolute top-right
- Grouped by date section with headers

## 3. Rekam Medis Page (`src/features/rekam-medis/RekamMedisPage.tsx`)

From Figma HTML lines 1874-2109:
- Header: Back button + "Rekam Medis" `#0059BB` 24px bold
- Health summary banner: `#0079FF` bg, "Ringkasan Kesehatan" white 24px
  - Card 1: "TERAKHIR CHECK-UP" white/80 uppercase, "12 Okt 2023" white 18px
  - Card 2: "STATUS UMUM" white/80, green dot + "Sangat Baik" white
  - Decorative blur circles
- Filter pills: "Semua" (active `#0079FF`), "Hasil Lab", "Resep Obat", "Vaksinasi" 
- "Riwayat Terbaru" section: heading `#191C1E` 24px
- History cards: white bg, shadow `0px 10px 30px rgba(0,123,255,0.05)`, rounded-[32px], outline `1px #E6E8EB`
  - 56x56px icon circle (blue for med checkup, green for lab, blue for vaccination)
  - Title bold 14px, date 12px, doctor name 16px, "Lihat Detail" link with chevron
- FAB: "Unggah Dokumen" button `#008CFF` bg, white icon+text
- Bottom nav with "Rekam Medis" active

## 4. Klinik Terdekat Page (`src/features/klinik/KlinikPage.tsx`)

From Figma HTML lines 2110-2369:
- Header: "Klinik Terdekat" `#0059BB` 24px bold, search bar
- Search: bg `#F2F4F7`, border `1px #C1C6D7`, placeholder "Cari nama klinik atau lokasi..."
- Toggle: "List" (active gradient) and "Map" (inactive) toggle pills
- Clinic cards: white bg, rounded-[32px], shadow `0px 10px 30px rgba(0,123,255,0.05)`, outline `1px rgba(224,227,230,0.20)`
  - Image placeholder (316x160px), "Buka"/"Tutup" badge (green/red, uppercase, blur bg)
  - Name `#0059BB` 18px, rating badge with star icon
  - Address `#414754` 14px with location icon
  - Distance `#0059BB` 12px bold
  - "Petunjuk Arah" button `#0079FF`, white text+icon, shadow
  - 4 clinic cards, 3rd has opacity 0.80

## 5. Pengingat Obat Page (`src/features/obat/PengingatObatPage.tsx`)

From Figma HTML lines 2370-2628:
- Date picker bar: day names (Sel, Rab, Kam, Sab, Min), selected day has gradient bg `#0059BB→#0070EA` with blue shadow
- Month: "Kamis, 24 Okt" white, "Oktober" blue
- Medication compliance card: `#0070EA` bg, "Kepatuhan Obat" white 24px, "2 dari 4 obat telah diminum hari ini" white/90
- Circular progress: 50% ring chart
- Medication list grouped by time:
  - **PAGI • 08:00**: Antidepresan (checked), Vitamin C (checked) — green border #006D43
  - **SIANG • 13:00**: Benzodiaseoin (pending) — blue border #0059BB, "Selesai" button outline
  - **MALAM • 20:00**: Metformin (pending) — blue border, "Selesai" button
- Each med card: white, rounded-[32px], shadow, left border color
- 48x48 icon circle with gradient/color bg
- FAB: gradient `#0059BB→#0070EA` at bottom right

## 6. Bottom Nav Update

BottomNav component already updated. The active/inactive states for each page already work based on the pathname.

## Mock Data Updates

The mock data files already exist in `src/mocks/`. They provide realistic data. The new pages will use this same mock data but display it using the exact Figma HTML structure.

## Verify

For each page after writing:
```bash
npx tsc --noEmit
```

If errors, fix them before moving to the next page.

## Report

Write to: `.superpowers\sdd\task-remaining-report.md`
List each page and whether it was updated successfully.
