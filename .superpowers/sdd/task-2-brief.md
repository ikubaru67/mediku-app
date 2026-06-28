### Task 2: Shared Components Set

**Files:**
- Create: `src/components/Button.tsx`
- Create: `src/components/Icon.tsx`
- Create: `src/components/BottomNav.tsx`
- Create: `src/components/TopAppBar.tsx`
- Create: `src/components/Card.tsx`
- Create: `src/components/SearchBar.tsx`
- Create: `src/components/Badge.tsx`
- Create: `src/components/ProgressDots.tsx`
- Create: `src/components/RatingStars.tsx`
- Create: `src/components/EmptyState.tsx`

**Interfaces:**
- Produces: Reusable components used by all feature pages
- All files go in `src/components/`

#### Step 1: Button component

```tsx
// src/components/Button.tsx
import { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  fullWidth?: boolean
  loading?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600',
  secondary: 'bg-secondary-500 text-white hover:bg-secondary-600',
  outline: 'border-2 border-primary-500 text-primary-500 bg-transparent',
  ghost: 'text-primary-500 bg-transparent hover:bg-primary-50',
  gradient: 'bg-gradient-to-r from-primary-600 to-secondary-500 text-white',
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
```

#### Step 2: Icon component (SVG wrapper)

Write `src/components/Icon.tsx` with these icons as SVG elements:
- `home`, `chat`, `calendar`, `user`, `search`, `chevronLeft`, `chevronRight`, `star`, `starEmpty`, `clock`, `checkCircle`, `plus`, `bell`, `phone`, `video`, `mic`, `send`, `location`, `pill`, `file`, `settings`, `helpCircle`, `logOut`, `article`

```tsx
interface IconProps {
  name: string
  size?: number
  className?: string
}

// Map name → JSX element with SVG paths from plan
```

#### Step 3: BottomNav

```tsx
// src/components/BottomNav.tsx
import { useLocation, useNavigate } from 'react-router-dom'
import Icon from './Icon'
import Badge from './Badge'

const tabs = [
  { path: '/home', label: 'Home', icon: 'home' },
  { path: '/konsultasi', label: 'Konsultasi', icon: 'chat' },
  { path: '/rekam-medis', label: 'Rekam Medis', icon: 'file' },
  { path: '/artikel', label: 'Artikel', icon: 'article' },
  { path: '/profil', label: 'Profil', icon: 'user' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-16 bg-white/80 backdrop-blur-md border-t border-gray-200/60 z-50">
      <div className="flex items-center justify-around h-full px-4">
        {tabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path)
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 relative ${
                isActive ? 'text-primary-500' : 'text-gray-400'
              }`}
            >
              {tab.path === '/home' && <Badge count={3} />}
              <Icon
                name={tab.icon}
                size={22}
                className={isActive ? 'text-primary-500' : 'text-gray-400'}
              />
              <span className={`text-[10px] font-medium ${
                isActive ? 'text-primary-500' : 'text-gray-400'
              }`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
```

#### Step 4: TopAppBar

```tsx
// src/components/TopAppBar.tsx
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
          <button onClick={() => navigate(-1)} className="p-1">
            <Icon name="chevronLeft" size={24} className="text-gray-600" />
          </button>
        )}
      </div>
      {title && <h1 className="font-bold text-lg text-gray-600">{title}</h1>}
      <div className="w-10 flex justify-end">{rightAction}</div>
    </div>
  )
}
```

#### Step 5: Card

```tsx
// src/components/Card.tsx
interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div onClick={onClick}
      className={`bg-white rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-4 ${className}`}>
      {children}
    </div>
  )
}
```

#### Step 6: SearchBar

```tsx
// src/components/SearchBar.tsx
import Icon from './Icon'

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder = 'Cari...' }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-3">
      <Icon name="search" size={18} className="text-gray-400 shrink-0" />
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400 w-full" />
    </div>
  )
}
```

#### Step 7: Badge

```tsx
// src/components/Badge.tsx
interface BadgeProps { count?: number; className?: string }

export default function Badge({ count, className = '' }: BadgeProps) {
  if (!count || count <= 0) return null
  return (
    <span className={`absolute -top-1 -right-2 bg-accent-red text-white text-[10px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1 ${className}`}>
      {count > 99 ? '99+' : count}
    </span>
  )
}
```

#### Step 8: ProgressDots

```tsx
// src/components/ProgressDots.tsx
interface ProgressDotsProps { total: number; current: number }

export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i}
          className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-primary-500 w-4' : 'bg-gray-300'}`}
        />
      ))}
    </div>
  )
}
```

#### Step 9: RatingStars

```tsx
// src/components/RatingStars.tsx
import Icon from './Icon'

interface RatingStarsProps { rating: number; size?: number }

export default function RatingStars({ rating, size = 16 }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? 'text-accent-yellow' : 'text-gray-300'}>
          <Icon name={star <= rating ? 'star' : 'starEmpty'} size={size} />
        </span>
      ))}
    </div>
  )
}
```

#### Step 10: EmptyState

```tsx
// src/components/EmptyState.tsx
import Icon from './Icon'

interface EmptyStateProps { icon?: string; title: string; description?: string }

export default function EmptyState({ icon = 'file', title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <Icon name={icon} size={48} className="text-gray-300 mb-4" />
      <h3 className="text-gray-500 font-semibold text-lg mb-1">{title}</h3>
      {description && <p className="text-gray-400 text-sm">{description}</p>}
    </div>
  )
}
```

## Verify

Run `npx tsc --noEmit` to check TypeScript compiles without errors.
