"use client";
import { AlertTriangle, CheckCircle, XCircle, Clock, Search, Filter, Download, MessageSquare, MoreVertical, ExternalLink, User, Car, MapPin, DollarSign, Calendar } from 'lucide-react';
import { useState } from 'react';
import { RideStatus, PaymentStatus, UserRole } from '../../../../type';

interface Dispute {
  id: string;
  rideId: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  driver?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  reason: 'cancellation' | 'payment' | 'service_quality' | 'route_issue' | 'vehicle_condition' | 'behavior' | 'other';
  amount: number;
  status: 'pending' | 'under_review' | 'resolved' | 'rejected' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  rideStatus: RideStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  lastUpdated: string;
  messagesCount: number;
  description: string;
  evidence?: string[];
}

const Disputes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [expandedDispute, setExpandedDispute] = useState<string | null>(null);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);

  const disputes: Dispute[] = [
    {
      id: 'DIS-001',
      rideId: 'RIDE-789012',
      client: { 
        id: 'CLIENT-001', 
        firstName: 'Jean', 
        lastName: 'Dupont', 
        email: 'jean@example.com', 
        phone: '+221701234567' 
      },
      driver: { 
        id: 'DRIVER-001', 
        firstName: 'Moussa', 
        lastName: 'Diop', 
        email: 'moussa@example.com', 
        phone: '+221761234567' 
      },
      reason: 'cancellation',
      amount: 4500,
      status: 'pending',
      priority: 'high',
      rideStatus: RideStatus.CANCELED,
      paymentStatus: PaymentStatus.PENDING,
      createdAt: '2024-01-15T10:30:00',
      lastUpdated: '2024-01-16T14:20:00',
      messagesCount: 3,
      description: 'Le chauffeur a annulé le trajet après 15 minutes d attente',
      evidence: ['screenshot1.jpg', 'chat_log.txt'],
    },
    {
      id: 'DIS-002',
      rideId: 'RIDE-789013',
      client: { 
        id: 'CLIENT-002', 
        firstName: 'Marie', 
        lastName: 'Martin', 
        email: 'marie@example.com', 
        phone: '+221701234568' 
      },
      driver: { 
        id: 'DRIVER-002', 
        firstName: 'Aïcha', 
        lastName: 'Ndiaye', 
        email: 'aicha@example.com', 
        phone: '+221761234568' 
      },
      reason: 'payment',
      amount: 3250,
      status: 'under_review',
      priority: 'medium',
      rideStatus: RideStatus.COMPLETED,
      paymentStatus: PaymentStatus.FAILED,
      createdAt: '2024-01-14T09:15:00',
      lastUpdated: '2024-01-15T16:45:00',
      messagesCount: 5,
      description: 'Paiement débité mais trajet non effectué',
    },
    {
      id: 'DIS-003',
      rideId: 'RIDE-789014',
      client: { 
        id: 'CLIENT-003', 
        firstName: 'Pierre', 
        lastName: 'Bernard', 
        email: 'pierre@example.com', 
        phone: '+221701234569' 
      },
      driver: { 
        id: 'DRIVER-003', 
        firstName: 'Ibrahima', 
        lastName: 'Sow', 
        email: 'ibrahima@example.com', 
        phone: '+221761234569' 
      },
      reason: 'service_quality',
      amount: 2800,
      status: 'resolved',
      priority: 'low',
      rideStatus: RideStatus.COMPLETED,
      paymentStatus: PaymentStatus.SUCCEEDED,
      createdAt: '2024-01-10T08:00:00',
      lastUpdated: '2024-01-14T11:30:00',
      messagesCount: 8,
      description: 'Le véhicule était sale et le chauffeur impoli',
      evidence: ['photo_interieur.jpg'],
    },
    {
      id: 'DIS-004',
      rideId: 'RIDE-789015',
      client: { 
        id: 'CLIENT-004', 
        firstName: 'Sophie', 
        lastName: 'Leroy', 
        email: 'sophie@example.com', 
        phone: '+221701234570' 
      },
      driver: { 
        id: 'DRIVER-004', 
        firstName: 'Fatou', 
        lastName: 'Diallo', 
        email: 'fatou@example.com', 
        phone: '+221761234570' 
      },
      reason: 'route_issue',
      amount: 5600,
      status: 'escalated',
      priority: 'urgent',
      rideStatus: RideStatus.COMPLETED,
      paymentStatus: PaymentStatus.SUCCEEDED,
      createdAt: '2024-01-13T19:45:00',
      lastUpdated: '2024-01-16T09:15:00',
      messagesCount: 12,
      description: 'Le chauffeur a pris un détour important sans raison valable',
      evidence: ['route_map.png', 'gps_track.gpx'],
    },
    {
      id: 'DIS-005',
      rideId: 'RIDE-789016',
      client: { 
        id: 'CLIENT-005', 
        firstName: 'Luc', 
        lastName: 'Dubois', 
        email: 'luc@example.com', 
        phone: '+221701234571' 
      },
      driver: { 
        id: 'DRIVER-005', 
        firstName: 'Amadou', 
        lastName: 'Kane', 
        email: 'amadou@example.com', 
        phone: '+221761234571' 
      },
      reason: 'vehicle_condition',
      amount: 1800,
      status: 'rejected',
      priority: 'low',
      rideStatus: RideStatus.COMPLETED,
      paymentStatus: PaymentStatus.SUCCEEDED,
      createdAt: '2024-01-12T14:20:00',
      lastUpdated: '2024-01-13T10:10:00',
      messagesCount: 2,
      description: 'Freins défectueux lors du trajet',
    },
  ];

  const stats = {
    totalDisputes: disputes.length,
    pendingDisputes: disputes.filter(d => d.status === 'pending').length,
    urgentDisputes: disputes.filter(d => d.priority === 'urgent').length,
    resolvedThisWeek: disputes.filter(d => d.status === 'resolved' && 
      new Date(d.lastUpdated) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
    totalAmountDisputed: disputes.reduce((sum, d) => sum + d.amount, 0),
  };

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = 
      dispute.client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.rideId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (dispute.driver?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (dispute.driver?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || '');
    
    const matchesStatus = statusFilter === 'all' || dispute.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || dispute.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusConfig = (status: Dispute['status']) => {
    switch (status) {
      case 'pending':
        return { 
          color: 'bg-blue-100 text-blue-800', 
          icon: <AlertTriangle size={16} />, 
          text: 'En attente',
          badge: 'En attente'
        };
      case 'under_review':
        return { 
          color: 'bg-yellow-100 text-yellow-800', 
          icon: <Clock size={16} />, 
          text: 'En examen',
          badge: 'En examen'
        };
      case 'resolved':
        return { 
          color: 'bg-green-100 text-green-800', 
          icon: <CheckCircle size={16} />, 
          text: 'Résolu',
          badge: 'Résolu'
        };
      case 'rejected':
        return { 
          color: 'bg-gray-100 text-gray-800', 
          icon: <XCircle size={16} />, 
          text: 'Rejeté',
          badge: 'Rejeté'
        };
      case 'escalated':
        return { 
          color: 'bg-red-100 text-red-800', 
          icon: <AlertTriangle size={16} />, 
          text: 'Escaladé',
          badge: 'Escaladé'
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800', 
          icon: null, 
          text: status,
          badge: status
        };
    }
  };

  const getPriorityConfig = (priority: Dispute['priority']) => {
    switch (priority) {
      case 'urgent':
        return { color: 'bg-red-500', label: 'Urgent', textColor: 'text-red-800' };
      case 'high':
        return { color: 'bg-orange-500', label: 'Élevée', textColor: 'text-orange-800' };
      case 'medium':
        return { color: 'bg-yellow-500', label: 'Moyenne', textColor: 'text-yellow-800' };
      case 'low':
        return { color: 'bg-green-500', label: 'Basse', textColor: 'text-green-800' };
      default:
        return { color: 'bg-gray-500', label: priority, textColor: 'text-gray-800' };
    }
  };

  const getReasonConfig = (reason: Dispute['reason']) => {
    switch (reason) {
      case 'cancellation':
        return { label: 'Annulation', icon: <XCircle size={16} />, color: 'text-red-600' };
      case 'payment':
        return { label: 'Problème de paiement', icon: <DollarSign size={16} />, color: 'text-orange-600' };
      case 'service_quality':
        return { label: 'Qualité de service', icon: <AlertTriangle size={16} />, color: 'text-yellow-600' };
      case 'route_issue':
        return { label: 'Problème d itinéraire', icon: <MapPin size={16} />, color: 'text-blue-600' };
      case 'vehicle_condition':
        return { label: 'État du véhicule', icon: <Car size={16} />, color: 'text-purple-600' };
      case 'behavior':
        return { label: 'Comportement', icon: <User size={16} />, color: 'text-pink-600' };
      case 'other':
        return { label: 'Autre', icon: <AlertTriangle size={16} />, color: 'text-gray-600' };
      default:
        return { label: reason, icon: null, color: 'text-gray-600' };
    }
  };

  const getRideStatusConfig = (status: RideStatus) => {
    switch (status) {
      case RideStatus.COMPLETED:
        return { color: 'bg-green-100 text-green-800', text: 'Terminé' };
      case RideStatus.CANCELED:
        return { color: 'bg-red-100 text-red-800', text: 'Annulé' };
      case RideStatus.IN_PROGRESS:
        return { color: 'bg-blue-100 text-blue-800', text: 'En cours' };
      case RideStatus.ACCEPTED:
        return { color: 'bg-yellow-100 text-yellow-800', text: 'Accepté' };
      case RideStatus.REQUESTED:
        return { color: 'bg-gray-100 text-gray-800', text: 'Demandé' };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: status };
    }
  };

  const getPaymentStatusConfig = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.SUCCEEDED:
        return { color: 'bg-green-100 text-green-800', text: 'Réussi' };
      case PaymentStatus.PENDING:
        return { color: 'bg-yellow-100 text-yellow-800', text: 'En attente' };
      case PaymentStatus.FAILED:
        return { color: 'bg-red-100 text-red-800', text: 'Échoué' };
      case PaymentStatus.REFUNDED:
        return { color: 'bg-blue-100 text-blue-800', text: 'Remboursé' };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: status };
    }
  };

  const handleOpenDetails = (dispute: Dispute) => {
    setSelectedDispute(dispute);
  };

  const handleResolveDispute = (id: string, resolution: 'approve' | 'reject' | 'escalate') => {
    console.log(`${resolution} dispute ${id}`);
    // Logique de résolution
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('fr-FR')} XOF`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    } else {
      return "Moins d'une heure";
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total des litiges</p>
              <p className="text-2xl font-bold mt-1">{stats.totalDisputes}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {stats.pendingDisputes} en attente
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Montant contesté</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(stats.totalAmountDisputed)}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="text-yellow-600" size={24} />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Montant total en litige
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Urgents</p>
              <p className="text-2xl font-bold mt-1">{stats.urgentDisputes}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="text-orange-600" size={24} />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Requièrent une attention immédiate
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Résolus cette semaine</p>
              <p className="text-2xl font-bold mt-1">{stats.resolvedThisWeek}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <span className="text-green-600">+{Math.floor(stats.resolvedThisWeek * 0.3)}</span>
            <span className="text-gray-500">vs semaine dernière</span>
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
              placeholder="Rechercher par nom, ID trajet ou ID litige..."
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
              <option value="under_review">En examen</option>
              <option value="resolved">Résolu</option>
              <option value="rejected">Rejeté</option>
              <option value="escalated">Escaladé</option>
            </select>

            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">Toutes les priorités</option>
              <option value="urgent">Urgent</option>
              <option value="high">Élevée</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={18} />
              Période
            </button>
          </div>
        </div>
      </div>

      {/* Disputes Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ID Litige</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Chauffeur</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Motif</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Montant</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Priorité</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredDisputes.map((dispute) => {
                const statusConfig = getStatusConfig(dispute.status);
                const priorityConfig = getPriorityConfig(dispute.priority);
                const reasonConfig = getReasonConfig(dispute.reason);
                
                return (
                  <tr key={dispute.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <span className="font-mono font-semibold text-sm">{dispute.id}</span>
                        <p className="text-xs text-gray-500 mt-1">Trajet: {dispute.rideId}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {dispute.client.firstName} {dispute.client.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{dispute.client.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {dispute.driver ? (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <User size={16} className="text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {dispute.driver.firstName} {dispute.driver.lastName}
                            </p>
                            <p className="text-sm text-gray-500">{dispute.driver.phone}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Non assigné</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`${reasonConfig.color}`}>
                          {reasonConfig.icon}
                        </div>
                        <span className="text-sm">{reasonConfig.label}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-lg">{formatCurrency(dispute.amount)}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${priorityConfig.color}`}></div>
                        <span className={`text-sm font-medium ${priorityConfig.textColor}`}>
                          {priorityConfig.label}
                        </span>
                      </div>
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
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenDetails(dispute)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Voir
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={18} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredDisputes.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto text-gray-400" size={48} />
            <p className="text-gray-500 text-lg mt-4">Aucun litige trouvé</p>
            <p className="text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t">
          <div className="text-gray-600 text-sm mb-4 sm:mb-0">
            Affichage de 1 à {filteredDisputes.length} sur {disputes.length} résultats
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

      {/* Summary Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reasons Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-4">Répartition par motif</h3>
          <div className="space-y-3">
            {Array.from(new Set(disputes.map(d => d.reason))).map(reason => {
              const count = disputes.filter(d => d.reason === reason).length;
              const percentage = (count / disputes.length) * 100;
              const config = getReasonConfig(reason);
              return (
                <div key={reason} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={config.color}>
                      {config.icon}
                    </div>
                    <span className="text-sm">{config.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{count}</span>
                    <span className="text-gray-500 text-sm">({percentage.toFixed(0)}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-4">Aperçu des statuts</h3>
          <div className="space-y-3">
            {['pending', 'under_review', 'resolved', 'rejected', 'escalated'].map(status => {
              const config = getStatusConfig(status as any);
              const count = disputes.filter(d => d.status === status).length;
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${config.color}`}>
                      {config.badge}
                    </span>
                  </div>
                  <div className="text-sm font-medium">{count}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-4">Activité récente</h3>
          <div className="space-y-3">
            {disputes
              .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
              .slice(0, 3)
              .map(dispute => (
                <div key={dispute.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{dispute.id}</p>
                    <p className="text-xs text-gray-500">{getTimeSince(dispute.lastUpdated)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusConfig(dispute.status).color}`}>
                    {getStatusConfig(dispute.status).text}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal pour les détails du litige */}
      {selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Détails du litige</h2>
                  <p className="text-gray-600">{selectedDispute.id}</p>
                </div>
                <button
                  onClick={() => setSelectedDispute(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <XCircle size={24} className="text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informations client */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Client</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      <span className="font-medium">
                        {selectedDispute.client.firstName} {selectedDispute.client.lastName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">📧 {selectedDispute.client.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">📱 {selectedDispute.client.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Informations chauffeur */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Chauffeur</h3>
                  {selectedDispute.driver ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-500" />
                        <span className="font-medium">
                          {selectedDispute.driver.firstName} {selectedDispute.driver.lastName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">📧 {selectedDispute.driver.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">📱 {selectedDispute.driver.phone}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">Aucun chauffeur assigné</p>
                  )}
                </div>

                {/* Informations trajet */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3">Informations du trajet</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">ID Trajet:</span>
                      <span className="font-mono">{selectedDispute.rideId}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className={`px-2 py-1 rounded text-xs ${getRideStatusConfig(selectedDispute.rideStatus).color}`}>
                        {getRideStatusConfig(selectedDispute.rideStatus).text}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getPaymentStatusConfig(selectedDispute.paymentStatus).color}`}>
                        {getPaymentStatusConfig(selectedDispute.paymentStatus).text}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Informations litige */}
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-3">Informations du litige</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Montant:</span>
                      <span className="font-bold">{formatCurrency(selectedDispute.amount)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Motif:</span>
                      <span>{getReasonConfig(selectedDispute.reason).label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Priorité:</span>
                      <span className={`px-2 py-1 rounded text-xs ${getPriorityConfig(selectedDispute.priority).textColor} bg-opacity-20`}>
                        {getPriorityConfig(selectedDispute.priority).label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedDispute.description}</p>
                </div>

                {/* Preuves */}
                {selectedDispute.evidence && selectedDispute.evidence.length > 0 && (
                  <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Preuves fournies</h3>
                    <div className="flex gap-2 flex-wrap">
                      {selectedDispute.evidence.map((evidence, index) => (
                        <div key={index} className="px-3 py-2 bg-white border rounded-lg flex items-center gap-2">
                          <span className="text-sm">{evidence}</span>
                          <button className="text-blue-600 hover:text-blue-800">
                            <ExternalLink size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dates */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Créé le</p>
                      <p className="font-medium">{formatDate(selectedDispute.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Dernière mise à jour</p>
                      <p className="font-medium">{formatDate(selectedDispute.lastUpdated)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t">
                {selectedDispute.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleResolveDispute(selectedDispute.id, 'approve')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approuver la réclamation
                    </button>
                    <button
                      onClick={() => handleResolveDispute(selectedDispute.id, 'reject')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Rejeter la réclamation
                    </button>
                    <button
                      onClick={() => handleResolveDispute(selectedDispute.id, 'escalate')}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Escalader
                    </button>
                  </>
                )}
                {selectedDispute.status === 'under_review' && (
                  <>
                    <button
                      onClick={() => handleResolveDispute(selectedDispute.id, 'approve')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Marquer comme résolu
                    </button>
                    <button
                      onClick={() => handleResolveDispute(selectedDispute.id, 'escalate')}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Escalader au support supérieur
                    </button>
                  </>
                )}
                <button
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => console.log('Ouvrir le chat', selectedDispute.id)}
                >
                  <MessageSquare size={18} className="inline mr-2" />
                  Ouvrir le chat
                </button>
                <button
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => console.log('Voir le trajet', selectedDispute.rideId)}
                >
                  <ExternalLink size={18} className="inline mr-2" />
                  Voir le trajet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Disputes;