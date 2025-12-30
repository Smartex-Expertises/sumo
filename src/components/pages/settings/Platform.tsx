'use client';

import { Database, Globe, Shield, Users, Clock, Save, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface PlatformSetting {
  id: string;
  name: string;
  description: string;
  value: any;
  type: 'text' | 'number' | 'boolean' | 'select' | 'time';
  category: string;
  options?: string[];
}

export default function Platform() {
  const [settings, setSettings] = useState<PlatformSetting[]>([
    {
      id: '1',
      name: 'Nom de la plateforme',
      description: 'Nom affiché sur l application et les notifications',
      value: 'Sumo Ride',
      type: 'text',
      category: 'Général',
    },
    {
      id: '2',
      name: 'Temps maximum d attente',
      description: 'Temps maximum d attente avant annulation automatique (minutes)',
      value: 15,
      type: 'number',
      category: 'Courses',
    },
    {
      id: '3',
      name: 'Distance maximum pour covoiturage',
      description: 'Distance maximum pour proposer le covoiturage (km)',
      value: 2.5,
      type: 'number',
      category: 'Courses',
    },
    {
      id: '4',
      name: 'Notation obligatoire',
      description: 'Forcer la notation après chaque course',
      value: true,
      type: 'boolean',
      category: 'Expérience utilisateur',
    },
    {
      id: '5',
      name: 'Heure de début des courses',
      description: 'Heure à laquelle les courses peuvent commencer',
      value: '06:00',
      type: 'time',
      category: 'Horaires',
    },
    {
      id: '6',
      name: 'Heure de fin des courses',
      description: 'Heure à laquelle les courses doivent se terminer',
      value: '23:00',
      type: 'time',
      category: 'Horaires',
    },
    {
      id: '7',
      name: 'Mode démo activé',
      description: 'Activer le mode démonstration pour les nouveaux utilisateurs',
      value: false,
      type: 'boolean',
      category: 'Sécurité',
    },
    {
      id: '8',
      name: 'Niveau de log',
      description: 'Niveau de détail des logs système',
      value: 'info',
      type: 'select',
      category: 'Système',
      options: ['debug', 'info', 'warn', 'error'],
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const categories = Array.from(new Set(settings.map(s => s.category)));

  const handleSettingChange = (id: string, newValue: any) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, value: newValue } : setting
    ));
    setHasChanges(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulation de sauvegarde
    setTimeout(() => {
      setIsSaving(false);
      setHasChanges(false);
      console.log('Settings saved:', settings);
    }, 1000);
  };

  const handleReset = () => {
    setSettings(settings.map(setting => ({
      ...setting,
      value: getDefaultValue(setting.id)
    })));
    setHasChanges(true);
  };

  const getDefaultValue = (id: string) => {
    const defaults: Record<string, any> = {
      '1': 'Sumo Ride',
      '2': 15,
      '3': 2.5,
      '4': true,
      '5': '06:00',
      '6': '23:00',
      '7': false,
      '8': 'info',
    };
    return defaults[id];
  };

  const renderSettingInput = (setting: PlatformSetting) => {
    switch (setting.type) {
      case 'text':
        return (
          <input
            type="text"
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
          />
        );
      case 'boolean':
        return (
          <div className="flex items-center">
            <button
              onClick={() => handleSettingChange(setting.id, !setting.value)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                setting.value ? 'bg-gray-900' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  setting.value ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="ml-3 text-sm text-gray-600">
              {setting.value ? 'Activé' : 'Désactivé'}
            </span>
          </div>
        );
      case 'time':
        return (
          <input
            type="time"
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
          />
        );
      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
          >
            {setting.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Général':
        return <Database className="text-gray-600" size={20} />;
      case 'Courses':
        return <Users className="text-gray-600" size={20} />;
      case 'Expérience utilisateur':
        return <Globe className="text-gray-600" size={20} />;
      case 'Horaires':
        return <Clock className="text-gray-600" size={20} />;
      case 'Sécurité':
        return <Shield className="text-gray-600" size={20} />;
      case 'Système':
        return <Database className="text-gray-600" size={20} />;
      default:
        return <Database className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Paramètres Plateforme</h2>
          <p className="text-gray-600 mt-1">Configuration générale de la plateforme</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} />
            Réinitialiser
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              hasChanges && !isSaving
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save size={18} />
            {isSaving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Paramètres actifs</p>
              <p className="text-2xl font-bold mt-1">{settings.length}</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg">
              <Database className="text-gray-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Catégories</p>
              <p className="text-2xl font-bold mt-1">{categories.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Globe className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Paramètres modifiés</p>
              <p className="text-2xl font-bold mt-1">{hasChanges ? 'En attente' : '0'}</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="text-yellow-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Dernière sauvegarde</p>
              <p className="text-2xl font-bold mt-1">12:45</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="text-green-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Settings by Category */}
      {categories.map(category => {
        const categorySettings = settings.filter(s => s.category === category);
        
        return (
          <div key={category} className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getCategoryIcon(category)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                  <p className="text-gray-600 text-sm">{categorySettings.length} paramètre(s)</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {categorySettings.map(setting => (
                  <div key={setting.id} className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="md:w-1/3">
                      <label className="block font-medium text-gray-900 mb-1">
                        {setting.name}
                      </label>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                    <div className="md:w-2/3">
                      {renderSettingInput(setting)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* System Information */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations Système</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Version de la plateforme</span>
              <span className="font-medium">v2.4.1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dernière mise à jour</span>
              <span className="font-medium">2024-01-15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Serveur</span>
              <span className="font-medium">production-sumo-01</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Base de données</span>
              <span className="font-medium">PostgreSQL 14</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Uptime</span>
              <span className="font-medium">99.8%</span>
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