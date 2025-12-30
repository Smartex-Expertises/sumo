import React from 'react'

interface DriverStatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
  trend?: string
}

const DriverStatsCard: React.FC<DriverStatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  color,
  trend 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value.toLocaleString()}</p>
          {trend && (
            <span className="text-xs font-medium text-green-600 mt-1">
              {trend} ce mois
            </span>
          )}
        </div>
        <div className={`${color} p-3 rounded-full`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverStatsCard