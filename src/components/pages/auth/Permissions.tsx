'use client';

import { Key, Shield, Check, X, Search, Filter, Plus, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Permission {
  id: string;
  name: string;
  category: string;
  description: string;
  roles: string[];
  isActive: boolean;
  createdAt: string;
}

interface PermissionCategory {
  id: string;
  name: string;
  description: string;
  permissionCount: number;
}

export default function Permissions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [activeOnly, setActiveOnly] = useState<boolean>(true);

  const permissions: Permission[] = [
    {
      id: '1',
      name: 'users.read',
      category: 'Utilisateurs',
      description: 'Lire les informations des utilisateurs',
      roles: ['Administrateur', 'Manager', 'Support'],
      isActive: true,
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'users.write',
      category: 'Utilisateurs',
      description: 'Modifier les informations des utilisateurs',
      roles: ['Administrateur', 'Manager'],
      isActive: true,
      createdAt: '2024-01-01',
    },
    {
      id: '3',
      name: 'drivers.manage',
      category: 'Chauffeurs',
      description: 'Gérer les chauffeurs et leurs documents',
      roles: ['Administrateur', 'Manager'],
      isActive: true,
      createdAt: '2024-01-01',
    },
    {
      id: '4',
      name: 'payments.view',
      category: 'Finances',
      description: 'Voir les informations de paiement',
      roles: ['Administrateur', 'Manager', 'Analyste'],
      isActive: true,
      createdAt: '2024-01-01',
    },
    {
      id: '5',
      name: 'payments.process',
      category: 'Finances',
      description: 'Traiter les paiements et retraits',
      roles: ['Administrateur'],
      isActive: true,
      createdAt: '2024-01-01',
    },
    {
      id: '6',
      name: 'analytics.view',
      category: 'Analytiques',
      description: 'Accéder aux données analytiques',
      roles: ['Administrateur', 'Manager', 'Analyste'],
      isActive: true,
      createdAt: '2024-01-15',
    },
    {
      id: '7',
      name: 'reports.generate',
      category: 'Rapports',
      description: 'Générer des rapports détaillés',
      roles: ['Administrateur', 'Analyste'],
      isActive: true,
      createdAt: '2024-01-15',
    },
    {
      id: '8',
      name: 'settings.manage',
      category: 'Configuration',
      description: 'Gérer les paramètres système',
      roles: ['Administrateur'],
      isActive: false,
      createdAt: '2024-01-01',
    },
  ];

  const categories: PermissionCategory[] = [
    { id: '1', name: 'Utilisateurs', description: 'Gestion des utilisateurs', permissionCount: 2 },
    { id: '2', name: 'Chauffeurs', description: 'Gestion des chauffeurs', permissionCount: 1 },
    { id: '3', name: 'Finances', description: 'Gestion financière', permissionCount: 2 },
    { id: '4', name: 'Analytiques', description: 'Accès aux analyses', permissionCount: 1 },
    { id: '5', name: 'Rapports', description: 'Génération de rapports', permissionCount: 1 },
    { id: '6', name: 'Configuration', description: 'Paramètres système', permissionCount: 1 },
  ];

  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch = 
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || permission.category === categoryFilter;
    const matchesActive = !activeOnly || permission.isActive;
    
    return matchesSearch && matchesCategory && matchesActive;
  });

  const togglePermissionStatus = (permissionId: string) => {
    console.log('Toggle permission:', permissionId);
    // À implémenter: toggle permission status
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Gestion des Permissions</h2>
          <p className="text-gray-600 mt-1">Configurez et gérez les permissions d accès du système</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full md:w-auto justify-center">
          <Plus size={18} />
          Nouvelle permission
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Permissions totales</p>
              <p className="text-2xl font-bold mt-1">{permissions.length}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <Key className="text-red-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Permissions actives</p>
              <p className="text-2xl font-bold mt-1">{permissions.filter(p => p.isActive).length}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="text-green-600" size={20} />
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
              <Shield className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Rôles utilisateurs</p>
              <p className="text-2xl font-bold mt-1">5</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="text-purple-600" size={20} />
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
              placeholder="Rechercher une permission par nom ou description..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
            
            <button
              onClick={() => setActiveOnly(!activeOnly)}
              className={`px-4 py-2 border rounded-lg transition-colors flex items-center gap-2 ${
                activeOnly ? 'bg-red-50 text-red-700 border-red-200' : 'hover:bg-gray-50'
              }`}
            >
              {activeOnly ? <Check size={16} /> : <X size={16} />}
              Actives seulement
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Permissions List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Liste des Permissions</h3>
              <p className="text-gray-600 text-sm mt-1">{filteredPermissions.length} permission(s) trouvée(s)</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Permission</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Catégorie</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Rôles</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Statut</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredPermissions.map((permission) => (
                    <tr key={permission.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium font-mono">{permission.name}</p>
                          <p className="text-sm text-gray-500 mt-1">{permission.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                          {permission.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {permission.roles.map((role, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {role}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => togglePermissionStatus(permission.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                            permission.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {permission.isActive ? <Check size={14} /> : <X size={14} />}
                          {permission.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                            <Edit2 size={16} className="text-red-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Trash2 size={16} className="text-gray-600" />
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

        {/* Categories and Quick Stats */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Catégories de Permissions</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="p-3 border rounded-lg hover:border-red-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {category.permissionCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Permission Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribution par Rôle</h3>
            <div className="space-y-4">
              {[
                { role: 'Administrateur', count: 32, color: 'bg-red-500' },
                { role: 'Manager', count: 24, color: 'bg-blue-500' },
                { role: 'Support', count: 18, color: 'bg-green-500' },
                { role: 'Analyste', count: 15, color: 'bg-purple-500' },
                { role: 'Utilisateur', count: 8, color: 'bg-gray-500' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{item.role}</span>
                    <span>{item.count} permissions</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${(item.count / 32) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Import manquant pour Users
import { Users } from 'lucide-react';