'use client';

import { Clock, TrendingUp, Calendar, Filter, Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface PeakHour {
  id: string;
  name: string;
  days: string[];
  startTime: string;
  endTime: string;
  multiplier: number;
  isActive: boolean;
  zones: string[];
}

export default function PeakHours() {
  const [peakHours, setPeakHours] = useState<PeakHour[]>([
    {
      id: '1',
      name: 'Heures de pointe du matin',
      days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
      startTime: '07:00',
      endTime: '09:00',
      multiplier: 1.5,
      isActive: true,
      zones: ['Dakar Centre', 'Pikine-Guediawaye'],
    },
    {
      id: '2',
      name: 'Heures de pointe du soir',
      days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
      startTime: '17:00',
      endTime: '19:00',
      multiplier: 1.6,
      isActive: true,
      zones: ['Dakar Centre'],
    },
    {
      id: '3',
      name: 'Week-end soir',
      days: ['Samedi', 'Dimanche'],
      startTime: '20:00',
      endTime: '23:00',
      multiplier: 1.4,
      isActive: true,
      zones: ['Dakar Centre', 'Pikine-Guediawaye'],
    },
  ]);

  const toggleActive = (id: string) => {
    setPeakHours(peakHours.map(ph => 
      ph.id === id ? { ...ph, isActive: !ph.isActive } : ph
    ));
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Périodes actives</p>
              <p className="text-2xl font-bold mt-1">{peakHours.filter(ph => ph.isActive).length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Multiplicateur max</p>
              <p className="text-2xl font-bold mt-1">
                x{Math.max(...peakHours.map(ph => ph.multiplier)).toFixed(1)}
              </p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingUp className="text-red-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Jours couverts</p>
              <p className="text-2xl font-bold mt-1">
                {Array.from(new Set(peakHours.flatMap(ph => ph.days))).length}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="text-green-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Zones impactées</p>
              <p className="text-2xl font-bold mt-1">
                {Array.from(new Set(peakHours.flatMap(ph => ph.zones))).length}
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="text-purple-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Peak Hours Table */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Heures de Pointe</h2>
            <p className="text-gray-600 mt-1">Configurez les multiplicateurs pendant les heures de forte demande</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            Nouvelle période
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Nom</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Jours</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Heures</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Multiplicateur</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Zones</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {peakHours.map((peak) => (
                <tr key={peak.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium">{peak.name}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {peak.days.map((day, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {day.substring(0, 3)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{peak.startTime} - {peak.endTime}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full font-bold">
                        x{peak.multiplier}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {peak.zones.map((zone, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                          {zone}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleActive(peak.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                        peak.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {peak.isActive ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {peak.isActive ? 'Active' : 'Inactive'}
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

import { MapPin } from 'lucide-react';