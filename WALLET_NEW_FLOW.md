# 💰 Nouveau Flux Wallet - Système de Paiement Direct

## 📋 Vue d'ensemble

Le système de wallet fonctionne avec un **modèle de déduction automatique** où le chauffeur paie à l'avance pour accepter des courses. Le client paie directement le chauffeur (cash ou mobile money), et la commission de 15% est automatiquement déduite du wallet du chauffeur.

## 🔄 Flux Complet

### 1️⃣ Rechargement du Wallet

```
Chauffeur veut recharger : 100,000 FCFA
    ↓
[Frontend] RechargeWalletScreen
    - Saisie du montant
    - Sélection Wave ou Orange Money
    - Saisie du numéro de téléphone
    ↓
[Backend] POST /wallet/recharge
    - Vérification méthode de paiement
    - TODO: Appel API Wave/Orange Money
    - Crédit immédiat du wallet (simulation)
    ↓
Wallet chauffeur : balance = 100,000 FCFA
    ↓
✅ Chauffeur peut maintenant accepter des courses
```

**Code impliqué :**
- Frontend: [RechargeWalletScreen.tsx:123-128](g:\SumoMobility\frontend\src\screens\auth\driver\RechargeWalletScreen.tsx#L123-L128)
- Service: [wallet.service.ts:202-211](g:\SumoMobility\frontend\src\api\wallet.service.ts#L202-L211)
- Backend: [wallet.controller.ts:127-142](g:\SumoMobility\backend\src\modules\wallet\wallet.controller.ts#L127-L142)
- Service: [wallet.service.ts:599-654](g:\SumoMobility\backend\src\modules\wallet\wallet.service.ts#L599-L654)

### 2️⃣ Acceptation d'une Course

```
Nouvelle course disponible : 5,000 FCFA
    ↓
Notification envoyée au chauffeur
    ↓
Chauffeur clique "Accepter"
    ↓
[Backend] RidesService.acceptRide()
    ↓
1. Vérification du solde :
   wallet.balance >= 5,000 FCFA ?
    ↓
   ✅ OUI (100,000 >= 5,000) : Continue
   ❌ NON : Erreur "Solde insuffisant. Rechargez..."
    ↓
2. Déduction immédiate :
   balance = 100,000 - 5,000 = 95,000 FCFA
    ↓
3. Transaction wallet créée :
   - type: PAYMENT
   - amount: 5,000 FCFA
   - status: COMPLETED
   - description: "Déduction course #abc12345"
    ↓
4. Course acceptée :
   - status: ACCEPTED
   - driverId: assigned
   - vehicleId: assigned
    ↓
✅ Course assignée au chauffeur
```

**Code impliqué :**
- [rides.service.ts:363-375](g:\SumoMobility\backend\src\modules\rides\rides.service.ts#L363-L375) - Vérification et déduction
- [wallet.service.ts:464-467](g:\SumoMobility\backend\src\modules\wallet\wallet.service.ts#L464-L467) - canAcceptRide()
- [wallet.service.ts:473-512](g:\SumoMobility\backend\src\modules\wallet\wallet.service.ts#L473-L512) - deductRideFare()

### 3️⃣ Course Effectuée

```
Chauffeur arrive au point de départ
    ↓
Démarre la course
    ↓
Conduit le client vers la destination
    ↓
Arrive à destination
    ↓
Client paie 5,000 FCFA DIRECTEMENT au chauffeur
   (Cash OU Wave/Orange Money personnel du chauffeur)
    ↓
Chauffeur possède maintenant : 5,000 FCFA réels
```

**Important :** Le client paie directement au chauffeur, PAS via l'application.

### 4️⃣ Fin de Course - Enregistrement Commission et Gains

```
Chauffeur termine la course dans l'app
    ↓
[Backend] RidesService.completeRide()
    ↓
1. Calcul de la répartition :
   totalFare = 5,000 FCFA
   platformFee (15%) = 750 FCFA
   driverEarnings (85%) = 4,250 FCFA
    ↓
2. Mise à jour DriverProfile :
   - totalRides += 1
   - totalEarnings += 4,250 FCFA
    ↓
3. Enregistrement wallet via recordRideCompletion() :

   a) Transaction COMMISSION créée :
      - type: COMMISSION
      - amount: 750 FCFA
      - status: COMPLETED
      - description: "Commission SUMO (15%)"
      → Vers compte Wave SUMO

   b) Gains ajoutés au pendingBalance :
      - pendingBalance += 4,250 FCFA
      - totalEarned += 4,250 FCFA

   c) Transaction EARNING créée :
      - type: EARNING
      - amount: 4,250 FCFA
      - status: PENDING
      - description: "Gains de la course (85%)"
    ↓
4. Après 24h (1 min en demo) :
   - balance += 4,250 FCFA
   - pendingBalance -= 4,250 FCFA
   - transaction.status = COMPLETED
    ↓
Wallet chauffeur :
  - balance: 95,000 + 4,250 = 99,250 FCFA (après 24h)
  - pendingBalance: 4,250 FCFA (immédiat)
```

**Code impliqué :**
- [rides.service.ts:591-609](g:\SumoMobility\backend\src\modules\rides\rides.service.ts#L591-L609) - Appel recordRideCompletion
- [wallet.service.ts:518-597](g:\SumoMobility\backend\src\modules\wallet\wallet.service.ts#L518-L597) - recordRideCompletion()

## 💸 Répartition des Montants

### Exemple : Course de 5,000 FCFA

| Étape | Balance Wallet | Argent Réel Chauffeur | Commission SUMO | Gains Chauffeur |
|-------|---------------|----------------------|-----------------|-----------------|
| **Départ** | 100,000 FCFA | 0 FCFA | 0 FCFA | 0 FCFA |
| **Acceptation** | **95,000 FCFA** ❌ | 0 FCFA | 0 FCFA | 0 FCFA |
| **Client paie** | 95,000 FCFA | **5,000 FCFA** ✅ | 0 FCFA | 0 FCFA |
| **Fin course** | 95,000 FCFA | 5,000 FCFA | **750 FCFA** ✅ | 4,250 FCFA (pending) |
| **+24h** | **99,250 FCFA** ✅ | 5,000 FCFA | 750 FCFA | **4,250 FCFA** ✅ |

### Bilan Final

| Acteur | Gain/Perte |
|--------|------------|
| **Chauffeur Wallet** | 100,000 → 99,250 FCFA (-750 FCFA) |
| **Chauffeur Réel** | +5,000 FCFA (poche/compte perso) |
| **Chauffeur Net** | +4,250 FCFA ✅ |
| **SUMO** | +750 FCFA (commission 15%) ✅ |
| **Client** | -5,000 FCFA (payé au chauffeur) |

## 🔐 Logique de Protection

### Vérification Avant Acceptation

```typescript
// wallet.service.ts:464-467
async canAcceptRide(driverId: string, rideAmount: number): Promise<boolean> {
  const wallet = await this.getOrCreateWallet(driverId);
  return wallet.balance.toNumber() >= rideAmount;
}
```

### Blocage Si Solde Insuffisant

```typescript
// rides.service.ts:363-371
const canAccept = await this.walletService.canAcceptRide(driverProfile.id, totalFare);

if (!canAccept) {
  throw new BadRequestException(
    `Solde insuffisant. Rechargez votre wallet de ${totalFare} FCFA pour accepter cette course.`
  );
}
```

### Notification de Solde Bas

Le chauffeur ne recevra **pas** de notifications de courses si son solde est insuffisant. Il doit recharger son wallet pour continuer à recevoir des demandes.

## 📊 États du Wallet

### Structure Wallet

```typescript
{
  balance: 99250,          // Disponible pour accepter des courses
  pendingBalance: 4250,    // En attente de validation (24h)
  totalEarned: 4250,       // Total cumulé des gains
  totalWithdrawn: 0        // Total retiré
}
```

### Types de Transactions

| Type | Description | Impact Balance | Impact PendingBalance |
|------|-------------|----------------|----------------------|
| **PAYMENT** | Déduction à l'acceptation | -totalFare | 0 |
| **COMMISSION** | Commission SUMO (15%) | 0 | 0 (tracking seulement) |
| **EARNING** | Gains chauffeur (85%) | 0 (+après 24h) | +driverEarnings |
| **WITHDRAWAL** | Retrait vers Wave/OM | -amount | 0 |

## 🚀 API Endpoints

### POST /wallet/recharge
**Recharger le wallet du chauffeur**

**Body:**
```json
{
  "amount": 100000,
  "paymentMethodId": "pm_123",
  "note": "Rechargement via Wave"
}
```

**Response:**
```json
{
  "id": "tx_abc",
  "walletId": "wallet_123",
  "type": "PAYMENT",
  "amount": 100000,
  "status": "COMPLETED",
  "description": "Rechargement via Wave +221 77 123 45 67",
  "createdAt": "2026-01-12T10:00:00Z"
}
```

### GET /wallet/can-accept-ride/:amount
**Vérifier si le chauffeur a assez de solde**

**Response:**
```json
{
  "canAccept": true,
  "amount": 5000
}
```

### GET /wallet/balance
**Obtenir le solde actuel**

**Response:**
```json
{
  "balance": 99250,
  "pendingBalance": 4250,
  "currency": "XOF",
  "lastUpdated": "2026-01-12T10:30:00Z"
}
```

## 🏦 Comptes Bancaires

### 1. Compte SUMO (Plateforme)
- **Type:** Compte professionnel Wave et/ou Orange Money
- **Recettes:**
  - Rechargements des chauffeurs
  - Commissions 15% de chaque course
- **Dépenses:**
  - Retraits des chauffeurs

### 2. Comptes Chauffeurs
- **Type:** Comptes personnels Wave ou Orange Money
- **Recettes:**
  - Paiements directs des clients
  - Retraits depuis le wallet SUMO
- **Dépenses:**
  - Rechargements du wallet SUMO

## ✅ Avantages du Système

### Pour SUMO
1. ✅ Commission garantie à chaque course
2. ✅ Pas de risque de non-paiement
3. ✅ Trésorerie positive (rechargements en avance)
4. ✅ Contrôle total sur l'activité des chauffeurs

### Pour les Chauffeurs
1. ✅ Paiement direct des clients (cash ou mobile money)
2. ✅ Gains nets clairs (85% visible)
3. ✅ Pas de calcul manuel de commission
4. ✅ Historique transparent des transactions

### Pour les Clients
1. ✅ Paiement direct au chauffeur (plus simple)
2. ✅ Pas besoin de compte dans l'app
3. ✅ Choix du moyen de paiement (cash ou mobile money)

## ⚠️ Points d'Attention

### 1. Solde Minimum
Le chauffeur doit **toujours** maintenir un solde suffisant pour accepter des courses. Recommandation : garder au moins 50,000 FCFA pour accepter plusieurs courses.

### 2. Période de Validation (24h)
Les gains sont en `pendingBalance` pendant 24h avant de passer en `balance` disponible. Cela permet de gérer les éventuels litiges.

### 3. Rechargement Obligatoire
Si le solde est insuffisant, le chauffeur **ne reçoit pas** de notifications de courses. Il doit recharger pour continuer à travailler.

### 4. Intégration Wave/Orange Money
Actuellement en simulation. Une fois les API fournies :
- Implémenter `WaveIntegrationService`
- Implémenter `OrangeMoneyIntegrationService`
- Configurer les webhooks pour les callbacks
- Remplacer le crédit immédiat par un statut PENDING

## 📝 TODO - Intégration API Paiement

### Backend

1. **Créer les services d'intégration**
   ```
   backend/src/modules/wallet/integrations/wave.service.ts
   backend/src/modules/wallet/integrations/orange-money.service.ts
   ```

2. **Modifier wallet.service.ts:rechargeWallet()**
   - Remplacer la simulation par l'appel API réel
   - Mettre status = PENDING au lieu de COMPLETED
   - Attendre le callback webhook pour créditer

3. **Créer le controller webhook**
   ```typescript
   @Controller('webhook')
   export class WalletWebhookController {
     @Post('wave')
     async handleWaveWebhook(@Body() payload: any) {
       // Vérifier signature
       // Créditer le wallet si succès
       // Gérer les échecs
     }
   }
   ```

### Frontend

1. **Ajouter message d'attente**
   ```
   "Rechargement en cours...
   Veuillez confirmer le paiement dans votre app Wave/Orange Money"
   ```

2. **Polling ou WebSocket**
   - Vérifier le statut de la transaction
   - Notifier quand le rechargement est complété

## 🎯 Résumé

| Étape | Action | Balance | Argent Réel |
|-------|--------|---------|-------------|
| 1. Rechargement | +100,000 FCFA | 100,000 | -100,000 (Wave) |
| 2. Acceptation | -5,000 FCFA | 95,000 | 0 |
| 3. Client paie | 0 | 95,000 | +5,000 |
| 4. Fin course | 0 | 95,000 | +5,000 |
| 5. +24h | +4,250 FCFA | 99,250 | +5,000 |

**Résultat Net:**
- Chauffeur : +4,250 FCFA ✅
- SUMO : +750 FCFA ✅
- Client : -5,000 FCFA

---

## 🚗 Application aux Réservations et Covoiturage

Le même flux de paiement avec déduction automatique s'applique également aux **réservations** et au **covoiturage**.

### Réservations

#### Flux d'Acceptation

```
Client crée réservation pour demain 14h → 5,000 FCFA
    ↓
Chauffeur voit la réservation disponible
    ↓
Chauffeur clique "Accepter"
    ↓
[Backend] ReservationsService.acceptReservation()
    ↓
1. Vérification du solde :
   wallet.balance >= 5,000 FCFA ?
    ↓
   ✅ OUI : Continue
   ❌ NON : Erreur "Solde insuffisant. Rechargez..."
    ↓
2. Déduction immédiate :
   balance = 100,000 - 5,000 = 95,000 FCFA
    ↓
3. Transaction wallet créée :
   - type: PAYMENT
   - amount: 5,000 FCFA
   - description: "Déduction réservation #abc12345"
    ↓
4. Réservation acceptée :
   - status: CONFIRMED
   - rideId: assigned (course créée)
    ↓
Le jour J : Course démarre et se termine
    ↓
Réservation marquée : status = FULFILLED
Commission et gains enregistrés (même flux que courses)
```

**Code impliqué :**
- [reservation.service.ts:452-464](g:\SumoMobility\backend\src\modules\reservation\reservation.service.ts#L452-L464) - Vérification et déduction
- [rides.service.ts:577-588](g:\SumoMobility\backend\src\modules\rides\rides.service.ts#L577-L588) - Mise à jour statut FULFILLED
- [rides.service.ts:604-621](g:\SumoMobility\backend\src\modules\rides\rides.service.ts#L604-L621) - Enregistrement commission/gains

### Covoiturage

#### Flux de Création

```
Chauffeur crée annonce covoiturage : 2,000 FCFA (prix base)
    ↓
[Backend] CarpoolService.createCarpoolReservation()
    ↓
1. Calcul du prix base (sans passagers)
   totalFare = 500 + (10 km × 150) = 2,000 FCFA
    ↓
2. Vérification du solde :
   wallet.balance >= 2,000 FCFA ?
    ↓
   ✅ OUI : Continue
   ❌ NON : Erreur "Solde insuffisant. Rechargez..."
    ↓
3. Création de la réservation covoiturage
   - isSharedRide: true
   - status: CONFIRMED
    ↓
4. Déduction immédiate :
   balance = 100,000 - 2,000 = 98,000 FCFA
    ↓
5. Transaction wallet créée :
   - type: PAYMENT
   - amount: 2,000 FCFA
   - description: "Déduction covoiturage #xyz67890"
```

**Code impliqué :**
- [carpool.service.ts:85-93](g:\SumoMobility\backend\src\modules\carpool\carpool.service.ts#L85-L93) - Vérification solde
- [carpool.service.ts:130-132](g:\SumoMobility\backend\src\modules\carpool\carpool.service.ts#L130-L132) - Déduction

#### Flux d'Acceptation de Passagers

```
Passager A demande à rejoindre → 6 km du trajet total
    ↓
Chauffeur accepte la demande
    ↓
Recalcul des prix selon modèle Yango :
  - Chauffeur (10 km) : 2,000 × (10/10) = 2,000 FCFA
  - Passager A (6 km) : 2,000 × (6/10) = 1,200 FCFA
    ↓
Prix mis à jour dynamiquement (pas de nouvelle déduction)
    ↓
Le jour J : Course se termine
    ↓
Revenus collectés : 2,000 (chauffeur) + 1,200 (passager A) = 3,200 FCFA
Commission SUMO (15%) : 3,200 × 0.15 = 480 FCFA
Gains chauffeur (85%) : 3,200 - 480 = 2,720 FCFA
    ↓
Wallet chauffeur après 24h :
  balance = 98,000 + 2,720 = 100,720 FCFA
```

**Particularité Covoiturage :**
- Déduction unique lors de la **création** du covoiturage (prix base)
- Pas de nouvelle déduction quand des passagers rejoignent
- Les prix sont recalculés dynamiquement selon les distances réelles
- Le chauffeur peut gagner **plus** que prévu si des passagers rejoignent

**Code impliqué :**
- [carpool.service.ts:420-428](g:\SumoMobility\backend\src\modules\carpool\carpool.service.ts#L420-L428) - Recalcul prix Yango
- [rides.service.ts:604-621](g:\SumoMobility\backend\src\modules\rides\rides.service.ts#L604-L621) - Commission/gains à la fin

### Exemple Covoiturage Complet

| Étape | Action | Balance | Collecté | Commission | Gains |
|-------|--------|---------|----------|------------|-------|
| **Création** | Chauffeur crée annonce 2,000 FCFA | 98,000 | 0 | 0 | 0 |
| **Passager A rejoint** | +1,200 FCFA (6 km) | 98,000 | 0 | 0 | 0 |
| **Passager B rejoint** | +900 FCFA (4 km) | 98,000 | 0 | 0 | 0 |
| **Revenus totaux** | 2,000 + 1,200 + 900 = 4,100 FCFA | 98,000 | 4,100 | 615 | 3,485 |
| **+24h après course** | Gains ajoutés | **101,485** ✅ | 4,100 | 615 | 3,485 |

**Résultat Net Chauffeur :**
- Investissement : -2,000 FCFA (déduit à la création)
- Gains nets : +3,485 FCFA
- **Bénéfice : +1,485 FCFA** ✅

---

**Date de création:** 2026-01-12
**Dernière mise à jour:** 2026-01-13
**Version:** 3.0
**Status:** ✅ Implémenté (Courses, Réservations, Covoiturage) | ⏳ API Wave/OM à intégrer
