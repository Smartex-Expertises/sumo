'use client';

import { AlertTriangle, User, Car, Clock, CheckCircle, XCircle, MessageSquare, Filter, Search, MoreVertical } from 'lucide-react';
import { useState } from 'react';

interface Complaint {
  id: string;
  user: {
    name: string;
    type: 'client' | 'driver';
    avatar?: string;
  };
  driver?: {
    name: string;
    id: string;
  };
  rideId?: string;
  type: 'cancellation' | 'behavior' | 'payment' | 'service_quality' | 'safety' | 'other';
  description: string;
  status: 'pending' | 'under_review' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  messagesCount: number;
}

export default function Complaints() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const complaints: Complaint[] = [
    {
      id: 'COMP-001',
      user: {
        name: 'Jean Dupont',
        type: 'client',
      },
      driver: {
        name: 'Moussa Diop',
        id: 'DRV-001'
      },
      rideId: 'RIDE-789012',
      type: 'cancellation',
      description: 'Le chauffeur a annulé le trajet sans raison valable après 15 minutes d\'attente',
      status: 'pending',
      priority: 'high',
      createdAt: '2024-01-15T10:30:00',
      updatedAt: '2024-01-15T10:30:00',
      messagesCount: 2,
    },
    {
      id: 'COMP-002',
      user: {
        name: 'Marie Martin',
        type: 'client',
      },
      driver: {
        name: 'Aïcha Ndiaye',
        id: 'DRV-002'
      },
      rideId: 'RIDE-789013',
      type: 'service_quality',
      description: 'Le véhicule était sale et le chauffeur impoli',
      status: 'under_review',
      priority: 'medium',
      createdAt: '2024-01-14T09:15:00',
      updatedAt: '2024-01-15T16:45:00',
      messagesCount: 5,
    },
    {
      id: 'COMP-003',
      user: {
        name: 'Ibrahima Sow',
        type: 'driver',
      },
      type: 'behavior',
      description: 'Le client a été agressif et a refusé de payer',
      status: 'resolved',
      priority: 'high',
      createdAt: '2024-01-10T08:00:00',
      updatedAt: '2024-01-14T11:30:00',
      messagesCount: 8,
    },
    {
      id: 'COMP-004',
      user: {
        name: 'Fatou Diallo',
        type: 'driver',
      },
      type: 'payment',
      description: 'Paiement non reçu pour la course du 13 janvier',
      status: 'pending',
      priority: 'urgent',
      createdAt: '2024-01-13T19:45:00',
      updatedAt: '2024-01-16T09:15:00',
      messagesCount: 3,
    },
    {
      id: 'COMP-005',
      user: {
        name: 'Pierre Bernard',
        type: 'client',
      },
      driver: {
        name: 'Amadou Kane',
        id: 'DRV-005'
      },
      rideId: 'RIDE-789016',
      type: 'safety',
      description: 'Conduite dangereuse, excès de vitesse constaté',
      status: 'under_review',
      priority: 'urgent',
      createdAt: '2024-01-12T14:20:00',
      updatedAt: '2024-01-13T10:10:00',
      messagesCount: 4,
    },
  ];

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    urgent: complaints.filter(c => c.priority === 'urgent').length,
    resolvedToday: complaints.filter(c => 
      c.status === 'resolved' && 
      new Date(c.updatedAt).toDateString() === new Date().toDateString()
    ).length,
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = 
      complaint.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (complaint.driver?.name.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (complaint.rideId?.toLowerCase().includes(searchTerm.toLowerCase()) || '');
    
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || complaint.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusConfig = (status: Complaint['status']) => {
    switch (status) {
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-800', icon: <Clock size={14} />, text: 'En attente' };
      case 'under_review':
        return { color: 'bg-blue-100 text-blue-800', icon: <AlertTriangle size={14} />, text: 'En examen' };
      case 'resolved':
        return { color: 'bg-green-100 text-green-800', icon: <CheckCircle size={14} />, text: 'Résolu' };
      case 'rejected':
        return { color: 'bg-red-100 text-red-800', icon: <XCircle size={14} />, text: 'Rejeté' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: null, text: status };
    }
  };

  const getPriorityConfig = (priority: Complaint['priority']) => {
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

  const getTypeConfig = (type: Complaint['type']) => {
    switch (type) {
      case 'cancellation':
        return { label: 'Annulation', color: 'text-red-600' };
      case 'behavior':
        return { label: 'Comportement', color: 'text-orange-600' };
      case 'payment':
        return { label: 'Paiement', color: 'text-blue-600' };
      case 'service_quality':
        return { label: 'Qualité de service', color: 'text-yellow-600' };
      case 'safety':
        return { label: 'Sécurité', color: 'text-purple-600' };
      case 'other':
        return { label: 'Autre', color: 'text-gray-600' };
      default:
        return { label: type, color: 'text-gray-600' };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total réclamations</p>
              <p className="text-2xl font-bold mt-1">{stats.total}</p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="text-orange-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">En attente</p>
              <p className="text-2xl font-bold mt-1">{stats.pending}</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="text-yellow-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Urgentes</p>
              <p className="text-2xl font-bold mt-1">{stats.urgent}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Résolues aujourd'hui</p>
              <p className="text-2xl font-bold mt-1">{stats.resolvedToday}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
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
              placeholder="Rechercher par nom, ID réclamation ou ID trajet..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="under_review">En examen</option>
              <option value="resolved">Résolu</option>
              <option value="rejected">Rejeté</option>
            </select>

            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
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
              Plus de filtres
            </button>
          </div>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Réclamations</h2>
            <p className="text-gray-600 mt-1">Gérez les réclamations des clients et chauffeurs</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">ID / Trajet</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Utilisateur</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Priorité</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredComplaints.map((complaint) => {
                const statusConfig = getStatusConfig(complaint.status);
                const priorityConfig = getPriorityConfig(complaint.priority);
                const typeConfig = getTypeConfig(complaint.type);
                
                return (
                  <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-mono font-semibold">{complaint.id}</p>
                        {complaint.rideId && (
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Car size={12} />
                            {complaint.rideId}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          complaint.user.type === 'client' ? 'bg-blue-100' : 'bg-green-100'
                        }`}>
                          <User size={16} className={
                            complaint.user.type === 'client' ? 'text-blue-600' : 'text-green-600'
                          } />
                        </div>
                        <div>
                          <p className="font-medium">{complaint.user.name}</p>
                          <p className="text-xs text-gray-500">
                            {complaint.user.type === 'client' ? 'Client' : 'Chauffeur'}
                            {complaint.driver && complaint.user.type === 'client' && (
                              <span className="ml-2">vs {complaint.driver.name}</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-sm font-medium ${typeConfig.color}`}>
                        {typeConfig.label}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${priorityConfig.color}`}></div>
                        <span className={`text-sm font-medium ${priorityConfig.textColor}`}>
                          {priorityConfig.label}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig.color}`}>
                          {statusConfig.icon}
                          {statusConfig.text}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <p>{formatDate(complaint.createdAt)}</p>
                        <p className="text-gray-500 text-xs">
                          {complaint.messagesCount} messages
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors">
                          <MessageSquare size={16} className="text-orange-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredComplaints.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto text-gray-400" size={48} />
            <p className="text-gray-500 text-lg mt-4">Aucune réclamation trouvée</p>
            <p className="text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
}