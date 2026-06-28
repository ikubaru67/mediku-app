import { useNavigate } from 'react-router-dom'
import Icon from './Icon'

interface TopAppBarProps {
  title?: string
  showBack?: boolean
  rightAction?: React.ReactNode
  className?: string
}

export default function TopAppBar({ title, showBack, rightAction, className = '' }: TopAppBarProps) {
  const navigate = useNavigate()

  return (
    <div className={`flex items-center justify-between px-5 h-16 bg-white ${className}`}>
      <div className="w-10">
        {showBack && (
          <button onClick={() => navigate(-1)} className="p-1 focus-visible:ring-2 focus-visible:ring-[#0059BB] focus-visible:outline-none rounded-full">
            <Icon name="chevronLeft" size={24} className="text-gray-600" />
          </button>
        )}
      </div>
      {title && <h1 className="font-bold text-lg text-gray-600">{title}</h1>}
      <div className="w-10 flex justify-end">{rightAction}</div>
    </div>
  )
}
