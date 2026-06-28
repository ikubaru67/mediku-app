# Task: Home Page Rebuild

## Status: ✅ Complete

**File replaced:** `src/features/home/HomePage.tsx`
**Code source:** `.superpowers/sdd/task-home-rebuild.md` (exact Figma HTML conversion)

### Changes
- Removed shared component imports (SearchBar, Card, Icon)
- Removed mock imports (`mockHomeArtikel`, `mockQuickActions`)
- Added inline `mockArtikel` and `quickActionsData` as specified
- Added inline `QAIcon` component with SVG icons
- Replaced entire structure with pixel-perfect Figma match:
  - Header: blue greeting/name, 48px avatar with "N", bell icon with red dot
  - SearchBar: `#F2F4F7` bg, pill shape, 17px/48px padding, placeholder text
  - Banner: gradient `#0059BB` → `#31E193`, rounded-2xl, "Jadwal Saya" badge, schedule info, decorative blur circle
  - Quick Actions: 4 items grid, 64x64 white circles with shadow, colored SVG icons
  - Articles: horizontal scroll, 274px cards, colored bg thumbnails, time & title

### Verification
- `npx tsc --noEmit` → no errors ✅
