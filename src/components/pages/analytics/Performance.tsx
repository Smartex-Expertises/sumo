'use client';

import { TrendingUp, TrendingDown, Award, Clock, Star, Target, BarChart3, Filter, Download } from 'lucide-react';
import { useState } from 'react';

interface KPI {
  label: string;
  value: string | number;
  target: string | number;
  progress: number;
  change: number;
  status: 'exceeded' | 'met' | 'below';
}

interface DriverPerformance {
  id: string;
  name: string;
  rating: number;
  acceptanceRate: number;
  cancellationRate: number;
  avgRating: number;
  totalRides: number;
  earnings: number;
}

interface PerformanceMetric {
  metric: string;
  current: number;
  previous: number;
  change: number;
}

export default function Performance() {
  const [period, setPeriod] = useState<string>('month');
  const [viewMode, setViewMode] = useState<'drivers' | 'clients'>('drivers');

  const kpis: KPI[] = [
    {
      label: 'Taux d\'Acceptation',
      value: '94.2%',
      target: '92%',
      progress: 102,
      change: 3.1,
      status: 'exceeded',
    },
    {
      label: 'Taux d\'Annulation',
      value: '2.8%',
      target: '3%',
      progress: 93,
      change: -15.2,
      status: 'exceeded',
    },
    {
      label: 'Temps Moyen de Réponse',
      value: '28s',
      target: '30s',
      progress: 107,
      change: -12.5,
      status: 'exceeded',
    },
    {
      label: 'Satisfaction Client',
      value: '4.7/5',
      target: '4.5/5',
      progress: 104,
      change: 2.4,
      status: 'exceeded',
    },
  ];

  const driverPerformance: DriverPerformance[] = [
    {
      id: '1',
      name: 'Moussa Diop',
      rating: 9.8,
      acceptanceRate: 98,
      cancellationRate: 1.2,
      avgRating: 4.9,
      totalRides: 245,
      earnings: 2850000,
    },
    {
      id: '2',
      name: 'Aïcha Ndiaye',
      rating: 9.5,
      acceptanceRate: 96,
      cancellationRate: 2.1,
      avgRating: 4.8,
      totalRides: 218,
      earnings: 2540000,
    },
    {
      id: '3',
      name: 'Ibrahima Sow',
      rating: 9.2,
      acceptanceRate: 94,
      cancellationRate: 2.8,
      avgRating: 4.7,
      totalRides: 198,
      earnings: 2310000,
    },
    {
      id: '4',
      name: 'Fatou Diallo',
      rating: 8.9,
      acceptanceRate: 91,
      cancellationRate: 3.2,
      avgRating: 4.8,
      totalRides: 185,
      earnings: 2150000,
    },
    {
      id: '5',
      name: 'Amadou Kane',
      rating: 8.7,
      acceptanceRate: 89,
      cancellationRate: 3.8,
      avgRating: 4.6,
      totalRides: 172,
      earnings: 1980000,
    },
  ];

  const performanceMetrics: PerformanceMetric[] = [
    { metric: 'Courses par Chauffeur', current: 42, previous: 38, change: 10.5 },
    { metric: 'Revenu Moyen par Course', current: 2250, previous: 2100, change: 7.1 },
    { metric: 'Distance Moyenne', current: 8.2, previous: 7.8, change: 5.1 },
    { metric: 'Temps Moyen de Trajet', current: 18, previous: 19, change: -5.3 },
    { metric: 'Taux de Réussite', current: 99.2, previous: 98.5, change: 0.7 },
    { metric: 'Retours Clients', current: 12.5, previous: 15.2, change: -17.8 },
  ];

  const getStatusColor = (status: KPI['status']) => {
    switch (status) {
      case 'exceeded': return 'text-green-600 bg-green-100';
      case 'met': return 'text-blue-600 bg-blue-100';
      case 'below': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: KPI['status']) => {
    switch (status) {
      case 'exceeded': return 'Objectif dépassé';
      case 'met': return 'Objectif atteint';
      case 'below': return 'Sous objectif';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Performances</h2>
          <p className="text-gray-600 mt-1">Suivi des indicateurs clés de performance (KPI)</p>
        </div>
        <div className="flex gap-3">
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('drivers')}
              className={`px-4 py-2 ${viewMode === 'drivers' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Chauffeurs
            </button>
            <button
              onClick={() => setViewMode('clients')}
              className={`px-4 py-2 ${viewMode === 'clients' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Clients
            </button>
          </div>
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Download size={18} />
            Rapport
          </button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{kpi.label}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(kpi.status)}`}>
                {getStatusLabel(kpi.status)}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">{kpi.value}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Objectif: <span className="font-medium">{kpi.target}</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {kpi.change > 0 ? (
                      <TrendingUp size={16} className="text-green-500" />
                    ) : (
                      <TrendingDown size={16} className="text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change > 0 ? '+' : ''}{kpi.change}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progression</span>
                  <span>{kpi.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      kpi.progress >= 100 ? 'bg-green-500' : 
                      kpi.progress >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(kpi.progress, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {viewMode === 'drivers' ? 'Classement des Chauffeurs' : 'Performances Clients'}
              </h3>
              <p className="text-gray-600 text-sm">Top 5 par score de performance</p>
            </div>
            <div className="flex items-center gap-2">
              <Award className="text-purple-600" size={20} />
              <span className="font-medium">Score de Performance</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Rang</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Nom</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Score</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Taux d'Acceptation</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Taux d'Annulation</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Note Moyenne</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {driverPerformance.map((driver, index) => (
                <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      index === 2 ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      <span className="font-bold">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium">{driver.name}</p>
                      <p className="text-sm text-gray-500">{driver.totalRides} courses • {driver.earnings.toLocaleString()} XOF</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{driver.rating.toFixed(1)}</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500 bg-purple-600"
                          style={{ width: `${driver.rating * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{driver.acceptanceRate}%</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500 bg-green-500"
                          style={{ width: `${driver.acceptanceRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${driver.cancellationRate > 3 ? 'text-red-600' : 'text-green-600'}`}>
                        {driver.cancellationRate}%
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${driver.cancellationRate > 3 ? 'bg-red-500' : 'bg-green-500'}`}
                          style={{ width: `${driver.cancellationRate * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Star className="text-yellow-500" size={16} />
                      <span className="font-medium">{driver.avgRating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Métriques de Performance</h3>
              <p className="text-gray-600 text-sm">Évolution des indicateurs clés</p>
            </div>
            <BarChart3 className="text-gray-400" size={20} />
          </div>
          
          <div className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{metric.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{metric.current}</span>
                    <div className={`flex items-center gap-1 ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      <span className="text-sm">{metric.change > 0 ? '+' : ''}{metric.change}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Mois précédent: {metric.previous}</span>
                  <span>Variation: {metric.change > 0 ? 'Amélioration' : 'Baisse'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Objectifs de Performance</h3>
              <p className="text-gray-600 text-sm">Suivi des objectifs trimestriels</p>
            </div>
            <Target className="text-gray-400" size={20} />
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Augmentation des Revenus</span>
                <span className="font-bold">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="h-3 rounded-full bg-green-500" style={{ width: '78%' }}></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Objectif: +20%</span>
                <span>Actuel: +15.6%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Réduction des Annulations</span>
                <span className="font-bold">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="h-3 rounded-full bg-blue-500" style={{ width: '92%' }}></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Objectif: -15%</span>
                <span>Actuel: -13.8%</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Amélioration Satisfaction</span>
                <span className="font-bold">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="h-3 rounded-full bg-purple-500" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Objectif: 4.8/5</span>
                <span>Actuel: 4.7/5</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Croissance Utilisateurs</span>
                <span className="font-bold">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="h-3 rounded-full bg-orange-500" style={{ width: '95%' }}></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Objectif: +10%</span>
                <span>Actuel: +9.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}