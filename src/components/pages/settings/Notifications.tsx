'use client';

import { Bell, Mail, MessageSquare, Users, Car, DollarSign, AlertTriangle, Save, Send, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface NotificationTemplate {
  id: string;
  name: string;
  description: string;
  type: 'email' | 'sms' | 'push' | 'in-app';
  category: string;
  isActive: boolean;
  subject?: string;
  content: string;
}

interface UserNotificationPreference {
  userId: string;
  name: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
}

interface NotificationStat {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

export default function Notifications() {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([
    {
      id: '1',
      name: 'Confirmation de course',
      description: 'Envoyée au client après confirmation d une course',
      type: 'email',
      category: 'Courses',
      isActive: true,
      subject: 'Votre course a été confirmée',
      content: 'Bonjour {client_name}, votre course #{ride_id} a été confirmée. Le chauffeur {driver_name} arrive dans {eta} minutes.',
    },
    {
      id: '2',
      name: 'Course complétée',
      description: 'Notification de fin de course',
      type: 'push',
      category: 'Courses',
      isActive: true,
      content: 'Votre course est terminée. Merci d avoir choisi Sumo Ride!',
    },
    {
      id: '3',
      name: 'Paiement réussi',
      description: 'Confirmation de paiement',
      type: 'sms',
      category: 'Paiements',
      isActive: true,
      content: 'Sumo Ride: Paiement de {amount} XOF effectué pour la course #{ride_id}. Merci!',
    },
    {
      id: '4',
      name: 'Promotion spéciale',
      description: 'Offres promotionnelles',
      type: 'email',
      category: 'Marketing',
      isActive: true,
      subject: 'Offre spéciale pour vous!',
      content: 'Profitez de {discount}% de réduction sur votre prochaine course avec le code {promo_code}.',
    },
    {
      id: '5',
      name: 'Maintenance planifiée',
      description: 'Alerte de maintenance système',
      type: 'in-app',
      category: 'Système',
      isActive: false,
      content: 'Maintenance planifiée le {date} de {start_time} à {end_time}.',
    },
    {
      id: '6',
      name: 'Chauffeur assigné',
      description: 'Notification quand un chauffeur est assigné',
      type: 'push',
      category: 'Courses',
      isActive: true,
      content: 'Votre chauffeur {driver_name} est en route. Véhicule: {car_model} - Plaque: {car_plate}',
    },
  ]);

  const [userPreferences, setUserPreferences] = useState<UserNotificationPreference[]>([
    { userId: 'USR-001', name: 'Jean Dupont', emailNotifications: true, smsNotifications: true, pushNotifications: true, inAppNotifications: true },
    { userId: 'USR-002', name: 'Marie Martin', emailNotifications: true, smsNotifications: false, pushNotifications: true, inAppNotifications: true },
    { userId: 'USR-003', name: 'Pierre Bernard', emailNotifications: false, smsNotifications: true, pushNotifications: true, inAppNotifications: false },
    { userId: 'USR-004', name: 'Sophie Leroy', emailNotifications: true, smsNotifications: true, pushNotifications: false, inAppNotifications: true },
    { userId: 'USR-005', name: 'Luc Dubois', emailNotifications: true, smsNotifications: true, pushNotifications: true, inAppNotifications: false },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [testNotification, setTestNotification] = useState({
    type: 'email' as 'email' | 'sms' | 'push' | 'in-app',
    recipient: '',
    message: '',
  });

  const stats: NotificationStat[] = [
    {
      label: 'Notifications envoyées (24h)',
      value: '1,245',
      change: 15.2,
      icon: <Bell className="text-blue-600" size={20} />,
    },
    {
      label: 'Taux d ouverture',
      value: '78%',
      change: 3.1,
      icon: <Eye className="text-green-600" size={20} />,
    },
    {
      label: 'Emails envoyés',
      value: '845',
      change: 8.7,
      icon: <Mail className="text-red-600" size={20} />,
    },
    {
      label: 'SMS envoyés',
      value: '320',
      change: -2.4,
      icon: <MessageSquare className="text-purple-600" size={20} />,
    },
  ];

  const categories = Array.from(new Set(templates.map(t => t.category)));

  const toggleTemplateStatus = (id: string) => {
    setTemplates(templates.map(template => 
      template.id === id ? { ...template, isActive: !template.isActive } : template
    ));
    setHasChanges(true);
  };

  const toggleUserPreference = (userId: string, preference: keyof UserNotificationPreference) => {
    setUserPreferences(prefs => prefs.map(pref => 
      pref.userId === userId 
        ? { ...pref, [preference]: !pref[preference] }
        : pref
    ));
    setHasChanges(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulation de sauvegarde
    setTimeout(() => {
      setIsSaving(false);
      setHasChanges(false);
      console.log('Notification settings saved:', { templates, userPreferences });
    }, 1000);
  };

  const sendTestNotification = () => {
    if (!testNotification.recipient || !testNotification.message) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    console.log('Sending test notification:', testNotification);
    alert(`Notification ${testNotification.type} envoyée à ${testNotification.recipient}`);
    setTestNotification({ type: 'email', recipient: '', message: '' });
  };

  const getTypeIcon = (type: NotificationTemplate['type']) => {
    switch (type) {
      case 'email': return <Mail size={16} className="text-red-500" />;
      case 'sms': return <MessageSquare size={16} className="text-blue-500" />;
      case 'push': return <Bell size={16} className="text-green-500" />;
      case 'in-app': return <Eye size={16} className="text-purple-500" />;
      default: return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Courses': return <Car size={16} className="text-blue-600" />;
      case 'Paiements': return <DollarSign size={16} className="text-green-600" />;
      case 'Marketing': return <Users size={16} className="text-purple-600" />;
      case 'Système': return <AlertTriangle size={16} className="text-yellow-600" />;
      default: return <Bell size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Paramètres des Notifications</h2>
          <p className="text-gray-600 mt-1">Configurez les modèles et préférences de notification</p>
        </div>
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
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.change > 0 ? (
                    <span className="text-sm font-medium text-green-600">+{stat.change}%</span>
                  ) : (
                    <span className="text-sm font-medium text-red-600">{stat.change}%</span>
                  )}
                  <span className="text-sm text-gray-500">vs hier</span>
                </div>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notification Templates */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Modèles de Notification</h3>
          <p className="text-gray-600 text-sm mt-1">Gérez les templates de notification par catégorie</p>
        </div>
        
        <div className="p-6">
          {categories.map(category => {
            const categoryTemplates = templates.filter(t => t.category === category);
            
            return (
              <div key={category} className="mb-8 last:mb-0">
                <div className="flex items-center gap-2 mb-4">
                  {getCategoryIcon(category)}
                  <h4 className="text-lg font-semibold text-gray-900">{category}</h4>
                  <span className="text-sm text-gray-500">({categoryTemplates.length} modèle(s))</span>
                </div>
                
                <div className="space-y-4">
                  {categoryTemplates.map(template => (
                    <div key={template.id} className="p-4 border rounded-lg hover:border-gray-300 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-medium">{template.name}</span>
                            <div className="flex items-center gap-1">
                              {getTypeIcon(template.type)}
                              <span className="text-sm text-gray-500">
                                {template.type === 'email' ? 'Email' :
                                 template.type === 'sms' ? 'SMS' :
                                 template.type === 'push' ? 'Push' : 'In-app'}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{template.description}</p>
                          {template.subject && (
                            <p className="text-sm font-medium">Sujet: {template.subject}</p>
                          )}
                          <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
                            {template.content}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 ml-4">
                          <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50 transition-colors">
                            Éditer
                          </button>
                          <button
                            onClick={() => toggleTemplateStatus(template.id)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              template.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {template.isActive ? 'Actif' : 'Inactif'}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Variables disponibles: {'{client_name}, {ride_id}, {driver_name}, ...'}</span>
                        <button className="text-blue-600 hover:text-blue-800">
                          Voir toutes les variables
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* User Preferences */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Préférences Utilisateurs</h3>
          <p className="text-gray-600 text-sm mt-1">Configuration des préférences de notification par utilisateur</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Utilisateur</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    Email
                  </div>
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} />
                    SMS
                  </div>
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <Bell size={16} />
                    Push
                  </div>
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    In-app
                  </div>
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {userPreferences.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.userId}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleUserPreference(user.userId, 'emailNotifications')}
                      className={`p-1 rounded-full ${
                        user.emailNotifications ? 'bg-green-100' : 'bg-gray-100'
                      }`}
                    >
                      {user.emailNotifications ? 
                        <Eye className="text-green-600" size={18} /> :
                        <EyeOff className="text-gray-400" size={18} />
                      }
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleUserPreference(user.userId, 'smsNotifications')}
                      className={`p-1 rounded-full ${
                        user.smsNotifications ? 'bg-green-100' : 'bg-gray-100'
                      }`}
                    >
                      {user.smsNotifications ? 
                        <Eye className="text-green-600" size={18} /> :
                        <EyeOff className="text-gray-400" size={18} />
                      }
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleUserPreference(user.userId, 'pushNotifications')}
                      className={`p-1 rounded-full ${
                        user.pushNotifications ? 'bg-green-100' : 'bg-gray-100'
                      }`}
                    >
                      {user.pushNotifications ? 
                        <Eye className="text-green-600" size={18} /> :
                        <EyeOff className="text-gray-400" size={18} />
                      }
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleUserPreference(user.userId, 'inAppNotifications')}
                      className={`p-1 rounded-full ${
                        user.inAppNotifications ? 'bg-green-100' : 'bg-gray-100'
                      }`}
                    >
                      {user.inAppNotifications ? 
                        <Eye className="text-green-600" size={18} /> :
                        <EyeOff className="text-gray-400" size={18} />
                      }
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50 transition-colors">
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Test Notification */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Envoyer une Notification de Test</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de notification
            </label>
            <select
              value={testNotification.type}
              onChange={(e) => setTestNotification({...testNotification, type: e.target.value as any})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="push">Push</option>
              <option value="in-app">In-app</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destinataire
            </label>
            <input
              type="text"
              value={testNotification.recipient}
              onChange={(e) => setTestNotification({...testNotification, recipient: e.target.value})}
              placeholder="email@exemple.com ou +221701234567"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <input
              type="text"
              value={testNotification.message}
              onChange={(e) => setTestNotification({...testNotification, message: e.target.value})}
              placeholder="Message de test..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={sendTestNotification}
            className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Send size={18} />
            Envoyer la notification de test
          </button>
        </div>
      </div>

      {/* System Configuration */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration du Système</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Service d emails</span>
              <span className="font-medium">SendGrid</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Service SMS</span>
              <span className="font-medium">Twilio</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Service de notifications push</span>
              <span className="font-medium">Firebase Cloud Messaging</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Notifications envoyées ce mois</span>
              <span className="font-medium">24,589</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taux de réussite</span>
              <span className="font-medium text-green-600">99.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Dernier test</span>
              <span className="font-medium">Aujourd'hui, 10:15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}