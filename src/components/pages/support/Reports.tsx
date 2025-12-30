'use client';

import { Flag, User, Car, MapPin, Clock, CheckCircle, Filter, Search, Eye, MoreVertical } from 'lucide-react';
import { useState } from 'react';

interface Report {
  id: string;
  reporter: {
    name: string;
    type: 'client' | 'driver' | 'anonymous';
  };
  reported: {
    name: string;
    type: 'client' | 'driver';
  };
  type: 'inappropriate_behavior' | 'fraud' | 'safety_concern' | 'spam' | 'other';
  description: string;
  status: 'pending' | 'investigating' | 'action_taken' | 'dismissed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location?: string;
  createdAt: string;
  evidence?: string[];
}

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const reports: Report[] = [
    {
      id: 'REP-001',
      reporter: {
        name: 'Marie Martin',
        type: 'client',
      },
      reported: {
        name: 'Moussa Diop',
        type: 'driver',
      },
      type: 'inappropriate_behavior',
      description: 'Le chauffeur a fait des commentaires déplacés',
      status: 'investigating',
      severity: 'high',
      location: 'Dakar, Plateau',
      createdAt: '2024-01-15T14:30:00',
      evidence: ['audio_recording.mp3'],
    },
    {
      id: 'REP-002',
      reporter: {
        name: 'Ibrahima Sow',
        type: 'driver',
      },
      reported: {
        name: 'Jean Dupont',
        type: 'client',
      },
      type: 'fraud',
      description: 'Le client a utilisé une carte de crédit frauduleuse',
      status: 'pending',
      severity: 'critical',
      createdAt: '2024-01-14T11:15:00',
    },
    {
      id: 'REP-003',
      reporter: {
        name: 'Anonymous',
        type: 'anonymous',
      },
      reported: {
        name: 'Aïcha Ndiaye',
        type: 'driver',
      },
      type: 'safety_concern',
      description: 'Le chauffeur conduit en état d\'ébriété',
      status: 'investigating',
      severity: 'critical',
      location: 'Pikine, Marché Tilène',
      createdAt: '2024-01-13T20:45:00',
      evidence: ['photo1.jpg', 'photo2.jpg'],
    },
    {
      id: 'REP-004',
      reporter: {
        name: 'Fatou Diallo',
        type: 'driver',
      },
      reported: {
        name: 'Pierre Bernard',
        type: 'client',
      },
      type: 'inappropriate_behavior',
      description: 'Le client a tenté de toucher le conducteur',
      status: 'action_taken',
      severity: 'high',
      createdAt: '2024-01-12T09:20:00',
    },
    {
      id: 'REP-005',
      reporter: {
        name: 'Sophie Leroy',
        type: 'client',
      },
      reported: {
        name: 'Amadou Kane',
        type: 'driver',
      },
      type: 'spam',
      description: 'Messages non sollicités après la course',
      status: 'dismissed',
      severity: 'low',
      createdAt: '2024-01-11T16:10:00',
    },
  ];

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    critical: reports.filter(r => r.severity === 'critical').length,
    actionTaken: reports.filter(r => r.status === 'action_taken').length,
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.reporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reported.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || report.severity === severityFilter;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const getStatusConfig = (status: Report['status']) => {
    switch (status) {
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-800', icon: <Clock size={14} />, text: 'En attente' };
      case 'investigating':
        return { color: 'bg-blue-100 text-blue-800', icon: <Eye size={14} />, text: 'Enquête' };
      case 'action_taken':
        return { color: 'bg-green-100 text-green-800', icon: <CheckCircle size={14} />, text: 'Action prise' };
      case 'dismissed':
        return { color: 'bg-gray-100 text-gray-800', icon: <Flag size={14} />, text: 'Rejeté' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: null, text: status };
    }
  };

  const getSeverityConfig = (severity: Report['severity']) => {
    switch (severity) {
      case 'critical':
        return { color: 'bg-red-500', label: 'Critique', textColor: 'text-red-800' };
      case 'high':
        return { color: 'bg-orange-500', label: 'Élevée', textColor: 'text-orange-800' };
      case 'medium':
        return { color: 'bg-yellow-500', label: 'Moyenne', textColor: 'text-yellow-800' };
      case 'low':
        return { color: 'bg-green-500', label: 'Basse', textColor: 'text-green-800' };
      default:
        return { color: 'bg-gray-500', label: severity, textColor: 'text-gray-800' };
    }
  };

  const getTypeConfig = (type: Report['type']) => {
    switch (type) {
      case 'inappropriate_behavior':
        return { label: 'Comportement inapproprié', color: 'text-red-600' };
      case 'fraud':
        return { label: 'Fraude', color: 'text-orange-600' };
      case 'safety_concern':
        return { label: 'Problème de sécurité', color: 'text-purple-600' };
      case 'spam':
        return { label: 'Spam', color: 'text-blue-600' };
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
              <p className="text-gray-600 text-sm">Total signalements</p>
              <p className="text-2xl font-bold mt-1">{stats.total}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <Flag className="text-red-600" size={20} />
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
              <p className="text-gray-600 text-sm">Critiques</p>
              <p className="text-2xl font-bold mt-1">{stats.critical}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Actions prises</p>
              <p className="text-2xl font-bold mt-1">{stats.actionTaken}</p>
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
              placeholder="Rechercher par nom ou ID signalement..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="investigating">Enquête</option>
              <option value="action_taken">Action prise</option>
              <option value="dismissed">Rejeté</option>
            </select>

            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="all">Toutes les sévérités</option>
              <option value="critical">Critique</option>
              <option value="high">Élevée</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={18} />
              Type
            </button>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Signalements</h2>
            <p className="text-gray-600 mt-1">Gérez les signalements d'utilisateurs</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Signalant / Signalé</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Sévérité</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredReports.map((report) => {
                const statusConfig = getStatusConfig(report.status);
                const severityConfig = getSeverityConfig(report.severity);
                const typeConfig = getTypeConfig(report.type);
                
                return (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-mono font-semibold">{report.id}</p>
                        {report.location && (
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin size={12} />
                            {report.location}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            report.reporter.type === 'anonymous' ? 'bg-gray-100' : 'bg-blue-100'
                          }`}>
                            <User size={12} className={
                              report.reporter.type === 'anonymous' ? 'text-gray-600' : 'text-blue-600'
                            } />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{report.reporter.name}</p>
                            <p className="text-xs text-gray-500">Signale</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                            <User size={12} className="text-red-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{report.reported.name}</p>
                            <p className="text-xs text-gray-500">{report.reported.type === 'client' ? 'Client' : 'Chauffeur'}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-sm font-medium ${typeConfig.color}`}>
                        {typeConfig.label}
                      </span>
                      {report.evidence && report.evidence.length > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          {report.evidence.length} preuve{report.evidence.length > 1 ? 's' : ''}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${severityConfig.color}`}></div>
                        <span className={`text-sm font-medium ${severityConfig.textColor}`}>
                          {severityConfig.label}
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
                        <p>{formatDate(report.createdAt)}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} className="text-blue-600" />
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

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <Flag className="mx-auto text-gray-400" size={48} />
            <p className="text-gray-500 text-lg mt-4">Aucun signalement trouvé</p>
            <p className="text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Import manquant pour AlertTriangle
import { AlertTriangle } from 'lucide-react';