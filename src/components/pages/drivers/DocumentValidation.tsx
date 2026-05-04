'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search, CheckCircle, XCircle, Clock, FileText,
  Eye, AlertTriangle, User, ChevronDown, ChevronUp, RefreshCw
} from 'lucide-react'
import { api } from '@/lib/api'

type DriverStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED'
type DocStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED'

interface Document {
  id: string
  docType: string
  docNumber?: string
  fileUrl?: string
  status: DocStatus
  expiresAt?: string
}

interface Driver {
  id: string
  status: DriverStatus
  licenseNumber?: string
  driverType?: string
  documents: Document[]
  user: {
    firstName: string
    lastName: string
    phone: string
    email: string
  }
  createdAt: string
}

interface Stats { pending: number; approved: number; rejected: number; suspended: number; total: number }

const DOC_LABELS: Record<string, string> = {
  DRIVER_LICENSE: 'Permis de conduire',
  IDENTITY_CARD: "Pièce d'identité",
  VEHICLE_REGISTRATION: 'Carte grise',
  INSURANCE: 'Assurance véhicule',
  PERMIS_DE_CONDUIRE: 'Permis de conduire',
  ASSURANCE: 'Assurance véhicule',
  CARTE_GRISE: 'Carte grise',
  IDENTITY: "Pièce d'identité",
  MEDICAL: 'Certificat médical',
  DRIVING_LICENSE: 'Permis de conduire',
}

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t) }, [onClose])
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
      {type === 'success' ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  )
}

function RejectModal({ driverName, onConfirm, onClose }: { driverName: string; onConfirm: (r: string) => void; onClose: () => void }) {
  const [reason, setReason] = useState('')
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Rejeter le chauffeur</h3>
        <p className="text-sm text-gray-500 mb-4">Motif envoyé à <span className="font-medium">{driverName}</span></p>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-400 focus:border-red-400 resize-none"
          rows={4}
          placeholder="Documents incomplets, photo illisible..."
          value={reason}
          onChange={e => setReason(e.target.value)}
        />
        <div className="flex gap-3 mt-4">
          <button onClick={onClose} className="flex-1 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Annuler</button>
          <button
            disabled={!reason.trim()}
            onClick={() => onConfirm(reason.trim())}
            className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-40"
          >
            Confirmer le rejet
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DocumentValidation() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<DriverStatus | 'ALL'>('PENDING')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [rejectTarget, setRejectTarget] = useState<Driver | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error') => setToast({ message, type })

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: '50' })
      if (statusFilter !== 'ALL') params.set('status', statusFilter)
      if (search.trim()) params.set('search', search.trim())

      const [driversRes, statsRes] = await Promise.all([
        api.get<{ drivers: Driver[] }>(`/admin/drivers?${params}`),
        api.get<Stats>('/admin/drivers/statistics'),
      ])
      setDrivers(driversRes.drivers)
      setStats(statsRes)
    } catch (e: any) {
      showToast(e.message || 'Erreur de chargement', 'error')
    } finally {
      setLoading(false)
    }
  }, [statusFilter, search])

  useEffect(() => { fetchData() }, [fetchData])

  const handleApprove = async (driver: Driver) => {
    if (!confirm(`Approuver ${driver.user.firstName} ${driver.user.lastName} ?`)) return
    setActionLoading(driver.id)
    try {
      await api.put(`/admin/drivers/${driver.id}/approve`, {})
      showToast(`${driver.user.firstName} ${driver.user.lastName} approuvé(e) !`, 'success')
      fetchData()
    } catch (e: any) {
      showToast(e.message || "Erreur lors de l'approbation", 'error')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (driver: Driver, reason: string) => {
    setRejectTarget(null)
    setActionLoading(driver.id)
    try {
      await api.put(`/admin/drivers/${driver.id}/reject`, { reason })
      showToast(`${driver.user.firstName} ${driver.user.lastName} rejeté(e).`, 'success')
      fetchData()
    } catch (e: any) {
      showToast(e.message || 'Erreur lors du rejet', 'error')
    } finally {
      setActionLoading(null)
    }
  }

  const statusConfig: Record<DriverStatus, { color: string; label: string; icon: JSX.Element }> = {
    PENDING:   { color: 'bg-yellow-100 text-yellow-800', label: 'En attente', icon: <Clock className="h-4 w-4" /> },
    APPROVED:  { color: 'bg-green-100 text-green-800',  label: 'Approuvé',   icon: <CheckCircle className="h-4 w-4" /> },
    REJECTED:  { color: 'bg-red-100 text-red-800',      label: 'Rejeté',     icon: <XCircle className="h-4 w-4" /> },
    SUSPENDED: { color: 'bg-orange-100 text-orange-800',label: 'Suspendu',   icon: <AlertTriangle className="h-4 w-4" /> },
  }

  const docStatusConfig: Record<DocStatus, { color: string; label: string }> = {
    PENDING:  { color: 'bg-yellow-100 text-yellow-700', label: 'En attente' },
    APPROVED: { color: 'bg-green-100 text-green-700',   label: 'Approuvé'   },
    REJECTED: { color: 'bg-red-100 text-red-700',       label: 'Rejeté'     },
    EXPIRED:  { color: 'bg-orange-100 text-orange-700', label: 'Expiré'     },
  }

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {rejectTarget && (
        <RejectModal
          driverName={`${rejectTarget.user.firstName} ${rejectTarget.user.lastName}`}
          onConfirm={(r) => handleReject(rejectTarget, r)}
          onClose={() => setRejectTarget(null)}
        />
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'En attente', value: stats?.pending ?? '—', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: <Clock className="h-6 w-6 text-yellow-600" /> },
          { label: 'Approuvés',  value: stats?.approved ?? '—', color: 'text-green-600',  bg: 'bg-green-100',  icon: <CheckCircle className="h-6 w-6 text-green-600" /> },
          { label: 'Rejetés',    value: stats?.rejected ?? '—', color: 'text-red-600',    bg: 'bg-red-100',    icon: <XCircle className="h-6 w-6 text-red-600" /> },
          { label: 'Total',      value: stats?.total    ?? '—', color: 'text-blue-600',   bg: 'bg-blue-100',   icon: <User className="h-6 w-6 text-blue-600" /> },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
            <div className={`${s.bg} p-3 rounded-full`}>{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un chauffeur..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as DriverStatus | 'ALL')}
          >
            <option value="ALL">Tous les statuts</option>
            <option value="PENDING">En attente</option>
            <option value="APPROVED">Approuvés</option>
            <option value="REJECTED">Rejetés</option>
            <option value="SUSPENDED">Suspendus</option>
          </select>
          <button onClick={fetchData} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
            <RefreshCw className="h-4 w-4" /> Actualiser
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          </div>
        ) : drivers.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">Aucun chauffeur trouvé</p>
          </div>
        ) : (
          <div className="space-y-3">
            {drivers.map(driver => {
              const sc = statusConfig[driver.status]
              const isExpanded = expandedId === driver.id
              const isActing = actionLoading === driver.id
              const pendingDocs = driver.documents?.filter(d => d.status === 'PENDING').length ?? 0

              return (
                <div key={driver.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Ligne driver */}
                  <div className="flex items-center justify-between px-5 py-4 hover:bg-gray-50">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {driver.user.firstName[0]}{driver.user.lastName[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {driver.user.firstName} {driver.user.lastName}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{driver.user.phone} · {driver.user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {pendingDocs > 0 && (
                        <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-0.5 rounded-full">
                          {pendingDocs} doc{pendingDocs > 1 ? 's' : ''} en attente
                        </span>
                      )}
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${sc.color}`}>
                        {sc.icon} {sc.label}
                      </span>

                      {driver.status === 'PENDING' && (
                        <>
                          <button
                            disabled={isActing}
                            onClick={() => handleApprove(driver)}
                            className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                          >
                            {isActing ? '...' : 'Approuver'}
                          </button>
                          <button
                            disabled={isActing}
                            onClick={() => setRejectTarget(driver)}
                            className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 disabled:opacity-50"
                          >
                            Rejeter
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : driver.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Documents dépliés */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                      {!driver.documents?.length ? (
                        <p className="text-sm text-gray-400 italic">Aucun document soumis</p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {driver.documents.map(doc => {
                            const ds = docStatusConfig[doc.status]
                            const expired = doc.expiresAt && new Date(doc.expiresAt) < new Date()
                            return (
                              <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-800">
                                    {DOC_LABELS[doc.docType] ?? doc.docType}
                                  </span>
                                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ds.color}`}>{ds.label}</span>
                                </div>
                                {doc.docNumber && (
                                  <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{doc.docNumber}</code>
                                )}
                                {doc.expiresAt && (
                                  <p className={`text-xs flex items-center gap-1 ${expired ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                                    {expired && <AlertTriangle className="h-3 w-3" />}
                                    Expire : {new Date(doc.expiresAt).toLocaleDateString('fr-FR')}
                                  </p>
                                )}
                                {doc.fileUrl && (
                                  <a
                                    href={doc.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                                  >
                                    <Eye className="h-3.5 w-3.5" /> Voir le fichier
                                  </a>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
