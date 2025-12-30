'use client'

import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Star, 
  User,
  Clock,
  MessageSquare,
  CheckCircle,
  XCircle,
  Flag,
  ThumbsUp,
  ThumbsDown,
  MoreVertical,
  TrendingUp,
  AlertCircle,
  Send,
  Eye,
  Trash2
} from 'lucide-react'

interface Review {
  id: string
  passengerId: string
  passengerName: string
  passengerPhone: string
  driverId: string
  driverName: string
  rideId: string
  rating: number
  comment: string
  date: Date
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  reported: boolean
  adminResponse?: string
  responseDate?: Date
  likes: number
  dislikes: number
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL')
  const [ratingFilter, setRatingFilter] = useState<number | 'ALL'>('ALL')
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [adminResponse, setAdminResponse] = useState('')

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      // Simulation d'API
      const mockReviews: Review[] = [
        {
          id: '1',
          passengerId: 'passenger1',
          passengerName: 'Jean Dubois',
          passengerPhone: '+225 07 00 11 22',
          driverId: 'driver1',
          driverName: 'Paul Martin',
          rideId: 'ride1',
          rating: 5,
          comment: 'Excellent service ! Le chauffeur était très ponctuel et professionnel. La voiture était propre et confortable. Je recommande vivement.',
          date: new Date('2024-01-15T09:15:00'),
          status: 'APPROVED',
          reported: false,
          likes: 12,
          dislikes: 0
        },
        {
          id: '2',
          passengerId: 'passenger2',
          passengerName: 'Marie Leroy',
          passengerPhone: '+225 07 33 44 55',
          driverId: 'driver2',
          driverName: 'Sophie Bernard',
          rideId: 'ride2',
          rating: 2,
          comment: 'Chauffeur en retard de 25 minutes. La voiture était sale et sentait la cigarette. Très déçu de l\'expérience.',
          date: new Date('2024-01-14T16:30:00'),
          status: 'PENDING',
          reported: true,
          adminResponse: 'Nous avons contacté le chauffeur concerné pour lui rappeler nos standards de qualité.',
          responseDate: new Date('2024-01-14T18:00:00'),
          likes: 3,
          dislikes: 8
        },
        {
          id: '3',
          passengerId: 'passenger3',
          passengerName: 'Thomas Petit',
          passengerPhone: '+225 07 66 77 88',
          driverId: 'driver3',
          driverName: 'Jacques Dupont',
          rideId: 'ride3',
          rating: 4,
          comment: 'Bon service globalement. Le trajet s\'est bien passé mais le chauffeur parlait un peu trop fort au téléphone.',
          date: new Date('2024-01-13T11:20:00'),
          status: 'APPROVED',
          reported: false,
          likes: 7,
          dislikes: 1
        },
        {
          id: '4',
          passengerId: 'passenger4',
          passengerName: 'Julie Moreau',
          passengerPhone: '+225 07 99 00 11',
          driverId: 'driver4',
          driverName: 'Michel Blanc',
          rideId: 'ride4',
          rating: 1,
          comment: 'Le pire service que j\'ai jamais eu ! Le chauffeur a pris un itinéraire beaucoup trop long et a été grossier.',
          date: new Date('2024-01-12T19:45:00'),
          status: 'REJECTED',
          reported: true,
          adminResponse: 'Nous avons suspendu temporairement le chauffeur en attendant une enquête complète.',
          responseDate: new Date('2024-01-13T09:00:00'),
          likes: 1,
          dislikes: 15
        }
      ]
      setReviews(mockReviews)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.passengerName.toLowerCase().includes(search.toLowerCase()) ||
      review.driverName.toLowerCase().includes(search.toLowerCase()) ||
      review.comment.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || review.status === statusFilter
    
    const matchesRating = ratingFilter === 'ALL' || review.rating === ratingFilter

    return matchesSearch && matchesStatus && matchesRating
  })

  const calculateStats = () => {
    const totalReviews = reviews.length
    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    const pendingReviews = reviews.filter(r => r.status === 'PENDING').length
    const reportedReviews = reviews.filter(r => r.reported).length
    const approvedReviews = reviews.filter(r => r.status === 'APPROVED').length
    
    return {
      totalReviews,
      avgRating,
      pendingReviews,
      reportedReviews,
      approvedReviews,
      responseRate: Math.round((reviews.filter(r => r.adminResponse).length / totalReviews) * 100)
    }
  }

  const stats = calculateStats()

  const handleApproveReview = (reviewId: string) => {
    if (confirm('Êtes-vous sûr de vouloir approuver cet avis ?')) {
      setReviews(prev => prev.map(r => 
        r.id === reviewId ? { ...r, status: 'APPROVED' } : r
      ))
    }
  }

  const handleRejectReview = (reviewId: string) => {
    const reason = prompt('Raison du rejet :')
    if (reason) {
      setReviews(prev => prev.map(r => 
        r.id === reviewId ? { ...r, status: 'REJECTED', adminResponse: reason } : r
      ))
    }
  }

  const handleSendResponse = (reviewId: string) => {
    if (!adminResponse.trim()) {
      alert('Veuillez saisir une réponse')
      return
    }
    
    setReviews(prev => prev.map(r => 
      r.id === reviewId ? { 
        ...r, 
        adminResponse,
        responseDate: new Date()
      } : r
    ))
    setAdminResponse('')
  }

  const handleDeleteReview = (reviewId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ? Cette action est irréversible.')) {
      setReviews(prev => prev.filter(r => r.id !== reviewId))
    }
  }

  const getStatusConfig = (status: Review['status']) => {
    const config = {
      'PENDING': { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-4 w-4" /> },
      'APPROVED': { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-4 w-4" /> },
      'REJECTED': { color: 'bg-red-100 text-red-800', icon: <XCircle className="h-4 w-4" /> }
    }
    return config[status]
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total avis</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalReviews}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Note moyenne</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.avgRating.toFixed(1)}/5</p>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+0.2 vs mois dernier</span>
              </div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{stats.pendingReviews}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Signalés</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.reportedReviews}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <Flag className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taux réponse</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.responseRate}%</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-full">
              <Send className="h-6 w-6 text-emerald-600" />
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
              placeholder="Rechercher par nom, commentaire..."
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
                <option value="PENDING">En attente</option>
                <option value="APPROVED">Approuvés</option>
                <option value="REJECTED">Rejetés</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value === 'ALL' ? 'ALL' : parseInt(e.target.value))}
              >
                <option value="ALL">Toutes les notes</option>
                <option value="5">5 étoiles</option>
                <option value="4">4 étoiles</option>
                <option value="3">3 étoiles</option>
                <option value="2">2 étoiles</option>
                <option value="1">1 étoile</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Exporter
            </button>
          </div>
        </div>

        {/* Liste des avis */}
        <div className="space-y-6">
          {filteredReviews.map((review) => {
            const statusConfig = getStatusConfig(review.status)
            
            return (
              <div key={review.id} className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Section gauche */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {review.passengerName[0]}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{review.passengerName}</h4>
                            <p className="text-sm text-gray-600">{review.passengerPhone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Pour: {review.driverName}</span>
                          <span>•</span>
                          <span>{new Date(review.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Course #{review.rideId.substring(0, 8)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                          {statusConfig.icon}
                          <span className="ml-1.5">{review.status}</span>
                        </span>
                        {review.reported && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <Flag className="h-3 w-3 mr-1.5" />
                            Signalé
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Note et commentaire */}
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm font-medium text-gray-700">
                          {review.rating}/5
                        </span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-line">{review.comment}</p>
                    </div>

                    {/* Interactions */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{review.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        <span>{review.dislikes}</span>
                      </div>
                    </div>

                    {/* Réponse admin */}
                    {review.adminResponse && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 flex-shrink-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            A
                          </div>
                          <div className="ml-3">
                            <span className="font-medium text-gray-800">Réponse administrateur</span>
                            {review.responseDate && (
                              <div className="text-xs text-gray-500">
                                {new Date(review.responseDate).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700 mt-2">{review.adminResponse}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="lg:w-48">
                    <div className="space-y-2">
                      {review.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleApproveReview(review.id)}
                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approuver
                          </button>
                          <button
                            onClick={() => handleRejectReview(review.id)}
                            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center justify-center"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Rejeter
                          </button>
                        </>
                      )}
                      
                      {!review.adminResponse && (
                        <button
                          onClick={() => setSelectedReview(review)}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Répondre
                        </button>
                      )}
                      
                      <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center">
                        <Eye className="h-4 w-4 mr-2" />
                        Voir détails
                      </button>
                      
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium flex items-center justify-center"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun avis trouvé</h3>
            <p className="text-gray-600">Aucun avis ne correspond à vos critères de recherche.</p>
          </div>
        )}

        {/* Graphiques */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Répartition des notes</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => r.rating === rating).length
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                
                return (
                  <div key={rating} className="flex items-center">
                    <div className="w-20 flex items-center">
                      {renderStars(rating)}
                      <span className="ml-2 text-sm text-gray-700">{rating}</span>
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-12 text-right">
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Avis par statut</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-blue-500" style={{ transform: 'rotate(72deg)' }} />
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-green-500" style={{ transform: 'rotate(144deg)' }} />
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-yellow-500" style={{ transform: 'rotate(216deg)' }} />
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{stats.totalReviews}</div>
                    <div className="text-sm text-gray-600">avis</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{stats.approvedReviews}</div>
                <div className="text-sm text-gray-600">Approuvés</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">{stats.pendingReviews}</div>
                <div className="text-sm text-gray-600">En attente</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">{reviews.filter(r => r.status === 'REJECTED').length}</div>
                <div className="text-sm text-gray-600">Rejetés</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal réponse */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Répondre à l'avis</h3>
              <button
                onClick={() => {
                  setSelectedReview(null)
                  setAdminResponse('')
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {selectedReview.passengerName[0]}
                </div>
                <div className="ml-3">
                  <div className="font-medium text-gray-800">{selectedReview.passengerName}</div>
                  <div className="text-sm text-gray-600">
                    Avis posté le {new Date(selectedReview.date).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-2">
                {renderStars(selectedReview.rating)}
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {selectedReview.rating}/5
                </span>
              </div>
              <p className="text-gray-700">{selectedReview.comment}</p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Votre réponse
              </label>
              <textarea
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Saisissez votre réponse à l'avis..."
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setSelectedReview(null)
                  setAdminResponse('')
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  handleSendResponse(selectedReview.id)
                  setSelectedReview(null)
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Envoyer la réponse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reviews