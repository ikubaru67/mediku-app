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
