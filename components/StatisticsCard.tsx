interface StatisticsCardProps {
  icon: React.ReactNode
  number: string
  label: string
  description?: string
}

export default function StatisticsCard({ icon, number, label, description }: StatisticsCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg lg:rounded-xl p-3 lg:p-4 xl:p-5 shadow-lg">
      <div className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-full bg-white/20 flex items-center justify-center mb-2 lg:mb-3">
        <svg className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icon}
        </svg>
      </div>
      {number && (
        <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-1">{number}</div>
      )}
      <div className={`${number ? 'text-xs lg:text-sm' : 'text-sm lg:text-base font-semibold'} text-gray-200 leading-tight mb-1`}>{label}</div>
      {description && (
        <div className="text-xs lg:text-sm text-gray-300 leading-relaxed">{description}</div>
      )}
    </div>
  )
}
