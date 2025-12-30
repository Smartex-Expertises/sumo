'use client'

import React, { useState, useEffect } from 'react'
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  AlertCircle,
  ArrowRight,
  Wallet,
  Banknote,
  Shield,
  CheckCircle,
  XCircle,
  RefreshCw,
  BarChart3,
  PieChart
} from 'lucide-react'
import { Payment, PaymentStatus, PaymentMethod } from '../../../../type'
import Link from 'next/link'

interface PaymentStats {
  totalRevenue: number
  todayRevenue: number
  pendingPayments: number
  failedPayments: number
  withdrawalRequests: number
  averageCommission: number
  disputeCount: number
  resolvedDisputes: number
}

const PaymentsContent = () => {
  const [stats, setStats] = useState<PaymentStats>({
    totalRevenue: 0,
    todayRevenue: 0,
    pendingPayments: 0,
    failedPayments: 0,
    withdrawalRequests: 0,
    averageCommission: 0,
    disputeCount: 0,
    resolvedDisputes: 0
  })

  const [recentTransactions, setRecentTransactions] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPaymentsData()
  }, [])

  const fetchPaymentsData = async () => {
    try {
      // Simulation d'API
      setStats({
        totalRevenue: 45268000,
        todayRevenue: 1250000,
        pendingPayments: 156,
        failedPayments: 23,
        withdrawalRequests: 45,
        averageCommission: 15.5,
        disputeCount: 12,
        resolvedDisputes: 8
      })

      // Simulation de transactions récentes
      const mockTransactions: Payment[] = [
        {
          id: '1',
          amount: 3200,
          currency: 'XOF',
          method: PaymentMethod.CREDIT_CARD,
          status: PaymentStatus.SUCCEEDED,
          transactionId: 'TXN789456123',
          processorFee: 96,
          netAmount: 3104,
          processedAt: new Date('2024-01-15T09:07:00'),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          amount: 1800,
          currency: 'XOF',
          method: PaymentMethod.MOBILE_MONEY,
          status: PaymentStatus.PENDING,
          transactionId: 'TXN987654321',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '3',
          amount: 2800,
          currency: 'XOF',
          method: PaymentMethod.CASH,
          status: PaymentStatus.SUCCEEDED,
          transactionId: 'TXN123456789',
          netAmount: 2800,
          processedAt: new Date('2024-01-15T14:25:00'),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '4',
          amount: 1500,
          currency: 'XOF',
          method: PaymentMethod.WALLET,
          status: PaymentStatus.FAILED,
          failureReason: 'Fonds insuffisants',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      setRecentTransactions(mockTransactions)
    } catch (error) {
      console.error('Error fetching payments data:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: "Transactions",
      description: "Voir toutes les transactions",
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      href: "/payments/transactions",
      color: "bg-blue-50 hover:bg-blue-100 border border-blue-100"
    },
    {
      title: "Commissions",
      description: "Gérer les commissions",
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      href: "/payments/commissions",
      color: "bg-green-50 hover:bg-green-100 border border-green-100"
    },
    {
      title: "Retraits",
      description: "Gérer les demandes de retrait",
      icon: <Wallet className="h-8 w-8 text-purple-600" />,
      href: "/payments/withdrawals",
      color: "bg-purple-50 hover:bg-purple-100 border border-purple-100"
    },
    {
      title: "Litiges",
      description: "Résoudre les litiges de paiement",
      icon: <AlertCircle className="h-8 w-8 text-red-600" />,
      href: "/payments/disputes",
      color: "bg-red-50 hover:bg-red-100 border border-red-100"
    }
  ]

  const recentActivities = [
    { id: 1, action: "Paiement réussi", amount: "3 200 XOF", time: "2 min", status: "success" },
    { id: 2, action: "Retrait demandé", amount: "25 000 XOF", time: "15 min", status: "info" },
    { id: 3, action: "Paiement échoué", amount: "1 500 XOF", time: "30 min", status: "warning" },
    { id: 4, action: "Litige résolu", amount: "2 800 XOF", time: "1h", status: "success" },
  ]

  const paymentMethodsData = [
    { method: PaymentMethod.CREDIT_CARD, percentage: 35, amount: 15843800 },
    { method: PaymentMethod.MOBILE_MONEY, percentage: 45, amount: 20370600 },
    { method: PaymentMethod.CASH, percentage: 15, amount: 6790200 },
    { method: PaymentMethod.WALLET, percentage: 5, amount: 2263400 }
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        <StatCard
          title="Revenus total"
          value={stats.totalRevenue}
          icon={<DollarSign className="h-5 w-5" />}
          color="bg-emerald-500"
          isCurrency={true}
          trend="+12.5%"
        />
        <StatCard
          title="Aujourd'hui"
          value={stats.todayRevenue}
          icon={<TrendingUp className="h-5 w-5" />}
          color="bg-green-500"
          isCurrency={true}
        />
        <StatCard
          title="En attente"
          value={stats.pendingPayments}
          icon={<Clock className="h-5 w-5" />}
          color="bg-yellow-500"
        />
        <StatCard
          title="Échoués"
          value={stats.failedPayments}
          icon={<XCircle className="h-5 w-5" />}
          color="bg-red-500"
        />
        <StatCard
          title="Retraits"
          value={stats.withdrawalRequests}
          icon={<Wallet className="h-5 w-5" />}
          color="bg-purple-500"
        />
        <StatCard
          title="Commission moy."
          value={stats.averageCommission}
          icon={<BarChart3 className="h-5 w-5" />}
          color="bg-blue-500"
          isPercentage={true}
        />
        <StatCard
          title="Litiges actifs"
          value={stats.disputeCount}
          icon={<AlertCircle className="h-5 w-5" />}
          color="bg-orange-500"
        />
        <StatCard
          title="Litiges résolus"
          value={stats.resolvedDisputes}
          icon={<CheckCircle className="h-5 w-5" />}
          color="bg-indigo-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Accès rapide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <div className={`${action.color} rounded-xl p-5 transition-all duration-300 cursor-pointer hover:shadow-md`}>
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-lg bg-white mb-4 shadow-sm">
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    <span>Accéder</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Deux colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transactions récentes */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Transactions récentes</h2>
            <Link href="/payments/transactions" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              Voir tout
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center ${
                      transaction.status === PaymentStatus.SUCCEEDED ? 'bg-green-100 text-green-600' :
                      transaction.status === PaymentStatus.FAILED ? 'bg-red-100 text-red-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {transaction.status === PaymentStatus.SUCCEEDED ? <CheckCircle className="h-5 w-5" /> :
                       transaction.status === PaymentStatus.FAILED ? <XCircle className="h-5 w-5" /> :
                       <Clock className="h-5 w-5" />}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-800">
                        {transaction.method === PaymentMethod.CREDIT_CARD ? 'Carte bancaire' :
                         transaction.method === PaymentMethod.MOBILE_MONEY ? 'Mobile Money' :
                         transaction.method === PaymentMethod.CASH ? 'Espèces' :
                         'Portefeuille'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {transaction.transactionId?.substring(0, 12)}...
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {transaction.amount.toLocaleString()} XOF
                    </div>
                    <div className={`text-xs font-medium ${
                      transaction.status === PaymentStatus.SUCCEEDED ? 'text-green-600' :
                      transaction.status === PaymentStatus.FAILED ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {transaction.status === PaymentStatus.SUCCEEDED ? 'Réussi' :
                       transaction.status === PaymentStatus.FAILED ? 'Échoué' :
                       'En attente'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div>
                    {transaction.processedAt ? (
                      <span>Traité le {new Date(transaction.processedAt).toLocaleDateString()}</span>
                    ) : (
                      <span>Créé le {new Date(transaction.createdAt).toLocaleDateString()}</span>
                    )}
                  </div>
                  {transaction.processorFee && (
                    <div>
                      Frais: {transaction.processorFee.toLocaleString()} XOF
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activité récente et graphique */}
        <div className="space-y-6">
          {/* Activité récente */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Activité récente</h2>
              <button onClick={fetchPaymentsData} className="p-2 hover:bg-gray-100 rounded-lg">
                <RefreshCw className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-100 text-green-600' :
                      activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.status === 'success' ? <CheckCircle className="h-4 w-4" /> :
                       activity.status === 'warning' ? <AlertCircle className="h-4 w-4" /> :
                       <Clock className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.amount}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Graphique méthodes de paiement */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Méthodes de paiement</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                {paymentMethodsData.map((item, index, array) => {
                  const previousPercentage = array.slice(0, index).reduce((sum, i) => sum + i.percentage, 0)
                  const rotation = (previousPercentage / 100) * 360
                  
                  return (
                    <div
                      key={item.method}
                      className="absolute top-0 left-0 w-full h-full rounded-full"
                      style={{
                        background: `conic-gradient(
                          ${item.method === PaymentMethod.CREDIT_CARD ? '#3b82f6' :
                            item.method === PaymentMethod.MOBILE_MONEY ? '#10b981' :
                            item.method === PaymentMethod.CASH ? '#f59e0b' :
                            '#8b5cf6'
                          } 0% ${item.percentage}%,
                          transparent ${item.percentage}% 100%
                        )`,
                        transform: `rotate(${rotation}deg)`
                      }}
                    />
                  )
                })}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {paymentMethodsData.map((item) => (
                <div key={item.method} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      item.method === PaymentMethod.CREDIT_CARD ? 'bg-blue-500' :
                      item.method === PaymentMethod.MOBILE_MONEY ? 'bg-green-500' :
                      item.method === PaymentMethod.CASH ? 'bg-yellow-500' :
                      'bg-purple-500'
                    }`} />
                    <span className="text-sm text-gray-700">
                      {item.method === PaymentMethod.CREDIT_CARD ? 'Carte bancaire' :
                       item.method === PaymentMethod.MOBILE_MONEY ? 'Mobile Money' :
                       item.method === PaymentMethod.CASH ? 'Espèces' :
                       'Portefeuille'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{item.percentage}%</div>
                    <div className="text-sm text-gray-600">
                      {(item.amount / 1000000).toFixed(1)}M XOF
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Composant StatCard
interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
  trend?: string
  isCurrency?: boolean
  isPercentage?: boolean
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color,
  trend,
  isCurrency = false,
  isPercentage = false
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {isCurrency ? `${(value / 1000000).toFixed(1)}M` :
             isPercentage ? `${value.toFixed(1)}%` :
             value.toLocaleString()}
            {isCurrency && <span className="text-sm text-gray-500 ml-1">XOF</span>}
          </p>
          {trend && (
            <span className="text-xs font-medium text-green-600 mt-1">
              {trend}
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

export default PaymentsContent