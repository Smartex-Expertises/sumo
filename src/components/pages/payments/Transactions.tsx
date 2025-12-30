'use client'

import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Calendar, 
  CreditCard,
  Smartphone,
  Wallet,
  Banknote,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  BarChart3,
  ExternalLink
} from 'lucide-react'
import { Payment, PaymentStatus, PaymentMethod } from '../../../../type'

const Transactions = () => {
  const [transactions, setTransactions] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'ALL'>('ALL')
  const [methodFilter, setMethodFilter] = useState<PaymentMethod | 'ALL'>('ALL')
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const transactionsPerPage = 10

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      // Simulation d'API
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
          updatedAt: new Date(),
          ridePayments: [{
            rideId: 'ride1',
            paymentId: '1',
            ride: {} as any,
            payment: {} as any,
            paymentType: 'FARE',
            createdAt: new Date()
          }]
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
        },
        {
          id: '5',
          amount: 4200,
          currency: 'XOF',
          method: PaymentMethod.CREDIT_CARD,
          status: PaymentStatus.SUCCEEDED,
          transactionId: 'TXN456789123',
          processorFee: 126,
          netAmount: 4074,
          processedAt: new Date('2024-01-14T11:30:00'),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '6',
          amount: 2300,
          currency: 'XOF',
          method: PaymentMethod.MOBILE_MONEY,
          status: PaymentStatus.REFUNDED,
          transactionId: 'TXN321654987',
          processedAt: new Date('2024-01-14T16:45:00'),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      setTransactions(mockTransactions)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
      transaction.id.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || transaction.status === statusFilter
    
    const matchesMethod = methodFilter === 'ALL' || transaction.method === methodFilter
    
    const matchesDate = (!dateRange.start || !transaction.createdAt || 
      new Date(transaction.createdAt) >= new Date(dateRange.start)) &&
      (!dateRange.end || !transaction.createdAt || 
      new Date(transaction.createdAt) <= new Date(dateRange.end))

    return matchesSearch && matchesStatus && matchesMethod && matchesDate
  })

  const getStatusConfig = (status: PaymentStatus) => {
    const config: Record<PaymentStatus, {
      color: string;
      icon: React.ReactNode;
      label: string;
    }> = {
      [PaymentStatus.PENDING]: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: <Clock className="h-4 w-4" />,
        label: 'En attente'
      },
      [PaymentStatus.SUCCEEDED]: {
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="h-4 w-4" />,
        label: 'Réussi'
      },
      [PaymentStatus.FAILED]: {
        color: 'bg-red-100 text-red-800',
        icon: <XCircle className="h-4 w-4" />,
        label: 'Échoué'
      },
      [PaymentStatus.REFUNDED]: {
        color: 'bg-blue-100 text-blue-800',
        icon: <Clock className="h-4 w-4" />,
        label: 'Remboursé'
      }
    }
    return config[status]
  }

  const getMethodConfig = (method: PaymentMethod) => {
    const config: Record<PaymentMethod, {
      color: string;
      icon: React.ReactNode;
      label: string;
    }> = {
      [PaymentMethod.CREDIT_CARD]: {
        color: 'bg-blue-100 text-blue-800',
        icon: <CreditCard className="h-4 w-4" />,
        label: 'Carte bancaire'
      },
      [PaymentMethod.MOBILE_MONEY]: {
        color: 'bg-green-100 text-green-800',
        icon: <Smartphone className="h-4 w-4" />,
        label: 'Mobile Money'
      },
      [PaymentMethod.CASH]: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: <Banknote className="h-4 w-4" />,
        label: 'Espèces'
      },
      [PaymentMethod.WALLET]: {
        color: 'bg-purple-100 text-purple-800',
        icon: <Wallet className="h-4 w-4" />,
        label: 'Portefeuille'
      }
    }
    return config[method]
  }

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  )

  const calculateStats = () => {
    const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0)
    const succeededAmount = filteredTransactions
      .filter(t => t.status === PaymentStatus.SUCCEEDED)
      .reduce((sum, t) => sum + t.amount, 0)
    const failedAmount = filteredTransactions
      .filter(t => t.status === PaymentStatus.FAILED)
      .reduce((sum, t) => sum + t.amount, 0)
    const pendingAmount = filteredTransactions
      .filter(t => t.status === PaymentStatus.PENDING)
      .reduce((sum, t) => sum + t.amount, 0)
    
    return {
      totalAmount,
      succeededAmount,
      failedAmount,
      pendingAmount,
      totalCount: filteredTransactions.length,
      succeededCount: filteredTransactions.filter(t => t.status === PaymentStatus.SUCCEEDED).length,
      failedCount: filteredTransactions.filter(t => t.status === PaymentStatus.FAILED).length,
      pendingCount: filteredTransactions.filter(t => t.status === PaymentStatus.PENDING).length
    }
  }

  const stats = calculateStats()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total transactions</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalCount}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Montant total</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {stats.totalAmount.toLocaleString()} XOF
              </p>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+8.3% vs hier</span>
              </div>
            </div>
            <div className="bg-emerald-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Réussis</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.succeededCount}</p>
              <div className="text-sm text-gray-600 mt-1">
                {stats.succeededAmount.toLocaleString()} XOF
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Échoués</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.failedCount}</p>
              <div className="text-sm text-gray-600 mt-1">
                {stats.failedAmount.toLocaleString()} XOF
              </div>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher par ID transaction..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              />
              <span className="text-gray-500">à</span>
              <input
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as PaymentStatus | 'ALL')}
              >
                <option value="ALL">Tous les statuts</option>
                <option value={PaymentStatus.SUCCEEDED}>Réussis</option>
                <option value={PaymentStatus.PENDING}>En attente</option>
                <option value={PaymentStatus.FAILED}>Échoués</option>
                <option value={PaymentStatus.REFUNDED}>Remboursés</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value as PaymentMethod | 'ALL')}
              >
                <option value="ALL">Toutes méthodes</option>
                <option value={PaymentMethod.CREDIT_CARD}>Carte bancaire</option>
                <option value={PaymentMethod.MOBILE_MONEY}>Mobile Money</option>
                <option value={PaymentMethod.CASH}>Espèces</option>
                <option value={PaymentMethod.WALLET}>Portefeuille</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </button>
          </div>
        </div>

        {/* Table des transactions */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Méthode
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Frais
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedTransactions.map((transaction) => {
                const statusConfig = getStatusConfig(transaction.status)
                const methodConfig = getMethodConfig(transaction.method)
                
                return (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-mono text-sm text-gray-500 mb-1">
                        {transaction.transactionId?.substring(0, 16)}...
                      </div>
                      <div className="text-xs text-gray-600">
                        ID: {transaction.id.substring(0, 8)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${methodConfig.color}`}>
                          {methodConfig.icon}
                          <span className="ml-1.5">{methodConfig.label}</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">
                          {transaction.amount.toLocaleString()} XOF
                        </div>
                        {transaction.netAmount && (
                          <div className="text-sm text-gray-600">
                            Net: {transaction.netAmount.toLocaleString()} XOF
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-700">
                        {transaction.processorFee ? (
                          <>
                            <div className="font-medium">{transaction.processorFee.toLocaleString()} XOF</div>
                            <div className="text-xs text-gray-500">
                              ({(transaction.processorFee / transaction.amount * 100).toFixed(1)}%)
                            </div>
                          </>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                          {statusConfig.icon}
                          <span className="ml-1.5">{statusConfig.label}</span>
                        </span>
                      </div>
                      {transaction.failureReason && (
                        <div className="text-xs text-red-600 mt-1 truncate max-w-[150px]">
                          {transaction.failureReason}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900">
                          {transaction.processedAt 
                            ? new Date(transaction.processedAt).toLocaleDateString()
                            : new Date(transaction.createdAt).toLocaleDateString()
                          }
                        </div>
                        <div className="text-xs text-gray-500">
                          {transaction.processedAt 
                            ? new Date(transaction.processedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : new Date(transaction.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          }
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Eye className="h-4 w-4 text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <ExternalLink className="h-4 w-4 text-green-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="h-5 w-5 text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune transaction trouvée</h3>
            <p className="text-gray-600">Aucune transaction ne correspond à vos critères de recherche.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Affichage de {(currentPage - 1) * transactionsPerPage + 1} à {Math.min(currentPage * transactionsPerPage, filteredTransactions.length)} sur {filteredTransactions.length} transactions
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Précédent
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg ${currentPage === page ? 'bg-blue-600 text-white' : 'border hover:bg-gray-50'}`}
                  >
                    {page}
                </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Graphiques */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Transactions par statut</h3>
            <div className="h-48 flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-green-500" />
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-yellow-500" style={{ transform: 'rotate(180deg)' }} />
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-red-500" style={{ transform: 'rotate(270deg)' }} />
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{stats.totalCount}</div>
                    <div className="text-sm text-gray-600">transactions</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{stats.succeededCount}</div>
                <div className="text-sm text-gray-600">Réussis</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">{stats.pendingCount}</div>
                <div className="text-sm text-gray-600">En attente</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">{stats.failedCount}</div>
                <div className="text-sm text-gray-600">Échoués</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Transactions par méthode</h3>
            <div className="space-y-3">
              {[PaymentMethod.MOBILE_MONEY, PaymentMethod.CREDIT_CARD, PaymentMethod.CASH, PaymentMethod.WALLET].map((method) => {
                const methodConfig = getMethodConfig(method)
                const count = filteredTransactions.filter(t => t.method === method).length
                const percentage = filteredTransactions.length > 0 ? (count / filteredTransactions.length) * 100 : 0
                
                return (
                  <div key={method} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${methodConfig.color.split(' ')[0]} mr-3`} />
                      <span className="text-sm text-gray-700">{methodConfig.label}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: methodConfig.color.split(' ')[0].replace('bg-', '').split('-')[1]
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transactions