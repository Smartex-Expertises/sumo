'use client';

import { BarChart3, TrendingUp, TrendingDown, Users, Car, DollarSign, Clock, MapPin, Calendar, Download, Filter } from 'lucide-react';
import { useState } from 'react';

interface Metric {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface ChartData {
  day: string;
  rides: number;
  revenue: number;
}

interface TopDriver {
  id: string;
  name: string;
  rides: number;
  earnings: number;
  rating: number;
}

export default function Overview() {
  const [timeRange, setTimeRange] = useState<string>('7days');
  const [selectedMetric, setSelectedMetric] = useState<string>('rides');

  const metrics: Metric[] = [
    {
      label: 'Total Courses',
      value: '12,845',
      change: 15.2,
      icon: <Car className="text-blue-600" size={20} />,
      color: 'bg-blue-50',
    },
    {
      label: 'Revenus Totaux',
      value: '28.5M XOF',
      change: 22.8,
      icon: <DollarSign className="text-green-600" size={20} />,
      color: 'bg-green-50',
    },
    {
      label: 'Utilisateurs Actifs',
      value: '4,231',
      change: 8.4,
      icon: <Users className="text-purple-600" size={20} />,
      color: 'bg-purple-50',
    },
    {
      label: 'Temps Moyen Attente',
      value: '4.2 min',
      change: -3.1,
      icon: <Clock className="text-orange-600" size={20} />,
      color: 'bg-orange-50',
    },
  ];

  const chartData: ChartData[] = [
    { day: 'Lun', rides: 1245, revenue: 2650000 },
    { day: 'Mar', rides: 1320, revenue: 2810000 },
    { day: 'Mer', rides: 1180, revenue: 2510000 },
    { day: 'Jeu', rides: 1450, revenue: 3120000 },
    { day: 'Ven', rides: 1620, revenue: 3450000 },
    { day: 'Sam', rides: 1780, revenue: 3810000 },
    { day: 'Dim', rides: 1550, revenue: 3320000 },
  ];

  const topDrivers: TopDriver[] = [
    { id: '1', name: 'Moussa Diop', rides: 245, earnings: 2850000, rating: 4.9 },
    { id: '2', name: 'Aïcha Ndiaye', rides: 218, earnings: 2540000, rating: 4.8 },
    { id: '3', name: 'Ibrahima Sow', rides: 198, earnings: 2310000, rating: 4.7 },
    { id: '4', name: 'Fatou Diallo', rides: 185, earnings: 2150000, rating: 4.8 },
    { id: '5', name: 'Amadou Kane', rides: 172, earnings: 1980000, rating: 4.6 },
  ];

  const topZones = [
    { name: 'Dakar Centre', rides: 3245, revenue: 12500000 },
    { name: 'Pikine', rides: 2780, revenue: 9800000 },
    { name: 'Guediawaye', rides: 1890, revenue: 7200000 },
    { name: 'Thiès', rides: 1540, revenue: 5800000 },
    { name: 'Rufisque', rides: 1320, revenue: 4900000 },
  ];

  const getMaxValue = (data: ChartData[], key: keyof ChartData) => {
    return Math.max(...data.map(item => item[key] as number));
  };

  const maxRides = getMaxValue(chartData, 'rides');
  const maxRevenue = getMaxValue(chartData, 'revenue');

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Vue d'ensemble</h2>
          <p className="text-gray-600 mt-1">Statistiques et tendances globales de la plateforme</p>
        </div>
        <div className="flex gap-3">
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7days">7 derniers jours</option>
            <option value="30days">30 derniers jours</option>
            <option value="90days">90 derniers jours</option>
            <option value="year">Cette année</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            Filtres
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Download size={18} />
            Exporter
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{metric.label}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {metric.change > 0 ? (
                    <TrendingUp size={16} className="text-green-500" />
                  ) : (
                    <TrendingDown size={16} className="text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                  <span className="text-sm text-gray-500">vs période précédente</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${metric.color}`}>
                {metric.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rides & Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Activité des Courses</h3>
              <p className="text-gray-600 text-sm">Évolution sur 7 jours</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMetric('rides')}
                className={`px-3 py-1 rounded-lg text-sm ${selectedMetric === 'rides' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
              >
                Courses
              </button>
              <button
                onClick={() => setSelectedMetric('revenue')}
                className={`px-3 py-1 rounded-lg text-sm ${selectedMetric === 'revenue' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}
              >
                Revenus
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Chart Bars */}
            <div className="flex items-end justify-between h-48">
              {chartData.map((data, index) => {
                const maxValue = selectedMetric === 'rides' ? maxRides : maxRevenue;
                const value = selectedMetric === 'rides' ? data.rides : data.revenue;
                const height = (value / maxValue) * 100;
                
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 ${selectedMetric === 'rides' ? 'bg-blue-500' : 'bg-green-500'} rounded-t-lg transition-all duration-300`}
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className="mt-2 text-xs text-gray-600">{data.day}</div>
                    </div>
                    <div className="mt-1 text-xs font-medium">
                      {selectedMetric === 'rides' 
                        ? data.rides.toLocaleString()
                        : `${(data.revenue / 1000000).toFixed(1)}M`
                      }
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-600">Courses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Revenus (en millions)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Drivers */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top 5 Chauffeurs</h3>
              <p className="text-gray-600 text-sm">Performances du mois</p>
            </div>
            <Calendar className="text-gray-400" size={20} />
          </div>
          
          <div className="space-y-4">
            {topDrivers.map((driver) => (
              <div key={driver.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="text-purple-600" size={18} />
                  </div>
                  <div>
                    <p className="font-medium">{driver.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{driver.rides} courses</span>
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                        ★ {driver.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{(driver.earnings / 1000000).toFixed(1)}M XOF</p>
                  <p className="text-sm text-gray-500">Revenus</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zones & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Zones */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Zones les Plus Actives</h3>
              <p className="text-gray-600 text-sm">Répartition géographique</p>
            </div>
            <MapPin className="text-gray-400" size={20} />
          </div>
          
          <div className="space-y-4">
            {topZones.map((zone, index) => {
              const percentage = (zone.rides / topZones.reduce((sum, z) => sum + z.rides, 0)) * 100;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{zone.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{zone.rides.toLocaleString()} courses</span>
                      <span className="font-medium">{(zone.revenue / 1000000).toFixed(1)}M XOF</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Distribution Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Distribution par Type</h3>
              <p className="text-gray-600 text-sm">Répartition des services</p>
            </div>
            <PieChart className="text-gray-400" size={20} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">STANDARD</p>
                    <p className="text-2xl font-bold mt-1">68%</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Car className="text-blue-600" size={20} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">8,745 courses</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">PREMIUM</p>
                    <p className="text-2xl font-bold mt-1">22%</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Car className="text-green-600" size={20} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">2,825 courses</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">CARPOOL</p>
                    <p className="text-2xl font-bold mt-1">8%</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="text-purple-600" size={20} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">1,028 courses</p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">RESERVATION</p>
                    <p className="text-2xl font-bold mt-1">2%</p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calendar className="text-orange-600" size={20} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">247 courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Import manquant pour PieChart
import { PieChart } from 'lucide-react';