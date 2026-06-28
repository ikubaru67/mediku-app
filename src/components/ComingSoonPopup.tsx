interface Props {
  feature: string
  onClose: () => void
}

export default function ComingSoonPopup({ feature, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-[32px] p-8 mx-6 max-w-sm w-full shadow-xl animate-pop-in text-center" onClick={e => e.stopPropagation()}>
        <div className="w-16 h-16 rounded-full bg-[rgba(0,89,187,0.10)] flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#0059BB]">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h3 className="text-[#191C1E] text-lg font-bold mb-2">Maaf</h3>
        <p className="text-[#414754] text-sm mb-6">Fitur <strong className="text-[#0059BB]">{feature}</strong> belum tersedia saat ini.</p>
        <button onClick={onClose}
          className="bg-[#0079FF] text-white rounded-full px-10 py-3 text-sm font-semibold active:scale-[0.97] transition-transform">
          Mengerti
        </button>
      </div>
    </div>
  )
}
