interface SearchBarProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder = 'Cari...' }: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 bg-[#F2F4F7] rounded-full px-6 py-3 outline-1 outline-[#C1C6D7]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#6B7280] shrink-0">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none text-sm text-[#191C1E] placeholder:text-[#6B7280] w-full" />
    </div>
  )
}
