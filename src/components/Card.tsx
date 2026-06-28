interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div onClick={onClick}
      className={`bg-white rounded-[32px] shadow-[0px_10px_30px_rgba(0,123,255,0.05)] ${className}`}>
      {children}
    </div>
  )
}
