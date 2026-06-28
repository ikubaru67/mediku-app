# Task 9: Rekam Medis, Klinik, Obat, Artikel

## Files Created / Modified

| File | Action |
|------|--------|
| `src/features/rekam-medis/RekamMedisPage.tsx` | Created |
| `src/features/klinik/KlinikPage.tsx` | Created |
| `src/features/klinik/MapsKlinikPage.tsx` | Created |
| `src/features/obat/PengingatObatPage.tsx` | Created |
| `src/features/artikel/ArtikelPage.tsx` | Created |
| `src/features/artikel/DetailArtikelPage.tsx` | Created |
| `src/App.tsx` | Modified — added 7 imports + 6 routes |

## Routes Added

| Route | Component | Layout |
|-------|-----------|--------|
| `/rekam-medis` | `RekamMedisPage` | MainLayout |
| `/klinik` | `KlinikPage` | MainLayout |
| `/klinik/map` | `MapsKlinikPage` | None |
| `/pengingat-obat` | `PengingatObatPage` | MainLayout |
| `/artikel` | `ArtikelPage` | MainLayout |
| `/artikel/:id` | `DetailArtikelPage` | None |

## Verification

```bash
npx tsc --noEmit
# Passed — no errors
```
