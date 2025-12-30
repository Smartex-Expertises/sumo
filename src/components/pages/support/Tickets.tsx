'use client';

import { MessageSquare, User, Clock, CheckCircle, XCircle, AlertTriangle, Filter, Search, Plus, Mail, MoreVertical } from 'lucide-react';
import { useState } from 'react';

interface Ticket {
  id: string;
  subject: string;
  user: {
    name: string;
    email: string;
    type: 'client' | 'driver' | 'other';
  };
  category: 'technical' | 'billing' | 'account' | 'general' | 'safety';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_reply' | 'resolved' | 'closed';
  assignedTo?: string;
  lastUpdated: string;
  messagesCount: number;
  firstResponseTime?: string;
}

export default function Tickets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const tickets: Ticket[] = [
    {
      id: 'TKT-001',
      subject: 'Problème de paiement - Carte rejetée',
      user: {
        name: 'Jean Dupont',
        email: 'jean@example.com',
        type: 'client',
      },
      category: 'billing',
      priority: 'high',
      status: 'in_progress',
      assignedTo: 'Support Agent 1',
      lastUpdated: '2024-01-15T14:30:00',
      messagesCount: 5,
      firstResponseTime: '2h',
    },
    {
      id: 'TKT-002',
      subject: 'Application ne se lance pas',
      user: {
        name: 'Marie Martin',
        email: 'marie@example.com',
        type: 'client',
      },
      category: 'technical',
      priority: 'medium',
      status: 'open',
      lastUpdated: '2024-01-15T11:15:00',
      messagesCount: 2,
    },
    {
      id: 'TKT-003',
      subject: 'Réinitialisation mot de passe compte chauffeur',
      user: {
        name: 'Ibrahima Sow',
        email: 'ibrahima@example.com',
        type: 'driver',
      },
      category: 'account',
      priority: 'high',
      status: 'resolved',
      assignedTo: 'Support Agent 2',
      lastUpdated: '2024-01-14T16:45:00',
      messagesCount: 8,
      firstResponseTime: '1h',
    },
    {
      id: 'TKT-004',
      subject: 'Question sur les tarifs',
      user: {
        name: 'Sophie Leroy',
        email: 'sophie@example.com',
        type: 'client',
      },
      category: 'general',
      priority: 'low',
      status: 'waiting_reply',
      assignedTo: 'Support Agent 1',
      lastUpdated: '2024-01-14T09:20:00',
      messagesCount: 3,
      firstResponseTime: '30m',
    },
    {
      id: 'TKT-005',
      subject: 'Incident de sécurité - Comportement suspect',
      user: {
        name: 'Anonymous',
        email: 'anonymous@example.com',
        type: 'other',
      },
      category: 'safety',
      priority: 'urgent',
      status: 'open',
      lastUpdated: '2024-01-13T20:10:00',
      messagesCount: 1,
    },
    {
      id: 'TKT-006',
      subject: 'Erreur dans les revenus affichés',
      user: {
        name: 'Fatou Diallo',
        email: 'fatou@example.com',
        type: 'driver',
      },
      category: 'technical',
      priority: 'medium',
      status: 'in_progress',
      assignedTo: 'Support Agent 3',
      lastUpdated: '2024-01-13T15:30:00',
      messagesCount: 4,
      firstResponseTime: '45m',
    },
  ];

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    urgent: tickets.filter(t => t.priority === 'urgent').length,
    resolvedToday: tickets.filter(t => 
      t.status === 'resolved' && 
      new Date(t.lastUpdated).toDateString() === new Date().toDateString()
    ).length,
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusConfig = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return { color: 'bg-red-100 text-red-800', icon: <AlertTriangle size={14} />, text: 'Ouvert' };
      case 'in_progress':
        return { color: 'bg-blue-100 text-blue-800', icon: <Clock size={14} />, text: 'En cours' };
      case 'waiting_reply':
        return { color: 'bg-yellow-100 text-yellow-800', icon: <Clock size={14} />, text: 'En attente' };
      case 'resolved':
        return { color: 'bg-green-100 text-green-800', icon: <CheckCircle size={14} />, text: 'Résolu' };
      case 'closed':
        return { color: 'bg-gray-100 text-gray-800', icon: <XCircle size={14} />, text: 'Fermé' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: null, text: status };
    }
  };

  const getPriorityConfig = (priority: Ticket['priority']) => {
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

  const getCategoryConfig = (category: Ticket['category']) => {
    switch (category) {
      case 'technical':
        return { label: 'Technique', color: 'text-blue-600' };
      case 'billing':
        return { label: 'Facturation', color: 'text-green-600' };
      case 'account':
        return { label: 'Compte', color: 'text-purple-600' };
      case 'general':
        return { label: 'Général', color: 'text-gray-600' };
      case 'safety':
        return { label: 'Sécurité', color: 'text-red-600' };
      default:
        return { label: category, color: 'text-gray-600' };
    }
  };

  const getUserTypeConfig = (type: Ticket['user']['type']) => {
    switch (type) {
      case 'client':
        return { color: 'bg-blue-100 text-blue-800', label: 'Client' };
      case 'driver':
        return { color: 'bg-green-100 text-green-800', label: 'Chauffeur' };
      case 'other':
        return { color: 'bg-gray-100 text-gray-800', label: 'Autre' };
      default:
        return { color: 'bg-gray-100 text-gray-800', label: type };
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
              <p className="text-gray-600 text-sm">Total tickets</p>
              <p className="text-2xl font-bold mt-1">{stats.total}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tickets ouverts</p>
              <p className="text-2xl font-bold mt-1">{stats.open}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Urgents</p>
              <p className="text-2xl font-bold mt-1">{stats.urgent}</p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="text-orange-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Résolus aujourd'hui</p>
              <p className="text-2xl font-bold mt-1">{stats.resolvedToday}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Create Ticket */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher par sujet, utilisateur ou ID ticket..."
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
              <option value="open">Ouvert</option>
              <option value="in_progress">En cours</option>
              <option value="waiting_reply">En attente</option>
              <option value="resolved">Résolu</option>
              <option value="closed">Fermé</option>
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

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={18} />
              Nouveau ticket
            </button>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Tickets de Support</h2>
          <p className="text-gray-600 mt-1">Gérez les demandes d'assistance des utilisateurs</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">ID / Sujet</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Utilisateur</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Catégorie</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Priorité</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Dernière mise à jour</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredTickets.map((ticket) => {
                const statusConfig = getStatusConfig(ticket.status);
                const priorityConfig = getPriorityConfig(ticket.priority);
                const categoryConfig = getCategoryConfig(ticket.category);
                const userTypeConfig = getUserTypeConfig(ticket.user.type);
                
                return (
                  <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-mono font-semibold">{ticket.id}</p>
                        <p className="font-medium text-sm mt-1">{ticket.subject}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {ticket.messagesCount} message{ticket.messagesCount > 1 ? 's' : ''}
                          {ticket.assignedTo && (
                            <span className="ml-2">• Assigné à: {ticket.assignedTo}</span>
                          )}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <User size={16} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{ticket.user.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 rounded text-xs ${userTypeConfig.color}`}>
                              {userTypeConfig.label}
                            </span>
                            <span className="text-xs text-gray-500">{ticket.user.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-sm font-medium ${categoryConfig.color}`}>
                        {categoryConfig.label}
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
                      {ticket.firstResponseTime && (
                        <p className="text-xs text-gray-500 mt-1">
                          Réponse: {ticket.firstResponseTime}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <p>{formatDate(ticket.lastUpdated)}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                          <Mail size={16} className="text-blue-600" />
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

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto text-gray-400" size={48} />
            <p className="text-gray-500 text-lg mt-4">Aucun ticket trouvé</p>
            <p className="text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
}