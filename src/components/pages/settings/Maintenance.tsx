'use client';

import { Wrench, AlertTriangle, Clock, Eye, EyeOff, Save, Calendar, Bell } from 'lucide-react';
import { useState } from 'react';

interface MaintenanceSchedule {
  id: string;
  startTime: string;
  endTime: string;
  reason: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  affectedServices: string[];
}

interface ServiceStatus {
  id: string;
  name: string;
  description: string;
  status: 'operational' | 'degraded' | 'maintenance' | 'offline';
  lastUpdated: string;
}

export default function Maintenance() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('La plateforme est actuellement en maintenance. Nous serons de retour bientôt.');
  const [estimatedDuration, setEstimatedDuration] = useState('2');
  const [notifyUsers, setNotifyUsers] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const serviceStatuses: ServiceStatus[] = [
    { id: '1', name: 'API Principale', description: 'API de gestion des courses', status: 'operational', lastUpdated: '2024-01-15 14:30' },
    { id: '2', name: 'Service de Paiement', description: 'Gestion des transactions', status: 'operational', lastUpdated: '2024-01-15 14:25' },
    { id: '3', name: 'Base de Données', description: 'Base de données principale', status: 'operational', lastUpdated: '2024-01-15 14:20' },
    { id: '4', name: 'Service de Notification', description: 'Envoi des notifications', status: 'degraded', lastUpdated: '2024-01-15 13:45' },
    { id: '5', name: 'Service de Géolocalisation', description: 'Tracking en temps réel', status: 'operational', lastUpdated: '2024-01-15 14:15' },
    { id: '6', name: 'Interface Administrateur', description: 'Panel d administration', status: 'operational', lastUpdated: '2024-01-15 14:10' },
  ];

  const maintenanceSchedules: MaintenanceSchedule[] = [
    {
      id: '1',
      startTime: '2024-01-20 02:00',
      endTime: '2024-01-20 04:00',
      reason: 'Mise à jour de sécurité',
      status: 'scheduled',
      affectedServices: ['API Principale', 'Base de Données'],
    },
    {
      id: '2',
      startTime: '2024-01-15 01:00',
      endTime: '2024-01-15 02:30',
      reason: 'Maintenance planifiée',
      status: 'completed',
      affectedServices: ['Service de Paiement'],
    },
    {
      id: '3',
      startTime: '2024-01-10 03:00',
      endTime: '2024-01-10 05:00',
      reason: 'Mise à jour des tarifs',
      status: 'completed',
      affectedServices: ['API Principale', 'Service de Paiement'],
    },
  ];

  const toggleMaintenanceMode = () => {
    if (!isMaintenanceMode) {
      // Confirmation avant activation
      if (window.confirm('Êtes-vous sûr de vouloir activer le mode maintenance ? Cela rendra la plateforme inaccessible aux utilisateurs.')) {
        setIsMaintenanceMode(true);
      }
    } else {
      setIsMaintenanceMode(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulation de sauvegarde
    setTimeout(() => {
      setIsSaving(false);
      console.log('Maintenance settings saved:', {
        isMaintenanceMode,
        maintenanceMessage,
        estimatedDuration,
        notifyUsers
      });
    }, 1000);
  };

  const getStatusConfig = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return { color: 'bg-green-100 text-green-800', icon: <Eye className="text-green-600" size={16} /> };
      case 'degraded':
        return { color: 'bg-yellow-100 text-yellow-800', icon: <AlertTriangle className="text-yellow-600" size={16} /> };
      case 'maintenance':
        return { color: 'bg-blue-100 text-blue-800', icon: <Wrench className="text-blue-600" size={16} /> };
      case 'offline':
        return { color: 'bg-red-100 text-red-800', icon: <EyeOff className="text-red-600" size={16} /> };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: null };
    }
  };

  const getScheduleStatusConfig = (status: MaintenanceSchedule['status']) => {
    switch (status) {
      case 'scheduled':
        return { color: 'bg-blue-100 text-blue-800', label: 'Planifiée' };
      case 'in-progress':
        return { color: 'bg-yellow-100 text-yellow-800', label: 'En cours' };
      case 'completed':
        return { color: 'bg-green-100 text-green-800', label: 'Terminée' };
      case 'cancelled':
        return { color: 'bg-gray-100 text-gray-800', label: 'Annulée' };
      default:
        return { color: 'bg-gray-100 text-gray-800', label: status };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Mode Maintenance</h2>
          <p className="text-gray-600 mt-1">Gérez les maintenances planifiées et le mode maintenance</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            !isSaving
              ? 'bg-gray-900 text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Save size={18} />
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      {/* Maintenance Mode Card */}
      <div className={`p-6 rounded-xl shadow-sm border ${
        isMaintenanceMode ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${
              isMaintenanceMode ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
            }`}>
              <Wrench size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                Mode Maintenance {isMaintenanceMode ? 'Activé' : 'Désactivé'}
              </h3>
              <p className="text-gray-600">
                {isMaintenanceMode 
                  ? 'La plateforme est actuellement en maintenance'
                  : 'La plateforme fonctionne normalement'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleMaintenanceMode}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isMaintenanceMode
                ? 'bg-white text-red-600 border border-red-600 hover:bg-red-50'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {isMaintenanceMode ? 'Désactiver' : 'Activer'} le mode maintenance
          </button>
        </div>

        {isMaintenanceMode && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-900 mb-2">
                Message de maintenance
              </label>
              <textarea
                value={maintenanceMessage}
                onChange={(e) => setMaintenanceMessage(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-900 mb-2">
                  Durée estimée (heures)
                </label>
                <input
                  type="number"
                  value={estimatedDuration}
                  onChange={(e) => setEstimatedDuration(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => setNotifyUsers(!notifyUsers)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifyUsers ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifyUsers ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <div className="ml-3">
                  <span className="font-medium">Notifier les utilisateurs</span>
                  <p className="text-sm text-gray-500">Envoyer une notification à tous les utilisateurs</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center text-sm text-gray-600">
                <AlertTriangle className="mr-2" size={16} />
                <span>Les utilisateurs ne pourront pas accéder à la plateforme pendant la maintenance</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Service Status */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Statut des Services</h3>
              <p className="text-gray-600 text-sm mt-1">État actuel de tous les services</p>
            </div>
            <Clock className="text-gray-400" size={20} />
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceStatuses.map((service) => {
              const statusConfig = getStatusConfig(service.status);
              
              return (
                <div key={service.id} className="p-4 border rounded-lg hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusConfig.icon}
                      <span className={`px-2 py-1 text-xs rounded-full ${statusConfig.color}`}>
                        {service.status === 'operational' ? 'Opérationnel' :
                         service.status === 'degraded' ? 'Dégradé' :
                         service.status === 'maintenance' ? 'Maintenance' : 'Hors ligne'}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Dernière mise à jour: {service.lastUpdated}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Maintenance Schedule */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Maintenances Planifiées</h3>
              <p className="text-gray-600 text-sm mt-1">Historique et planning des maintenances</p>
            </div>
            <Calendar className="text-gray-400" size={20} />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Début - Fin</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Raison</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Services affectés</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {maintenanceSchedules.map((schedule) => {
                const statusConfig = getScheduleStatusConfig(schedule.status);
                
                return (
                  <tr key={schedule.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <p className="font-medium">{schedule.startTime.split(' ')[0]}</p>
                        <p className="text-gray-500">
                          {schedule.startTime.split(' ')[1]} - {schedule.endTime.split(' ')[1]}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p>{schedule.reason}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {schedule.affectedServices.map((service, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {service}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {schedule.status === 'scheduled' && (
                        <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50 transition-colors">
                          Annuler
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t">
          <h4 className="font-medium text-gray-900 mb-3">Planifier une maintenance</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date et heure de début
              </label>
              <input
                type="datetime-local"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durée estimée
              </label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none">
                <option>30 minutes</option>
                <option>1 heure</option>
                <option>2 heures</option>
                <option>4 heures</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Raison
            </label>
            <input
              type="text"
              placeholder="Ex: Mise à jour de sécurité, Maintenance du serveur..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
            />
          </div>
          <div className="mt-6">
            <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Planifier la maintenance
            </button>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations Système</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Dernière maintenance</span>
              <span className="font-medium">2024-01-15 02:30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Prochaine maintenance planifiée</span>
              <span className="font-medium">2024-01-20 02:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Durée moyenne maintenance</span>
              <span className="font-medium">1.5 heures</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Uptime 30 derniers jours</span>
              <span className="font-medium text-green-600">99.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Maintenances ce mois</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Support technique</span>
              <span className="font-medium text-blue-600">support@sumo.sn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}