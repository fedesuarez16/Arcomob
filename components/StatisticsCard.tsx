interface StatisticsCardProps {
  icon: React.ReactNode
  number: string
  label: string
  description?: string
}

export default function StatisticsCard({ icon, number, label, description }: StatisticsCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg lg:rounded-xl p-3 lg:p-4 xl:p-5 shadow-lg h-full flex flex-col min-h-[100px] sm:min-h-[120px] lg:min-h-[140px]">
      <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-full bg-white/20 flex items-center justify-center mb-2 lg:mb-3 flex-shrink-0">
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icon}
        </svg>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        {number && (
          <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-1">{number}</div>
        )}
        <div className={`${number ? 'text-[10px] sm:text-xs lg:text-sm' : 'text-xs sm:text-sm lg:text-base font-semibold'} text-gray-200 leading-tight mb-1`}>{label}</div>
        {description && (
          <div className="text-[10px] sm:text-xs lg:text-sm text-gray-300 leading-relaxed mt-auto">{description}</div>
        )}
        {!description && (
          <div className="flex-1"></div>
        )}
      </div>
    </div>
  )
}
