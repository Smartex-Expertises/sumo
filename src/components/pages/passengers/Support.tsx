'use client'

import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  Calendar,
  Tag,
  Eye,
  MessageCircle,
  ArrowUpRight,
  Download,
  MoreVertical,
  Shield,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Send,
  XCircle,
  BarChart3,
  TrendingUp,
  Users
} from 'lucide-react'

interface SupportTicket {
  id: string
  passengerId: string
  passengerName: string
  passengerEmail: string
  passengerPhone: string
  subject: string
  description: string
  category: 'TECHNICAL' | 'BILLING' | 'RIDE' | 'ACCOUNT' | 'OTHER'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
  assignedTo?: string
  assignedAgent?: string
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
  firstResponseTime?: number // en minutes
  satisfactionRating?: number
  messages: SupportMessage[]
}

interface SupportMessage {
  id: string
  ticketId: string
  sender: 'PASSENGER' | 'AGENT' | 'SYSTEM'
  senderName: string
  content: string
  timestamp: Date
  attachments?: string[]
}

const Support = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'>('ALL')
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL')
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL')
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      // Simulation d'API
      const mockTickets: SupportTicket[] = [
        {
          id: '1',
          passengerId: 'passenger1',
          passengerName: 'Jean Dubois',
          passengerEmail: 'jean@example.com',
          passengerPhone: '+225 07 00 11 22',
          subject: 'Problème de paiement',
          description: 'Mon paiement a été débité deux fois pour la même course. J\'ai besoin d\'un remboursement urgent.',
          category: 'BILLING',
          priority: 'URGENT',
          status: 'IN_PROGRESS',
          assignedTo: 'agent1',
          assignedAgent: 'Marie Tech',
          createdAt: new Date('2024-01-15T14:30:00'),
          updatedAt: new Date('2024-01-15T15:15:00'),
          firstResponseTime: 45,
          messages: [
            {
              id: 'm1',
              ticketId: '1',
              sender: 'PASSENGER',
              senderName: 'Jean Dubois',
              content: 'Bonjour, mon compte a été débité deux fois pour la course de ce matin. Pouvez-vous vérifier et procéder au remboursement ?',
              timestamp: new Date('2024-01-15T14:30:00')
            },
            {
              id: 'm2',
              ticketId: '1',
              sender: 'AGENT',
              senderName: 'Marie Tech',
              content: 'Bonjour Jean, nous avons bien reçu votre demande. Notre équipe financière est en train d\'examiner le problème. Vous recevrez une réponse dans les 24 heures.',
              timestamp: new Date('2024-01-15T15:15:00')
            }
          ]
        },
        {
          id: '2',
          passengerId: 'passenger2',
          passengerName: 'Marie Leroy',
          passengerEmail: 'marie@example.com',
          passengerPhone: '+225 07 33 44 55',
          subject: 'Application plante',
          description: 'L\'application se ferme automatiquement quand j\'essaie de demander une course. Déjà réinstallée 3 fois.',
          category: 'TECHNICAL',
          priority: 'HIGH',
          status: 'OPEN',
          createdAt: new Date('2024-01-15T09:45:00'),
          updatedAt: new Date('2024-01-15T09:45:00'),
          messages: [
            {
              id: 'm3',
              ticketId: '2',
              sender: 'PASSENGER',
              senderName: 'Marie Leroy',
              content: 'Bonjour, l\'application plante systématiquement quand je clique sur "Demander une course". J\'ai un iPhone 12 avec iOS 17.2.',
              timestamp: new Date('2024-01-15T09:45:00')
            }
          ]
        },
        {
          id: '3',
          passengerId: 'passenger3',
          passengerName: 'Thomas Petit',
          passengerEmail: 'thomas@example.com',
          passengerPhone: '+225 07 66 77 88',
          subject: 'Chauffeur problématique',
          description: 'Le chauffeur était très impoli et a refusé de me déposer à l\'adresse exacte.',
          category: 'RIDE',
          priority: 'MEDIUM',
          status: 'RESOLVED',
          assignedTo: 'agent2',
          assignedAgent: 'Paul Support',
          createdAt: new Date('2024-01-14T18:20:00'),
          updatedAt: new Date('2024-01-14T19:30:00'),
          resolvedAt: new Date('2024-01-14T19:30:00'),
          firstResponseTime: 25,
          satisfactionRating: 4,
          messages: [
            {
              id: 'm4',
              ticketId: '3',
              sender: 'PASSENGER',
              senderName: 'Thomas Petit',
              content: 'Bonjour, j\'ai eu une mauvaise expérience avec un chauffeur qui a été très désagréable.',
              timestamp: new Date('2024-01-14T18:20:00')
            },
            {
              id: 'm5',
              ticketId: '3',
              sender: 'AGENT',
              senderName: 'Paul Support',
              content: 'Bonjour Thomas, nous sommes désolés pour cette expérience. Pouvez-vous nous donner plus de détails (numéro de course, heure, description) ?',
              timestamp: new Date('2024-01-14T18:45:00')
            },
            {
              id: 'm6',
              ticketId: '3',
              sender: 'PASSENGER',
              senderName: 'Thomas Petit',
              content: 'Course #TRIP789 à 17h30. Le chauffeur a refusé de m\'attendre 2 minutes et a été grossier.',
              timestamp: new Date('2024-01-14T19:00:00')
            },
            {
              id: 'm7',
              ticketId: '3',
              sender: 'AGENT',
              senderName: 'Paul Support',
              content: 'Merci pour ces informations. Nous avons suspendu le chauffeur temporairement et procédé à un remboursement de 50% de votre course.',
              timestamp: new Date('2024-01-14T19:30:00')
            }
          ]
        },
        {
          id: '4',
          passengerId: 'passenger4',
          passengerName: 'Julie Moreau',
          passengerEmail: 'julie@example.com',
          passengerPhone: '+225 07 99 00 11',
          subject: 'Changement d\'email',
          description: 'Je ne reçois pas l\'email de confirmation pour changer mon adresse email.',
          category: 'ACCOUNT',
          priority: 'LOW',
          status: 'CLOSED',
          assignedTo: 'agent1',
          assignedAgent: 'Marie Tech',
          createdAt: new Date('2024-01-13T11:10:00'),
          updatedAt: new Date('2024-01-13T12:00:00'),
          resolvedAt: new Date('2024-01-13T12:00:00'),
          firstResponseTime: 15,
          satisfactionRating: 5,
          messages: [
            {
              id: 'm8',
              ticketId: '4',
              sender: 'PASSENGER',
              senderName: 'Julie Moreau',
              content: 'Bonjour, je n\'arrive pas à changer mon email. L\'email de confirmation n\'arrive jamais.',
              timestamp: new Date('2024-01-13T11:10:00')
            },
            {
              id: 'm9',
              ticketId: '4',
              sender: 'AGENT',
              senderName: 'Marie Tech',
              content: 'Bonjour Julie, vérifiez votre dossier spam. Sinon, nous pouvons vous envoyer manuellement le lien de confirmation.',
              timestamp: new Date('2024-01-13T11:25:00')
            },
            {
              id: 'm10',
              ticketId: '4',
              sender: 'PASSENGER',
              senderName: 'Julie Moreau',
              content: 'C\'était bien dans les spams ! Problème résolu, merci.',
              timestamp: new Date('2024-01-13T11:45:00')
            }
          ]
        }
      ]
      setTickets(mockTickets)
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.passengerName.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(search.toLowerCase()) ||
      ticket.passengerEmail.toLowerCase().includes(search.toLowerCase()) ||
      ticket.passengerPhone.includes(search)

    const matchesStatus = statusFilter === 'ALL' || ticket.status === statusFilter
    
    const matchesPriority = priorityFilter === 'ALL' || ticket.priority === priorityFilter
    
    const matchesCategory = categoryFilter === 'ALL' || ticket.category === categoryFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const calculateStats = () => {
    const totalTickets = tickets.length
    const openTickets = tickets.filter(t => t.status === 'OPEN').length
    const inProgressTickets = tickets.filter(t => t.status === 'IN_PROGRESS').length
    const resolvedTickets = tickets.filter(t => t.status === 'RESOLVED' || t.status === 'CLOSED').length
    const urgentTickets = tickets.filter(t => t.priority === 'URGENT').length
    
    const avgResponseTime = tickets
      .filter(t => t.firstResponseTime)
      .reduce((sum, t) => sum + (t.firstResponseTime || 0), 0) / 
      tickets.filter(t => t.firstResponseTime).length
    
    const avgSatisfaction = tickets
      .filter(t => t.satisfactionRating)
      .reduce((sum, t) => sum + (t.satisfactionRating || 0), 0) / 
      tickets.filter(t => t.satisfactionRating).length
    
    return {
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      urgentTickets,
      avgResponseTime: Math.round(avgResponseTime),
      avgSatisfaction: avgSatisfaction.toFixed(1)
    }
  }

  const stats = calculateStats()

  const getStatusConfig = (status: SupportTicket['status']) => {
    const config = {
      'OPEN': { color: 'bg-red-100 text-red-800', icon: <AlertCircle className="h-4 w-4" /> },
      'IN_PROGRESS': { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-4 w-4" /> },
      'RESOLVED': { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-4 w-4" /> },
      'CLOSED': { color: 'bg-gray-100 text-gray-800', icon: <Shield className="h-4 w-4" /> }
    }
    return config[status]
  }

  const getPriorityConfig = (priority: SupportTicket['priority']) => {
    const config = {
      'URGENT': { color: 'bg-red-100 text-red-800', label: 'Urgent' },
      'HIGH': { color: 'bg-orange-100 text-orange-800', label: 'Haute' },
      'MEDIUM': { color: 'bg-yellow-100 text-yellow-800', label: 'Moyenne' },
      'LOW': { color: 'bg-blue-100 text-blue-800', label: 'Basse' }
    }
    return config[priority]
  }

  const getCategoryConfig = (category: SupportTicket['category']) => {
    const config = {
      'TECHNICAL': { color: 'bg-purple-100 text-purple-800', label: 'Technique' },
      'BILLING': { color: 'bg-emerald-100 text-emerald-800', label: 'Facturation' },
      'RIDE': { color: 'bg-blue-100 text-blue-800', label: 'Course' },
      'ACCOUNT': { color: 'bg-pink-100 text-pink-800', label: 'Compte' },
      'OTHER': { color: 'bg-gray-100 text-gray-800', label: 'Autre' }
    }
    return config[category]
  }

  const handleAssignTicket = (ticketId: string) => {
    const agent = prompt('Nom de l\'agent à assigner :')
    if (agent) {
      setTickets(prev => prev.map(t => 
        t.id === ticketId ? { 
          ...t, 
          assignedTo: 'agentX',
          assignedAgent: agent,
          status: 'IN_PROGRESS'
        } : t
      ))
    }
  }

  const handleResolveTicket = (ticketId: string) => {
    if (confirm('Marquer ce ticket comme résolu ?')) {
      setTickets(prev => prev.map(t => 
        t.id === ticketId ? { 
          ...t, 
          status: 'RESOLVED',
          resolvedAt: new Date()
        } : t
      ))
    }
  }

  const handleSendMessage = (ticketId: string) => {
    if (!newMessage.trim()) {
      alert('Veuillez saisir un message')
      return
    }
    
    const newMsg: SupportMessage = {
      id: `msg${Date.now()}`,
      ticketId,
      sender: 'AGENT',
      senderName: 'Admin',
      content: newMessage,
      timestamp: new Date()
    }
    
    setTickets(prev => prev.map(t => 
      t.id === ticketId ? { 
        ...t, 
        messages: [...t.messages, newMsg],
        updatedAt: new Date()
      } : t
    ))
    
    setNewMessage('')
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total tickets</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalTickets}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ouverts</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.openTickets}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En cours</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.inProgressTickets}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Résolus</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.resolvedTickets}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Urgents</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.urgentTickets}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Temps réponse</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{stats.avgResponseTime} min</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.avgSatisfaction}/5</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-full">
              <ThumbsUp className="h-6 w-6 text-emerald-600" />
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
              placeholder="Rechercher par nom, sujet, email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="ALL">Tous les statuts</option>
                <option value="OPEN">Ouverts</option>
                <option value="IN_PROGRESS">En cours</option>
                <option value="RESOLVED">Résolus</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as any)}
              >
                <option value="ALL">Toutes priorités</option>
                <option value="URGENT">Urgent</option>
                <option value="HIGH">Haute</option>
                <option value="MEDIUM">Moyenne</option>
                <option value="LOW">Basse</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="ALL">Toutes catégories</option>
                <option value="TECHNICAL">Technique</option>
                <option value="BILLING">Facturation</option>
                <option value="RIDE">Course</option>
                <option value="ACCOUNT">Compte</option>
                <option value="OTHER">Autre</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </button>
          </div>
        </div>

        {/* Table des tickets */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Passager
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sujet
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priorité
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
              {filteredTickets.map((ticket) => {
                const statusConfig = getStatusConfig(ticket.status)
                const priorityConfig = getPriorityConfig(ticket.priority)
                const categoryConfig = getCategoryConfig(ticket.category)
                
                return (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-mono text-sm text-gray-500 mb-1">
                        #{ticket.id}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {ticket.messages.length} messages
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {ticket.passengerName[0]}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{ticket.passengerName}</div>
                          <div className="text-sm text-gray-600">{ticket.passengerPhone}</div>
                          <div className="text-sm text-gray-500 truncate max-w-[150px]">{ticket.passengerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{ticket.subject}</div>
                      <div className="text-sm text-gray-600 truncate max-w-[200px]">{ticket.description}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryConfig.color}`}>
                        {categoryConfig.label}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${priorityConfig.color}`}>
                        {priorityConfig.label}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                          {statusConfig.icon}
                          <span className="ml-1.5">{ticket.status}</span>
                        </span>
                      </div>
                      {ticket.assignedAgent && (
                        <div className="text-xs text-gray-500 mt-1">
                          Assigné à: {ticket.assignedAgent}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedTicket(ticket)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="Ouvrir"
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </button>
                        
                        {!ticket.assignedTo && (
                          <button 
                            onClick={() => handleAssignTicket(ticket.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            title="Assigner"
                          >
                            <User className="h-4 w-4 text-green-600" />
                          </button>
                        )}
                        
                        {ticket.status !== 'RESOLVED' && ticket.status !== 'CLOSED' && (
                          <button 
                            onClick={() => handleResolveTicket(ticket.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            title="Résoudre"
                          >
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                          </button>
                        )}
                        
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="h-5 w-5 text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun ticket trouvé</h3>
            <p className="text-gray-600">Aucun ticket ne correspond à vos critères de recherche.</p>
          </div>
        )}

        {/* Graphiques */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Tickets par statut</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-red-500" />
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-yellow-500" style={{ transform: 'rotate(90deg)' }} />
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-green-500" style={{ transform: 'rotate(180deg)' }} />
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-gray-500" style={{ transform: 'rotate(270deg)' }} />
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{stats.totalTickets}</div>
                    <div className="text-sm text-gray-600">tickets</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">{stats.openTickets}</div>
                <div className="text-sm text-gray-600">Ouverts</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">{stats.inProgressTickets}</div>
                <div className="text-sm text-gray-600">En cours</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{stats.resolvedTickets}</div>
                <div className="text-sm text-gray-600">Résolus</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-600">{tickets.filter(t => t.status === 'CLOSED').length}</div>
                <div className="text-sm text-gray-600">Fermés</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Tickets par catégorie</h3>
            <div className="space-y-3">
              {['TECHNICAL', 'BILLING', 'RIDE', 'ACCOUNT', 'OTHER'].map((category) => {
                const count = tickets.filter(t => t.category === category).length
                const percentage = tickets.length > 0 ? (count / tickets.length) * 100 : 0
                const catConfig = getCategoryConfig(category as SupportTicket['category'])
                
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${catConfig.color.split(' ')[0]} mr-3`} />
                      <span className="text-sm text-gray-700">{catConfig.label}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: catConfig.color.split(' ')[0].replace('bg-', '').split('-')[1]
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal détails ticket */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Ticket #{selectedTicket.id}</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusConfig(selectedTicket.status).color}`}>
                      {getStatusConfig(selectedTicket.status).icon}
                      <span className="ml-1.5">{selectedTicket.status}</span>
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityConfig(selectedTicket.priority).color}`}>
                      {getPriorityConfig(selectedTicket.priority).label}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryConfig(selectedTicket.category).color}`}>
                      {getCategoryConfig(selectedTicket.category).label}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Contenu scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Infos passager */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Informations passager</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Nom</div>
                      <div className="font-medium">{selectedTicket.passengerName}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <div className="font-medium">{selectedTicket.passengerEmail}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Téléphone</div>
                      <div className="font-medium">{selectedTicket.passengerPhone}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 mb-3">Conversation</h4>
                {selectedTicket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${
                      message.sender === 'AGENT'
                        ? 'bg-blue-50 border border-blue-100 ml-8'
                        : message.sender === 'SYSTEM'
                        ? 'bg-gray-50 border border-gray-100'
                        : 'bg-white border border-gray-200 mr-8'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                          message.sender === 'AGENT'
                            ? 'bg-gradient-to-r from-indigo-500 to-indigo-600'
                            : message.sender === 'SYSTEM'
                            ? 'bg-gradient-to-r from-gray-500 to-gray-600'
                            : 'bg-gradient-to-r from-blue-500 to-blue-600'
                        }`}>
                          {message.sender === 'AGENT' ? 'A' : message.sender === 'SYSTEM' ? 'S' : selectedTicket.passengerName[0]}
                        </div>
                        <div className="ml-3">
                          <span className="font-medium text-gray-800">{message.senderName}</span>
                          <div className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      {message.sender === 'PASSENGER' && (
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                          Répondre
                          <ArrowUpRight className="h-3 w-3 ml-1" />
                        </button>
                      )}
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">{message.content}</p>
                  </div>
                ))}
              </div>

              {/* Formulaire réponse */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nouvelle réponse
                </label>
                <textarea
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
                  placeholder="Saisissez votre réponse..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setNewMessage('')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Effacer
                  </button>
                  <button
                    onClick={() => handleSendMessage(selectedTicket.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Créé le {new Date(selectedTicket.createdAt).toLocaleString()}
                  {selectedTicket.resolvedAt && (
                    <span className="ml-4">
                      Résolu le {new Date(selectedTicket.resolvedAt).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex space-x-3">
                  {!selectedTicket.assignedTo && (
                    <button
                      onClick={() => handleAssignTicket(selectedTicket.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      S'assigner
                    </button>
                  )}
                  {selectedTicket.status !== 'RESOLVED' && selectedTicket.status !== 'CLOSED' && (
                    <button
                      onClick={() => handleResolveTicket(selectedTicket.id)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                    >
                      Marquer comme résolu
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Support