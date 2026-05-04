'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Search, Filter, Phone, Mail, CheckCircle, XCircle,
  Clock, AlertCircle, MapPin, MoreVertical, RefreshCw, ChevronLeft, ChevronRight
} from 'lucide-react'
import { api } from '@/lib/api'

type DriverStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED'

interface Driver {
  id: string
  status: DriverStatus
  licenseNumber?: string
  driverType?: string
  rating?: number
  totalRides: number
  totalEarnings: number
  user: {
    firstName: string
    lastName: string
    phone: string
    email: string
    city?: string
  }
  createdAt: string
}

type Action = 'approve' | 'reject' | 'suspend' | 'activate'

const STATUS_CONFIG: Record<DriverStatus, { color: string; label: string; icon: JSX.Element }> = {
  PENDING:   { color: 'bg-yellow-100 text-yellow-800', label: 'En attente', icon: <Clock className="h-3.5 w-3.5" /> },
  APPROVED:  { color: 'bg-green-100 text-green-800',  label: 'Approuvé',   icon: <CheckCircle className="h-3.5 w-3.5" /> },
  REJECTED:  { color: 'bg-gray-100 text-gray-700',    label: 'Rejeté',     icon: <XCircle className="h-3.5 w-3.5" /> },
  SUSPENDED: { color: 'bg-red-100 text-red-800',      label: 'Suspendu',   icon: <AlertCircle className="h-3.5 w-3.5" /> },
}

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t) }, [onClose])
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
      {type === 'success' ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  )
}

function ActionMenu({ driver, onAction }: { driver: Driver; onAction: (d: Driver, a: Action) => void }) {
  const [open, setOpen] = useState(false)

  const items: { label: string; action: Action; color: string; show: boolean }[] = [
    { label: 'Approuver',  action: 'approve',  color: 'text-green-700', show: driver.status === 'PENDING' || driver.status === 'SUSPENDED' },
    { label: 'Suspendre',  action: 'suspend',  color: 'text-orange-700', show: driver.status === 'APPROVED' },
    { label: 'Réactiver',  action: 'activate', color: 'text-blue-700',   show: driver.status === 'SUSPENDED' || driver.status === 'REJECTED' },
    { label: 'Rejeter',    action: 'reject',   color: 'text-red-700',    show: driver.status === 'PENDING' },
  ].filter(i => i.show)

  if (!items.length) return null

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} className="p-2 hover:bg-gray-100 rounded-lg">
        <MoreVertical className="h-5 w-5 text-gray-500" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 bg-white border border-gray-200 rounded-xl shadow-lg w-40 py-1 overflow-hidden">
            {items.map(i => (
              <button
                key={i.action}
                onClick={() => { setOpen(false); onAction(driver, i.action) }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 font-medium ${i.color}`}
              >
                {i.label}
              </button>
            ))}
          </div>
        </>
      )}
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
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-400 resize-none"
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
            Confirmer
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DriverList() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<DriverStatus | 'ALL'>('ALL')
  const [page, setPage] = useState(1)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [rejectTarget, setRejectTarget] = useState<Driver | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const limit = 15

  const showToast = (message: string, type: 'success' | 'error') => setToast({ message, type })

  const fetchDrivers = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) })
      if (statusFilter !== 'ALL') params.set('status', statusFilter)
      if (search.trim()) params.set('search', search.trim())
      const res = await api.get<{ drivers: Driver[]; total: number }>(`/admin/drivers?${params}`)
      setDrivers(res.drivers)
      setTotal(res.total)
    } catch (e: any) {
      showToast(e.message || 'Erreur de chargement', 'error')
    } finally {
      setLoading(false)
    }
  }, [page, statusFilter, search])

  useEffect(() => { fetchDrivers() }, [fetchDrivers])

  const handleAction = async (driver: Driver, action: Action) => {
    if (action === 'reject') { setRejectTarget(driver); return }
    const labels: Record<Action, string> = {
      approve: 'Approuver', suspend: 'Suspendre', activate: 'Réactiver', reject: 'Rejeter'
    }
    if (!confirm(`${labels[action]} ${driver.user.firstName} ${driver.user.lastName} ?`)) return
    doAction(driver, action)
  }

  const doAction = async (driver: Driver, action: Action, reason?: string) => {
    setActionLoading(driver.id)
    try {
      const path = `/admin/drivers/${driver.id}/${action}`
      const body = reason ? { reason } : {}
      await api.put(path, body)
      const msgs: Record<Action, string> = {
        approve:  `${driver.user.firstName} approuvé(e) !`,
        suspend:  `${driver.user.firstName} suspendu(e).`,
        activate: `${driver.user.firstName} réactivé(e) !`,
        reject:   `${driver.user.firstName} rejeté(e).`,
      }
      showToast(msgs[action], 'success')
      fetchDrivers()
    } catch (e: any) {
      showToast(e.message || 'Erreur', 'error')
    } finally {
      setActionLoading(null)
    }
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {rejectTarget && (
        <RejectModal
          driverName={`${rejectTarget.user.firstName} ${rejectTarget.user.lastName}`}
          onConfirm={r => { const d = rejectTarget; setRejectTarget(null); doAction(d, 'reject', r) }}
          onClose={() => setRejectTarget(null)}
        />
      )}

      {/* Filtres */}
      <div className="p-6 border-b">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Nom, email, téléphone, permis..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-400 shrink-0" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value as DriverStatus | 'ALL'); setPage(1) }}
            >
              <option value="ALL">Tous les statuts</option>
              <option value="PENDING">En attente</option>
              <option value="APPROVED">Approuvés</option>
              <option value="SUSPENDED">Suspendus</option>
              <option value="REJECTED">Rejetés</option>
            </select>
            <button onClick={fetchDrivers} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <RefreshCw className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <div className="text-sm text-gray-500 flex items-center ml-auto">
            {total} chauffeur{total > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-6 text-left">Chauffeur</th>
              <th className="py-3 px-6 text-left">Contact</th>
              <th className="py-3 px-6 text-left">Statut</th>
              <th className="py-3 px-6 text-left">Performance</th>
              <th className="py-3 px-6 text-left">Inscrit le</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={6} className="py-16 text-center">
                <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full mx-auto" />
              </td></tr>
            ) : drivers.length === 0 ? (
              <tr><td colSpan={6} className="py-16 text-center text-gray-400 text-sm">Aucun chauffeur trouvé</td></tr>
            ) : drivers.map(driver => {
              const sc = STATUS_CONFIG[driver.status]
              const isActing = actionLoading === driver.id
              return (
                <tr key={driver.id} className={`hover:bg-gray-50 transition-colors ${isActing ? 'opacity-50' : ''}`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                        {driver.user.firstName[0]}{driver.user.lastName[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {driver.user.firstName} {driver.user.lastName}
                        </p>
                        {driver.user.city && (
                          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3" />{driver.user.city}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <p className="flex items-center gap-2 text-sm text-gray-700">
                        <Phone className="h-3.5 w-3.5 text-gray-400" />{driver.user.phone}
                      </p>
                      <p className="flex items-center gap-2 text-xs text-gray-500">
                        <Mail className="h-3.5 w-3.5 text-gray-400" />{driver.user.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${sc.color}`}>
                      {sc.icon}{sc.label}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-gray-900">{driver.totalRides} courses</p>
                    <p className="text-xs text-gray-500">
                      {driver.rating ? `★ ${driver.rating.toFixed(1)}/5` : 'Pas de note'}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {new Date(driver.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-4 px-6">
                    <ActionMenu driver={driver} onAction={handleAction} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {page} sur {totalPages} · {total} résultats
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium ${p === page ? 'bg-blue-600 text-white' : 'border hover:bg-gray-50 text-gray-700'}`}
                >
                  {p}
                </button>
              )
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
