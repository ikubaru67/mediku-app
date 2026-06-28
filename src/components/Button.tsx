import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  fullWidth?: boolean
  loading?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-[#0079FF] text-white',
  secondary: 'bg-secondary-500 text-white',
  outline: 'border-2 border-[#0059BB] text-[#0059BB] bg-transparent',
  ghost: 'text-primary-500 bg-transparent',
  gradient: 'bg-gradient-to-r from-[#0059BB] to-[#006D43] text-white',
}

export default function Button({
  variant = 'primary',
  fullWidth = false,
  loading = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        rounded-full px-6 py-[17.5px] font-semibold text-sm leading-5
        transition-all duration-200 disabled:opacity-50
        focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${loading ? 'cursor-wait' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Loading...
        </span>
      ) : children}
    </button>
  )
}
