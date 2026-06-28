### Rebuild Final Pages — Pixel Perfect from Figma HTML

Update remaining screens to match Figma HTML. Keep functionality, update visuals.

## 1. Login Page (`src/features/auth/LoginPage.tsx`)

From HTML lines 251-373:
- Logo: small MediKu logo (120x114px) at top center
- "Halo, Selamat Datang!" heading 28px bold `#191C1E`
- "Masuk untuk memantau kesehatanmu hari ini." subtitle `#414754` 16px
- Form card: white bg, rounded-[48px], shadow `0px 10px 30px rgba(0,123,255,0.05)`, padding
- "Username atau Email" label `#414754` 14px semi-bold
- Input: bg `transparent`, border-bottom style, icon left, placeholder "Masukkan username" `#C1C6D7`
- "Password" label with "Lupa Password?" link `#0059BB`
- Input: same style as username, eye icon right
- "Login" button: `#0079FF` bg, white text 24px bold, rounded-full, padding 16px
- Divider: "Atau masuk dengan" text between lines
- Social login: Google + Apple buttons with outline `1px #C1C6D7`
- "Belum punya akun? Daftar sekarang" link at bottom
- Footer: "MediKu Health" brand, Privacy Policy, Terms of Service, copyright

## 2. Register Page (`src/features/auth/RegisterPage.tsx`)

From HTML lines 374-509:
- Logo/avatar 128x128px gradient border
- "Buat Akun Baru" heading 28px bold
- "Mulai perjalanan sehat Anda bersama MediKu" subtitle
- Form card: white/80 bg, rounded-[32px], shadow, backdrop-filter blur, padding 24px, gap 24px
- "Nama Lengkap" input: label `#414754` 14px, field bg `#F2F4F7`, border `1px #C1C6D7`, rounded-full, placeholder "Masukkan nama lengkap"
- "Email" input: same style, placeholder "contoh@email.com"
- "Nomor Telepon" input: same style, placeholder "+62 812..."
- "Password" input: same style, placeholder "Min. 8 karakter", eye icon
- Checkbox: "Saya menyetujui Syarat & Ketentuan serta Kebijakan Privasi MediKu."
- "Daftar" button: `#0079FF`, white 24px bold, rounded-full
- "Sudah punya akun? Login di sini" link
- "Data Anda terenkripsi & aman" security note
- Footer section with brand, links

## 3. Artikel Page (`src/features/artikel/ArtikelPage.tsx`)

From HTML lines 2835-3150:
- Header: back button + "Articles" `#0059BB` 24px bold
- Filter pills: horizontal scroll, "Mental Health" active (`#008CFF`), "Nutrition", "Physical Activity", "Medication", "Sleep Hygiene" (all inactive with `#C1C6D7` text)
- Search bar: bg `white`, border `1px #C1C6D7`, shadow, placeholder "Search mental health topics..." `#6B7280`
- Featured article card: image with gradient overlay, "FEATURED" badge `#008CFF`, title white 20px, description white/80, "8 min read" with clock icon
- Article list: Recommended for You section, each card has thumbnail (316x178px, rounded-[32px]), category `#006D43` uppercase, reading time, title, author avatar + name + role, border-top separator
- Article list item: 96x96px thumbnail, category, title, description, author+time
- Bottom nav with "Artikel" active

## 4. Detail Artikel Page (`src/features/artikel/DetailArtikelPage.tsx`)

From HTML lines 3151-3202+:
- Breadcrumb: "Mental Health • 8 menit baca"
- Title: 28px bold `#191C1E`
- Author section: 48px avatar, name, role + date, "Ikuti" button outline `#0059BB`
- Featured image: 350x197px, rounded-[32px], shadow
- Article content: paragraphs `#414754` 18px line-height 29.25px
- Subheading: "Mengenali Kelelahan Digital" 24px bold
- Blockquote: bg `rgba(0,89,187,0.05)`, left border 4px `#0059BB`, italic quote text
- "3 Langkah Praktis Mindfulness Digital" subheading
- Numbered list items with styling

## Verify

```bash
npx tsc --noEmit
```

## Report

Write to: `.superpowers\sdd\task-final-pages-report.md`
