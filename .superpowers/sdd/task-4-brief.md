### Task 4: Layout & Onboarding

**Files:**
- Create: `src/layouts/MainLayout.tsx`
- Create: `src/features/onboarding/OnboardingPage.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: BottomNav, Button, ProgressDots, Icon from shared components
- Produces: MainLayout wrapper, Onboarding flow (4 steps), route wiring

#### Step 1: MainLayout

```tsx
// src/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

export default function MainLayout() {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  )
}
```

#### Step 2: OnboardingPage

```tsx
// src/features/onboarding/OnboardingPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import ProgressDots from '../../components/ProgressDots'
import Icon from '../../components/Icon'

const slides = [
  {
    title: 'Selamat Datang di MediKu',
    description: 'Platform kesehatan mental terpercaya untuk membantu Anda menjalani hidup yang lebih baik.',
    icon: 'home',
  },
  {
    title: 'Konsultasi dengan Ahli',
    description: 'Terhubung dengan psikolog profesional kapan saja dan di mana saja.',
    icon: 'chat',
  },
  {
    title: 'Pantau Kesehatan Mentalmu',
    description: 'Rekam medis, pengingat obat, dan artikel edukasi dalam satu aplikasi.',
    icon: 'file',
  },
  {
    title: 'Siap Memulai?',
    description: 'Daftar sekarang dan mulai perjalanan menuju kesehatan mental yang lebih baik.',
    icon: 'checkCircle',
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const isLast = step === slides.length - 1

  const slide = slides[step]

  const handleNext = () => {
    if (isLast) {
      navigate('/home')
    } else {
      setStep(step + 1)
    }
  }

  const handleSkip = () => {
    navigate('/home')
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Skip button */}
      <div className="flex justify-end px-5 pt-4">
        {!isLast && (
          <button onClick={handleSkip} className="text-primary-500 font-semibold text-sm">
            Lewatkan
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-48 h-48 bg-white rounded-3xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center mb-8">
          <Icon name={slide.icon} size={64} className="text-primary-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-600 text-center mb-3">
          {slide.title}
        </h1>
        <p className="text-base text-gray-400 text-center leading-relaxed">
          {slide.description}
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 pb-10 pt-4 bg-[rgba(247,249,252,0.8)] backdrop-blur-md">
        <div className="flex flex-col items-center gap-6 max-w-[350px] mx-auto">
          <ProgressDots total={slides.length} current={step} />
          <Button fullWidth onClick={handleNext}>
            {isLast ? 'Mulai' : 'Lanjut'}
          </Button>
        </div>
      </div>
    </div>
  )
}
```

#### Step 3: Update App.tsx

Read the current `src/App.tsx` first. Replace with:

```tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import OnboardingPage from './features/onboarding/OnboardingPage'

export default function App() {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-white shadow-sm relative">
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<div className="pt-4 px-5">Home</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
```

## Verify

```bash
npx tsc --noEmit
npm run build
```

Expected: Build succeeds.
