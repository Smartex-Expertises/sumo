'use client'

import React, { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  Navigation,
  Star,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  PieChart,
  Activity,
  Target,
  Award,
  Zap,
  ChevronUp,
  ChevronDown
} from 'lucide-react'

interface AnalyticsData {
  totalRides: number
  completedRides: number
  revenue: number
  averageRating: number
  averageDistance: number
  averageDuration: number
  completionRate: number
  revenueGrowth: number
  rideGrowth: number
  peakHours: string[]
  topDrivers: Array<{ name: string; rides: number; rating: number }>
  revenueByHour: Array<{ hour: number; revenue: number }>
  ridesByDay: Array<{ day: string; rides: number }>
}

const Analytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRides: 0,
    completedRides: 0,
    revenue: 0,
    averageRating: 0,
    averageDistance: 0,
    averageDuration: 0,
    completionRate: 0,
    revenueGrowth: 0,
    rideGrowth: 0,
    peakHours: [],
    topDrivers: [],
    revenueByHour: [],
    ridesByDay: []
  })
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<'DAY' | 'WEEK' | 'MONTH' | 'YEAR'>('MONTH')
  const [metric, setMetric] = useState<'REVENUE' | 'RIDES' | 'RATING' | 'DISTANCE'>('REVENUE')

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    try {
      // Simulation d'API
      const mockAnalytics: AnalyticsData = {
        totalRides: 12456,
        completedRides: 9850,
        revenue: 45268000,
        averageRating: 4.7,
        averageDistance: 12.3,
        averageDuration: 24.5,
        completionRate: 79.2,
        revenueGrowth: 12.5,
        rideGrowth: 8.3,
        peakHours: ['17h-18h', '08h-09h', '18h-19h'],
        topDrivers: [
          { name: 'Paul Martin', rides: 245, rating: 4.9 },
          { name: 'Sophie Bernard', rides: 189, rating: 4.8 },
          { name: 'Jacques Dupont', rides: 167, rating: 4.7 },
          { name: 'Marie Leroy', rides: 142, rating: 4.6 },
          { name: 'Thomas Petit', rides: 128, rating: 4.5 }
        ],
        revenueByHour: Array.from({ length: 12 }, (_, i) => ({
          hour: i + 8,
          revenue: Math.floor(Math.random() * 500000) + 200000
        })),
        ridesByDay: [
          { day: 'Lun', rides: 156 },
          { day: 'Mar', rides: 189 },
          { day: 'Mer', rides: 167 },
          { day: 'Jeu', rides: 198 },
          { day: 'Ven', rides: 234 },
          { day: 'Sam', rides: 287 },
          { day: 'Dim', rides: 245 }
        ]
      }
      setAnalytics(mockAnalytics)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const getMetricData = () => {
    switch (metric) {
      case 'REVENUE':
        return analytics.revenueByHour.map(item => ({
          label: `${item.hour}h`,
          value: item.revenue / 1000, // en milliers
          color: 'from-emerald-500 to-emerald-600'
        }))
      case 'RIDES':
        return analytics.ridesByDay.map(item => ({
          label: item.day,
          value: item.rides,
          color: 'from-blue-500 to-blue-600'
        }))
      case 'RATING':
        return Array.from({ length: 7 }, (_, i) => ({
          label: `${i + 1}/7`,
          value: Math.floor(Math.random() * 100) + 50,
          color: 'from-yellow-500 to-yellow-600'
        }))
      case 'DISTANCE':
        return Array.from({ length: 7 }, (_, i) => ({
          label: `${i + 1}/7`,
          value: Math.floor(Math.random() * 20) + 5,
          color: 'from-purple-500 to-purple-600'
        }))
      default:
        return []
    }
  }

  const metricData = getMetricData()
  const maxValue = Math.max(...metricData.map(item => item.value))

  const getPeriodLabel = (period: string) => {
    const periods: Record<string, string> = {
      'DAY': 'Aujourd\'hui',
      'WEEK': 'Cette semaine',
      'MONTH': 'Ce mois',
      'YEAR': 'Cette année'
    }
    return periods[period] || period
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Analytiques des Courses</h2>
            <p className="text-gray-600 mt-1">
              Analysez les performances et tendances de votre activité
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={period}
                onChange={(e) => setPeriod(e.target.value as any)}
              >
                <option value="DAY">Aujourd'hui</option>
                <option value="WEEK">Cette semaine</option>
                <option value="MONTH">Ce mois</option>
                <option value="YEAR">Cette année</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Exporter rapport
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        <KPICard
          title="Courses totales"
          value={analytics.totalRides}
          icon={<BarChart3 className="h-5 w-5" />}
          color="bg-blue-500"
          growth={analytics.rideGrowth}
        />
        <KPICard
          title="Courses terminées"
          value={analytics.completedRides}
          icon={<Activity className="h-5 w-5" />}
          color="bg-green-500"
        />
        <KPICard
          title="Taux réussite"
          value={analytics.completionRate}
          icon={<Target className="h-5 w-5" />}
          color="bg-emerald-500"
          isPercentage={true}
        />
        <KPICard
          title="Revenus total"
          value={analytics.revenue}
          icon={<DollarSign className="h-5 w-5" />}
          color="bg-yellow-500"
          isCurrency={true}
          growth={analytics.revenueGrowth}
        />
        <KPICard
          title="Note moyenne"
          value={analytics.averageRating}
          icon={<Star className="h-5 w-5" />}
          color="bg-orange-500"
          isRating={true}
        />
        <KPICard
          title="Distance moy."
          value={analytics.averageDistance}
          icon={<Navigation className="h-5 w-5" />}
          color="bg-purple-500"
          isDistance={true}
        />
        <KPICard
          title="Durée moy."
          value={analytics.averageDuration}
          icon={<Clock className="h-5 w-5" />}
          color="bg-pink-500"
          isDuration={true}
        />
        <KPICard
          title="Passagers/jour"
          value={Math.round(analytics.completedRides / 30)}
          icon={<Users className="h-5 w-5" />}
          color="bg-indigo-500"
        />
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique métrique sélectionnée */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-800">Évolution {getPeriodLabel(period).toLowerCase()}</h3>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={metric}
                onChange={(e) => setMetric(e.target.value as any)}
              >
                <option value="REVENUE">Revenus</option>
                <option value="RIDES">Courses</option>
                <option value="RATING">Notes</option>
                <option value="DISTANCE">Distance</option>
              </select>
            </div>
          </div>
          
          <div className="h-64 flex items-end space-x-2">
            {metricData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className={`w-8 bg-gradient-to-t ${item.color} rounded-t-lg transition-all duration-300`}
                  style={{ height: `${(item.value / maxValue) * 180}px` }}
                />
                <span className="text-xs text-gray-500 mt-2">{item.label}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {metric === 'REVENUE' && 'Revenus par heure'}
                {metric === 'RIDES' && 'Courses par jour'}
                {metric === 'RATING' && 'Notes moyennes'}
                {metric === 'DISTANCE' && 'Distance moyenne'}
              </div>
              <div className="text-sm font-medium text-green-600">
                {metric === 'REVENUE' && `+${analytics.revenueGrowth}%`}
                {metric === 'RIDES' && `+${analytics.rideGrowth}%`}
                {metric === 'RATING' && '+0.2'}
                {metric === 'DISTANCE' && '+1.5 km'}
              </div>
            </div>
          </div>
        </div>

        {/* Graphique circulaire */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-6">Répartition par statut</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
              {/* Secteurs */}
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-green-500" style={{ transform: 'rotate(72deg)' }} />
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-red-500" style={{ transform: 'rotate(144deg)' }} />
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-blue-500" style={{ transform: 'rotate(216deg)' }} />
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-yellow-500" style={{ transform: 'rotate(288deg)' }} />
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-purple-500" style={{ transform: 'rotate(360deg)' }} />
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{analytics.completionRate}%</div>
                  <div className="text-sm text-gray-600">Taux réussite</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-2 mt-6">
            <div className="text-center">
              <div className="h-3 w-3 bg-green-500 rounded-full mx-auto mb-1"></div>
              <div className="text-sm font-medium">79.2%</div>
              <div className="text-xs text-gray-600">Terminées</div>
            </div>
            <div className="text-center">
              <div className="h-3 w-3 bg-red-500 rounded-full mx-auto mb-1"></div>
              <div className="text-sm font-medium">15.3%</div>
              <div className="text-xs text-gray-600">Annulées</div>
            </div>
            <div className="text-center">
              <div className="h-3 w-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
              <div className="text-sm font-medium">3.2%</div>
              <div className="text-xs text-gray-600">En cours</div>
            </div>
            <div className="text-center">
              <div className="h-3 w-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
              <div className="text-sm font-medium">1.8%</div>
              <div className="text-xs text-gray-600">Acceptées</div>
            </div>
            <div className="text-center">
              <div className="h-3 w-3 bg-purple-500 rounded-full mx-auto mb-1"></div>
              <div className="text-sm font-medium">0.5%</div>
              <div className="text-xs text-gray-600">Demandées</div>
            </div>
          </div>
        </div>
      </div>

      {/* Deuxième ligne */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top chauffeurs */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-800">Top 5 Chauffeurs</h3>
            <Award className="h-5 w-5 text-yellow-500" />
          </div>
          
          <div className="space-y-4">
            {analytics.topDrivers.map((driver, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {driver.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{driver.name}</div>
                    <div className="text-sm text-gray-600">{driver.rides} courses</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{driver.rating.toFixed(1)}</span>
                  </div>
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                    index === 2 ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    #{index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heures de pointe */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-800">Heures de pointe</h3>
            <Zap className="h-5 w-5 text-orange-500" />
          </div>
          
          <div className="space-y-4">
            {analytics.peakHours.map((hour, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center text-white font-semibold ${
                    index === 0 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                    index === 1 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                    'bg-gradient-to-r from-yellow-500 to-yellow-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{hour}</div>
                    <div className="text-sm text-gray-600">
                      {index === 0 ? 'Pic d\'activité' :
                       index === 1 ? 'Heure de pointe' :
                       'Trafic élevé'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-800">
                    {index === 0 ? '287' :
                     index === 1 ? '234' :
                     '198'} courses
                  </div>
                  <div className={`text-sm flex items-center justify-end ${
                    index === 0 ? 'text-red-600' :
                    index === 1 ? 'text-orange-600' :
                    'text-yellow-600'
                  }`}>
                    {index === 0 ? <ChevronUp className="h-4 w-4 mr-1" /> :
                     index === 1 ? <ChevronUp className="h-4 w-4 mr-1" /> :
                     <ChevronUp className="h-4 w-4 mr-1" />}
                    {index === 0 ? '+35%' :
                     index === 1 ? '+28%' :
                     '+22%'} vs moyenne
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium text-gray-800 mb-3">Recommandations</h4>
            <ul className="space-y-2">
              <li className="flex items-start text-sm text-gray-600">
                <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                Augmenter le nombre de chauffeurs disponibles entre 17h et 19h
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                Proposer des tarifs dynamiques pendant les heures de pointe
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                Anticiper la demande en prévoyant plus de véhicules le vendredi
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-semibold text-gray-800 mb-6">Insights et tendances</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-3">
              <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
              <h4 className="font-medium text-gray-800">Croissance</h4>
            </div>
            <p className="text-sm text-gray-600">
              Les revenus ont augmenté de {analytics.revenueGrowth}% ce mois-ci, avec une croissance particulièrement forte le week-end.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center mb-3">
              <Target className="h-5 w-5 text-green-600 mr-2" />
              <h4 className="font-medium text-gray-800">Performance</h4>
            </div>
            <p className="text-sm text-gray-600">
              Le taux de réussite des courses est stable à {analytics.completionRate}%, supérieur à l'objectif de 75%.
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center mb-3">
              <Activity className="h-5 w-5 text-purple-600 mr-2" />
              <h4 className="font-medium text-gray-800">Opportunités</h4>
            </div>
            <p className="text-sm text-gray-600">
              Diminuer le taux d'annulation de 2% pourrait générer {Math.round(analytics.revenue * 0.02).toLocaleString()} XOF de revenus supplémentaires.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Composant KPICard
interface KPICardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
  growth?: number
  isPercentage?: boolean
  isCurrency?: boolean
  isRating?: boolean
  isDistance?: boolean
  isDuration?: boolean
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  icon, 
  color,
  growth,
  isPercentage = false,
  isCurrency = false,
  isRating = false,
  isDistance = false,
  isDuration = false
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {isCurrency ? `${(value / 1000000).toFixed(1)}M` :
             isPercentage ? `${value.toFixed(1)}%` :
             isRating ? value.toFixed(1) :
             isDistance ? `${value.toFixed(1)} km` :
             isDuration ? `${value.toFixed(1)} min` :
             value.toLocaleString()}
            {isRating && <span className="text-sm text-gray-500 ml-1">/5</span>}
          </p>
          {growth !== undefined && (
            <div className={`flex items-center text-sm mt-1 ${
              growth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {growth >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <span>{Math.abs(growth)}%</span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
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

export default Analytics