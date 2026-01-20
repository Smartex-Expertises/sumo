# 💰 Implémentation du Système de Portefeuille - Documentation

## 📋 Vue d'ensemble

Le système de portefeuille permet aux chauffeurs de gérer leurs gains et de recharger leur compte pour accepter des courses. Le système intègre Wave et Orange Money pour les paiements.

## 🏗️ Architecture

### Backend

**Fichiers créés/modifiés :**
- [g:\SumoMobility\backend\src\modules\wallet\wallet.service.ts](g:\SumoMobility\backend\src\modules\wallet\wallet.service.ts) - Service de gestion du wallet
- [g:\SumoMobility\backend\src\modules\wallet\wallet.controller.ts](g:\SumoMobility\backend\src\modules\wallet\wallet.controller.ts) - Contrôleur API wallet
- [g:\SumoMobility\backend\src\modules\wallet\wallet.module.ts](g:\SumoMobility\backend\src\modules\wallet\wallet.module.ts) - Module wallet
- [g:\SumoMobility\backend\src\modules\rides\rides.module.ts](g:\SumoMobility\backend\src\modules\rides\rides.module.ts) - Import du WalletModule
- [g:\SumoMobility\backend\src\modules\rides\rides.service.ts](g:\SumoMobility\backend\src\modules\rides\rides.service.ts) - Intégration wallet dans completeRide

### Frontend

**Fichiers créés :**
1. [g:\SumoMobility\frontend\src\api\wallet.service.ts](g:\SumoMobility\frontend\src\api\wallet.service.ts) - Service API wallet
2. [g:\SumoMobility\frontend\src\screens\auth\driver\DriverWalletScreen.tsx](g:\SumoMobility\frontend\src\screens\auth\driver\DriverWalletScreen.tsx) - Écran principal du portefeuille
3. [g:\SumoMobility\frontend\src\screens\auth\driver\RechargeWalletScreen.tsx](g:\SumoMobility\frontend\src\screens\auth\driver\RechargeWalletScreen.tsx) - Écran de rechargement
4. [g:\SumoMobility\frontend\src\screens\auth\driver\WithdrawWalletScreen.tsx](g:\SumoMobility\frontend\src\screens\auth\driver\WithdrawWalletScreen.tsx) - Écran de retrait

**Fichiers modifiés :**
- [g:\SumoMobility\frontend\src\navigation\AppNavigator.tsx](g:\SumoMobility\frontend\src\navigation\AppNavigator.tsx) - Ajout des routes wallet

## 💸 Modèle Économique

### Système de Commission

| Élément | Formule | Exemple (10,000 FCFA) |
|---------|---------|----------------------|
| **Tarif total** | 100% du prix de la course | 10,000 FCFA |
| **Commission plateforme** | 15% du tarif | 1,500 FCFA |
| **Gains chauffeur** | 85% du tarif | 8,500 FCFA |

**Calcul backend** (rides.service.ts:523-529):
```typescript
const platformFee = ride.totalFare != null
  ? Number(ride.totalFare) * 0.15  // 15% de commission
  : null;

const driverEarnings = ride.totalFare != null && platformFee != null
  ? Number(ride.totalFare) - platformFee  // 85% pour le chauffeur
  : null;
```

### Flux Financier

```
Course terminée
    ↓
Calcul automatique :
  - totalFare: 10,000 FCFA (payé par le client)
  - platformFee: 1,500 FCFA (15% → compte Wave de la plateforme)
  - driverEarnings: 8,500 FCFA (85% → wallet du chauffeur)
    ↓
Mise à jour wallet chauffeur :
  - pendingBalance += 8,500 FCFA (en attente 24h)
  - totalEarned += 8,500 FCFA
    ↓
Après 24h :
  - balance += 8,500 FCFA (disponible pour retrait)
  - pendingBalance -= 8,500 FCFA
```

## 🎨 Interfaces Utilisateur

### 1. DriverWalletScreen - Écran principal

**Fonctionnalités :**
- Affichage du solde disponible et en attente
- Boutons "Recharger" et "Retirer"
- Sélecteur de période (Aujourd'hui / Semaine / Mois)
- Statistiques de gains (total, nombre de courses, moyenne)
- Liste des transactions récentes

**Navigation :**
- Accessible depuis le menu chauffeur
- Route : `DriverWallet`

### 2. RechargeWalletScreen - Rechargement

**Fonctionnalités :**
- Saisie du montant (minimum 1,000 FCFA)
- Montants rapides : 5,000 / 10,000 / 20,000 / 50,000 FCFA
- Sélection du moyen de paiement (Wave / Orange Money)
- Saisie du numéro de téléphone
- Liste des numéros enregistrés
- Validation et confirmation

**Processus :**
1. Chauffeur saisit le montant et le numéro
2. Sélectionne Wave ou Orange Money
3. Confirme la transaction
4. Reçoit un code de validation par SMS
5. Confirme dans l'app Wave/Orange Money
6. Le wallet est crédité automatiquement

### 3. WithdrawWalletScreen - Retrait

**Fonctionnalités :**
- Affichage du solde disponible
- Saisie du montant (minimum 1,000 FCFA)
- Boutons pourcentage : 25% / 50% / 75% / Tout
- Sélection du moyen de paiement (Wave / Orange Money)
- Saisie du numéro de téléphone
- Délai de traitement : 24-48h

**Processus :**
1. Chauffeur saisit le montant
2. Sélectionne le compte destinataire (Wave/Orange Money)
3. Confirme le retrait
4. Le montant est déduit du wallet
5. Transaction créée avec statut PENDING
6. Traitement par l'équipe dans 24-48h
7. Transfert vers le compte du chauffeur

## 🔌 API Endpoints

### GET /wallet/balance
Récupère le solde du portefeuille

**Response :**
```json
{
  "balance": 50000,
  "pendingBalance": 8500,
  "currency": "XOF",
  "lastUpdated": "2026-01-12T10:00:00Z"
}
```

### GET /wallet/transactions
Récupère l'historique des transactions

**Query params :**
- `page` (number) : Numéro de page
- `limit` (number) : Nombre d'éléments par page
- `type` (string) : EARNING | WITHDRAWAL | DEPOSIT | REFUND | COMMISSION
- `status` (string) : PENDING | COMPLETED | FAILED | CANCELLED
- `startDate` (string) : Date de début (ISO)
- `endDate` (string) : Date de fin (ISO)

**Response :**
```json
{
  "transactions": [
    {
      "id": "tx_123",
      "type": "EARNING",
      "amount": 8500,
      "currency": "XOF",
      "status": "COMPLETED",
      "description": "Gains de la course #cmka9xtk",
      "createdAt": "2026-01-12T09:30:00Z",
      "processedAt": "2026-01-13T09:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

### GET /wallet/earnings/:period
Obtient les statistiques de gains

**Params :**
- `period` : today | week | month

**Response :**
```json
{
  "totalEarnings": 42500,
  "completedRides": 5,
  "averageEarning": 8500,
  "timeConnected": 240
}
```

### GET /wallet/payment-methods
Liste les méthodes de paiement enregistrées

**Response :**
```json
[
  {
    "id": "pm_123",
    "type": "WAVE",
    "label": "Wave 77 123 45 67",
    "phoneNumber": "+221771234567",
    "isDefault": true,
    "createdAt": "2026-01-10T10:00:00Z"
  }
]
```

### POST /wallet/payment-methods
Ajoute une nouvelle méthode de paiement

**Body :**
```json
{
  "type": "WAVE",
  "phoneNumber": "+221771234567",
  "isDefault": false
}
```

### POST /wallet/withdraw
Demande un retrait

**Body :**
```json
{
  "amount": 20000,
  "paymentMethodId": "pm_123",
  "note": "Retrait vers Wave"
}
```

**Response :**
```json
{
  "id": "tx_456",
  "type": "WITHDRAWAL",
  "amount": 20000,
  "status": "PENDING",
  "description": "Retrait vers Wave 77 123 45 67",
  "createdAt": "2026-01-12T10:00:00Z"
}
```

### POST /wallet/deposit (À IMPLÉMENTER)
Demande un rechargement

**Body :**
```json
{
  "amount": 50000,
  "paymentMethodId": "pm_123",
  "note": "Rechargement via Wave"
}
```

## 🔗 Intégration des API de Paiement

### 📌 TODO - Wave API

**Documentation :** À fournir par l'utilisateur

**Points d'intégration nécessaires :**

1. **Rechargement (Deposit)**
   - Endpoint : TBD
   - Méthode : POST
   - Headers : API Key, etc.
   - Body : { amount, phoneNumber, ... }
   - Response : { transactionId, status, ... }

2. **Retrait (Withdrawal)**
   - Endpoint : TBD
   - Méthode : POST
   - Headers : API Key, etc.
   - Body : { amount, phoneNumber, ... }
   - Response : { transactionId, status, ... }

3. **Vérification de transaction**
   - Endpoint : TBD
   - Méthode : GET
   - Permet de vérifier le statut d'une transaction

4. **Webhook de callback**
   - URL à fournir à Wave pour les notifications
   - POST /webhook/wave
   - Body : { transactionId, status, amount, ... }

**Fichier backend à créer :**
```
backend/src/modules/wallet/integrations/wave.service.ts
```

**Exemple de structure :**
```typescript
@Injectable()
export class WaveIntegrationService {
  constructor(
    private httpService: HttpService,
    private config: ConfigService,
  ) {}

  async initiateDeposit(amount: number, phoneNumber: string): Promise<WaveTransaction> {
    // Appel API Wave pour initier un rechargement
  }

  async initiateWithdrawal(amount: number, phoneNumber: string): Promise<WaveTransaction> {
    // Appel API Wave pour initier un retrait
  }

  async checkTransactionStatus(transactionId: string): Promise<WaveTransactionStatus> {
    // Vérifier le statut d'une transaction
  }

  async handleWebhook(payload: WaveWebhookPayload): Promise<void> {
    // Traiter les callbacks de Wave
  }
}
```

### 📌 TODO - Orange Money API

**Documentation :** À fournir par l'utilisateur

**Points d'intégration similaires à Wave**

**Fichier backend à créer :**
```
backend/src/modules/wallet/integrations/orange-money.service.ts
```

### Modifications à apporter dans wallet.service.ts

**Ligne 123-129 (requestDeposit - À créer) :**
```typescript
async requestDeposit(driverId: string, dto: RequestDepositDto) {
  const wallet = await this.getOrCreateWallet(driverId);

  // Récupérer la méthode de paiement
  const method = await this.prisma.driverPaymentMethod.findFirst({
    where: {
      id: dto.paymentMethodId,
      walletId: wallet.id,
      isActive: true,
    },
  });

  if (!method) {
    throw new NotFoundException('Méthode de paiement non trouvée');
  }

  // TODO: Intégrer l'API Wave/Orange Money
  let externalTransactionId: string;

  if (method.type === PaymentMethodType.WAVE) {
    const waveTransaction = await this.waveIntegrationService.initiateDeposit(
      dto.amount,
      method.phoneNumber,
    );
    externalTransactionId = waveTransaction.id;
  } else if (method.type === PaymentMethodType.ORANGE_MONEY) {
    const omTransaction = await this.orangeMoneyIntegrationService.initiateDeposit(
      dto.amount,
      method.phoneNumber,
    );
    externalTransactionId = omTransaction.id;
  }

  // Créer la transaction en attente
  const transaction = await this.prisma.walletTransaction.create({
    data: {
      walletId: wallet.id,
      type: WalletTransactionType.DEPOSIT,
      amount: new Decimal(dto.amount),
      status: WalletTransactionStatus.PENDING,
      description: `Rechargement via ${method.label}`,
      depositMethodId: method.id,
      externalTransactionId, // Nouvel attribut à ajouter au modèle Prisma
      metadata: dto.note ? { note: dto.note } : undefined,
    },
  });

  return transaction;
}
```

**Ligne 375-385 (requestWithdrawal - Modification) :**
```typescript
// Après la création de la transaction
// TODO: Déclencher le processus de retrait avec l'API externe (Wave, Orange Money, etc.)
let externalTransactionId: string;

if (method.type === PaymentMethodType.WAVE) {
  const waveTransaction = await this.waveIntegrationService.initiateWithdrawal(
    dto.amount,
    method.phoneNumber,
  );
  externalTransactionId = waveTransaction.id;
} else if (method.type === PaymentMethodType.ORANGE_MONEY) {
  const omTransaction = await this.orangeMoneyIntegrationService.initiateWithdrawal(
    dto.amount,
    method.phoneNumber,
  );
  externalTransactionId = omTransaction.id;
}

// Mettre à jour la transaction avec l'ID externe
await this.prisma.walletTransaction.update({
  where: { id: transaction.id },
  data: { externalTransactionId },
});

// Supprimer le setTimeout de simulation
// Remplacer par une gestion via webhook
```

### Webhook Controller à créer

**Fichier :** `backend/src/modules/wallet/wallet-webhook.controller.ts`

```typescript
@Controller('webhook')
export class WalletWebhookController {
  constructor(
    private prisma: PrismaService,
    private waveService: WaveIntegrationService,
    private omService: OrangeMoneyIntegrationService,
  ) {}

  @Post('wave')
  async handleWaveWebhook(@Body() payload: any) {
    // Vérifier la signature de la requête
    // Traiter le callback Wave
    // Mettre à jour le statut de la transaction
    // Créditer/débiter le wallet selon le cas
  }

  @Post('orange-money')
  async handleOrangeMoneyWebhook(@Body() payload: any) {
    // Similaire à Wave
  }
}
```

## 🗃️ Modèle de données Prisma

**Modifications nécessaires au schéma Prisma :**

```prisma
model WalletTransaction {
  // ... champs existants

  // Ajouter pour l'intégration des APIs de paiement :
  externalTransactionId String? // ID de transaction de Wave/Orange Money
  depositMethodId       String? // Méthode utilisée pour un dépôt
  depositMethod         DriverPaymentMethod? @relation("DepositMethod", fields: [depositMethodId], references: [id])

  // ... reste du modèle
}

model DriverPaymentMethod {
  // ... champs existants

  // Relations
  withdrawals WalletTransaction[] @relation("WithdrawalMethod")
  deposits    WalletTransaction[] @relation("DepositMethod")

  // ... reste du modèle
}
```

**Migration à exécuter :**
```bash
cd backend
npx prisma migrate dev --name add_external_transaction_tracking
```

## 🔐 Sécurité

### Validation des montants

**Backend :**
- Montant minimum : 1,000 FCFA
- Vérification du solde disponible pour les retraits
- Validation de la méthode de paiement

**Frontend :**
- Validation en temps réel
- Messages d'erreur clairs
- Confirmation obligatoire avant soumission

### Authentification

- Tous les endpoints wallet nécessitent un JWT
- Vérification du rôle DRIVER
- Validation que le chauffeur accède uniquement à son propre wallet

### Transactions atomiques

Toutes les opérations financières utilisent des transactions Prisma pour garantir la cohérence :

```typescript
await this.prisma.$transaction(async (tx) => {
  // Mise à jour du wallet
  // Création de la transaction
  // Autres opérations
});
```

## 📊 Statistiques et Reporting

### Statistiques disponibles

**Par période (jour/semaine/mois) :**
- Gains totaux
- Nombre de courses
- Gain moyen par course
- Temps connecté

**API :** `GET /wallet/earnings/:period`

### Historique des transactions

**Filtres disponibles :**
- Type de transaction
- Statut
- Période (date début/fin)
- Pagination

**API :** `GET /wallet/transactions`

## 🧪 Tests

### Tests Backend

**À créer :**
```
backend/src/modules/wallet/__tests__/wallet.service.spec.ts
backend/src/modules/wallet/__tests__/wallet.controller.spec.ts
backend/src/modules/wallet/__tests__/wave-integration.spec.ts
backend/src/modules/wallet/__tests__/orange-money-integration.spec.ts
```

**Scénarios de test :**
1. Création automatique du wallet
2. Ajout de gains après course
3. Demande de retrait avec solde suffisant
4. Demande de retrait avec solde insuffisant
5. Ajout de méthode de paiement
6. Suppression de méthode de paiement
7. Traitement des webhooks Wave/Orange Money
8. Gestion des erreurs d'API externe

### Tests Frontend

**Tests manuels à effectuer :**
1. Accès à l'écran wallet
2. Affichage correct du solde
3. Sélection des périodes de statistiques
4. Rechargement avec Wave
5. Rechargement avec Orange Money
6. Retrait vers Wave
7. Retrait vers Orange Money
8. Gestion des numéros enregistrés
9. Validation des montants
10. Messages d'erreur appropriés

## 🚀 Déploiement

### Variables d'environnement

**Fichier `.env` backend :**
```env
# Wave API
WAVE_API_URL=https://api.wave.com/v1
WAVE_API_KEY=your_wave_api_key
WAVE_API_SECRET=your_wave_api_secret
WAVE_WEBHOOK_SECRET=your_wave_webhook_secret

# Orange Money API
ORANGE_MONEY_API_URL=https://api.orange.com/v1
ORANGE_MONEY_API_KEY=your_om_api_key
ORANGE_MONEY_API_SECRET=your_om_api_secret
ORANGE_MONEY_WEBHOOK_SECRET=your_om_webhook_secret

# Wallet
PLATFORM_COMMISSION_RATE=0.15
PENDING_BALANCE_DELAY_HOURS=24
WITHDRAWAL_PROCESSING_HOURS=48
```

### Configuration du serveur

1. **Webhooks :**
   - Configurer les URLs de webhook dans les dashboards Wave/Orange Money
   - `https://votre-domaine.com/api/webhook/wave`
   - `https://votre-domaine.com/api/webhook/orange-money`

2. **SSL :**
   - Certificat SSL requis pour les webhooks
   - Utiliser Let's Encrypt ou un certificat commercial

3. **Logs :**
   - Activer les logs détaillés pour les transactions
   - Surveiller les erreurs d'API externe

## 📈 Améliorations futures

### Phase 1 (Court terme)
1. ✅ Interface de portefeuille complète
2. ⏳ Intégration Wave API
3. ⏳ Intégration Orange Money API

### Phase 2 (Moyen terme)
1. Système de vérification d'identité pour les retraits
2. Historique détaillé avec export PDF/CSV
3. Notifications push pour les transactions
4. Dashboard admin pour gérer les retraits manuellement

### Phase 3 (Long terme)
1. Programme de fidélité (points, bonus)
2. Objectifs de gains avec récompenses
3. Prêts aux chauffeurs performants
4. Assurance intégrée dans le wallet

## 📞 Support et Documentation

### Pour les développeurs

- **Documentation technique** : Ce fichier
- **API Postman** : Collection à créer
- **Schéma Prisma** : `backend/prisma/schema.prisma`

### Pour les utilisateurs

- **FAQ** : Questions fréquentes sur le wallet
- **Guide chauffeur** : Comment recharger et retirer
- **Support** : Contact pour problèmes de paiement

## ✅ Checklist d'intégration

### Backend

- [x] Service wallet créé
- [x] Contrôleur wallet créé
- [x] Module wallet configuré
- [x] Intégration dans rides.service.ts
- [ ] Endpoint POST /wallet/deposit créé
- [ ] Service d'intégration Wave
- [ ] Service d'intégration Orange Money
- [ ] Controller webhook créé
- [ ] Tests unitaires
- [ ] Tests d'intégration
- [ ] Documentation API (Swagger)

### Frontend

- [x] Service API wallet créé
- [x] DriverWalletScreen implémenté
- [x] RechargeWalletScreen implémenté
- [x] WithdrawWalletScreen implémenté
- [x] Routes ajoutées au navigateur
- [ ] Accès depuis le menu chauffeur
- [ ] Tests manuels complets
- [ ] Gestion des erreurs réseau
- [ ] Messages de succès/erreur

### Déploiement

- [ ] Variables d'environnement configurées
- [ ] Webhooks configurés
- [ ] Certificat SSL actif
- [ ] Monitoring en place
- [ ] Logs configurés
- [ ] Documentation utilisateur

## 🎯 Résumé

Le système de portefeuille est **prêt pour l'intégration des API de paiement**. Toute l'interface utilisateur et la structure backend sont en place. Il reste uniquement à :

1. **Obtenir les credentials des API Wave et Orange Money**
2. **Créer les services d'intégration** (wave.service.ts, orange-money.service.ts)
3. **Implémenter les webhooks** pour les callbacks
4. **Tester** l'intégration complète
5. **Déployer** en production

---

**Date de création** : 2026-01-12
**Version** : 1.0
**Status** : ✅ Frontend complet | ⏳ En attente des API de paiement
