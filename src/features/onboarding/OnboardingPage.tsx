import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import ProgressDots from '../../components/ProgressDots'
import { IMAGES } from '../../config/images'

const slides = [
  {
    title: 'Selamat Datang di MediKu',
    description: 'Ruang aman untuk pikiranmu. Mulai perjalananmu menuju jiwa yang lebih sehat, tenang, dan seimbang dengan pelacakan suasana hati serta dukungan emosional yang personal.',
    img: IMAGES.onboarding[0],
  },
  {
    title: 'Pahami Dirimu Lebih Baik',
    description: 'Catat suasana hatimu, ikuti panduan meditasi harian, dan kelola stres dengan latihan pernapasan yang dirancang khusus untuk ketenangan pikiranmu.',
    img: IMAGES.onboarding[1],
  },
  {
    title: 'Konsultasi dengan Ahli',
    description: 'Jangan menghadapi masalahmu sendirian. Terhubung langsung dengan psikolog dan psikiater berlisensi secara privat dan aman, kapan pun kamu membutuhkan teman bicara.',
    img: IMAGES.onboarding[2],
  },
  {
    title: 'Pikiran Sehat',
    subtitle: 'Hidup Bahagia.',
    description: 'Kamu sudah siap! Mari bergabung bersama ribuan orang lainnya yang telah berani mengambil langkah pertama demi kesehatan mental yang lebih baik.',
    img: IMAGES.onboarding[3],
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState<'left' | 'right'>('left')
  const navigate = useNavigate()
  const isLast = step === slides.length - 1

  const slide = slides[step]

  const handleNext = () => {
    if (isLast) {
      navigate('/login')
    } else {
      setDir('left')
      setStep(step + 1)
    }
  }

  const handlePrev = () => {
    setDir('right')
    setStep(step - 1)
  }

  const handleSkip = () => {
    navigate('/login')
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface relative overflow-hidden">
      {step === 0 && (
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary-100 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-secondary-100 blur-3xl" />
        </div>
      )}

      <div className="flex items-center justify-between px-5 pt-3 relative z-10">
        {step > 0 && (
          <button onClick={handlePrev} aria-label="Kembali" className="p-1 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {step === 0 && <div className="w-10" />}
        <span className="bg-gradient-to-r from-[#0059BB] to-[#6DE46F] bg-clip-text text-transparent text-2xl font-bold leading-8">MediKu</span>
        {!isLast && (
          <button onClick={handleSkip} className="text-[#0372D1] text-sm font-semibold leading-5 tracking-[0.14px] focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none">
            Lewatkan
          </button>
        )}
        {isLast && <div className="w-10" />}
      </div>

      <div key={step} className={`flex-1 flex flex-col items-center justify-center px-8 relative z-10 ${dir === 'left' ? 'animate-slide-left' : 'animate-slide-right'}`}>
        <div className="w-44 h-44 flex items-center justify-center mb-6">
          <img src={slide.img} alt={slide.title} className="w-full h-full object-contain" />
        </div>

        {step === 0 ? (
          <h1 className="text-2xl font-bold text-gray-600 text-center mb-3">
            Selamat Datang di{' '}
            <span className="bg-gradient-to-r from-[#0059BB] via-[#0059BB] to-[#6DE46F] bg-clip-text text-transparent">MediKu</span>
          </h1>
        ) : step === 3 ? (
          <h1 className="text-[28px] font-bold text-center leading-9 mb-3">
            <span className="text-[#191C1E]">{slide.title}</span>
            <br />
            <span className="text-[#0070EA]">{slide.subtitle}</span>
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-gray-600 text-center mb-3">{slide.title}</h1>
        )}

        <p className="text-base text-[#414754] text-center leading-[26px] max-w-xs">
          {slide.description}
        </p>
      </div>

      <div className="px-5 pb-10 pt-4 bg-[rgba(247,249,252,0.8)] backdrop-blur-md relative z-10">
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
