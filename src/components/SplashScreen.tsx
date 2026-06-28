import { IMAGES } from '../config/images'

export default function SplashScreen({ show, name }: { show: boolean; name?: string }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
      <div className="w-full max-w-[430px] mx-auto h-full bg-gradient-to-br from-[#0059BB] to-[#006D43] flex items-center justify-center">
        <div className="text-center px-8">
          <img src={IMAGES.logo} alt="MediKu" className="w-20 h-20 object-contain mx-auto mb-6 animate-splash-logo" />
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6 animate-splash-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
              <path d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h1 className="text-white text-2xl font-bold animate-splash-text">
            Selamat Datang{name ? `, ${name.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-white/60 text-sm mt-2 animate-splash-text" style={{ animationDelay: '0.45s' }}>MediKu</p>
        </div>
      </div>
    </div>
  )
}
