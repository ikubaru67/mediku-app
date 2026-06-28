# Task 4: Layout & Onboarding — Report

**Status:** ✅ Done

## Summary
- Created `src/layouts/MainLayout.tsx` — wraps routes with `<Outlet />` + `<BottomNav />`
- Created `src/features/onboarding/OnboardingPage.tsx` — 4-step swipeable onboarding with skip/next flow
- Updated `src/App.tsx` — routes `/` to `OnboardingPage`, `/home` inside `MainLayout`
- Fixed pre-existing TS errors in `src/components/Icon.tsx` (`JSX.Element` → `React.ReactNode`), all mock files (type-only imports), and removed unused `User` import from `src/mocks/profil.ts`

## Verification
- `npx tsc --noEmit` — no errors
- `npm run build` — succeeds (TypeScript + Vite)

## Concerns
- Pre-existing `verbatimModuleSyntax` violations in mock files needed fixing; all resolved.
- Icon component used global `JSX` namespace which broke under strict TS settings; changed to `React.ReactNode`.
