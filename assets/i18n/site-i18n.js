/**
 * Shared language picker + localized hrefs for findmeIRL static pages.
 * Persists preference in localStorage; legal pages navigate to sibling HTML files.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "findmeirl-site-lang";
  var SUPPORTED = ["en", "de", "fr", "it", "es", "pt"];

  var LEGAL_DIR = "legal/";

  var LEGAL_FILES = {
    privacy: {
      en: "privacy.html",
      de: "privacy_de.html",
      fr: "privacy_fr.html",
      it: "privacy_it.html",
      es: "privacy_es.html",
      pt: "privacy_pt.html",
    },
    terms: {
      en: "terms.html",
      de: "terms_de.html",
      fr: "terms_fr.html",
      it: "terms_it.html",
      es: "terms_es.html",
      pt: "terms_pt.html",
    },
  };

  function isOnLegalPage() {
    return !!(document.body && document.body.getAttribute("data-legal-doc"));
  }

  /** Same-folder href on legal pages; `legal/…` from site root (e.g. index). */
  function legalHref(filename) {
    return isOnLegalPage() ? filename : LEGAL_DIR + filename;
  }

  /** @type Record<string, Record<string, string>> */
  var LANDING = {
    en: {
      docTitle:
        "FindmeIRL — Meet people and grow places, in real life",
      metaDesc:
        "FindmeIRL connects people nearby and gives venues clear insights. Join the waitlist for early access.",
      langAria: "Language",
      navSiteAria: "Site navigation",
      navForBusinesses: "For businesses",
      navForPeople: "For people",
      navRecording: "Recording of App",
      navTerms: "Terms of Service",
      navPrivacy: "Privacy Policy",
      navMenuTitle: "Menu",
      navMenuOpen: "Open menu",
      navMenuClose: "Close menu",
      legalBack: "Back",
      heroEyebrow: "In-person discovery · venues · nearby people",
      heroTitle: "Real places. Real people. Real momentum.",
      heroLeadHtml:
        "FindmeIRL helps people discover what’s happening around them — while giving venues a clear view of <strong>audience, visits, and events.</strong>",
      emailPlaceholder: "Work or personal email",
      emailAria: "Email for waitlist",
      submitCta: "Get access",
      waitlistFine:
        "No spam — we’ll only email you about launch and early invites.",
      waitlistOk: "You’re on the list. We’ll be in touch.",
      waitlistErrEmail: "Please enter a valid email address.",
      waitlistErrGeneric:
        "We couldn’t save your signup. Check your connection and try again.",
      waitlistJoining: "Joining…",
      asidePill: "Same app · two modes",
      stat1a: "Tonight nearby",
      stat1b: "live · map + list",
      stat2a: "Venue insights",
      stat2b: "visits · audience · events",
      stat3a: "Your profile",
      stat3b: "filters · chat · settings",
      tourEyebrow: "Product tour",
      bizTitle: "For businesses",
      bizLead:
        "Profiles, discovery, events, and insights — built for operators who want the story behind the foot traffic.",
      peopleEyebrow: "Everyday use",
      peopleTitle: "For people",
      peopleLead:
        "Search with intent, tune who you meet, chat when it clicks — keeping the social layer fast and grounded.",
      motionEyebrow: "Motion",
      motionTitle: "See it in motion",
      motionLead:
        "Short walkthroughs for venues and for everyday discovery — same product, two sides of the experience.",
      videoBiz: "For businesses — venue walkthrough",
      videoPeople: "For people — app demo",
      bizCaption1:
        "Live business profile as visitors see it in discovery.",
      bizCaption2:
        "Insights overview — visits, taps, and what changed this week.",
      bizCaption3:
        "Publish an event — title, timing, pinned location or virtual, and the essentials guests need.",
      bizCaption4:
        "Venue profile header — name, hours, and quick actions (signed-in view).",
      bizCaption5:
        "Post & promotion insights — top posts by reach, promotion mix, and privacy-safe audience signals.",
      bizCaption6:
        "Map view — scout nearby venues and how people cluster in real time.",
      bizCaption7:
        "Overview your scheduled events - post updates and manage",
      bizCaption8:
        "Upcoming foot traffic moments — lineup guests can browse.",
      bizCaption9:
        "Audience insights — gender, age bands, and who your reach represents (privacy-safe).",
      bizCaption10:
        "About the venue — description, hours, and contact guests rely on.",
      bizCaption11:
        "Discovery map — nearby people, venues, and live interest on the canvas you already use in-app.",
      bizCaption12:
        "Signed-in venue view — About, posts, and quick actions in one dashboard.",
      peopleCaption1:
        "Discovery filters — control who surfaces in your nearby feed.",
      peopleCaption2:
        "Distance slider — widen or tighten how far you’re willing to look.",
      peopleCaption3:
        "Heritage preferences — intentional matching beyond the basics.",
      peopleCaption4:
        "Custom filters — save combinations you actually use nightly.",
      peopleCaption5:
        "Soulmate score — see how your profile lines up with nearby matches.",
      peopleCaption6:
        "Profile detail — photos, bio, and the context before you say hi.",
      peopleCaption7:
        "Chat inbox — threads stay scoped to real-life intent.",
      peopleCaption8:
        "Settings — privacy boundaries, alerts, and account control.",
      footerContact: "Contact",
      footerPrivacy: "Privacy",
      footerTerms: "Terms",
    },
    de: {
      docTitle:
        "FindmeIRL — Menschen treffen und Orte vor Ort wachsen lassen",
      metaDesc:
        "FindmeIRL verbindet Menschen in der Nähe und gibt Locations klare Insights. Jetzt für den Start auf die Warteliste setzen.",
      langAria: "Sprache",
      navSiteAria: "Navigation",
      navForBusinesses: "Für Unternehmen",
      navForPeople: "Für Nutzer:innen",
      navRecording: "App-Aufzeichnung",
      navTerms: "Nutzungsbedingungen",
      navPrivacy: "Datenschutz",
      navMenuTitle: "Menü",
      navMenuOpen: "Menü öffnen",
      navMenuClose: "Menü schließen",
      legalBack: "Zurück",
      heroEyebrow: "Entdeckung vor Ort · Locations · Menschen in der Nähe",
      heroTitle:
        "Echte Orte. Echte Menschen. Echte Dynamik.",
      heroLeadHtml:
        "FindmeIRL zeigt, was um dich herum passiert — und gibt Betreibern Einblick in <strong>Publikum, Besuche und Events.</strong>",
      emailPlaceholder: "Berufs- oder private E-Mail",
      emailAria: "E-Mail für die Warteliste",
      submitCta: "Zugang sichern",
      waitlistFine:
        "Kein Spam — wir schreiben nur zum Launch und zu frühen Zugängen.",
      waitlistOk: "Du stehst auf der Liste. Wir melden uns.",
      waitlistErrEmail: "Bitte gib eine gültige E-Mail-Adresse ein.",
      waitlistErrGeneric:
        "Wir konnten deine Anmeldung nicht speichern. Bitte kurz warten und erneut versuchen.",
      waitlistJoining: "Wird gesendet…",
      asidePill: "Eine App · zwei Modi",
      stat1a: "Heute in der Nähe",
      stat1b: "live · Karte + Liste",
      stat2a: "Location-Insights",
      stat2b: "Besuche · Publikum · Events",
      stat3a: "Dein Profil",
      stat3b: "Filter · Chat · Einstellungen",
      tourEyebrow: "Produkttour",
      bizTitle: "Für Unternehmen",
      bizLead:
        "Profile, Entdeckung, Events und Insights — für Betreiber, die die Geschichte hinter dem Traffic verstehen wollen.",
      peopleEyebrow: "Im Alltag",
      peopleTitle: "Für Nutzer:innen",
      peopleLead:
        "Gezielt suchen, auswählen, chatten — schnell und bodenständig.",
      motionEyebrow: "In Bewegung",
      motionTitle: "So fühlt es sich an",
      motionLead:
        "Kurze Walkthroughs für Locations und für die Alltags-Nutzung — ein Produkt, zwei Perspektiven.",
      videoBiz: "Für Unternehmen — Venue-Walkthrough",
      videoPeople: "Für Nutzer:innen — App-Demo",
      bizCaption1:
        "Live-Profil so, wie es Gäste in der Entdeckung sehen.",
      bizCaption2:
        "Insights-Überblick — Besuche, Taps und was sich diese Woche bewegt.",
      bizCaption3:
        "Event veröffentlichen — Titel, Zeit, ortsfester Pin oder virtuell und was Gäste wissen müssen.",
      bizCaption4:
        "Profil-Header — Name, Zeiten und Schnellaktionen (eingeloggt).",
      bizCaption5:
        "Post- & Promo-Insights — Top-Posts nach Reichweite, Mix und datenschutzfreundliche Audience.",
      bizCaption6:
        "Kartenansicht — Nachbar-Locations und wie sich Personen in Echtzeit bündeln.",
      bizCaption7:
        "Überblick über geplante Events — Updates posten und verwalten",
      bizCaption8:
        "Kommende Hochlauf-Momente — Programm zum Durchscrollen.",
      bizCaption9:
        "Audience-Insights — Geschlecht, Altersbänder und wer eure Reichweite repräsentiert (privacy-safe).",
      bizCaption10:
        "Über das Venue — Beschreibung, Zeiten und Kontakt, auf die Gäste sich verlassen.",
      bizCaption11:
        "Discovery-Karte — Menschen, Locations und Signal auf der Karte aus der App.",
      bizCaption12:
        "Venue-Dashboard eingeloggt — About, Posts und Schnellaktionen an einem Ort.",
      peopleCaption1:
        "Entdeckungs-Filter — wer in deinem Nahbereich-Feed erscheint.",
      peopleCaption2:
        "Distanzregler — Radius vergrößern oder enger stellen.",
      peopleCaption3:
        "Herkunfts-Präferenzen — Matching jenseits der Basics.",
      peopleCaption4:
        "Benutzerdefinierte Filter — Kombinationen, die du wirklich nutzt.",
      peopleCaption5:
        "Soulmate-Score — so passt dein Profil zu Matches in der Nähe.",
      peopleCaption6:
        "Profil-Detail — Fotos, Bio und Kontext vor dem ersten Hi.",
      peopleCaption7:
        "Chat-Inbox — Fäden gebunden an echte Offline-Absicht.",
      peopleCaption8:
        "Einstellungen — Privatsphäre, Hinweise und Konto-Kontrolle.",
      footerContact: "Kontakt",
      footerPrivacy: "Datenschutz",
      footerTerms: "AGB",
    },
    fr: {
      docTitle:
        "FindmeIRL — Rencontrez des gens et faites vivre les lieux, dans la vraie vie",
      metaDesc:
        "FindmeIRL connecte les personnes à proximité et offre aux lieux des indicateurs clairs. Inscrivez-vous sur la liste d’attente.",
      langAria: "Langue",
      navSiteAria: "Navigation du site",
      navForBusinesses: "Pour les pros",
      navForPeople: "Pour tout le monde",
      navRecording: "Enregistrement de l’app",
      navTerms: "Conditions d’utilisation",
      navPrivacy: "Politique de confidentialité",
      navMenuTitle: "Menu",
      navMenuOpen: "Ouvrir le menu",
      navMenuClose: "Fermer le menu",
      legalBack: "Retour",
      heroEyebrow:
        "Découverte IRL · lieux · personnes à proximité",
      heroTitle:
        "De vrais lieux. De vraies personnes. Une vraie dynamique.",
      heroLeadHtml:
        "FindmeIRL aide à voir ce qui se passe autour de vous — tout en donnant aux lieux une vision claire de <strong>l’audience, des visites et des événements.</strong>",
      emailPlaceholder: "E-mail pro ou perso",
      emailAria: "E-mail pour la liste d’attente",
      submitCta: "Obtenir l’accès",
      waitlistFine:
        "Pas de spam — uniquement le lancement et les accès anticipés.",
      waitlistOk: "C’est noté. Nous revenons vers vous.",
      waitlistErrEmail: "Veuillez saisir une adresse e-mail valide.",
      waitlistErrGeneric:
        "Impossible d’enregistrer votre inscription. Vérifiez la connexion et réessayez.",
      waitlistJoining: "Envoi…",
      asidePill: "Une app · deux modes",
      stat1a: "Ce soir à proximité",
      stat1b: "live · carte + liste",
      stat2a: "Insights lieu",
      stat2b: "visites · audience · événements",
      stat3a: "Votre profil",
      stat3b: "filtres · chat · réglages",
      tourEyebrow: "Visite produit",
      bizTitle: "Pour les pros",
      bizLead:
        "Profils, découverte, événements et insights — pour les opérateurs qui veulent comprendre la fréquentation.",
      peopleEyebrow: "Au quotidien",
      peopleTitle: "Pour tout le monde",
      peopleLead:
        "Recherche intentionnelle, filtres, chat quand ça matche — fluide et ancré dans le réel.",
      motionEyebrow: "En mouvement",
      motionTitle: "Voir en action",
      motionLead:
        "Courtes démos pour les lieux et pour l’usage quotidien — le même produit, deux angles.",
      videoBiz: "Pour les pros — parcours lieu",
      videoPeople: "Pour tout le monde — démo app",
      bizCaption1:
        "Fiche entreprise live telle que vue dans la découverte.",
      bizCaption2:
        "Vue Insights — visites, interactions et mouvement de la semaine.",
      bizCaption3:
        "Publier un événement — titre, horaires, lieu épinglé ou virtuel, et infos invités.",
      bizCaption4:
        "En-tête de fiche — nom, horaires et actions rapides (compte connecté).",
      bizCaption5:
        "Insights posts & promo — top posts par portée, mix promo et audience respectueuse de la vie privée.",
      bizCaption6:
        "Carte — lieux voisins et affluence en temps réel sur la carte.",
      bizCaption7:
        "Vue d’ensemble de vos événements planifiés — publiez des mises à jour et gérez",
      bizCaption8:
        "Moments à venir — liste que les clients parcourent vite.",
      bizCaption9:
        "Insights audience — genre, tranches d’âge et qui porte votre portée (privacy-safe).",
      bizCaption10:
        "À propos du lieu — description, horaires et contact pour les invités.",
      bizCaption11:
        "Carte découverte — personnes, lieux et signaux comme dans l’app.",
      bizCaption12:
        "Vue lieu connectée — À propos, publications et actions dans un tableau de bord.",
      peopleCaption1:
        "Filtres découverte — qui apparaît dans le fil local.",
      peopleCaption2:
        "Curseur de distance — élargir ou resserrer la zone.",
      peopleCaption3:
        "Préférences d’origine — matching plus intentionnel.",
      peopleCaption4:
        "Filtres personnalisés — combos que vous gardez au quotidien.",
      peopleCaption5:
        "Score Soulmate — l’adéquation de votre profil avec les profils proches.",
      peopleCaption6:
        "Profil détaillé — photos, bio et contexte avant le premier message.",
      peopleCaption7:
        "Boîte de chat — fils ancrés dans l’intention réelle.",
      peopleCaption8:
        "Réglages — limites de vie privée, alertes et compte.",
      footerContact: "Contact",
      footerPrivacy: "Confidentialité",
      footerTerms: "Conditions",
    },
    it: {
      docTitle:
        "FindmeIRL — Incontra persone e valorizza i luoghi, nella vita reale",
      metaDesc:
        "FindmeIRL connette persone vicine e offre ai locali insight chiari. Iscriviti alla lista d’attesa per l’accesso anticipato.",
      langAria: "Lingua",
      navSiteAria: "Navigazione del sito",
      navForBusinesses: "Per le attività",
      navForPeople: "Per le persone",
      navRecording: "Registrazione app",
      navTerms: "Termini di servizio",
      navPrivacy: "Informativa sulla privacy",
      navMenuTitle: "Menu",
      navMenuOpen: "Apri il menu",
      navMenuClose: "Chiudi il menu",
      legalBack: "Indietro",
      heroEyebrow:
        "Scoperta dal vivo · locali · persone vicine",
      heroTitle:
        "Luoghi veri. Persone vere. Slancio vero.",
      heroLeadHtml:
        "FindmeIRL aiuta a capire cosa succede intorno a te — e dà ai locali una visione chiara di <strong>pubblico, visite ed eventi.</strong>",
      emailPlaceholder: "Email di lavoro o personale",
      emailAria: "Email per la lista d’attesa",
      submitCta: "Ottieni accesso",
      waitlistFine:
        "Niente spam — solo aggiornamenti su lancio e accessi anticipati.",
      waitlistOk: "Sei in lista. Ti scriviamo noi.",
      waitlistErrEmail: "Inserisci un indirizzo email valido.",
      waitlistErrGeneric:
        "Non siamo riusciti a salvare l’iscrizione. Controlla la connessione e riprova.",
      waitlistJoining: "Invio…",
      asidePill: "Stessa app · due modalità",
      stat1a: "Stasera vicino a te",
      stat1b: "live · mappa + elenco",
      stat2a: "Insight locale",
      stat2b: "visite · pubblico · eventi",
      stat3a: "Il tuo profilo",
      stat3b: "filtri · chat · impostazioni",
      tourEyebrow: "Tour del prodotto",
      bizTitle: "Per le attività",
      bizLead:
        "Profili, scoperta, eventi e insight — per chi vuole capire il traffico in negozio.",
      peopleEyebrow: "Uso quotidiano",
      peopleTitle: "Per le persone",
      peopleLead:
        "Cerca con intenzione, affina chi incontri, chatta quando scatta — veloce e con i piedi per terra.",
      motionEyebrow: "In movimento",
      motionTitle: "Guardalo in azione",
      motionLead:
        "Walkthrough brevi per i locali e per l’uso quotidiano — stesso prodotto, due lati.",
      videoBiz: "Per le attività — tour del locale",
      videoPeople: "Per le persone — demo app",
      bizCaption1:
        "Profilo business live come in scoperta.",
      bizCaption2:
        "Panoramica insight — visite, tap e cosa è cambiato.",
      bizCaption3:
        "Pubblica un evento — titolo, orari, pin sul luogo o virtuale, e info per gli ospiti.",
      bizCaption4:
        "Header profilo locale — nome, orari e azioni rapide (account connesso).",
      bizCaption5:
        "Insight post e promo — top post per reach, mix promozioni e audience privacy-safe.",
      bizCaption6:
        "Mappa — locali vicini e come si concentrano le persone in tempo reale.",
      bizCaption7:
        "Panoramica degli eventi programmati — pubblica aggiornamenti e gestisci",
      bizCaption8:
        "Prossimi momenti di afflusso — elenco facile da scorrere.",
      bizCaption9:
        "Insight audience — genere, fasce d’età e chi rappresenta il tuo reach (privacy-safe).",
      bizCaption10:
        "Informazioni sul locale — descrizione, orari e contatti su cui contano gli ospiti.",
      bizCaption11:
        "Mappa discovery — persone, locali e segnali come nell’app.",
      bizCaption12:
        "Dashboard venue connesso — About, post e azioni rapide in un solo posto.",
      peopleCaption1:
        "Filtri scoperta — chi compare nel feed vicino a te.",
      peopleCaption2:
        "Cursore distanza — allarga o restringi il raggio.",
      peopleCaption3:
        "Preferenze eredità — matching oltre i campi base.",
      peopleCaption4:
        "Filtri personalizzati — combinazioni che usi davvero.",
      peopleCaption5:
        "Punteggio Soulmate — quanto il tuo profilo si allinea ai match vicini.",
      peopleCaption6:
        "Profilo completo — foto, bio e contesto prima del ciao.",
      peopleCaption7:
        "Chat — thread legati a intenti dal vivo.",
      peopleCaption8:
        "Impostazioni — privacy, notifiche e controllo account.",
      footerContact: "Contatto",
      footerPrivacy: "Privacy",
      footerTerms: "Termini",
    },
    es: {
      docTitle:
        "FindmeIRL — Conoce gente y haz crecer los lugares, en la vida real",
      metaDesc:
        "FindmeIRL conecta personas cercanas y ofrece a los locales información clara. Únete a la lista de espera para acceso anticipado.",
      langAria: "Idioma",
      navSiteAria: "Navegación del sitio",
      navForBusinesses: "Para negocios",
      navForPeople: "Para personas",
      navRecording: "Grabación de la app",
      navTerms: "Términos de servicio",
      navPrivacy: "Política de privacidad",
      navMenuTitle: "Menú",
      navMenuOpen: "Abrir menú",
      navMenuClose: "Cerrar menú",
      legalBack: "Volver",
      heroEyebrow: "Descubrimiento en persona · locales · gente cercana",
      heroTitle: "Lugares reales. Personas reales. Impulso real.",
      heroLeadHtml:
        "FindmeIRL ayuda a descubrir qué ocurre a tu alrededor — y ofrece a los locales una visión clara de <strong>público, visitas y eventos.</strong>",
      emailPlaceholder: "Correo profesional o personal",
      emailAria: "Correo para la lista de espera",
      submitCta: "Obtener acceso",
      waitlistFine:
        "Sin spam — solo te escribiremos sobre el lanzamiento y accesos anticipados.",
      waitlistOk: "Estás en la lista. Nos pondremos en contacto.",
      waitlistErrEmail: "Introduce una dirección de correo válida.",
      waitlistErrGeneric:
        "No pudimos guardar tu registro. Comprueba la conexión e inténtalo de nuevo.",
      waitlistJoining: "Enviando…",
      asidePill: "Misma app · dos modos",
      stat1a: "Esta noche cerca",
      stat1b: "en vivo · mapa + lista",
      stat2a: "Información del local",
      stat2b: "visitas · público · eventos",
      stat3a: "Tu perfil",
      stat3b: "filtros · chat · ajustes",
      tourEyebrow: "Recorrido del producto",
      bizTitle: "Para negocios",
      bizLead:
        "Perfiles, descubrimiento, eventos e información — para quienes quieren entender el tráfico real.",
      peopleEyebrow: "Uso diario",
      peopleTitle: "Para personas",
      peopleLead:
        "Busca con intención, afina a quién conoces, chatea cuando encaja — social y con los pies en la tierra.",
      motionEyebrow: "En movimiento",
      motionTitle: "Míralo en acción",
      motionLead:
        "Recorridos breves para locales y para el día a día — el mismo producto, dos caras.",
      videoBiz: "Para negocios — recorrido del local",
      videoPeople: "Para personas — demo de la app",
      bizCaption1:
        "Perfil de negocio en vivo como lo ven los visitantes en descubrimiento.",
      bizCaption2:
        "Resumen de información — visitas, interacciones y cambios de la semana.",
      bizCaption3:
        "Publicar un evento — título, horario, ubicación fija o virtual y lo esencial para los invitados.",
      bizCaption4:
        "Cabecera del local — nombre, horarios y acciones rápidas (sesión iniciada).",
      bizCaption5:
        "Información de publicaciones y promos — mejores posts por alcance, mix y señales de público respetuosas con la privacidad.",
      bizCaption6:
        "Vista de mapa — locales cercanos y cómo se agrupa la gente en tiempo real.",
      bizCaption7:
        "Resumen de tus eventos programados — publica actualizaciones y gestiona",
      bizCaption8:
        "Próximos momentos de afluencia — lista que los clientes pueden explorar.",
      bizCaption9:
        "Información de audiencia — género, franjas de edad y quién representa tu alcance (privacidad segura).",
      bizCaption10:
        "Sobre el local — descripción, horarios y contacto en los que confían los invitados.",
      bizCaption11:
        "Mapa de descubrimiento — personas, locales e interés en vivo como en la app.",
      bizCaption12:
        "Vista del local con sesión — About, publicaciones y acciones rápidas en un panel.",
      peopleCaption1:
        "Filtros de descubrimiento — controla quién aparece en tu feed cercano.",
      peopleCaption2:
        "Control de distancia — amplía o reduce hasta dónde quieres mirar.",
      peopleCaption3:
        "Preferencias de origen — emparejamiento intencional más allá de lo básico.",
      peopleCaption4:
        "Filtros personalizados — guarda combinaciones que usas de verdad.",
      peopleCaption5:
        "Puntuación Soulmate — cómo encaja tu perfil con matches cercanos.",
      peopleCaption6:
        "Detalle del perfil — fotos, bio y contexto antes del primer hola.",
      peopleCaption7:
        "Bandeja de chat — hilos ligados a intención en la vida real.",
      peopleCaption8:
        "Ajustes — límites de privacidad, alertas y control de la cuenta.",
      footerContact: "Contacto",
      footerPrivacy: "Privacidad",
      footerTerms: "Términos",
    },
    pt: {
      docTitle:
        "FindmeIRL — Conheça pessoas e valorize locais, na vida real",
      metaDesc:
        "O FindmeIRL liga pessoas por perto e dá aos locais informação clara. Junte-se à lista de espera para acesso antecipado.",
      langAria: "Idioma",
      navSiteAria: "Navegação do site",
      navForBusinesses: "Para negócios",
      navForPeople: "Para pessoas",
      navRecording: "Gravação da app",
      navTerms: "Termos de serviço",
      navPrivacy: "Política de privacidade",
      navMenuTitle: "Menu",
      navMenuOpen: "Abrir menu",
      navMenuClose: "Fechar menu",
      legalBack: "Voltar",
      heroEyebrow: "Descoberta presencial · locais · pessoas por perto",
      heroTitle: "Lugares reais. Pessoas reais. Ímpeto real.",
      heroLeadHtml:
        "O FindmeIRL ajuda a perceber o que se passa à sua volta — e dá aos locais uma visão clara de <strong>público, visitas e eventos.</strong>",
      emailPlaceholder: "Email profissional ou pessoal",
      emailAria: "Email para a lista de espera",
      submitCta: "Obter acesso",
      waitlistFine:
        "Sem spam — só escrevemos sobre o lançamento e convites antecipados.",
      waitlistOk: "Está na lista. Entraremos em contacto.",
      waitlistErrEmail: "Introduza um endereço de email válido.",
      waitlistErrGeneric:
        "Não foi possível guardar o registo. Verifique a ligação e tente novamente.",
      waitlistJoining: "A enviar…",
      asidePill: "A mesma app · dois modos",
      stat1a: "Esta noite por perto",
      stat1b: "ao vivo · mapa + lista",
      stat2a: "Informação do local",
      stat2b: "visitas · público · eventos",
      stat3a: "O seu perfil",
      stat3b: "filtros · chat · definições",
      tourEyebrow: "Tour do produto",
      bizTitle: "Para negócios",
      bizLead:
        "Perfis, descoberta, eventos e informação — para quem quer perceber o tráfego real.",
      peopleEyebrow: "Uso quotidiano",
      peopleTitle: "Para pessoas",
      peopleLead:
        "Pesquise com intenção, afine quem conhece, converse quando faz sentido — social e com os pés na terra.",
      motionEyebrow: "Em movimento",
      motionTitle: "Veja em ação",
      motionLead:
        "Percursos breves para locais e para o dia a dia — o mesmo produto, dois lados.",
      videoBiz: "Para negócios — percurso do local",
      videoPeople: "Para pessoas — demo da app",
      bizCaption1:
        "Perfil de negócio em direto como os visitantes veem na descoberta.",
      bizCaption2:
        "Resumo de informação — visitas, toques e o que mudou esta semana.",
      bizCaption3:
        "Publicar um evento — título, horário, local fixo ou virtual e o essencial para os convidados.",
      bizCaption4:
        "Cabeçalho do local — nome, horários e ações rápidas (sessão iniciada).",
      bizCaption5:
        "Informação de publicações e promoções — melhores posts por alcance, mix e sinais de público respeitosos com a privacidade.",
      bizCaption6:
        "Vista de mapa — locais vizinhos e como as pessoas se agrupam em tempo real.",
      bizCaption7:
        "Resumo dos seus eventos programados — publique atualizações e gira",
      bizCaption8:
        "Próximos momentos de afluência — lista que os clientes podem explorar.",
      bizCaption9:
        "Informação de audiência — género, faixas etárias e quem o seu alcance representa (privacidade segura).",
      bizCaption10:
        "Sobre o local — descrição, horários e contacto em que os convidados confiam.",
      bizCaption11:
        "Mapa de descoberta — pessoas, locais e interesse em direto como na app.",
      bizCaption12:
        "Vista do local com sessão — About, publicações e ações rápidas num painel.",
      peopleCaption1:
        "Filtros de descoberta — controlo de quem aparece no feed por perto.",
      peopleCaption2:
        "Controlo de distância — alargue ou restrinja o raio de pesquisa.",
      peopleCaption3:
        "Preferências de origem — correspondência intencional para além do básico.",
      peopleCaption4:
        "Filtros personalizados — guarde combinações que usa mesmo.",
      peopleCaption5:
        "Pontuação Soulmate — como o seu perfil se alinha com matches por perto.",
      peopleCaption6:
        "Detalhe do perfil — fotos, bio e contexto antes do primeiro olá.",
      peopleCaption7:
        "Caixa de chat — conversas ligadas à intenção na vida real.",
      peopleCaption8:
        "Definições — limites de privacidade, alertas e controlo da conta.",
      footerContact: "Contacto",
      footerPrivacy: "Privacidade",
      footerTerms: "Termos",
    },
  };

  function normalizeLang(code) {
    if (!code) return "en";
    var c = String(code).toLowerCase().slice(0, 2);
    // Prefer packs that exist (handles stale caches where SUPPORTED lagged behind LANDING).
    if (Object.prototype.hasOwnProperty.call(LANDING, c)) return c;
    return SUPPORTED.indexOf(c) >= 0 ? c : "en";
  }

  function getStoredLang() {
    try {
      return normalizeLang(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return "en";
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, normalizeLang(lang));
    } catch (e) {}
  }

  function currentDocLang() {
    var b = document.body;
    if (!b) return null;
    return normalizeLang(b.getAttribute("data-legal-lang"));
  }

  function syncLegalLinks(lang) {
    var L = normalizeLang(lang);
    var nodes = document.querySelectorAll("a[data-legal-link]");
    for (var i = 0; i < nodes.length; i++) {
      var a = nodes[i];
      var doc = a.getAttribute("data-legal-link");
      if (!doc || !LEGAL_FILES[doc] || !LEGAL_FILES[doc][L]) continue;
      a.setAttribute("href", legalHref(LEGAL_FILES[doc][L]));
    }
  }

  function applyLandingStrings(lang) {
    var L = normalizeLang(lang);
    var pack = LANDING[L] || LANDING.en;
    var year = String(new Date().getFullYear());
    var onLegal = !!(document.body && document.body.getAttribute("data-legal-doc"));

    document.documentElement.lang = L;

    if (pack.docTitle && !onLegal) document.title = pack.docTitle;
    var meta = document.querySelector('meta[name="description"]');
    if (meta && pack.metaDesc && !onLegal) meta.setAttribute("content", pack.metaDesc);

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute("data-i18n");
      if (!key || !pack[key]) continue;
      var val = pack[key].replace(/\{year\}/g, year);
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = val;
      else el.textContent = val;
    }

    var ph = document.querySelectorAll("[data-i18n-placeholder]");
    for (var j = 0; j < ph.length; j++) {
      var inp = ph[j];
      var pk = inp.getAttribute("data-i18n-placeholder");
      if (pk && pack[pk]) inp.setAttribute("placeholder", pack[pk]);
    }

    var ar = document.querySelectorAll("[data-i18n-aria-label]");
    for (var k = 0; k < ar.length; k++) {
      var ela = ar[k];
      var ak = ela.getAttribute("data-i18n-aria-label");
      var ariaKey =
        ak === "nav.langAria" ? "langAria" : ak;
      if (ariaKey && pack[ariaKey]) ela.setAttribute("aria-label", pack[ariaKey]);
    }
  }

  function onLangSelectChange(sel) {
    var next = normalizeLang(sel.value);
    setStoredLang(next);

    var legal = document.body.getAttribute("data-legal-doc");
    if (legal && LEGAL_FILES[legal] && LEGAL_FILES[legal][next]) {
      window.location.href = legalHref(LEGAL_FILES[legal][next]);
      return;
    }

    applyLandingStrings(next);
    syncLegalLinks(next);
    try {
      window.dispatchEvent(new CustomEvent("findme:locale-changed"));
    } catch (e) {}

    var pack = LANDING[next] || LANDING.en;
    var aria = pack.langAria || "Language";
    var all = document.querySelectorAll(".site-lang-select");
    for (var i = 0; i < all.length; i++) {
      all[i].value = next;
      all[i].setAttribute("aria-label", aria);
    }
  }

  function initLangSelect() {
    var selects = document.querySelectorAll(".site-lang-select");
    if (!selects.length) return;

    var onLegal = !!document.body.getAttribute("data-legal-doc");
    var pageLang = currentDocLang();
    var initial = onLegal && pageLang ? pageLang : getStoredLang();
    initial = normalizeLang(initial);

    for (var s = 0; s < selects.length; s++) {
      selects[s].value = initial;
    }

    if (!onLegal) {
      applyLandingStrings(initial);
      syncLegalLinks(initial);
    } else {
      syncLegalLinks(pageLang || initial);
      applyLandingStrings(pageLang || initial);
    }

    for (var j = 0; j < selects.length; j++) {
      (function (sel) {
        sel.addEventListener("change", function () {
          onLangSelectChange(sel);
        });
      })(selects[j]);
    }

    var pack0 = LANDING[initial] || LANDING.en;
    var aria0 = pack0.langAria || "Language";
    for (var k = 0; k < selects.length; k++) {
      selects[k].setAttribute("aria-label", aria0);
    }
  }

  function currentUiLang() {
    var sel = document.querySelector(".site-lang-select");
    return sel ? normalizeLang(sel.value) : getStoredLang();
  }

  window.findmeI18n = {
    t: function (key) {
      var L = currentUiLang();
      var pack = LANDING[L] || LANDING.en;
      return pack[key] || "";
    },
    apply: function () {
      var L = currentUiLang();
      applyLandingStrings(L);
      syncLegalLinks(L);
    },
  };

  function boot() {
    initLangSelect();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
