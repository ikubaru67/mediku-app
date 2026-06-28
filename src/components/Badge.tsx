interface BadgeProps { count?: number; className?: string }

export default function Badge({ count, className = '' }: BadgeProps) {
  if (!count || count <= 0) return null
  return (
    <span className={`absolute -top-1 -right-2 bg-accent-red text-white text-[10px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1 ${className}`}>
      {count > 99 ? '99+' : count}
    </span>
  )
}
