'use client';

import { DollarSign, TrendingUp, TrendingDown, CreditCard, Wallet, PieChart, BarChart, Download, Filter, Calendar } from 'lucide-react';
import { useState } from 'react';

interface FinancialMetric {
  label: string;
  value: string;
  change: number;
  description: string;
}

interface RevenueStream {
  name: string;
  amount: number;
  percentage: number;
  trend: number;
}

interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  budget: number;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'revenue' | 'expense';
  amount: number;
  category: string;
  status: string;
}

export default function Financial() {
  const [period, setPeriod] = useState<string>('month');
  const [view, setView] = useState<'overview' | 'revenue' | 'expenses'>('overview');

  const financialMetrics: FinancialMetric[] = [
    {
      label: 'Revenus Totaux',
      value: '28.5M XOF',
      change: 22.8,
      description: 'Tous les revenus de la plateforme',
    },
    {
      label: 'Revenus Nettes',
      value: '21.3M XOF',
      change: 18.5,
      description: 'Après déduction des frais',
    },
    {
      label: 'Revenus Chauffeurs',
      value: '18.7M XOF',
      change: 20.1,
      description: 'Part des chauffeurs',
    },
    {
      label: 'Commission Plateforme',
      value: '4.8M XOF',
      change: 25.4,
      description: 'Revenus de la plateforme',
    },
  ];

  const revenueStreams: RevenueStream[] = [
    { name: 'Courses Standard', amount: 18500000, percentage: 65, trend: 15.2 },
    { name: 'Courses Premium', amount: 6250000, percentage: 22, trend: 28.4 },
    { name: 'Covoiturage', amount: 2250000, percentage: 8, trend: 12.1 },
    { name: 'Réservations', amount: 800000, percentage: 3, trend: -5.2 },
    { name: 'Autres', amount: 700000, percentage: 2, trend: 8.7 },
  ];

  const expenseCategories: ExpenseCategory[] = [
    { name: 'Frais Opérationnels', amount: 3200000, percentage: 45, budget: 3500000 },
    { name: 'Marketing', amount: 1500000, percentage: 21, budget: 1800000 },
    { name: 'Développement', amount: 1200000, percentage: 17, budget: 1000000 },
    { name: 'Support Client', amount: 800000, percentage: 11, budget: 750000 },
    { name: 'Frais Administratifs', amount: 400000, percentage: 6, budget: 450000 },
  ];

  const recentTransactions: Transaction[] = [
    { id: 'TXN-001', date: '2024-01-15', description: 'Paiement commission course #789012', type: 'revenue', amount: 2850, category: 'Commission', status: 'completed' },
    { id: 'TXN-002', date: '2024-01-15', description: 'Remboursement client #456789', type: 'expense', amount: 1500, category: 'Remboursement', status: 'completed' },
    { id: 'TXN-003', date: '2024-01-14', description: 'Frais de service marketing', type: 'expense', amount: 500000, category: 'Marketing', status: 'pending' },
    { id: 'TXN-004', date: '2024-01-14', description: 'Commission batch courses', type: 'revenue', amount: 1250000, category: 'Commission', status: 'completed' },
    { id: 'TXN-005', date: '2024-01-13', description: 'Paiement chauffeur #DRV-001', type: 'expense', amount: 285000, category: 'Paiement Chauffeur', status: 'completed' },
  ];

  const getTypeColor = (type: Transaction['type']) => {
    return type === 'revenue' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M XOF`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K XOF`;
    }
    return `${amount} XOF`;
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Rapports Financiers</h2>
          <p className="text-gray-600 mt-1">Analyses financières détaillées et rapports</p>
        </div>
        <div className="flex gap-3">
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setView('overview')}
              className={`px-4 py-2 ${view === 'overview' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setView('revenue')}
              className={`px-4 py-2 ${view === 'revenue' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Revenus
            </button>
            <button
              onClick={() => setView('expenses')}
              className={`px-4 py-2 ${view === 'expenses' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Dépenses
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
            Exporter PDF
          </button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="text-purple-600" size={20} />
              </div>
              <div className="flex items-center gap-1">
                {metric.change > 0 ? (
                  <TrendingUp size={16} className="text-green-500" />
                ) : (
                  <TrendingDown size={16} className="text-red-500" />
                )}
                <span className={`text-sm font-medium ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>
            
            <div>
              <p className="text-2xl font-bold">{metric.value}</p>
              <p className="font-medium text-gray-900 mt-1">{metric.label}</p>
              <p className="text-sm text-gray-500 mt-2">{metric.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content based on View */}
      {view === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Distribution des Revenus</h3>
                <p className="text-gray-600 text-sm">Par type de service</p>
              </div>
              <PieChart className="text-gray-400" size={20} />
            </div>
            
            <div className="space-y-4">
              {revenueStreams.map((stream, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        index === 2 ? 'bg-purple-500' :
                        index === 3 ? 'bg-orange-500' : 'bg-gray-500'
                      }`}></div>
                      <span className="font-medium">{stream.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{formatCurrency(stream.amount)}</span>
                      <span className="font-medium">{stream.percentage}%</span>
                      <div className={`flex items-center gap-1 ${stream.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stream.trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        <span className="text-xs">{stream.trend > 0 ? '+' : ''}{stream.trend}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        index === 2 ? 'bg-purple-500' :
                        index === 3 ? 'bg-orange-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${stream.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Répartition des Dépenses</h3>
                <p className="text-gray-600 text-sm">Par catégorie</p>
              </div>
              <BarChart className="text-gray-400" size={20} />
            </div>
            
            <div className="space-y-4">
              {expenseCategories.map((category, index) => {
                const budgetUsage = (category.amount / category.budget) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-red-500' :
                          index === 1 ? 'bg-blue-500' :
                          index === 2 ? 'bg-green-500' :
                          index === 3 ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}></div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{formatCurrency(category.amount)}</span>
                        <span className="font-medium">{category.percentage}%</span>
                        <span className={`text-xs ${budgetUsage > 100 ? 'text-red-600' : 'text-green-600'}`}>
                          {budgetUsage > 100 ? 'Dépassement' : 'Dans le budget'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            index === 0 ? 'bg-red-500' :
                            index === 1 ? 'bg-blue-500' :
                            index === 2 ? 'bg-green-500' :
                            index === 3 ? 'bg-yellow-500' : 'bg-gray-500'
                          }`}
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">Budget: {formatCurrency(category.budget)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {view === 'revenue' && (
        <div className="grid grid-cols-1 gap-6">
          {/* Revenue Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Détails des Revenus</h3>
                <p className="text-gray-600 text-sm">Analyse détaillée par source</p>
              </div>
              <Wallet className="text-gray-400" size={20} />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Source de Revenus</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Montant</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Part</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Tendances</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Progression</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {revenueStreams.map((stream, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            index === 0 ? 'bg-blue-100' :
                            index === 1 ? 'bg-green-100' :
                            index === 2 ? 'bg-purple-100' :
                            index === 3 ? 'bg-orange-100' : 'bg-gray-100'
                          }`}>
                            <DollarSign className={
                              index === 0 ? 'text-blue-600' :
                              index === 1 ? 'text-green-600' :
                              index === 2 ? 'text-purple-600' :
                              index === 3 ? 'text-orange-600' : 'text-gray-600'
                            } size={18} />
                          </div>
                          <div>
                            <p className="font-medium">{stream.name}</p>
                            <p className="text-sm text-gray-500">{stream.percentage}% du total</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold">{formatCurrency(stream.amount)}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                index === 0 ? 'bg-blue-500' :
                                index === 1 ? 'bg-green-500' :
                                index === 2 ? 'bg-purple-500' :
                                index === 3 ? 'bg-orange-500' : 'bg-gray-500'
                              }`}
                              style={{ width: `${stream.percentage}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{stream.percentage}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className={`flex items-center gap-1 ${stream.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stream.trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          <span className="font-medium">{stream.trend > 0 ? '+' : ''}{stream.trend}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <button className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                          Voir détails
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {view === 'expenses' && (
        <div className="grid grid-cols-1 gap-6">
          {/* Expenses Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Détails des Dépenses</h3>
                <p className="text-gray-600 text-sm">Analyse par catégorie et budget</p>
              </div>
              <CreditCard className="text-gray-400" size={20} />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Catégorie</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Dépenses</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Budget</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Utilisation</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Statut Budget</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {expenseCategories.map((category, index) => {
                    const budgetUsage = (category.amount / category.budget) * 100;
                    const statusColor = budgetUsage > 100 ? 'bg-red-100 text-red-800' : 
                                      budgetUsage > 90 ? 'bg-yellow-100 text-yellow-800' : 
                                      'bg-green-100 text-green-800';
                    const statusText = budgetUsage > 100 ? 'Dépassé' : 
                                     budgetUsage > 90 ? 'Proche limite' : 
                                     'Dans budget';
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              index === 0 ? 'bg-red-100' :
                              index === 1 ? 'bg-blue-100' :
                              index === 2 ? 'bg-green-100' :
                              index === 3 ? 'bg-yellow-100' : 'bg-gray-100'
                            }`}>
                              <CreditCard className={
                                index === 0 ? 'text-red-600' :
                                index === 1 ? 'text-blue-600' :
                                index === 2 ? 'text-green-600' :
                                index === 3 ? 'text-yellow-600' : 'text-gray-600'
                              } size={18} />
                            </div>
                            <div>
                              <p className="font-medium">{category.name}</p>
                              <p className="text-sm text-gray-500">{category.percentage}% des dépenses</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="font-bold">{formatCurrency(category.amount)}</p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="font-medium">{formatCurrency(category.budget)}</p>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  budgetUsage > 100 ? 'bg-red-500' :
                                  budgetUsage > 90 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${Math.min(budgetUsage, 100)}%` }}
                              ></div>
                            </div>
                            <span className="font-medium">{budgetUsage.toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                            {statusText}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                            Ajuster budget
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Transactions Récentes</h3>
              <p className="text-gray-600 text-sm">Dernières opérations financières</p>
            </div>
            <Calendar className="text-gray-400" size={20} />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">ID Transaction</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Description</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Catégorie</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Montant</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm">{transaction.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    {new Date(transaction.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium">{transaction.description}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                      {transaction.type === 'revenue' ? 'Revenu' : 'Dépense'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm">{transaction.category}</span>
                  </td>
                  <td className="py-4 px-6">
                    <p className={`font-bold ${transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'revenue' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}