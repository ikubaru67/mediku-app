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
