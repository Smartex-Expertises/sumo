'use client';

import { DollarSign, MapPin, Clock, Car, Settings, Save, Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface PricingZone {
  id: string;
  name: string;
  city: string;
  country: string;
  baseFare: number;
  perKmRate: number;
  perMinuteRate: number;
  minimumFare: number;
  cancellationFee: number;
  waitingFeePerMinute: number;
  isActive: boolean;
  serviceTypes: string[];
}

export default function PricingSettings() {
  const [zones, setZones] = useState<PricingZone[]>([
    {
      id: '1',
      name: 'Dakar Centre',
      city: 'Dakar',
      country: 'Sénégal',
      baseFare: 500,
      perKmRate: 250,
      perMinuteRate: 50,
      minimumFare: 1000,
      cancellationFee: 300,
      waitingFeePerMinute: 25,
      isActive: true,
      serviceTypes: ['STANDARD', 'PREMIUM', 'CARPOOL'],
    },
    {
      id: '2',
      name: 'Pikine-Guediawaye',
      city: 'Dakar',
      country: 'Sénégal',
      baseFare: 450,
      perKmRate: 200,
      perMinuteRate: 40,
      minimumFare: 900,
      cancellationFee: 250,
      waitingFeePerMinute: 20,
      isActive: true,
      serviceTypes: ['STANDARD', 'CARPOOL'],
    },
  ]);

  const toggleZoneStatus = (zoneId: string) => {
    setZones(zones.map(zone => 
      zone.id === zoneId ? { ...zone, isActive: !zone.isActive } : zone
    ));
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Zones actives</p>
              <p className="text-2xl font-bold mt-1">{zones.filter(z => z.isActive).length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tarif moyen/km</p>
              <p className="text-2xl font-bold mt-1">
                {Math.round(zones.reduce((sum, z) => sum + z.perKmRate, 0) / zones.length)} XOF
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Car className="text-green-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tarif moyen/min</p>
              <p className="text-2xl font-bold mt-1">
                {Math.round(zones.reduce((sum, z) => sum + z.perMinuteRate, 0) / zones.length)} XOF
              </p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="text-yellow-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Courses aujourd'hui</p>
              <p className="text-2xl font-bold mt-1">156</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="text-purple-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Zones Table */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Zones Tarifaires</h2>
            <p className="text-gray-600 mt-1">Configurez les tarifs par zone géographique</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            Nouvelle zone
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Zone</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Prix de base</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Prix/km</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Prix/min</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Minimum</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {zones.map((zone) => (
                <tr key={zone.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium">{zone.name}</p>
                      <p className="text-sm text-gray-500">{zone.city}, {zone.country}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{zone.baseFare} XOF</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{zone.perKmRate} XOF</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{zone.perMinuteRate} XOF</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold">{zone.minimumFare} XOF</span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleZoneStatus(zone.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                        zone.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {zone.isActive ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {zone.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      >
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