'use client';

import { Ticket, Percent, Calendar, Users, DollarSign, Plus, Edit2, Trash2, CheckCircle, XCircle, Copy } from 'lucide-react';
import { useState } from 'react';

interface PromoCode {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  validFrom: string;
  validUntil: string;
  maxUses: number;
  currentUses: number;
  isActive: boolean;
  users: string[];
  zones: string[];
}

export default function PromoCodes() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      id: '1',
      code: 'SUMO20',
      description: 'Réduction de 20% sur la première course',
      discountType: 'percentage',
      discountValue: 20,
      maxDiscount: 1000,
      minOrderAmount: 2000,
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      maxUses: 1000,
      currentUses: 342,
      isActive: true,
      users: ['all'],
      zones: ['all'],
    },
    {
      id: '2',
      code: 'WEEKEND500',
      description: '500 XOF de réduction le week-end',
      discountType: 'fixed',
      discountValue: 500,
      minOrderAmount: 1500,
      validFrom: '2024-01-01',
      validUntil: '2024-06-30',
      maxUses: 500,
      currentUses: 189,
      isActive: true,
      users: ['all'],
      zones: ['Dakar Centre'],
    },
    {
      id: '3',
      code: 'LOYALTY15',
      description: '15% pour les utilisateurs fidèles',
      discountType: 'percentage',
      discountValue: 15,
      validFrom: '2024-02-01',
      validUntil: '2024-03-01',
      maxUses: 200,
      currentUses: 45,
      isActive: false,
      users: ['premium'],
      zones: ['all'],
    },
  ]);

  const toggleActive = (id: string) => {
    setPromoCodes(promoCodes.map(promo => 
      promo.id === id ? { ...promo, isActive: !promo.isActive } : promo
    ));
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // Vous pouvez ajouter une notification ici
    console.log(`Code ${code} copié dans le presse-papier`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Codes actifs</p>
              <p className="text-2xl font-bold mt-1">{promoCodes.filter(p => p.isActive).length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Ticket className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Utilisations totales</p>
              <p className="text-2xl font-bold mt-1">
                {promoCodes.reduce((sum, promo) => sum + promo.currentUses, 0)}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="text-green-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Économies totales</p>
              <p className="text-2xl font-bold mt-1">1.2M XOF</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <DollarSign className="text-yellow-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Taux d utilisation</p>
              <p className="text-2xl font-bold mt-1">42%</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Percent className="text-purple-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Promo Codes Table */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Codes Promotionnels</h2>
            <p className="text-gray-600 mt-1">Gérez les réductions et offres promotionnelles</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            Nouveau code
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Code</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Description</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Réduction</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Validité</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Utilisations</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {promoCodes.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-lg bg-blue-50 text-blue-700 px-3 py-1 rounded">
                        {promo.code}
                      </span>
                      <button
                        onClick={() => copyToClipboard(promo.code)}
                        className="p-1 hover:bg-blue-100 rounded transition-colors"
                        title="Copier le code"
                      >
                        <Copy size={14} className="text-blue-500" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium">{promo.description}</p>
                      {promo.minOrderAmount && (
                        <p className="text-sm text-gray-500">
                          Min: {promo.minOrderAmount} XOF
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {promo.discountType === 'percentage' ? (
                        <>
                          <Percent size={16} className="text-green-600" />
                          <span className="font-bold">{promo.discountValue}%</span>
                          {promo.maxDiscount && (
                            <span className="text-sm text-gray-500">(max {promo.maxDiscount} XOF)</span>
                          )}
                        </>
                      ) : (
                        <>
                          <DollarSign size={16} className="text-green-600" />
                          <span className="font-bold">{promo.discountValue} XOF</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      <div className="text-sm">
                        <p>Du {formatDate(promo.validFrom)}</p>
                        <p>Au {formatDate(promo.validUntil)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Utilisé</span>
                        <span className="font-medium">{promo.currentUses}/{promo.maxUses}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-green-600 h-1.5 rounded-full" 
                          style={{ width: `${(promo.currentUses / promo.maxUses) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {Math.round((promo.currentUses / promo.maxUses) * 100)}% utilisé
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleActive(promo.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                        promo.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {promo.isActive ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {promo.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={16} className="text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}