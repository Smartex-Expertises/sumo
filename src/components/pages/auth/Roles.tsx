'use client';

import { Users, Shield, Edit2, Trash2, Plus, Search, Filter, Check, X } from 'lucide-react';
import { useState } from 'react';

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: number;
  isDefault: boolean;
  createdAt: string;
  color: string;
}

interface UserRoleAssignment {
  userId: string;
  name: string;
  email: string;
  role: string;
  assignedAt: string;
}

export default function Roles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const roles: Role[] = [
    {
      id: '1',
      name: 'Administrateur',
      description: 'Accès complet à toutes les fonctionnalités du système',
      userCount: 3,
      permissions: 32,
      isDefault: false,
      createdAt: '2024-01-01',
      color: 'bg-red-100 text-red-800',
    },
    {
      id: '2',
      name: 'Manager',
      description: 'Gestion des opérations et supervision des équipes',
      userCount: 12,
      permissions: 24,
      isDefault: false,
      createdAt: '2024-01-01',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      id: '3',
      name: 'Support',
      description: 'Gestion du support client et des réclamations',
      userCount: 8,
      permissions: 18,
      isDefault: false,
      createdAt: '2024-01-01',
      color: 'bg-green-100 text-green-800',
    },
    {
      id: '4',
      name: 'Analyste',
      description: 'Accès aux données analytiques et rapports',
      userCount: 5,
      permissions: 15,
      isDefault: false,
      createdAt: '2024-01-15',
      color: 'bg-purple-100 text-purple-800',
    },
    {
      id: '5',
      name: 'Utilisateur',
      description: 'Accès limité aux fonctionnalités de base',
      userCount: 2450,
      permissions: 8,
      isDefault: true,
      createdAt: '2024-01-01',
      color: 'bg-gray-100 text-gray-800',
    },
  ];

  const userAssignments: UserRoleAssignment[] = [
    { userId: 'USR-001', name: 'Jean Dupont', email: 'jean@example.com', role: 'Administrateur', assignedAt: '2024-01-15' },
    { userId: 'USR-002', name: 'Marie Martin', email: 'marie@example.com', role: 'Manager', assignedAt: '2024-01-14' },
    { userId: 'USR-003', name: 'Pierre Bernard', email: 'pierre@example.com', role: 'Support', assignedAt: '2024-01-13' },
    { userId: 'USR-004', name: 'Sophie Leroy', email: 'sophie@example.com', role: 'Analyste', assignedAt: '2024-01-12' },
    { userId: 'USR-005', name: 'Luc Dubois', email: 'luc@example.com', role: 'Utilisateur', assignedAt: '2024-01-11' },
  ];

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Gestion des Rôles</h2>
          <p className="text-gray-600 mt-1">Créez et gérez les rôles utilisateurs et leurs permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full md:w-auto justify-center">
          <Plus size={18} />
          Nouveau rôle
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Rôles actifs</p>
              <p className="text-2xl font-bold mt-1">{roles.length}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <Users className="text-red-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Utilisateurs assignés</p>
              <p className="text-2xl font-bold mt-1">{roles.reduce((sum, role) => sum + role.userCount, 0)}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Permissions totales</p>
              <p className="text-2xl font-bold mt-1">{roles.reduce((sum, role) => sum + role.permissions, 0)}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="text-green-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Rôle par défaut</p>
              <p className="text-2xl font-bold mt-1">Utilisateur</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Check className="text-purple-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un rôle par nom ou description..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none">
              <option>Trier par</option>
              <option>Nom (A-Z)</option>
              <option>Nombre d utilisateurs</option>
              <option>Date de création</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={18} />
              Filtrer
            </button>
          </div>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roles List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Liste des Rôles</h3>
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className="bg-white p-6 rounded-xl shadow-sm border hover:border-red-200 transition-colors cursor-pointer"
              onClick={() => setSelectedRole(role)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${role.color}`}>
                    <Shield size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-lg font-semibold">{role.name}</h4>
                      {role.isDefault && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                          Par défaut
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{role.description}</p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{role.userCount} utilisateurs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{role.permissions} permissions</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                    <Edit2 size={18} className="text-red-600" />
                  </button>
                  {!role.isDefault && (
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Trash2 size={18} className="text-gray-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Role Details or User Assignments */}
        <div className="space-y-6">
          {/* Role Details */}
          {selectedRole ? (
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${selectedRole.color}`}>
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedRole.name}</h3>
                  <p className="text-gray-600">Détails du rôle</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedRole.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Utilisateurs</p>
                    <p className="text-2xl font-bold mt-1">{selectedRole.userCount}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Permissions</p>
                    <p className="text-2xl font-bold mt-1">{selectedRole.permissions}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Permissions associées</h4>
                  <div className="flex flex-wrap gap-2">
                    {['users.read', 'users.write', 'reports.view', 'settings.manage', 'analytics.view', 'support.access']
                      .slice(0, selectedRole.permissions / 5)
                      .map((permission, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                          {permission}
                        </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <button className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Modifier le rôle
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="text-center py-8">
                <Shield className="mx-auto text-gray-400" size={48} />
                <p className="text-gray-500 mt-4">Sélectionnez un rôle pour voir les détails</p>
              </div>
            </div>
          )}

          {/* User Assignments */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Assignations récentes</h3>
              <span className="text-sm text-gray-500">5 dernières</span>
            </div>

            <div className="space-y-3">
              {userAssignments.map((user) => (
                <div key={user.userId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Users size={18} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {user.role}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(user.assignedAt).toLocaleDateString('fr-FR')}
                    </p>
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