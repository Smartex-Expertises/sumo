# 🌟 Système de Notation - Documentation

## Vue d'ensemble

Le système de notation permet aux clients d'évaluer les chauffeurs après chaque course terminée. Les chauffeurs peuvent voir leurs notes dans leur historique de courses.

## 📋 Fonctionnalités

### Pour les Clients

1. **Écran de notation automatique**
   - S'affiche automatiquement après la fin d'une course
   - Navigation : `ClientInRideScreen` → `RatingScreen`

2. **Notation globale**
   - Note de 1 à 5 étoiles (obligatoire)
   - Messages contextuels : Excellent (5), Très bien (4), Bien (3), Moyen (2), Mauvais (1)

3. **Critères détaillés** (optionnels)
   - ⏰ **Ponctualité** : Respect de l'heure d'arrivée
   - ✨ **Propreté** : État du véhicule
   - 🚗 **Conduite** : Qualité de la conduite
   - 😊 **Courtoisie** : Comportement du chauffeur

4. **Commentaire libre**
   - Jusqu'à 500 caractères
   - Optionnel
   - Permet de détailler l'expérience

### Pour les Chauffeurs

1. **Affichage dans l'historique**
   - Notes visibles pour chaque course terminée
   - Étoiles colorées (⭐️) pour visualisation rapide
   - Indication de la présence d'un commentaire (💬)

2. **Statistiques globales** (via API)
   - Note moyenne
   - Nombre total d'évaluations
   - Distribution par note (1-5 étoiles)
   - Moyennes par critère

## 🗂️ Architecture

### Backend

#### Modèle de données

```typescript
model Rating {
  id          String @id @default(cuid())
  rideId      String
  ride        Ride   @relation(...)

  // Évaluation
  score       Int    // Note globale (1-5)
  comment     String?

  // Critères détaillés (optionnel)
  punctuality Int?   // Ponctualité (1-5)
  cleanliness Int?   // Propreté (1-5)
  driving     Int?   // Conduite (1-5)
  courtesy    Int?   // Courtoisie (1-5)

  createdAt DateTime @default(now())
}
```

#### API Endpoints

**POST /ratings**
- Créer une évaluation
- Body : `CreateRatingDto`
- Auth : JWT requis

**GET /ratings/ride/:rideId**
- Récupérer les évaluations d'une course
- Auth : JWT requis

**GET /ratings/driver/:driverId**
- Statistiques d'un chauffeur
- Retourne : note moyenne, distribution, critères
- Auth : JWT requis

**GET /ratings/client/:clientId**
- Historique des évaluations d'un client
- Auth : JWT requis + vérification d'accès

### Frontend

#### Fichiers créés

1. **[ratings.service.ts](g:\SumoMobility\frontend\src\api\ratings.service.ts)**
   - Service API pour gérer les ratings
   - Méthodes : `createRating`, `getRideRatings`, `getDriverStats`, `getClientRatingHistory`

2. **[StarRating.tsx](g:\SumoMobility\frontend\src\components\StarRating.tsx)**
   - Composant réutilisable d'étoiles
   - Props : `rating`, `onRatingChange`, `size`, `readonly`, `color`
   - Modes : interactif ou lecture seule

3. **[RatingScreen.tsx](g:\SumoMobility\frontend\src\screens\auth\client\RatingScreen.tsx)**
   - Écran complet de notation
   - Affiche les infos du chauffeur
   - Formulaire avec note globale + critères + commentaire
   - Validation et soumission

#### Modifications

1. **[AppNavigator.tsx](g:\SumoMobility\frontend\src\navigation\AppNavigator.tsx)**
   - Ajout de la route `RatingScreen`
   - Accessible pour les clients

2. **[ClientInRideScreen.tsx](g:\SumoMobility\frontend\src\screens\auth\client\ClientInRideScreen.tsx)**
   - Navigation vers `RatingScreen` après `ride.completed`

3. **[DriverHistoryScreen.tsx](g:\SumoMobility\frontend\src\screens\auth\driver\DriverHistoryScreen.tsx)**
   - Affichage des notes dans l'historique
   - Étoiles + note numérique + icône commentaire

## 🔄 Flux d'utilisation

### 1. Client note un chauffeur

```
Course terminée
    ↓
Backend émet: ride.completed
    ↓
ClientInRideScreen reçoit l'événement
    ↓
Alerte: "Course terminée" avec bouton "Noter le chauffeur"
    ↓
Navigation vers RatingScreen
    ↓
Client remplit:
  - Note globale (obligatoire)
  - Critères détaillés (optionnel)
  - Commentaire (optionnel)
    ↓
Soumission via POST /ratings
    ↓
Backend:
  - Crée l'évaluation
  - Met à jour les stats du chauffeur
  - Retourne succès
    ↓
Alerte: "Merci ! Votre évaluation a été enregistrée"
    ↓
Navigation vers Booking (accueil)
```

### 2. Chauffeur consulte ses notes

```
DriverHomeScreen
    ↓
Bouton "Historique"
    ↓
DriverHistoryScreen
    ↓
Liste des courses terminées
    ↓
Pour chaque course notée:
  - Affichage des étoiles (⭐️⭐️⭐️⭐️⭐️)
  - Note numérique (ex: 4/5)
  - Icône 💬 si commentaire présent
```

## 🎨 Interface utilisateur

### RatingScreen

**Éléments visuels** :
- Header avec "Évaluer la course" et bouton "Passer"
- Carte du chauffeur avec avatar, nom, véhicule
- Section "Note globale" : 5 grandes étoiles (48px) + texte descriptif
- Section "Détails" : 4 critères avec petites étoiles (24px)
- Zone de commentaire : TextInput multiligne (100px min)
- Bouton "Envoyer l'évaluation" : primaire avec icône ✓

**Couleurs** :
- Étoiles remplies : `#FFA500` (Orange doré)
- Étoiles vides : `#D1D5DB` (Gris clair)
- Bouton primaire : `COLORS.primary`

### DriverHistoryScreen

**Affichage des notes** :
- Ligne de rating sous les adresses
- Bordure supérieure subtile (`#F0F0F0`)
- Étoiles miniatures (16px) colorées
- Note numérique en orange `#FFA500`
- Icône commentaire si présent

## 🔐 Sécurité

1. **Authentication requise** : Tous les endpoints nécessitent un JWT
2. **Validation des données** :
   - Note entre 1 et 5
   - Commentaire max 500 caractères
   - Vérification que la course existe
3. **Permissions** :
   - Seul le client d'une course peut la noter
   - Un chauffeur ne peut voir que ses propres stats
4. **Prévention des abus** :
   - Une seule évaluation par course
   - Système de modération (backend)

## 📊 Statistiques disponibles (API)

```typescript
interface DriverStats {
  driverId: string;
  averageRating: number;          // Note moyenne globale
  totalRatings: number;           // Nombre total d'évaluations
  ratingDistribution: {           // Distribution par note
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  criteriaAverages: {             // Moyennes par critère
    punctuality: number;
    cleanliness: number;
    driving: number;
    courtesy: number;
  };
}
```

## 🚀 Améliorations futures possibles

1. **Écran de statistiques détaillées pour le chauffeur**
   - Graphiques d'évolution des notes
   - Affichage des commentaires reçus
   - Comparaison avec la moyenne

2. **Système de badges/récompenses**
   - Badge "5 étoiles" pour note moyenne > 4.8
   - Badge "100 courses" pour volume
   - Badge "Conduite exemplaire" pour critère conduite

3. **Notifications**
   - Notifier le chauffeur quand il reçoit une nouvelle note
   - Alertes si la note moyenne baisse

4. **Analytics**
   - Dashboard admin pour surveiller les notes
   - Détection des chauffeurs problématiques
   - Identification des meilleurs chauffeurs

5. **Réponses aux évaluations**
   - Permettre aux chauffeurs de répondre aux commentaires
   - Système de médiation pour les litiges

## 🧪 Tests

### Tests à effectuer

1. **Création d'évaluation**
   - ✅ Course terminée → écran de notation s'affiche
   - ✅ Note obligatoire → erreur si pas de note
   - ✅ Soumission réussie → retour accueil
   - ✅ Commentaire > 500 caractères → validation

2. **Affichage dans l'historique**
   - ✅ Note visible pour course terminée et notée
   - ✅ Pas de note pour course non notée
   - ✅ Pas de note pour course annulée
   - ✅ Icône commentaire si commentaire présent

3. **API**
   - ✅ POST /ratings avec données valides
   - ✅ GET /ratings/driver/:id retourne stats correctes
   - ✅ Vérification des permissions

## 📞 Support

Pour toute question ou problème :
- Vérifier les logs backend : rechercher "Rating"
- Vérifier les logs frontend : rechercher "rating" ou "Rating"
- Consulter la documentation Prisma pour le modèle `Rating`

---

**Date de création** : 2026-01-11
**Version** : 1.0
**Auteur** : Claude Code
