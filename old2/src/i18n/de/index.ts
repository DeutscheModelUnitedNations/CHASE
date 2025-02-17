import type { Translation } from "../i18n-types";

const de = {
  LOADING_PAGE: "Lade...",
  ERROR: "Fehler",

  NOT_FOUND: {
    NOT_FOUND: "Nicht gefunden",
    BACK_TO_HOME: "Zurück zur Startseite",
  },

  cookieBanner: {
    HEADLINE: "Verwendung von Cookies",
    TEXT: "Um unsere Webseite für Sie optimal zu gestalten und fortlaufend verbessern zu können, verwenden wir Cookies. Durch die weitere Nutzung der Webseite und der Web App stimmen Sie der Verwendung von Cookies zu.",
    ACCEPT: "Ich verstehe",
    SUBTEXT: "Weitere Informationen zu Cookies erhalten Sie in unserer",
    PRIVACY_POLICY: "Datenschutzerklärung",
  },

  roles: {
    ADMIN: "Konferenz-Administrator*in",
    SECRETARIAT: "Mitarbeiter*in des Sekretariats",
    CHAIR: "Gremienvorsitz",
    COMMITTEE_ADVISOR: "Gremienberatung",
    NON_STATE_ACTOR: "Vertreter*in eines Nichtstaatlichen Akteurs",
    PRESS_CORPS: "Mitglied der Konferenzpresse",
    GUEST: "Gast",
    PARTICIPANT_CARE: "Teilnehmendenbetreuung",
    MISCELLANEOUS_TEAM: "Teammitglied",
    UNKNOWN: "Unbekannte Rolle",
  },

  messageCategories: {
    TO_CHAIR: "Anfrage an den Vorsitz",
    GUEST_SPEAKER: "Gastrede anfragen",
    FACT_CHECK: "Faktencheck",
    INFORMATION: "Informationsanfrage",
    GENERAL_SECRETARY: "Um Besuch des/der Generalsekretär*in bitten",
    OTHER: "Sonstiges",
  },

  home: {
    CAPTION: " im 21. Jahrhundert",
    HERO_TEXT:
      "Debattenmanagement bei Model United Nations Konferenzen bekommt endlich ein Upgrade.",
    navbar: {
      LOGIN_ADMIN: "Admin",
      LOGIN_CHAIR: "Vorsitz",
      DOCUMENTATION: "Dokumentation",
      FAQ: "FAQ",
      LOGIN_PARTICIPANT: "Login",
    },
    heroCards: {
      CARD_1_TITLE: "Debatten",
      CARD_1_TEXT:
        "Verwalte Rede- und Kurzbemerkungsliste einfach und effizient. Keine Papierlisten mehr!",
      CARD_2_TITLE: "Abstimmungen",
      CARD_2_TEXT:
        "Verwalte Anträge und Abstimmungen elektronisch und mit vorbereiteten Anträgen nach Ihrer Geschäftsordnung.",
      CARD_3_TITLE: "Resolutionen",
      CARD_3_TEXT:
        "Erstelle und bearbeite Resolutionen gemeinsam mit anderen Delegierten. Kein Papier oder Google Docs mehr!",
      COMING_SOON: "Kommt bald",
    },
    ABOUT_TITEL: "Über CHASE",
    ABOUT_TEXT:
      "CHASE (CHAirSoftwarE) ist eine Webanwendung zur Verwaltung und Durchführung von Debatten in Model United Nations Konferenzen. Sie ist für Vorsitzende und Delegierte gleichermaßen konzipiert. CHASE ermöglicht es Vorsitzenden, Debatten einfach zu verwalten, während Delegierte der Debatte folgen und mit anderen Delegierten auf intuitive und strukturierte Weise zusammenarbeiten können. CHASE ist freie und open source Software.",
    MISSION_TITLE: "Unsere Mission",
    MISSION_TEXT:
      "CHASE wird von Mitgliedern des deutschen Vereins DMUN e.V. entwickelt. Wir wollen eine kostenlose und frei zugängliche Alternative zu anderen Debatten-Management Anwendungen schaffen und damit den Zugang auch für kleinere Konferenzen erleichtern. CHASE ist primär für die deutschsprachigen Konferenzen von DMUN in Deutschland – MUN-SH, MUNBW und MUNBB – entwickelt worden. Wir sind aber offen dafür, CHASE an andere Konferenzen anzupassen.",
    MISSION_BUTTON_LABEL: "Mehr über DMUN erfahren",
    CONTRIBUTE_TITEL: "Mithelfen",
    CONTRIBUTE_TEXT:
      "CHASE ist ein wichtiger Bestandteil der Open-Source-Initiative 'MUNify' von DMUN. Das bedeutet, dass jeder, der möchte, zur Entwicklung beitragen kann. Wir freuen uns über jede Hilfe, die wir bekommen können. Wenn Sie also Erfahrung im Web-Development haben, oder einfach nur neue Skills lernen und mithelfen möchten, schauen Sie doch mal auf unserem GitHub vorbei!",
    CONTRIBUTE_BUTTON_LABEL: "MUNify auf GitHub",
    VERSION_BUTTON: "Version und Änderungen",
    footer: {
      sitemap: {
        TITEL: "Sitemap",
        HOME: "Home",
        FAQ: "FAQs",
        DOCS: "Dokumentation",
        LOGIN: "Login",
        PRIVACY: "Datenschutzbestimmungen",
      },
      imprint: {
        TITEL: "Impressum",
        ORGANISATION: "Deutsche Model United Nations (DMUN) e.V.",
        ADDRESS: "Birkenweg 1, 24235 Laboe",
        EMAIL: "vorstand@dmun.de",
        WEBSITE: "www.dmun.de",
      },
    },
  },

  docs: {
    TITLE: "Dokumentation",
    DESCRIPTION:
      "Hier finden Sie eine Übersicht über die Funktionen und Möglichkeiten von CHASE.",
    BACK_TO_HOME: "Zurück zur Startseite",
  },

  faq: {
    TITLE: "FAQs",
    DESCRIPTION:
      "Hier finden Sie Antworten auf häufig gestellte Fragen zu CHASE.",
    BACK_TO_HOME: "Back to home",
  },

  admin: {
    login: {
      TITLE: "Admin Login",
      CONFERENCE_ID: "Konferenz ID",
      CREATE_INSTEAD: "Erstellen",
      SUBMIT: "Login",
    },
    onboarding: {
      title: "Neue Konferenz erstellen",
      conferenceName: "Name der Konferenz",
      dates: "Zeitraum",
      token: "Erstellungstoken",
      login: "Anmelden",
      submit: "Erstellen",
      success: "Erfolg",
      successDetails: "Die Konferenz wurde erstellt!",
      error: {
        title: "Fehler",
        wrongToken: "Das Token ist ungültig.",
        conferenceExists: "Eine Konferenz mit diesem Namen existiert bereits.",
        generic: "Ein Fehler ist aufgetreten.",
        unavailable:
          "Aus rechtlichen Gründen nicht erreichbar (keiner Verwendung von Cookies zugestimmt).",
      },

      SAVE_AND_QUIT: "Einrichtung beenden",
      SAVE_AND_QUIT_MESSAGE:
        "Wollen Sie die Einrichtung wirklich beenden? Sie kann später jederzeit fortgesetzt werden.",
      BUTTON_ADVANCE: "Weiter",
      BUTTON_BACK: "Zurück",

      structure: {
        DELETE_ALL: "Alles löschen",
        DELETE_ALL_CONFIRM: "Are you sure you want to delete all committees?",
        ADD_COMMITTEE: "Gremium hinzufügen",
        SUCCESS_ADD_COMMITTEE: "Gremium hinzugefügt",
        EMPTY_MESSAGE:
          "Keine Gremien vorhanden. Klicke oben rechts auf 'Gremium hinzufügen', um ein neues Gremium zu erstellen.",
        COMMITTEE_LONG: "Name",
        COMMITTEE_SHORT: "Abkürzung",
        CATEGORY: "Kategorie",
        FOOTER: "Insgesamt {{0}} Gremien.",
        input: {
          BUTTON_ADD: "Hinzufügen",
          BUTTON_CANCEL: "Abbrechen",
          CATEGORY: "Kategorie",
          CATEGORY_SWITCH_COMMITTEE: "Gremium",
          CATEGORY_SWITCH_CRISIS: "Krise",
          CATEGORY_SWITCH_ICJ: "IGH",
          IS_SUBCOMMITTEE: "Ist Vorlegendes Gremium / Untergremium",
          PARENT_COMMITTEE:
            "Beschlussfassendes Gremium / Übergeordnetes Gremium",
        },
        ERROR_NO_COMMITTEES: "Keine Gremien vorhanden",
        ERROR_NO_COMMITTEES_DETAILS:
          "Bitte erstellen Sie ein Gremium, um fortzufahren.",
      },

      teampool: {
        DELETE_ALL: "Alle löschen",
        UPLOAD_TEAM: "CSV hochladen",
        ADD_TEAMMEMBER: "Teammitglied hinzufügen",
        EMPTY_MESSAGE:
          "Keine Teammitglieder vorhanden. Klicke oben rechts auf 'Teammitglied hinzufügen', um ein neues Teammitglied zu erstellen.",
        FOOTER: "Insgesamt {{0}} Teammitglieder.",
        ROLE: "Rolle",
        COUNT: "Anzahl",
        roles: {
          ADMIN: "Admin",
          SECRETARIAT: "Sekretariat",
          CHAIR: "Vorsitz",
          COMMITTEE_ADVISOR: "Gremienberatung",
          NON_STATE_ACTOR: "Nichtstaatliche Akteur",
          PRESS_CORPS: "Konferenzpresse",
          GUEST: "Gast",
          PARTICIPANT_CARE: "Teilnehmendenbetreuung",
          MISCELLANEOUS_TEAM: "Sonstiges Team",
        },
        input: {
          COUNT: "Anzahl",
          BUTTON_ADD: "Hinzufügen",
          BUTTON_CANCEL: "Abbrechen",
        },
      },

      committees: {
        CHAIRS: "Vorsitzende auswählen",
        ADVISORS: "Gremienberatung auswählen",
        AGENDA_ITEMS: "Tagesordnung",
        ADD_AGENDA_ITEM: "Tagesordnungspunkt hinzufügen",
        ADD_ITEM_BUTTON: "Hinzufügen",
      },

      delegations: {
        ADD_DELEGATION_BUTTON: "Delegation hinzufügen",
        DELEGATION_COLUMN: "Delegation",
        TOTAL_NUMBER_OF_DELEGATIONS: "Summe",
        EMPTY_MESSAGE: "Keine Delegationen gefunden",
        add_delegation: {
          HEADLINE: "Delegation hinzufügen",
          SEARCH_PLACEHOLDER: "Nach Delegation suchen",
          BACK_BUTTON: "Zurück",
          ADD_BUTTON: "Hinzufügen und schließen",
          ADD_MORE_BUTTON: "Hinzufügen",
        },
      },

      configs: {
        pressWebsiteTitle: "Presse Website",
        pressWebsiteDescription:
          "Hier kannst du die URL der Pressewebsite konfigurieren.",
        feedbackWebsiteTitle: "Feedback Website",
        feedbackWebsiteDescription:
          "Hier kannst du die URL der Feedbackwebsite konfigurieren.",
        successToast: "Einstellungen gespeichert",
      },

      steps: {
        STEP_1: "Struktur",
        STEP_2: "Teampool",
        STEP_3: "Gremien",
        STEP_4: "Delegationen",
        STEP_5: "NAs",
        STEP_6: "Configurations",
      },
    },
  },

  login: {
    EMAIL_PLACEHOLDER: "E-Mail",
    PASSWORD_PLACEHOLDER: "Passwort",
    REPEAT_PASSWORD_PLACEHOLDER: "Passwort wiederholen",
    PASSWORDS_DO_NOT_MATCH: "Passwörter stimmen nicht überein",
    FORGOT_PASSWORD: "Passwort vergessen?",
    SENT_EMAIL: "E-Mail gesendet",
    ADVANCE_BUTTON: "Weiter",
    BACK_BUTTON: "Zurück",
    LOGIN_BUTTON: "Anmelden",
    LOGIN_TITLE: "Anmelden",
    LOGIN_DESCRIPTION: "Bitte melden Sie sich mit Ihren Zugangsdaten an.",
    EMAIL_NOT_CONFIRMED:
      "Die E-Mail-Adresse wurde noch nicht bestätigt. Bitte checken Sie Ihr E-Mail-Postfach.",
    EMAIL_NOT_FOUND: "Die E-Mail-Adresse wurde nicht gefunden.",
    EMAIL_NO_ACTIVE_VALIDATION_TOKEN:
      "Die E-Mail-Adresse hat keinen aktiven Bestätigungstoken.",
    EMAIL_INVALID_TOKEN: "Der Bestätigungstoken ist ungültig.",
    EMAIL_ALREADY_VALIDATED: "Die E-Mail-Adresse wurde bereits bestätigt.",
    EMAIL_VALIDATION_TOKEN_EXPIRED:
      "Der Bestätigungstoken ist abgelaufen. Bitte fordern Sie einen neuen an.",
    SET_CREDENTIALS: "Zugangsdaten festlegen",
    NO_TOKEN: "Der Bestätigungstoken ist ungültig oder nicht vorhanden.",
    NO_EMAIL: "Die E-Mail ist ungültig oder nicht vorhanden.",
    EMAIL_CONFIRMED: "Die E-Mail ist nun bestätigt!",
    EMAIL_CONFIRMED_SERVER_ERROR:
      "Wir hatten Probleme deine E-Mail zu bestätigen. Bitte versuche es später noch einmal.",
    PASSKEY: "Passkey",
    PASSWORD: "Passwort",
    LOGIN_NOW: "Jetzt anmelden",
    EMAIL_INVALID: "E-Mail-Adresse ungültig",
    CREATE_ACCOUNT: "Konto erstellen",
    PASSWORD_INVALID:
      "Das Passwort ist ungültig. Es muss mindestens 8 Zeichen lang sein, und mindesten einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.",
    USER_FOUND: "Benutzer gefunden. Bitte geben Sie Ihr Passwort ein.",
    WHAT_ARE_PASSKEYS: "Was sind Passkeys?",
    CREATION_SUCCESS:
      "Account erfolgreich erstellt. Bitte bestätigen Sie ihre E-Mail-Adresse über die Link in der E-Mail, die wir geschickt haben, um den Account zu aktivieren.",
    ACCOUNT_NOT_YET_CREATED:
      "Prima, ein Konto mit dieser E-Mail-Adresse existiert noch nicht! Sie können jetzt ein Konto für diese E-Mail Addresse erstellen.",
    WRONG_CREDENTIALS: "Falsche Zugangsdaten",
    POWERED_BY: "Ermöglicht durch",
    legalNotice: {
      SECTION_1: "Ich bin Einverstanden mit den ",
      TERMS_LINK: "Nutzungsbedingungen",
      SECTION_2:
        ". Außerdem bin ich damit einverstanden, dass diese Website Cookies verwendet. Mehr Informationen dazu finden Sie in unseren ",
      PRIVACY_LINK: "Datenschutzbestimmungen",
      SECTION_3: ".",
    },
    participant: {
      OTHER_SIGH_IN: "Stattdessen als Vorsitz anmelden",
      COMMITTEE_LABEL: "Gremium",
      COUNTRY_LABEL: "Staat / NA",
      committeeSelection: {
        HEADLINE: "Gremium auswählen",
      },
    },
    chair: {
      OTHER_SIGN_IN: "Stattdessen als Teilnehmer anmelden",
      WARNING_MESSAGE: "Sie sind im Begriff sich als Vorsitz anzumelden.",
    },
    gateway: {
      TITLE: "Willkommen bei CHASE",
      CONFERENCE_MEMBER_SINGLE:
        "Du bist für eine Konferenz registriert. Klicke auf den Button unten, um die App zu starten.",
      CONFERENCE_MEMBER_MULTIPLE:
        "Du bist für mehrere Konferenzen registriert. Bitte wähle die Konferenz, für die du die App starten möchtest.",
      COMMITTEE_MEMBER_SINGLE:
        "Du bist für ein Gremium registriert. Klicke auf den Button unten, um die App zu starten.",
      COMMITTEE_MEMBER_MULTIPLE:
        "Du bist für mehrere Gremien registriert. Bitte wähle das Gremium, für das du die App starten möchtest.",
      LAUNCH_BUTTON: "Launch the app",
      NO_MEMBERSHIP:
        "Du bist für keine Konferenz oder kein Gremium registriert. Wenn du glaubst, dass das ein Fehler ist, wende dich bitte an den Konferenzadmin.",
      LOGOUT_BUTTON: "Abmelden",
    },
    lockout: {
      TITLE: "Du wurdest ausgesperrt",
      DETAIL:
        "Du hast keine Berechtigung, diesen Teil der App zu nutzen. Bitte melde dich erneut an.",
    },
  },

  navbar: {
    SETTINGS: "Einstellungen",
    LOGOUT: "Logout",
    HUB: "Hub",
    DASHBOARD: "Dashboard",
    CONFIGURATION: "Voreinstellungen",
    ATTENDEES: "Anwesenheit",
    SPEAKERS: "Redeliste",
    VOTING: "Abstimmungen",
    WHITEBOARD: "Whiteboard",
    INBOX: "Inbox",
    RESOLUTIONS: "Resolutionen",
    PRESENTATION: "Präsentation",
    NEWS: "Konferenzpresse",
    BUG_REPORT: "Fehler melden",
  },

  settings: {
    colorTheme: {
      HEADLINE: "Farbmodus",
      SYSTEM: "System",
      LIGHT: "Hell",
      DARK: "Dunkel",
      CONTRAST: "Kontrast",
    },
    language: {
      HEADLINE: "Sprache",
      SYSTEM: "System",
      ENGLISH: "English",
      GERMAN: "Deutsch",
    },
  },

  hub: {
    CHAIR_HUB_TITLE: "Mission Control",
    NA_HUB_TITLE: "Hub der Nichtstaatliche Akteure",
    GUEST_HUB_TITLE: "Gäste-Hub",
    SELECT_COMMITTEE: "Wähle ein Gremium",
    NO_COMMITTEES: "Keine Gremien gefunden",
    LOGOUT: "Abmelden",
  },

  participants: {
    dashboard: {
      widgetHeadlines: {
        SPEAKERS_LIST: "Redeliste",
        COMMENT_LIST: "Fragen und Kurzbemerkungen",
        MODERATED_CAUCUS: "Moderierte Informelle Sitzung",
        COMMITTEE_STATUS: "Debattenstatus",
        WHITEBOARD: "Whiteboard",
        DOCUMENTS: "Dokumente",
        ACTIONS: "Anfrage senden",
        PRESENCE: "Mehrheitsverhältnisse",
      },
      timerWidget: {
        UNTIL: "bis {{0}} Uhr",
        TOAST_HEADLINE: "Zeit ist abgelaufen!",
        TOAST_MESSAGE: "Gehe zurück in die formelle Debatte.",
        defaultHeadlines: {
          FORMAL: "Formelle Debatte",
          INFORMAL: "Informelle Sitzung",
          PAUSE: "Pause",
          SUSPENSION: "Vertagung",
        },
      },
      actionsWidget: {
        CHAIR_BUTTON: "Vorsitz",
        RESEARCH_SERVICE_BUTTON: "Wiss. Dienst",
        contactForm: {
          HEADLINE_CHAIR: "Sende dem Vorsitz eine Nachricht",
          HEADLINE_RESEARCH_SERVICE:
            "Sende dem Wissenschaftlichen Dienst (WD) eine Nachricht",
          SUBJECT_PLACEHOLDER: "Betreff",
          MESSAGE_PLACEHOLDER: "Nachricht",
          CATEGORY_LABEL: "Kategorie",
          CATEGORY_PLACEHOLDER: "Wähle eine Kategorie aus",
          CANCEL_BUTTON: "Abbrechen",
          SEND_BUTTON: "Senden",
          INFO_MESSAGE:
            "Diese Anfrage wird zunächst vom Vorsitz geprüft und erst dann an den Wissenschaftlichen Dienst weitergeleitet. Die Antwort erfolgt in der Regel per E-Mail – behalten Sie bitte Ihr Postfach im Auge.",
          categoryOptions: {
            GUEST_SPEAKER: "Gastrede anfragen",
            FACT_CHECK: "Faktencheck",
            INFORMATION: "Informationsanfrage",
            GENERAL_SECRETARY: "Um Besuch des/der Generalsekretär*in bitten",
            OTHER: "Sonstiges",
          },
        },
        toast: {
          SUCCESS_CHAIR_SUMMARY: "Nachricht gesendet",
          SUCCESS_CHAIR_DETAIL: "Der Vorsitz wird sich bald bei Ihnen melden.",
          SUCCESS_RESEARCH_SUMMARY: "Nachricht gesendet",
          SUCCESS_RESEARCH_DETAIL:
            "Der Wissenschaftliche Dienst wird sich bald bei Ihnen melden.",
          ERROR_SUMMARY: "Fehler beim Senden",
          ERROR_DETAIL:
            "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut und melden Sie den Fehler.",
        },
      },
      documentsWidget: {
        SPONSORS: "signierte Unterstützer*innen",
      },
    },

    speakersList: {
      SPEAKERS_LIST: "Redeliste",
      COMMENT_LIST: "Fragen und Kurzbemerkungen",
      MODERATED_CAUCUS: "Moderierte Informelle Sitzung",
      ADD_TO_LIST_BUTTON: "Redebeitrag",
      REMOVE_FROM_LIST_BUTTON: "Zurückziehen",
      LIST_CLOSED_BUTTON: "Liste Geschlossen",
      LIST_CLOSED_MESSAGE: "Liste Geschlossen",
      NO_SPEAKERS_MESSAGE: "Liste ist leer",
      NO_ACTIVE_AGENDA_ITEM: "Kein aktiver Tagesordnungspunkt",
      toast: {
        ADDED_SUCCESS_SUMMARY: "Redebeitrag hinzugefügt",
        ADDED_SUCCESS_DETAIL: "zu {{0}}",
        ADDED_FORBIDDEN_SUMMARY: "Hinzufügen nicht erlaubt",
        ADDED_FORBIDDEN_DETAIL:
          "Sie sind wahrscheinlich nicht als ANWESEND im Gremium registriert. Bitte wende dich an den Vorsitz.",
        ADDED_ALREADY_ON_LIST_SUMMARY: "Bereits auf der Liste",
        ADDED_ALREADY_ON_LIST_DETAIL:
          "Bitte warten Sie einen Moment – Ihr Redebeitrag wird jeden Moment angezeigt. Wenn nicht, laden Sie die Seite neu. Wenn der Fehler weiterhin besteht, wenden Sie sich an den Vorsitz.",
        ADDED_ERROR_SUMMARY: "Fehler beim Hinzufügen",
        ADDED_ERROR_DETAIL:
          "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut oder wenden Sie sich an den Vorsitz.",
        REMOVED_SUCCESS_SUMMARY: "Redebeitrag zurückgezogen",
        REMOVED_SUCCESS_DETAIL: "von {{0}}",
        REMOVED_ERROR_SUMMARY: "Fehler beim Zurückziehen",
        REMOVED_ERROR_DETAIL:
          "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut oder wenden Sie sich an den Vorsitz.",
      },
    },

    voting: {
      ACTIVE_MOTIONS_TAB: "Aktuelle Anträge",
      RECENT_MOTIONS_TAB: "Vergangene Anträge",
      RECENT_VOTINGS_TAB: "Vergangene Abstimmungen",
      NO_DATA_MOTIONS: "Aktuell keine Anträge",
      VOTING_HEADLINE: "Abstimmung",
      NO_DATA_VOTING: "Keine Abstimmung ausgewählt",
      votingInfo: {
        INTRODUCED_BY: "Eingebracht von",
        votingMode: {
          SUBSTANTIAL_VOTING: "Inhaltliche Abstimmung – Enthaltung möglich",
          PROCEDURAL_VOTING:
            "Prozessuale Abstimmung – keine Enthaltung möglich",
        },
        majorityMode: {
          SIMPLE: "Einfache Mehrheit erforderlich (50% + 1)",
          TWO_THIRDS: "Zwei-Drittel Mehrheit erforderlich (2/3)",
          THREE_QUARTERS: "Drei-Viertel Mehrheit erforderlich (3/4)",
          CONSENSUS: "Konsens erforderlich",
          SECURITY_COUNCIL:
            "Abstimmungsmodus des Sicherheitsrats (9/15 + no veto)",
        },
      },
      votingButtons: {
        IN_FAVOUR: "Dafür",
        AGAINST: "Dagegen",
        ABSTENTION: "Enthaltung",

        REMAINING: "Verbleibend",

        VOTE_REGISTERED: "Stimme registriert",
        VOTE_REGISTERED_MESSAGE: "Warten auf Ergebnis",
      },
      votingResults: {
        VOTING_SUCCESSFUL: "Abstimung Erfolgreich",
        VOTING_FAILED: "Abstimmung Fehlgeschlagen",
      },
      votingAlert: {
        VOTING_ALERT_HEADER: "Neue Abstimmung gestartet",
        VOTING_ALERT_MESSAGE:
          "Sie wurden zu einer neuen Abstimmung aufgerufen. Bitte nehmen Sie schnellstmöglich daran teil.",
        BUTTON_ADVANCE: "Zur Abstimmung",
        BUTTON_IGNORE: "Ignorieren",
      },
    },
  },

  chairs: {
    CHAIR: "Vorsitz",
    dashboard: {
      overview: {
        TITLE: "Übersicht",
      },
      configurations: {
        TITLE: "Konfigurationen",
        agenda: {
          TITLE: "Auswahl des Tagesordnungspunktes",
          DESCRIPTION: "Wähle den aktuellen Tagesordnungspunkt aus.",
          PLACEHOLDER: "Gerade kein aktiver Tagesordnungspunkt",
          TOAST_SUCCESS: "Tagesordnungspunkt aktiviert",
        },
        stateOfDebate: {
          TITLE: "Debattenstatus",
          DESCRIPTION: "Lege den Debattenstatus fest (z.B. Allgemeine Debatte)",
          CURRENTLY_NO_STATUS: "Kein Status festgelegt",
          PLACEHOLDER_TEXT: "Debattenstatus",
          TOAST_SUCCESS: "Status '{state}' gespeichert",
        },
        statusTimer: {
          TITLE: "Status Timer",
          DESCRIPTION:
            "Setze den Status des Gremiums fest. Du kannst auch einen benutzerdefinierten Namen festlegen, der den Standardstatusnamen überschreibt, während das Symbol beibehalten wird (z. B. 'Mittagspause' anstelle von 'Pause').",
          PLACEHOLDER_DROPDOWN: "Wähle einen Status aus",
          PLACEHOLDER_CUSTOM_TEXT: "Eigener Name (optional)",
          PLACEHOLDER_TIME_UNITL: "until",
          BUTTON: "Status Speichern",
          TOAST_SUCCESS: "Status {status} bis {date} gespeichert",
        },
        speakersListAdding: {
          TITLE: "Hinzufügen zu Redelisten",
          DESCRIPTION:
            "Wähle eine Einstellung aus, um Delegierten zu erlauben, sich selbst zur Redeliste hinzuzufügen.",
          TOGGLE_BUTTON_NOT_ALLOWED: "Nicht erlaubt",
          TOGGLE_BUTTON_ALLOWED: "Erlaubt",
          TOAST_SUCCESS: "Einstellung geändert",
          TOAST_SUCCESS_DETAILS_ALLOWED:
            "Delegierte können sich nun selbst hinzufügen.",
          TOAST_SUCCESS_DETAILS_NOT_ALLOWED:
            "Delegierte können sich nicht mehr selbst hinzufügen.",
        },
        overlay: {
          TITLE: "Redeliste Overlay",
          DESCRIPTION:
            "Öffnet die Redeliste in einem kleinen Overlay am unteren Bildschirmrand.",
          TOGGLE_BUTTON: "Overlay öffnen/schließen",
        },
        presentationMode: {
          TITLE: "Präsentationsmodus öffnen",
          DESCRIPTION:
            "Öffne ein neues Fenster im Präsentationsmodus über den folgenden Link, um ihn auf einem Beamer für alle Teilnehmenden sichtbar anzuzeigen.",
          BUTTON: "Präsentationsmodus",
        },
        regionalGroups: {
          TITLE: "Regionalgruppen",
          DESCRIPTION:
            "Öffne eine Übersicht der Regionalgruppen und weise Delegationen zu.",
          BUTTON_PRESENTATION: "Präsentations-Loop",
          BUTTON_LOOKUP: "Regionalgruppen nachschlagen",
          FILTER: "Filtern...",
          AFRICA: "Afrika",
          ASIA: "Asien and Ozeanien",
          LATIN_AMERICA: "Lateinamerika und Karibik",
          EASTERN_EUROPE: "Osteuropa",
          WESTERN_EUROPE: "Westeuropa und andere",
        },
      },
    },
    attendance: {
      PRESENT: "Anwesend",
      ABSENT: "Abwesend",
      EXCUSED: "Entschuldigt",
      nations: {
        TITLE: "Anwesenheit der Delegationen",
        DESCRIPTION: "Verwalte die Anwesenheit der Delegationen im Gremium.",
      },
      nsa: {
        TITLE: "Nichtstaatliche Akteure",
        DESCRIPTION:
          "Verwalte die Anwesenheit der Nichtstaatlichen Akteure im Gremium. Sie werden nicht in die Abstimmungsverhältnisse einbezogen und dürfen nicht an Abstimmungen teilnehmen.",
      },
      SET_ALL_ABSENT: "Alle auf Abwesend setzen",
      SET_ALL_PRESENT: "Alle auf Anwesend setzen",
    },
    whiteboard: {
      SAVE_BUTTON: "Speichern und Veröffentlichen",
      RESET_BUTTON: "Zurücksetzen",
      SUCCESS_TOAST: "Whiteboard gespeichert",
      NO_CONTENT_TOAST: "Whiteboard ist leer",
      NO_CONTENT_TOAST_DETAILS:
        "Es scheint, als ob beim laden des Whiteboards ein Fehler aufgetreten ist oder das Whiteboard ist leer. Bitte versuche die Seite neu zu laden.",
    },
    speakersList: {
      buttons: {
        START_TIMER: "Start",
        PAUSE_TIMER: "Stop",
        RESET_TIMER: "Zeit zurücksetzen",
        REMOVE_TIME: "15s",
        ADD_TIME: "15s",
        NEXT_SPEAKER: "Nächste Redner*in",
        ADD_TO_LIST: "Redebeitrag",
        CLOSE_LIST: "Liste schließen",
        OPEN_LIST: "Liste öffnen",
        CLEAR_LIST: "Liste zurücksetzen",
        CHANGE_SPEECH_TIME: "Redezeit ändern",
      },
      addSpeakerOverlay: {
        HEADLINE: "Redebeiträge zu {{0}} hinzufügen",
        PLACEHOLDER: "Suche nach Redner*innen",
        BUTTON_CANCEL: "Schließen",
        BUTTON_ADD: "Hinzufügen",
        BUTTON_ADD_AND_CLOSE: "Hinzufügen und schließen",
        TOAST_ADDED_SUMMARY: "{{0}} hinzugefügt",
        TOAST_ADDED_DETAIL: "zu {{0}}",
        TOAST_ALREADY_ON_LIST: "Already on {{0}}",
        TOAST_ALREADY_ON_LIST_DETAIL: "This country is already on {{0}}",
      },
      changeSpeechTimeOverlay: {
        HEADLINE: "Redezeit für {{0}} ändern",
        BUTTON_CANCEL: "Abbrechen",
        BUTTON_SET: "Ändern",
        PLACEHOLDER: "Neue Redezeit (mm:ss)",
        TOAST_SUCCESS: "Redezeit festgelegt auf {{0}} min",
        TOAST_SUCCESS_DETAIL: "für {{0}}",
        TOAST_WRONG_FORMAT: "Falsches Format",
      },
      confirm: {
        NEXT_SPEAKER_MESSAGE:
          "Willst du wirklich den nächsten Redner aufrufen?",
        NEXT_SPEAKER_HEADER: "Nächste Rede: {list}",
        NEXT_SPEAKER_ACCEPT: "Ja",
        NEXT_SPEAKER_REJECT: "Nein",
      },
    },
    voting: {
      BUTTON_NEW_MOTION: "Neuer Antrag",
      BUTTON_CHANGE_INFO: "Infos Ändern",
      BUTTON_RESET: "Abstimmung neu starten",
      BUTTON_DELETE: "Abstimmung löschen",
    },
  },

  messageBoard: {
    toast: {
      NEW_MESSAGE_SUMMARY: "Neue Nachricht",
      NEW_MESSAGE_DETAIL: "Sie haben eine neue Nachricht erhalten.",
      FORWARDED_SUMMARY: "Nachricht weitergeleitet",
      FORWARDED_DETAIL:
        "Die Nachricht wurde erfolgreich an den Wissenschaftlichen Dienst weitergeleitet.",
      ARCHIVED_SUMMARY: "Nachricht archiviert",
      ARCHIVED_DETAIL:
        "Die Nachricht wurde erfolgreich archiviert. Um sie wieder herzustellen, frage einen Konferenz-Admin.",
    },
    menu: {
      MARK_AS_UNREAD: "Als ungelesen markieren",
      ARCHIVE: "Archivieren",
    },
    pdf: {
      HEADLINE: "Nachricht eines/einer Teilnehmenden",
      FROM: "Von",
      CATEGORY: "Kategorie:",
      EMAIL: "E-Mail:",
      TIME: "Empfangen am {date} um {time} Uhr",
    },
    TIME: "{date} um {time} Uhr",
    NO_MESSAGE_SELECTED: "Keine Nachricht ausgewählt",
    TAG_UNREAD: "Ungelesen",
    TAG_PRIORITY: "Priorität",
    TAG_ASSIGNED: "Zugewiesen",
    TAG_RESEARCH_SERVICE: "WD",
    BUTTON_FORWARD_TO_RESEARCH_SERVICE: "an WD senden",
    tooltips: {
      UNREAD: "Als ungelesen markieren",
      PRIORITY: "Als Priorität markieren",
      ASSIGNED: "Als zugewiesen markieren",
      DELETE: "Nachricht löschen",
      PRINT: "Nachricht drucken",
      REPLY_VIA_EMAIL: "Antworten per E-Mail",
    },
  },
  version: {
    VERSION_MODAL_TITLE: "Version und Änderungsprotokoll",
    VERSION: "Version",
    CHANGELOG: "Änderungsprotokoll",
    CHANGELOG_TEXT:
      "Dieses Änderungsprotokoll zeigt die Änderungen in der aktuellen und den letzten 4 Versionen. Aktuell ist das Änderungsprotokoll ausschließlich auf Englisch verfügbar. Für weitere Informationen besuchen Sie unser GitHub-Repository, indem Sie auf den Link unten klicken.",
    ALL_RELEASES: "Alle Versionen",
    NEW_VERSION_AVAILABLE: "Neue Version verfügbar",
    NEW_VERSION_AVAILABLE_TEXT: "Bitte wenden Sie sich an den Administrator, um die App zu aktualisieren.",
    LATEST_VERSION: "Neueste Version",
    LATEST_VERSION_TEXT: "Sie verwenden die neueste Version von CHASE.",
    DEVELOPMENT_VERSION: "Entwicklerversion",
    DEVELOPMENT_VERSION_TEXT: "Sie verwenden eine Entwicklerversion von CHASE.",
  },
} satisfies Translation;

export default de;
