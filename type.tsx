// =====================================================
// ENUMS - Définition des valeurs possibles
// =====================================================

export enum UserRole {
  CLIENT = "CLIENT",
  DRIVER = "DRIVER",
  ADMIN = "ADMIN"
}

export enum DriverStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  SUSPENDED = "SUSPENDED",
  REJECTED = "REJECTED"
}

export enum DocumentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED"
}

export enum ReservationStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELED = "CANCELED",
  FULFILLED = "FULFILLED"
}

export enum DriverActivityStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  ON_RIDE = "ON_RIDE"
}

export enum RideStatus {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED"
}

export enum PaymentMethod {
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
  MOBILE_MONEY = "MOBILE_MONEY",
  WALLET = "WALLET"
}

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED"
}

export enum VehicleStatus {
  AVAILABLE = "AVAILABLE",
  IN_USE = "IN_USE",
  MAINTENANCE = "MAINTENANCE",
  INACTIVE = "INACTIVE"
}

export enum NotificationType {
  RIDE_REQUEST = "RIDE_REQUEST",
  RIDE_ACCEPTED = "RIDE_ACCEPTED",
  RIDE_STARTED = "RIDE_STARTED",
  RIDE_COMPLETED = "RIDE_COMPLETED",
  RIDE_CANCELED = "RIDE_CANCELED",
  RESERVATION_REMINDER = "RESERVATION_REMINDER",
  DOCUMENT_EXPIRED = "DOCUMENT_EXPIRED",
  DOCUMENT_APPROVED = "DOCUMENT_APPROVED",
  DOCUMENT_REJECTED = "DOCUMENT_REJECTED",
  PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  DRIVER_APPROVED = "DRIVER_APPROVED",
  SYSTEM_MAINTENANCE = "SYSTEM_MAINTENANCE",
  CARPOOL_REQUEST_RECEIVED = "CARPOOL_REQUEST_RECEIVED",
  CARPOOL_REQUEST_ACCEPTED = "CARPOOL_REQUEST_ACCEPTED",
  CARPOOL_REQUEST_REJECTED = "CARPOOL_REQUEST_REJECTED",
  CARPOOL_REQUEST_EXPIRED = "CARPOOL_REQUEST_EXPIRED",
  CARPOOL_PASSENGER_JOINED = "CARPOOL_PASSENGER_JOINED",
  CARPOOL_PASSENGER_LEFT = "CARPOOL_PASSENGER_LEFT",
  CARPOOL_ROUTE_UPDATED = "CARPOOL_ROUTE_UPDATED",
  CARPOOL_REMINDER = "CARPOOL_REMINDER"
}

export enum NotificationChannel {
  PUSH = "PUSH",
  EMAIL = "EMAIL",
  SMS = "SMS",
  IN_APP = "IN_APP"
}

export enum NotificationStatus {
  PENDING = "PENDING",
  SENT = "SENT",
  FAILED = "FAILED",
  READ = "READ"
}

// =====================================================
// INTERFACES / TYPES PRINCIPAUX
// =====================================================

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  isActive: boolean;
  adminLogs?: AdminLog[];
  reports?: Report[];
  passwordResetCodes?: PasswordResetCode[];
  country?: string;
  city?: string;
  region?: string;
  lastLoginAt?: Date;
  expoPushToken?: string;
  clientProfile?: ClientProfile;
  driverProfile?: DriverProfile;
  createdAt: Date;
  updatedAt: Date;
  notifications?: Notification[];
  preferences?: NotificationPreference[];
}

export interface ClientProfile {
  id: string;
  userId: string;
  user: User;
  preferredPaymentMethod?: PaymentMethod;
  defaultPickupAddress?: string;
  loyaltyPoints: number;
  vipStatus: boolean;
  sharedPassengers?: SharedPassenger[];
  carpoolRequests?: CarpoolRequest[];
  reservations?: Reservation[];
  rides?: Ride[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DriverProfile {
  id: string;
  userId: string;
  user: User;
  status: DriverStatus;
  licenseNumber?: string;
  driverLocation?: DriverLocation;
  driverType?: string;
  workingHours?: string;
  maxRadius?: number;
  rating?: number;
  totalRides: number;
  totalEarnings: number;
  activityStatus: DriverActivityStatus;
  documents?: DriverDocument[];
  vehicles?: Vehicle[];
  rides?: Ride[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DriverDocument {
  id: string;
  driverId: string;
  driver: DriverProfile;
  docType: string;
  docNumber?: string;
  fileUrl?: string;
  status: DocumentStatus;
  expiresAt?: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vehicle {
  id: string;
  driverId: string;
  driver: DriverProfile;
  plateNumber: string;
  brand: string;
  model: string;
  color: string;
  year?: number;
  capacity: number;
  status: VehicleStatus;
  verified: boolean;
  verifiedAt?: Date;
  rides?: Ride[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CancellationCause {
  id: string;
  label: string;
  description?: string;
  active: boolean;
  category?: string;
  rides?: Ride[];
  reservations?: Reservation[];
}

export interface Reservation {
  id: string;
  clientId: string;
  client: ClientProfile;
  scheduledAt: Date;
  status: ReservationStatus;
  pickupAddress?: string;
  destinationAddress?: string;
  pickupLatitude?: number;
  pickupLongitude?: number;
  destinationLatitude?: number;
  destinationLongitude?: number;
  estimatedDistance?: number;
  estimatedPrice?: number;
  passengerCount: number;
  notes?: string;
  isSharedRide: boolean;
  maxSharedPassengers: number;
  currentSharedPassengers: number;
  sharePreference?: string;
  maxDetourMinutes?: number;
  basePrice?: number;
  sharedPricePerPerson?: number;
  totalSavings?: number;
  sharedPassengers?: SharedPassenger[];
  carpoolRequests?: CarpoolRequest[];
  rideId?: string;
  ride?: Ride;
  cancellationCauseId?: string;
  cancellationCause?: CancellationCause;
  canceledAt?: Date;
  payments?: ReservationPayment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SharedPassenger {
  id: string;
  reservationId: string;
  reservation: Reservation;
  passengerId: string;
  passenger: ClientProfile;
  pickupAddress: string;
  destinationAddress: string;
  pickupLatitude?: number;
  pickupLongitude?: number;
  destLatitude?: number;
  destLongitude?: number;
  pickupOrder: number;
  dropoffOrder: number;
  fareShare: number;
  paymentStatus: PaymentStatus;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CarpoolRequest {
  id: string;
  requesterId: string;
  requester: ClientProfile;
  targetReservationId: string;
  targetReservation: Reservation;
  pickupAddress: string;
  destinationAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
  destLatitude: number;
  destLongitude: number;
  routeCompatibility?: number;
  additionalDistance?: number;
  additionalTime?: number;
  estimatedFare: number;
  potentialSavings: number;
  status: string;
  requestMessage?: string;
  responseMessage?: string;
  createdAt: Date;
  expiresAt: Date;
  respondedAt?: Date;
}

export interface Ride {
  id: string;
  clientId: string;
  client: ClientProfile;
  driverId?: string;
  driver?: DriverProfile;
  vehicleId?: string;
  vehicle?: Vehicle;
  rideType?: string;
  pickupAddress?: string;
  destinationAddress?: string;
  pickupLatitude?: number;
  pickupLongitude?: number;
  destinationLatitude?: number;
  destinationLongitude?: number;
  requestedAt?: Date;
  acceptedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  distanceKm?: number;
  durationMinutes?: number;
  baseFare?: number;
  totalFare?: number;
  driverEarnings?: number;
  platformFee?: number;
  passengerCount: number;
  notes?: string;
  status: RideStatus;
  reservation?: Reservation;
  cancellationCauseId?: string;
  cancellationCause?: CancellationCause;
  canceledAt?: Date;
  canceledBy?: string;
  ratings?: Rating[];
  payments?: RidePayment[];
  trackingPoints?: RideTrackingPoint[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RideTrackingPoint {
  id: string;
  rideId: string;
  ride: Ride;
  latitude: number;
  longitude: number;
  speed?: number;
  heading?: number;
  accuracy?: number;
  timestamp: Date;
  altitude?: number;
}

export interface Rating {
  id: string;
  rideId: string;
  ride: Ride;
  score: number;
  comment?: string;
  punctuality?: number;
  cleanliness?: number;
  driving?: number;
  courtesy?: number;
  createdAt: Date;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  processorFee?: number;
  netAmount?: number;
  processedAt?: Date;
  failureReason?: string;
  ridePayments?: RidePayment[];
  reservationPayments?: ReservationPayment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RidePayment {
  rideId: string;
  paymentId: string;
  ride: Ride;
  payment: Payment;
  paymentType: string;
  createdAt: Date;
}

export interface ReservationPayment {
  reservationId: string;
  paymentId: string;
  reservation: Reservation;
  payment: Payment;
  paymentType: string;
  createdAt: Date;
}

export interface NotificationTemplate {
  id: string;
  type: NotificationType;
  channel: NotificationChannel;
  title: string;
  body: string;
  subject?: string;
  variables?: any;
  language: string;
  active: boolean;
  priority: number;
  notifications?: Notification[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  templateId: string;
  template: NotificationTemplate;
  userId: string;
  user: User;
  title: string;
  body: string;
  subject?: string;
  type: NotificationType;
  channel: NotificationChannel;
  status: NotificationStatus;
  priority: number;
  metadata?: any;
  sentAt?: Date;
  readAt?: Date;
  errorMsg?: string;
  attempts: number;
  maxAttempts: number;
  nextRetry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationPreference {
  id: string;
  userId: string;
  user: User;
  type: NotificationType;
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  inAppEnabled: boolean;
  schedule?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceZone {
  id: string;
  name: string;
  description?: string;
  country: string;
  city: string;
  geometry: any;
  baseFare: number;
  perKmRate: number;
  perMinuteRate: number;
  isActive: boolean;
  maxRadius: number;
  operatingHours?: any;
  driverLocations?: DriverLocation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PointOfInterest {
  id: string;
  name: string;
  category: string;
  address?: string;
  description?: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  phone?: string;
  website?: string;
  rating?: number;
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DriverLocation {
  id: string;
  driverId: string;
  driver: DriverProfile;
  latitude: number;
  longitude: number;
  heading?: number;
  speed?: number;
  accuracy?: number;
  isOnline: boolean;
  isAvailable: boolean;
  serviceZoneId?: string;
  currentZone?: ServiceZone;
  lastPing: Date;
  batteryLevel?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SystemConfig {
  id: string;
  key: string;
  value: any;
  description?: string;
  category: string;
  isPublic: boolean;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminLog {
  id: string;
  adminId: string;
  admin: User;
  action: string;
  resource: string;
  resourceId?: string;
  oldValues?: any;
  newValues?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface Report {
  id: string;
  title: string;
  type: string;
  filters?: any;
  dateFrom?: Date;
  dateTo?: Date;
  data: any;
  fileUrl?: string;
  generatedBy: string;
  generator: User;
  createdAt: Date;
}

export interface PasswordResetCode {
  id: string;
  userId: string;
  user: User;
  code: string;
  email: string;
  expiresAt: Date;
  used: boolean;
  attempts: number;
  createdAt: Date;
}

// =====================================================
// TYPES UTILITAIRES
// =====================================================

export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'adminLogs' | 'reports' | 'passwordResetCodes' | 'clientProfile' | 'driverProfile' | 'notifications' | 'preferences'>;
export type UpdateUserInput = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

export type CreateRideInput = Omit<Ride, 'id' | 'createdAt' | 'updatedAt' | 'client' | 'driver' | 'vehicle' | 'reservation' | 'cancellationCause' | 'ratings' | 'payments' | 'trackingPoints'>;
export type UpdateRideInput = Partial<Omit<Ride, 'id' | 'createdAt' | 'updatedAt'>>;

// Types pour les requêtes avec relations
export interface UserWithRelations extends User {
  clientProfile?: ClientProfile & {
    rides?: Ride[];
    reservations?: Reservation[];
  };
  driverProfile?: DriverProfile & {
    vehicles?: Vehicle[];
    documents?: DriverDocument[];
    rides?: Ride[];
  };
}

export interface RideWithRelations extends Ride {
  client: ClientProfile & {
    user: User;
  };
  driver?: DriverProfile & {
    user: User;
  };
  vehicle?: Vehicle;
  reservation?: Reservation;
  ratings?: Rating[];
}

// Types pour les réponses d'API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Types pour les filtres
export interface RideFilter {
  status?: RideStatus;
  clientId?: string;
  driverId?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface DriverFilter {
  status?: DriverStatus;
  activityStatus?: DriverActivityStatus;
  ratingMin?: number;
  ratingMax?: number;
}

// =====================================================
// TYPES POUR LES ÉVÉNEMENTS / WEBSOCKETS
// =====================================================

export interface RideEvent {
  type: 'RIDE_REQUESTED' | 'RIDE_ACCEPTED' | 'RIDE_STARTED' | 'RIDE_COMPLETED' | 'RIDE_CANCELED';
  rideId: string;
  timestamp: Date;
  data: Partial<Ride>;
}

export interface LocationUpdate {
  userId: string;
  latitude: number;
  longitude: number;
  heading?: number;
  speed?: number;
  accuracy?: number;
  timestamp: Date;
}

export interface NotificationEvent {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: any;
}

// =====================================================
// TYPES POUR LES FORMULAIRES / VALIDATION
// =====================================================

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateRideRequest {
  pickupAddress: string;
  destinationAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
  passengerCount?: number;
  rideType?: string;
  notes?: string;
}

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  country?: string;
  city?: string;
  region?: string;
}

// =====================================================
// CONSTANTES
// =====================================================

export const DEFAULT_CURRENCY = "XOF";
export const DEFAULT_RADIUS_KM = 50;
export const DEFAULT_PASSENGER_COUNT = 1;
export const DEFAULT_SHARED_PASSENGERS = 0;
export const MAX_RETRY_ATTEMPTS = 3;