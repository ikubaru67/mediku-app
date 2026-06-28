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
