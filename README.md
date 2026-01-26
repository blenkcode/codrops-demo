# Personnal frontend framework 

Architecture générale:

Single Page Application (SPA) avec routing côté client et transitions de page animées.

Module-based : Chaque page est un module ES6 indépendant
Router custom : Gestion manuelle de la navigation
Transition-driven : Les animations de transition pilotent l'expérience utilisateur



⚙️ Technologies utilisées

Frontend

Vanilla JavaScript (ES6 modules)
GSAP (animations)
SplitText (typography animations)
CustomEase (courbes personnalisées)

APIs Browser

History API (pushState, popstate)
Fetch API (pas utilisé - import dynamique à la place)
Dynamic Import (import())
DOM API (manipulation directe)
CustomEvent (communication entre modules)

Pattern de requêtes

Import dynamique : import("../pages/about/about.js")
Pas de fetch() pour le HTML
Pas d'API REST (tout en statique)
Pas de JSON (modules JS natifs)






Flow de navigation complet:



Chargement initial (First Load)

User visite https://ton-site.com/about
         ↓
Serveur renvoie index.html (toujours le même fichier)
         ↓
Browser parse HTML + charge main.js
         ↓
router.init() s'exécute
         ↓
router.loadInitialPage()
  → Détecte URL actuelle (/about)
  → Import dynamique : import("../pages/about/about.js")
  → Génère HTML : pageModule.default()
  → Injecte dans #page_content
  → Appelle about.init()
  → Lance ENTER() avec delay=0
         ↓
Page visible avec animations




Navigation utilisateur

User clique sur <a href="/contact">
         ↓
Event intercepté par router
  e.preventDefault() → Bloque navigation native
         ↓
router.navigate("/contact")
  → Vérifie isTransitioning (false)
  → Vérifie cache (pas encore en cache)
  → pushState("/contact") → Change l'URL sans reload
         ↓
router.performTransition("/contact")
  → isTransitioning = true
  → Cleanup de la page actuelle (about.cleanup())
  → Import dynamique : import("../pages/contact/contact.js")
  → Génère HTML : pageModule.default()
         ↓
executeTransition()
  → Crée nextContainer (nouveau DOM)
  → Injecte HTML dans nextContainer
  → Appelle contact.init() → Lance ENTER(delay)
  → Lance transition GSAP
  → ENTER continue en parallèle (chars, images, lignes)
         ↓
 Transition terminée
  → currentContainer.remove()
  → clearProps sur nextContainer
  → isTransitioning = false 
  → dispatchEvent('route-changed')
         ↓
ENTER continue jusqu'à 2-3s
Page Contact visible et interactive




Navigation avec Prefetch (Hover sur lien):

User survole <a href="/services">
         ↓
Event mouseover détecté
         ↓
router.prefetch("/services")
  → Vérifie si déjà en cache (non)
  → Vérifie si page actuelle (non)
  → Import dynamique : import("../pages/services/services.js")
  → Stocke dans cache Map :
    {
      module: servicesModule,
      namespace: "services"
    }
         ↓
Module en mémoire (prêt)
         ↓
User clique sur le lien
         ↓
router.performTransition("/services")
  → Récupère depuis cache (instant)
  → Pas de requête réseau ⚡
  → Transition démarre immédiatement




  Navigation back/forward (Boutons navigateur)

  User clique sur "Back"
         ↓
Event popstate émis par le browser
         ↓
router détecte popstate
  → URL déjà changée par le browser
  → Vérifie isTransitioning
         ↓
Si transition en cours :
  → router.abortTransition()
  → killActiveTimeline() → Annule GSAP
  → router.loadPageInstantly(path)
    • Pas de transition
    • Chargement instantané
    • Lance ENTER(delay=0)
         ↓
Si pas de transition en cours :
  → router.handlePopstate(path)
  → performTransition() normale



Structure du cache


Map {
  "/about" => {
    module: aboutModule,  // Module JS chargé
    namespace: "about"
  },
  "/contact" => {
    module: contactModule,
    namespace: "contact"
  }
}
