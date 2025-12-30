"use client";
import { Wallet, Clock, CheckCircle, XCircle, Download, Filter, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useState } from 'react';

interface Withdrawal {
  id: string;
  user: {
    name: string;
    account: string;
  };
  amount: number;
  method: 'bank' | 'paypal' | 'stripe';
  status: 'pending' | 'completed' | 'rejected' | 'processing';
  requestedDate: string;
  processedDate?: string;
  fees: number;
}

const Withdrawals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');

  const withdrawals: Withdrawal[] = [
    {
      id: 'WD-001',
      user: { name: 'Jean Dupont', account: 'FR76 3000 4000 0100 1234' },
      amount: 1250.00,
      method: 'bank',
      status: 'completed',
      requestedDate: '2024-01-10',
      processedDate: '2024-01-12',
      fees: 2.50,
    },
    {
      id: 'WD-002',
      user: { name: 'Marie Martin', account: 'marie@paypal.com' },
      amount: 850.75,
      method: 'paypal',
      status: 'pending',
      requestedDate: '2024-01-15',
      fees: 1.75,
    },
    {
      id: 'WD-003',
      user: { name: 'Pierre Bernard', account: 'acct_1P1e4hQeZvKYlo2C' },
      amount: 2100.00,
      method: 'stripe',
      status: 'processing',
      requestedDate: '2024-01-14',
      fees: 3.00,
    },
    {
      id: 'WD-004',
      user: { name: 'Sophie Leroy', account: 'FR76 3000 4000 0100 5678' },
      amount: 450.50,
      method: 'bank',
      status: 'rejected',
      requestedDate: '2024-01-13',
      processedDate: '2024-01-14',
      fees: 1.50,
    },
    {
      id: 'WD-005',
      user: { name: 'Luc Dubois', account: 'luc@paypal.com' },
      amount: 920.00,
      method: 'paypal',
      status: 'completed',
      requestedDate: '2024-01-12',
      processedDate: '2024-01-13',
      fees: 2.00,
    },
  ];

  const stats = {
    totalWithdrawals: withdrawals.reduce((sum, w) => sum + w.amount, 0),
    pendingAmount: withdrawals.filter(w => w.status === 'pending').reduce((sum, w) => sum + w.amount, 0),
    averageWithdrawal: withdrawals.reduce((sum, w) => sum + w.amount, 0) / withdrawals.length,
    completedCount: withdrawals.filter(w => w.status === 'completed').length,
  };

  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    const matchesSearch = 
      withdrawal.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || withdrawal.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || withdrawal.method === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusConfig = (status: Withdrawal['status']) => {
    switch (status) {
      case 'completed':
        return { color: 'bg-green-100 text-green-800', icon: <CheckCircle size={16} />, text: 'Complété' };
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-800', icon: <Clock size={16} />, text: 'En attente' };
      case 'processing':
        return { color: 'bg-blue-100 text-blue-800', icon: <Clock size={16} />, text: 'En traitement' };
      case 'rejected':
        return { color: 'bg-red-100 text-red-800', icon: <XCircle size={16} />, text: 'Rejeté' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: null, text: status };
    }
  };

  const getMethodConfig = (method: Withdrawal['method']) => {
    switch (method) {
      case 'bank':
        return { color: 'bg-purple-100 text-purple-800', text: 'Virement bancaire' };
      case 'paypal':
        return { color: 'bg-blue-100 text-blue-800', text: 'PayPal' };
      case 'stripe':
        return { color: 'bg-indigo-100 text-indigo-800', text: 'Stripe' };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: method };
    }
  };

  const processWithdrawal = (id: string, action: 'approve' | 'reject') => {
    console.log(`${action} withdrawal ${id}`);
    // Logique de traitement
  };

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total retiré</p>
              <p className="text-2xl font-bold mt-1">€{stats.totalWithdrawals.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Wallet className="text-green-600" size={24} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <ArrowUpRight size={16} className="text-green-500" />
            <span className="text-green-600">+8.2%</span>
            <span className="text-gray-500">vs mois dernier</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">En attente</p>
              <p className="text-2xl font-bold mt-1">€{stats.pendingAmount.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="text-yellow-600" size={24} />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {withdrawals.filter(w => w.status === 'pending').length} demandes
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Moyenne par retrait</p>
              <p className="text-2xl font-bold mt-1">€{stats.averageWithdrawal.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ArrowDownRight className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">Moyenne sur 30 jours</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Retraits complétés</p>
              <p className="text-2xl font-bold mt-1">{stats.completedCount}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <CheckCircle className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <span className="text-green-600">+5</span>
            <span className="text-gray-500">cette semaine</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher par nom ou ID retrait..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="processing">En traitement</option>
              <option value="completed">Complété</option>
              <option value="rejected">Rejeté</option>
            </select>

            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
            >
              <option value="all">Toutes les méthodes</option>
              <option value="bank">Virement bancaire</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={18} />
              Période
            </button>
          </div>
        </div>
      </div>

      {/* Withdrawals Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ID Retrait</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Vendeur</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Montant</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Méthode</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Frais</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date demande</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredWithdrawals.map((withdrawal) => {
                const statusConfig = getStatusConfig(withdrawal.status);
                const methodConfig = getMethodConfig(withdrawal.method);
                
                return (
                  <tr key={withdrawal.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-mono font-semibold">{withdrawal.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{withdrawal.user.name}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[200px]">{withdrawal.user.account}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-lg">€{withdrawal.amount.toFixed(2)}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${methodConfig.color}`}>
                        {methodConfig.text}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-600">€{withdrawal.fees.toFixed(2)}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusConfig.color}`}>
                          {statusConfig.icon}
                          {statusConfig.text}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-600">
                        <p>{new Date(withdrawal.requestedDate).toLocaleDateString('fr-FR')}</p>
                        {withdrawal.processedDate && (
                          <p className="text-sm text-gray-400">
                            Traité le {new Date(withdrawal.processedDate).toLocaleDateString('fr-FR')}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        {withdrawal.status === 'pending' && (
                          <>
                            <button
                              onClick={() => processWithdrawal(withdrawal.id, 'approve')}
                              className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              Approuver
                            </button>
                            <button
                              onClick={() => processWithdrawal(withdrawal.id, 'reject')}
                              className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                            >
                              Rejeter
                            </button>
                          </>
                        )}
                        {(withdrawal.status === 'completed' || withdrawal.status === 'rejected') && (
                          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            Voir détails
                          </button>
                        )}
                        {withdrawal.status === 'processing' && (
                          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Suivre
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredWithdrawals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun retrait trouvé</p>
            <p className="text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t">
          <div className="text-gray-600 text-sm mb-4 sm:mb-0">
            Affichage de 1 à {filteredWithdrawals.length} sur {withdrawals.length} résultats
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Précédent
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-50 transition-colors">
              Suivant
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-3">Informations importantes</h3>
        <ul className="text-blue-800 space-y-2">
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <span>Les retraits sont traités sous 2-3 jours ouvrables</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <span>Les frais de transaction sont déduits du montant total</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <span>Un minimum de €50 est requis pour effectuer un retrait</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Withdrawals;