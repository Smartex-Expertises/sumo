'use client'

import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText,
  Download,
  Eye,
  Calendar,
  AlertTriangle
} from 'lucide-react'
import {  DriverDocument, DocumentStatus, DriverStatus, UserRole, DriverActivityStatus } from '../../../../type'

const DocumentValidation = () => {
  const [documents, setDocuments] = useState<DriverDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<DocumentStatus | 'ALL'>('ALL')
  const [selectedDoc, setSelectedDoc] = useState<DriverDocument | null>(null)

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      // Simulation d'API
      const mockDocuments: DriverDocument[] = [
        {
          id: '1',
          driverId: 'driver1',
          driver: {
            id: 'driver1',
            userId: 'user1',
            user: {
              id: 'user1',
              firstName: 'Jean',
              lastName: 'Dupont',
              phone: '+225 07 00 00 00',
              email: 'jean@example.com',
              passwordHash: '',
              role: 'DRIVER' as UserRole,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            status: 'PENDING' as DriverStatus,
            totalRides: 0,
            totalEarnings: 0,
            activityStatus: 'OFFLINE' as DriverActivityStatus,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          docType: 'PERMIS_DE_CONDUIRE',
          docNumber: 'AB123456',
          fileUrl: 'https://example.com/doc1.pdf',
          status: DocumentStatus.PENDING,
          expiresAt: new Date('2024-12-31'),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Ajouter plus de documents...
      ]
      setDocuments(mockDocuments)
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.driver?.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      doc.driver?.user?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      doc.docNumber?.toLowerCase().includes(search.toLowerCase()) ||
      doc.docType?.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || doc.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getDocTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'PERMIS_DE_CONDUIRE': 'Permis de conduire',
      'ASSURANCE': 'Assurance véhicule',
      'CARTE_GRISE': 'Carte grise',
      'IDENTITY': 'Pièce d\'identité',
      'MEDICAL': 'Certificat médical'
    }
    return types[type] || type
  }

  const getStatusConfig = (status: DocumentStatus) => {
    const config = {
      [DocumentStatus.PENDING]: { 
        color: 'bg-yellow-100 text-yellow-800', 
        icon: <Clock className="h-4 w-4" />,
        label: 'En attente'
      },
      [DocumentStatus.APPROVED]: { 
        color: 'bg-green-100 text-green-800', 
        icon: <CheckCircle className="h-4 w-4" />,
        label: 'Approuvé'
      },
      [DocumentStatus.REJECTED]: { 
        color: 'bg-red-100 text-red-800', 
        icon: <XCircle className="h-4 w-4" />,
        label: 'Rejeté'
      },
      [DocumentStatus.EXPIRED]: { 
        color: 'bg-orange-100 text-orange-800', 
        icon: <AlertTriangle className="h-4 w-4" />,
        label: 'Expiré'
      }
    }
    return config[status]
  }

  const handleApprove = async (docId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir approuver ce document ?')) return
    
    try {
      // API call
      console.log('Approve document:', docId)
    } catch (error) {
      console.error('Error approving document:', error)
    }
  }

  const handleReject = async (docId: string) => {
    const reason = prompt('Raison du rejet :')
    if (!reason) return
    
    try {
      // API call
      console.log('Reject document:', docId, reason)
    } catch (error) {
      console.error('Error rejecting document:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">12</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expirés</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">3</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approuvés (30j)</p>
              <p className="text-2xl font-bold text-green-600 mt-1">45</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejetés (30j)</p>
              <p className="text-2xl font-bold text-red-600 mt-1">2</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher par nom, type ou numéro..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as DocumentStatus | 'ALL')}
              >
                <option value="ALL">Tous les statuts</option>
                <option value={DocumentStatus.PENDING}>En attente</option>
                <option value={DocumentStatus.APPROVED}>Approuvé</option>
                <option value={DocumentStatus.REJECTED}>Rejeté</option>
                <option value={DocumentStatus.EXPIRED}>Expiré</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Tout exporter
            </button>
          </div>
        </div>

        {/* Table des documents */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chauffeur
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type de document
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Numéro
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiration
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDocuments.map((doc) => {
                const statusConfig = getStatusConfig(doc.status)
                const isExpired = doc.expiresAt && new Date(doc.expiresAt) < new Date()
                
                return (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        {doc.driver?.user?.firstName} {doc.driver?.user?.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {doc.driver?.user?.phone}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="font-medium">{getDocTypeLabel(doc.docType)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {doc.docNumber}
                      </code>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className={isExpired ? 'text-red-600 font-medium' : 'text-gray-700'}>
                          {doc.expiresAt ? new Date(doc.expiresAt).toLocaleDateString() : 'N/A'}
                        </span>
                        {isExpired && (
                          <AlertTriangle className="h-4 w-4 text-red-500 ml-2" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                        {statusConfig.icon}
                        <span className="ml-1.5">{statusConfig.label}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => window.open(doc.fileUrl, '_blank')}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="Voir le document"
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </button>
                        
                        <button
                          onClick={() => doc.fileUrl && window.open(doc.fileUrl, '_blank')}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="Télécharger"
                        >
                          <Download className="h-4 w-4 text-green-600" />
                        </button>
                        
                        {doc.status === DocumentStatus.PENDING && (
                          <>
                            <button
                              onClick={() => handleApprove(doc.id)}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium"
                            >
                              Approuver
                            </button>
                            <button
                              onClick={() => handleReject(doc.id)}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium"
                            >
                              Rejeter
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document trouvé</h3>
            <p className="text-gray-600">Aucun document ne correspond à vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentValidation