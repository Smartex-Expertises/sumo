# 🔧 Corrections WebSocket - Notifications Chauffeurs

## 🐛 Problèmes identifiés

### 1. **Incohérence des namespaces**
- **NotificationsGateway** écoutait sur `/ws`
- **RidesGateway** écoutait sur le namespace par défaut (aucun)
- Le client se connectait uniquement à `/ws`, ne recevant que les événements du NotificationsGateway

### 2. **Reconnexions infinies**
- Le client avait `reconnectionAttempts: Infinity`
- Causait des tentatives sans fin : 11, 12, 13, 14, 15...
- Aucun feedback clair d'échec de connexion

### 3. **Délai de 5 secondes**
- Les événements `ride.requested` étaient émis avec un délai de 5 secondes
- Retardait inutilement les notifications aux chauffeurs
- Pouvait causer des problèmes si la connexion n'était pas encore stable

### 4. **Manque de fallback transport**
- Le client utilisait uniquement `['websocket']`
- Pas de fallback vers polling en cas de problème WebSocket

## ✅ Corrections apportées

### Backend

#### 1. **[rides.gateway.ts](g:\SumoMobility\backend\src\modules\rides\gateways\rides.gateway.ts#L26-L32)**
```typescript
@WebSocketGateway({
  namespace: '/ws', // ✅ Ajout du namespace pour cohérence
  cors: {
    origin: '*',
    credentials: true,
  },
})
```

#### 2. **[rides.service.ts](g:\SumoMobility\backend\src\modules\rides\rides.service.ts#L278-L302)**
```typescript
// ✅ Émission immédiate au lieu d'un délai de 5 secondes
this.eventEmitter.emit('ride.requested', {
  rideId: ride.id,
  clientId: ride.clientId,
  // ... autres données
  driverUserIds: targetDriverUserIds,
});
```

### Frontend

#### 1. **[WebSocketService.ts](g:\SumoMobility\frontend\src\service\WebSocketService.ts#L50-L64)**
```typescript
this.socket = io(WS_URL, {
  auth: { token },
  transports: ['websocket', 'polling'], // ✅ Ajout du polling en fallback
  reconnection: true,
  reconnectionDelay: 2000, // ✅ Augmenté à 2 secondes
  reconnectionDelayMax: 10000, // ✅ Augmenté à 10 secondes
  reconnectionAttempts: 5, // ✅ Limité à 5 tentatives
  timeout: 30000, // ✅ Augmenté à 30 secondes
  autoConnect: true,
  query: {
    userId,
    role,
  },
});
```

#### 2. **Meilleure gestion des erreurs**
```typescript
this.socket.on('connect_error', (error) => {
  console.log('❌ Erreur connexion WebSocket:', error.message);
  console.log('📋 Détails erreur:', error);

  if (this.reconnectAttempts <= this.maxReconnectAttempts) {
    console.log(`🔄 Tentative ${this.reconnectAttempts}/${this.maxReconnectAttempts}...`);
  } else {
    console.log(`❌ Échec après ${this.maxReconnectAttempts} tentatives`);
    this.notifyListeners('ws:connection_failed', { error: error.message });
  }
});
```

## 🧪 Comment tester

### 1. **Redémarrer le backend**
```bash
cd backend
npm run start:dev
```

Vérifiez les logs :
```
✅ WebSocket Gateway complètement initialisé
📦 NotificationsGateway - Module initialisé
```

### 2. **Redémarrer le frontend**
```bash
cd frontend
npm start
```

### 3. **Tester la connexion côté chauffeur**

1. Se connecter en tant que **chauffeur**
2. Vérifier les logs dans la console :
   ```
   🔌 Connexion WebSocket vers: http://192.168.1.67:3000/ws
   🔑 Token: présent
   👤 UserId: [id du chauffeur]
   👔 Role: DRIVER
   ✅ WebSocket connecté: [socket id]
   ✅ User [userId] (DRIVER) authentifié et a rejoint user:[userId]
   ```

### 4. **Tester une demande de course**

1. Ouvrir un deuxième appareil/simulateur en tant que **client**
2. Créer une nouvelle course
3. Vérifier les logs côté chauffeur :
   ```
   📨 Événement WebSocket reçu: ride.request
   ```

### 5. **Logs backend attendus**

```
📢 Événement ride.requested reçu pour ride [rideId], notifiant [N] chauffeurs
🏠 Rooms actives: user:[userId1], user:[userId2], ...
📤 Émission ride.request vers room user:[driverId] (existe: true)
```

## 🔍 Diagnostics en cas de problème

### Erreur : "websocket error"

**Causes possibles :**
1. Le backend n'est pas démarré
2. L'adresse IP a changé (vérifier [client.ts](g:\SumoMobility\frontend\src\api\client.ts#L6))
3. Problème de firewall
4. Token JWT expiré ou invalide

**Solutions :**
```bash
# Vérifier que le backend écoute
netstat -an | findstr :3000

# Vérifier les logs backend
# Chercher : "Socket connecté" ou "Socket WITHOUT token"
```

### Erreur : "Token invalide"

**Solution :**
1. Se déconnecter de l'app
2. Se reconnecter
3. Vérifier que le token est bien dans SecureStore

### Chauffeur ne reçoit pas les notifications

**Vérifications :**

1. **Chauffeur est en ligne ?**
   ```sql
   SELECT activityStatus FROM DriverProfile WHERE userId = '[driverId]';
   -- Doit être: ONLINE
   ```

2. **Véhicule disponible ?**
   ```sql
   SELECT status, verified FROM Vehicle WHERE driverProfileId = '[driverProfileId]';
   -- status: AVAILABLE, verified: true
   ```

3. **Room WebSocket ?**
   - Vérifier les logs : `🏠 Rooms actives`
   - Doit contenir : `user:[driverId]`

4. **Le chauffeur est dans la liste des 5 ?**
   - Vérifier les logs : `UserIds des chauffeurs`

## 📊 Architecture WebSocket

```
Client (Mobile App)
    ↓
WebSocketService.connect(token, userId, role)
    ↓
Socket.io connexion vers http://192.168.1.67:3000/ws
    ↓
Backend - NotificationsGateway + RidesGateway (namespace: /ws)
    ↓
JWT Validation + userId extraction
    ↓
Client joins room: user:{userId}
    ↓
Client sends: authenticate {userId, role}
    ↓
Ready for events
```

### Flux de notification de course

```
1. Client crée course
      ↓
2. RideService.createRide()
      ↓
3. findAvailableDrivers() → trouve 5 chauffeurs
      ↓
4. eventEmitter.emit('ride.requested', {...5 driverUserIds...})
      ↓
5. NotificationsGateway.handleRideRequested()
      ↓
6. Pour chaque driverUserId:
   server.to(`user:${driverUserId}`).emit('ride.request', data)
      ↓
7. Driver app reçoit 'ride.request'
      ↓
8. Affichage modal de demande de course
```

## 🔗 Fichiers modifiés

- ✅ [backend/src/modules/rides/gateways/rides.gateway.ts](g:\SumoMobility\backend\src\modules\rides\gateways\rides.gateway.ts)
- ✅ [backend/src/modules/rides/rides.service.ts](g:\SumoMobility\backend\src\modules\rides\rides.service.ts)
- ✅ [frontend/src/service/WebSocketService.ts](g:\SumoMobility\frontend\src\service\WebSocketService.ts)

## ⚠️ Notes importantes

1. **Deux gateways, un namespace** : Les deux gateways (NotificationsGateway et RidesGateway) écoutent maintenant sur `/ws`
2. **Émission immédiate** : Les événements sont envoyés immédiatement, sans délai
3. **Limite de reconnexion** : Maximum 5 tentatives de reconnexion au lieu d'infini
4. **Fallback transport** : Si WebSocket échoue, le client essaie le polling HTTP

## 📞 Support

Si le problème persiste après ces corrections, vérifiez :

1. **Network logs** dans React Native Debugger
2. **Backend logs** pour les erreurs d'authentification
3. **Base de données** pour les statuts des chauffeurs
4. **Firewall/réseau** pour les ports bloqués

---

## 🆕 Mise à jour - Notification d'acceptation de course

### Problème supplémentaire identifié

Le client restait bloqué sur l'écran "Recherche en cours..." même après qu'un chauffeur ait accepté la course. L'événement `ride.accepted` ne parvenait pas au client.

### Corrections appliquées

#### Backend

1. **[notifications.gateway.ts:273-316](g:\SumoMobility\backend\src\modules\notifications\notifications.gateway.ts#L273-L316)** - Méthode `emitRideAccepted`
   - Ajout de vérification du serveur avant émission
   - Vérification sécurisée de l'adapter avec `??` operator
   - Log de confirmation après émission de l'événement

2. **[notifications.gateway.ts:342-378](g:\SumoMobility\backend\src\modules\notifications\notifications.gateway.ts#L342-L378)** - Méthode `emitRideStarted`
   - Même pattern de vérification que `emitRideAccepted`
   - Logs de confirmation

#### Frontend

1. **[ClientWaitingDriverScreen.tsx:139-179](g:\SumoMobility\frontend\src\screens\auth\client\ClientWaitingDriverScreen.tsx#L139-L179)** - Handler `handleRideAccepted`
   - Ajout de logs détaillés pour le debugging
   - Affichage du payload complet
   - Logs de navigation

2. **[WebSocketService.ts:278-288](g:\SumoMobility\frontend\src\service\WebSocketService.ts#L278-L288)** - Méthode `on`
   - Log des événements reçus avec leurs arguments
   - Facilite le debugging des événements WebSocket

### Flux complet de notification

```
1. Chauffeur accepte la course
   ↓
2. Backend: RidesService.acceptRide()
   - Met à jour le statut de la course à ACCEPTED
   - Émet l'événement 'ride.accepted' via EventEmitter
   ↓
3. Backend: NotificationsGateway.handleRideAccepted()
   - Reçoit l'événement
   - Récupère les infos de la course depuis Prisma
   - Émet via WebSocket: this.server.to(`user:${clientUserId}`).emit('ride.accepted', {...})
   ↓
4. Frontend: WebSocketService reçoit l'événement
   - Log: "📨 Événement WebSocket reçu: ride.accepted"
   - Appelle tous les callbacks enregistrés
   ↓
5. Frontend: ClientWaitingDriverScreen.handleRideAccepted()
   - Log: "🎉 RIDE.ACCEPTED ÉVÉNEMENT REÇU !!!!"
   - Vérifie le rideId
   - Affiche l'alerte "Chauffeur trouvé !"
   - Navigation vers ClientTrackingDriver (carte)
```

### Tests à effectuer

1. **Redémarrer le backend**
   ```bash
   cd backend
   npm run start:dev
   ```

2. **Logs backend attendus lors de l'acceptation** :
   ```
   🔍 Course acceptée, préparation émission événement
   🔍 clientId: [userId du client]
   🔍 driverId: [driverProfileId]
   🔍 driverName: [Nom du chauffeur]
   📢 Événement ride.accepted reçu pour ride [rideId]
   📤 Émission ride.accepted vers room user:[clientUserId] (existe: true)
   ✅ Événement ride.accepted émis vers user:[clientUserId]
   ```

3. **Logs frontend attendus côté client** :
   ```
   📨 Événement WebSocket reçu: ride.accepted [Object]
   🎉 ========================================
   🎉 RIDE.ACCEPTED ÉVÉNEMENT REÇU !!!!
   🎉 ========================================
   📦 Payload complet: {
     "rideId": "...",
     "driverId": "...",
     "driverName": "..."
   }
   🆔 RideId attendu: [rideId]
   🆔 RideId reçu: [rideId]
   ✅ Course acceptée par: [Nom du chauffeur]
   🚀 Navigation vers ClientTrackingDriver dans 200ms...
   ```

4. **Comportement attendu** :
   - Alerte : "🎉 Chauffeur trouvé ! [Nom] arrive dans quelques minutes"
   - Bouton "Voir le trajet"
   - Navigation automatique vers l'écran de carte
   - Affichage de la position du chauffeur en temps réel

---

**Date de correction** : 2026-01-11
**Dernière mise à jour** : 2026-01-11 22:58
**Testé sur** : NestJS 11.x, Socket.io 4.8.1, React Native (Expo)
