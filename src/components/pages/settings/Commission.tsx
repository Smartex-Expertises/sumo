'use client';

import { DollarSign, TrendingUp, TrendingDown, Percent, Users, Car, Save } from 'lucide-react';
import { useState } from 'react';

interface CommissionRule {
  id: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'tiered';
  value: number;
  minAmount?: number;
  maxAmount?: number;
  serviceType: string;
  isActive: boolean;
}

interface CommissionStat {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

export default function Commission() {
  const [commissionRules, setCommissionRules] = useState<CommissionRule[]>([
    {
      id: '1',
      name: 'Commission standard',
      description: 'Commission appliquée sur toutes les courses',
      type: 'percentage',
      value: 20,
      serviceType: 'all',
      isActive: true,
    },
    {
      id: '2',
      name: 'Commission premium',
      description: 'Commission pour les courses premium',
      type: 'percentage',
      value: 25,
      serviceType: 'premium',
      isActive: true,
    },
    {
      id: '3',
      name: 'Commission covoiturage',
      description: 'Commission réduite pour le covoiturage',
      type: 'percentage',
      value: 15,
      serviceType: 'carpool',
      isActive: true,
    },
    {
      id: '4',
      name: 'Frais minimum',
      description: 'Frais minimum par course',
      type: 'fixed',
      value: 300,
      serviceType: 'all',
      isActive: true,
    },
    {
      id: '5',
      name: 'Commission par palier',
      description: 'Commission progressive selon le montant',
      type: 'tiered',
      value: 0,
      minAmount: 1000,
      maxAmount: 5000,
      serviceType: 'all',
      isActive: false,
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const stats: CommissionStat[] = [
    {
      label: 'Commission moyenne',
      value: '22.5%',
      change: 2.1,
      icon: <Percent className="text-green-600" size={20} />,
    },
    {
      label: 'Revenus commissions',
      value: '4.8M XOF',
      change: 15.3,
      icon: <DollarSign className="text-blue-600" size={20} />,
    },
    {
      label: 'Courses commissionnées',
      value: '1,245',
      change: 8.7,
      icon: <Car className="text-purple-600" size={20} />,
    },
    {
      label: 'Chauffeurs actifs',
      value: '342',
      change: 5.2,
      icon: <Users className="text-orange-600" size={20} />,
    },
  ];

  const toggleRuleStatus = (id: string) => {
    setCommissionRules(rules => rules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
    setHasChanges(true);
  };

  const updateRuleValue = (id: string, field: string, value: any) => {
    setCommissionRules(rules => rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
    setHasChanges(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulation de sauvegarde
    setTimeout(() => {
      setIsSaving(false);
      setHasChanges(false);
      console.log('Commission rules saved:', commissionRules);
    }, 1000);
  };

  const calculateCommission = (amount: number, serviceType: string = 'all') => {
    const rule = commissionRules.find(r => 
      r.serviceType === serviceType && r.isActive && r.type === 'percentage'
    );
    if (!rule) return 0;
    
    const commission = amount * (rule.value / 100);
    const minFeeRule = commissionRules.find(r => 
      r.serviceType === serviceType && r.isActive && r.type === 'fixed'
    );
    
    if (minFeeRule && commission < minFeeRule.value) {
      return minFeeRule.value;
    }
    
    return commission;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Paramètres de Commission</h2>
          <p className="text-gray-600 mt-1">Configurez les règles de commission pour les chauffeurs</p>
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
                    <TrendingUp size={16} className="text-green-500" />
                  ) : (
                    <TrendingDown size={16} className="text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${stat.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change > 0 ? '+' : ''}{stat.change}%
                  </span>
                  <span className="text-sm text-gray-500">vs mois dernier</span>
                </div>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Commission Calculator */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculateur de Commission</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Montant de la course (XOF)
            </label>
            <input
              type="number"
              defaultValue="2500"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de service
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none">
              <option value="all">Standard</option>
              <option value="premium">Premium</option>
              <option value="carpool">Covoiturage</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Calculer
            </button>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Commission estimée</p>
              <p className="text-2xl font-bold text-gray-900">500 XOF</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Pour une course de 2 500 XOF</p>
              <p className="text-sm text-gray-500">Taux: 20% • Minimum: 300 XOF</p>
            </div>
          </div>
        </div>
      </div>

      {/* Commission Rules */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Règles de Commission</h3>
          <p className="text-gray-600 text-sm mt-1">Configurez les différentes règles de commission</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Règle</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Valeur</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Service</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {commissionRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium">{rule.name}</p>
                      <p className="text-sm text-gray-500">{rule.description}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      rule.type === 'percentage' ? 'bg-blue-100 text-blue-800' :
                      rule.type === 'fixed' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {rule.type === 'percentage' ? 'Pourcentage' :
                       rule.type === 'fixed' ? 'Fixe' : 'Par palier'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {rule.type === 'percentage' ? (
                        <>
                          <input
                            type="number"
                            value={rule.value}
                            onChange={(e) => updateRuleValue(rule.id, 'value', parseFloat(e.target.value) || 0)}
                            className="w-24 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                          />
                          <span className="text-gray-600">%</span>
                        </>
                      ) : rule.type === 'fixed' ? (
                        <>
                          <input
                            type="number"
                            value={rule.value}
                            onChange={(e) => updateRuleValue(rule.id, 'value', parseFloat(e.target.value) || 0)}
                            className="w-32 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                          />
                          <span className="text-gray-600">XOF</span>
                        </>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">De:</span>
                            <input
                              type="number"
                              value={rule.minAmount}
                              onChange={(e) => updateRuleValue(rule.id, 'minAmount', parseFloat(e.target.value) || 0)}
                              className="w-24 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">À:</span>
                            <input
                              type="number"
                              value={rule.maxAmount}
                              onChange={(e) => updateRuleValue(rule.id, 'maxAmount', parseFloat(e.target.value) || 0)}
                              className="w-24 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      rule.serviceType === 'all' ? 'bg-gray-100 text-gray-800' :
                      rule.serviceType === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rule.serviceType === 'all' ? 'Tous' :
                       rule.serviceType === 'premium' ? 'Premium' : 'Covoiturage'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleRuleStatus(rule.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        rule.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {rule.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50 transition-colors">
                      Configurer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé des Commissions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Commission standard</span>
              <span className="font-bold">20%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Commission minimum</span>
              <span className="font-bold">300 XOF</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Commission premium</span>
              <span className="font-bold">25%</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Commission covoiturage</span>
              <span className="font-bold">15%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Règles actives</span>
              <span className="font-bold">{commissionRules.filter(r => r.isActive).length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Dernière mise à jour</span>
              <span className="font-bold">Aujourd'hui, 10:30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}