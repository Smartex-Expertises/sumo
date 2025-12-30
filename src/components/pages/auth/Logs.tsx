'use client';

import { FileText, User, Monitor, AlertTriangle, Search, Filter, Calendar, Download, Eye } from 'lucide-react';
import { useState } from 'react';

interface AccessLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failure' | 'suspicious';
  location?: string;
}

interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'failed_login' | 'suspicious_activity' | 'permission_denied' | 'password_change';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  user?: string;
  ipAddress: string;
}

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('today');

  const accessLogs: AccessLog[] = [
    {
      id: 'LOG-001',
      timestamp: '2024-01-15 14:30:25',
      userId: 'USR-001',
      userName: 'Jean Dupont',
      action: 'LOGIN',
      resource: '/auth/login',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/120.0.0.0',
      status: 'success',
      location: 'Dakar, SN',
    },
    {
      id: 'LOG-002',
      timestamp: '2024-01-15 14:28:10',
      userId: 'USR-002',
      userName: 'Marie Martin',
      action: 'VIEW',
      resource: '/analytics/overview',
      ipAddress: '41.207.180.120',
      userAgent: 'Firefox/121.0',
      status: 'success',
      location: 'Thiès, SN',
    },
    {
      id: 'LOG-003',
      timestamp: '2024-01-15 14:25:45',
      userId: 'USR-003',
      userName: 'Pierre Bernard',
      action: 'UPDATE',
      resource: '/drivers/DRV-001',
      ipAddress: '105.159.230.75',
      userAgent: 'Safari/17.0',
      status: 'failure',
      location: 'Saint-Louis, SN',
    },
    {
      id: 'LOG-004',
      timestamp: '2024-01-15 14:20:30',
      userId: 'Unknown',
      userName: 'Anonymous',
      action: 'LOGIN',
      resource: '/auth/login',
      ipAddress: '185.220.101.40',
      userAgent: 'Tor Browser/13.0',
      status: 'suspicious',
      location: 'Unknown',
    },
    {
      id: 'LOG-005',
      timestamp: '2024-01-15 14:15:20',
      userId: 'USR-001',
      userName: 'Jean Dupont',
      action: 'DELETE',
      resource: '/users/USR-005',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/120.0.0.0',
      status: 'success',
      location: 'Dakar, SN',
    },
    {
      id: 'LOG-006',
      timestamp: '2024-01-15 14:10:15',
      userId: 'USR-004',
      userName: 'Sophie Leroy',
      action: 'CREATE',
      resource: '/auth/roles',
      ipAddress: '41.207.180.121',
      userAgent: 'Edge/120.0.0.0',
      status: 'success',
      location: 'Dakar, SN',
    },
    {
      id: 'LOG-007',
      timestamp: '2024-01-15 14:05:05',
      userId: 'USR-002',
      userName: 'Marie Martin',
      action: 'EXPORT',
      resource: '/analytics/financial',
      ipAddress: '41.207.180.120',
      userAgent: 'Firefox/121.0',
      status: 'success',
      location: 'Thiès, SN',
    },
  ];

  const securityEvents: SecurityEvent[] = [
    {
      id: 'EVT-001',
      timestamp: '2024-01-15 14:20:30',
      type: 'suspicious_activity',
      severity: 'critical',
      description: 'Tentative de connexion depuis une adresse IP suspecte',
      ipAddress: '185.220.101.40',
    },
    {
      id: 'EVT-002',
      timestamp: '2024-01-15 14:25:45',
      type: 'failed_login',
      severity: 'medium',
      description: 'Échec de connexion - Mot de passe incorrect',
      user: 'Pierre Bernard',
      ipAddress: '105.159.230.75',
    },
    {
      id: 'EVT-003',
      timestamp: '2024-01-15 13:45:20',
      type: 'permission_denied',
      severity: 'low',
      description: 'Tentative d accès non autorisé à /auth/permissions',
      user: 'Luc Dubois',
      ipAddress: '41.207.180.122',
    },
    {
      id: 'EVT-004',
      timestamp: '2024-01-15 12:30:15',
      type: 'password_change',
      severity: 'medium',
      description: 'Changement de mot de passe utilisateur',
      user: 'Jean Dupont',
      ipAddress: '192.168.1.100',
    },
  ];

  const stats = {
    totalLogs: accessLogs.length,
    suspiciousActivities: accessLogs.filter(log => log.status === 'suspicious').length,
    failedAttempts: accessLogs.filter(log => log.status === 'failure').length,
    uniqueUsers: new Set(accessLogs.filter(log => log.userId !== 'Unknown').map(log => log.userId)).size,
  };

  const filteredLogs = accessLogs.filter(log => {
    const matchesSearch = 
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: AccessLog['status']) => {
    switch (status) {
      case 'success':
        return { color: 'bg-green-100 text-green-800', icon: <Eye size={14} /> };
      case 'failure':
        return { color: 'bg-red-100 text-red-800', icon: <AlertTriangle size={14} /> };
      case 'suspicious':
        return { color: 'bg-yellow-100 text-yellow-800', icon: <AlertTriangle size={14} /> };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: null };
    }
  };

  const getSeverityConfig = (severity: SecurityEvent['severity']) => {
    switch (severity) {
      case 'critical':
        return { color: 'bg-red-500', text: 'Critique' };
      case 'high':
        return { color: 'bg-orange-500', text: 'Élevée' };
      case 'medium':
        return { color: 'bg-yellow-500', text: 'Moyenne' };
      case 'low':
        return { color: 'bg-green-500', text: 'Basse' };
      default:
        return { color: 'bg-gray-500', text: severity };
    }
  };

  const getEventTypeConfig = (type: SecurityEvent['type']) => {
    switch (type) {
      case 'failed_login':
        return { label: 'Échec de connexion', color: 'text-red-600' };
      case 'suspicious_activity':
        return { label: 'Activité suspecte', color: 'text-yellow-600' };
      case 'permission_denied':
        return { label: 'Permission refusée', color: 'text-blue-600' };
      case 'password_change':
        return { label: 'Changement mot de passe', color: 'text-green-600' };
      default:
        return { label: type, color: 'text-gray-600' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Journal des Accès</h2>
          <p className="text-gray-600 mt-1">Surveillance des activités et événements de sécurité</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full md:w-auto justify-center">
          <Download size={18} />
          Exporter les logs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total des logs</p>
              <p className="text-2xl font-bold mt-1">{stats.totalLogs}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <FileText className="text-red-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Activités suspectes</p>
              <p className="text-2xl font-bold mt-1">{stats.suspiciousActivities}</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="text-yellow-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Échecs d authentification</p>
              <p className="text-2xl font-bold mt-1">{stats.failedAttempts}</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg">
              <User className="text-gray-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Utilisateurs uniques</p>
              <p className="text-2xl font-bold mt-1">{stats.uniqueUsers}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Monitor className="text-blue-600" size={20} />
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
              placeholder="Rechercher par utilisateur, action, IP ou ressource..."
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
              <option value="success">Succès</option>
              <option value="failure">Échec</option>
              <option value="suspicious">Suspect</option>
            </select>

            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">Aujourd'hui</option>
              <option value="yesterday">Hier</option>
              <option value="7days">7 derniers jours</option>
              <option value="30days">30 derniers jours</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={18} />
              Plus de filtres
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Access Logs */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Journal d Accès</h3>
              <p className="text-gray-600 text-sm mt-1">Activités récentes des utilisateurs</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Date/Heure</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Utilisateur</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Action</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Ressource</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">IP</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredLogs.map((log) => {
                    const statusConfig = getStatusConfig(log.status);
                    
                    return (
                      <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="text-sm">
                            <p>{log.timestamp.split(' ')[0]}</p>
                            <p className="text-gray-500">{log.timestamp.split(' ')[1]}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <User size={16} className="text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{log.userName}</p>
                              <p className="text-sm text-gray-500">{log.userId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                            {log.action}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm font-mono">{log.resource}</p>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-mono text-sm">{log.ipAddress}</p>
                            {log.location && (
                              <p className="text-xs text-gray-500">{log.location}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusConfig.color}`}>
                            {statusConfig.icon}
                            {log.status === 'success' ? 'Succès' : 
                             log.status === 'failure' ? 'Échec' : 'Suspect'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredLogs.length === 0 && (
              <div className="text-center py-12">
                <FileText className="mx-auto text-gray-400" size={48} />
                <p className="text-gray-500 text-lg mt-4">Aucun log trouvé</p>
                <p className="text-gray-400 mt-1">Essayez de modifier vos filtres de recherche</p>
              </div>
            )}
          </div>
        </div>

        {/* Security Events & Statistics */}
        <div className="space-y-6">
          {/* Security Events */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Événements de Sécurité</h3>
                <p className="text-gray-600 text-sm mt-1">Alertes et incidents</p>
              </div>
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            
            <div className="space-y-4">
              {securityEvents.map((event) => {
                const severityConfig = getSeverityConfig(event.severity);
                const typeConfig = getEventTypeConfig(event.type);
                
                return (
                  <div key={event.id} className="p-3 border rounded-lg hover:border-red-200 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className={`text-sm font-medium ${typeConfig.color}`}>
                          {typeConfig.label}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${severityConfig.color}`}></div>
                        <span className="text-xs font-medium">{severityConfig.text}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{event.timestamp.split(' ')[1]}</span>
                      <span>{event.ipAddress}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Statistics */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Statistiques d Activité</h3>
                <p className="text-gray-600 text-sm mt-1">Aujourd'hui</p>
              </div>
              <Calendar className="text-gray-400" size={20} />
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Connexions réussies</span>
                  <span className="font-medium">142</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '95%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Connexions échouées</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-red-500" style={{ width: '5%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Modifications de données</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: '16%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Consultations de rapports</span>
                  <span className="font-medium">56</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-purple-500" style={{ width: '38%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}