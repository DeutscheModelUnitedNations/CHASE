import type { BaseTranslation } from "../i18n-types";

const en = {
  LOADING_PAGE: "Loading...",
  ERROR: "Error",

  NOT_FOUND: {
    NOT_FOUND: "Not found",
    BACK_TO_HOME: "Back to home",
  },

  cookieBanner: {
    HEADLINE: "Use of Cookies",
    TEXT: "We use cookies to optimize our website for you and to be able to continuously improve it. By continuing to use the website and web app, you consent to the use of cookies.",
    ACCEPT: "I understand",
    SUBTEXT: "Further information on cookies can be found in our",
    PRIVACY_POLICY: "privacy policy",
  },

  roles: {
    ADMIN: "Conference Admin",
    SECRETARIAT: "Member of the Secretariat",
    CHAIR: "Chair",
    COMMITTEE_ADVISOR: "Committee Advisor",
    NON_STATE_ACTOR: "Non-State Actor",
    PRESS_CORPS: "Press Corps",
    GUEST: "Guest",
    PARTICIPANT_CARE: "Participant Care",
    MISCELLANEOUS_TEAM: "Member of the Team",
    UNKNOWN: "Unknown Role",
  },

  messageCategories: {
    TO_CHAIR: "Message to the Chair",
    GUEST_SPEAKER: "Request for Guest Speaker",
    FACT_CHECK: "Fact Check Request",
    INFORMATION: "Information Request",
    GENERAL_SECRETARY: "Request for General Secretary Visit",
    OTHER: "Other",
  },

  home: {
    CAPTION: " for the digital age",
    HERO_TEXT:
      "Debate Management Software for Model United Nations Conferences finally made easy.",
    navbar: {
      LOGIN_ADMIN: "Admin",
      LOGIN_CHAIR: "Chair",
      DOCUMENTATION: "Documentation",
      FAQ: "FAQs",
      LOGIN_PARTICIPANT: "Login",
    },
    heroCards: {
      CARD_1_TITLE: "Debates",
      CARD_1_TEXT:
        "Handle speakers and comments lists with ease and efficiency. No more paper lists!",
      CARD_2_TITLE: "Voting",
      CARD_2_TEXT:
        "Handle motions and voting procedures with electronic voting and preprepared motions according to your rules of procedure.",
      CARD_3_TITLE: "Resolutions",
      CARD_3_TEXT:
        "Create and edit resolutions collaboratively with other delegates. No more paper or Google Docs!",
      COMING_SOON: "Coming Soon",
    },
    ABOUT_TITEL: "About CHASE",
    ABOUT_TEXT:
      "CHASE (CHAirSoftwarE) is a web application for the management of debates in Model United Nations conferences. It is designed to be used by chairs and delegates alike. CHASE enables Chairs to manage debates with ease while delegates can follow along and collaborate with other delegates in a intuitive and structured matter. CHASE is free and open source software.",
    VERSION_BUTTON: "Version and Changelog",
    MISSION_TITLE: "Our Mission",
    MISSION_TEXT:
      "CHASE is developed by members of the DMUN community. We want to provide a free and open source alternative to other existing debate management software. We want to make debate management more accessible to smaller conferences and make it easier for chairs to manage debates. CHASE is primarily developed for the german-speaking conferences of DMUN in Germany, which are MUN-SH, MUNBW and MUNBB, but we are always open to adapt CHASE to other conferences.",
    MISSION_BUTTON_LABEL: "Learn more about DMUN",
    CONTRIBUTE_TITEL: "Contribute",
    CONTRIBUTE_TEXT:
      "CHASE is part of open source initative 'MUNify' by DMUN. We are always looking for people who want to contribute to CHASE. If you have experience in web developement or just want to learn new skills, please visit our GitHub repository and get in touch!",
    CONTRIBUTE_BUTTON_LABEL: "Visit our GitHub",
    footer: {
      sitemap: {
        TITEL: "Sitemap",
        HOME: "Home",
        FAQ: "FAQs",
        DOCS: "Documentation",
        LOGIN: "Login",
        PRIVACY: "Privacy Policy",
      },
      imprint: {
        TITEL: "Imprint",
        ORGANISATION: "Deutsche Model United Nations (DMUN) e.V.",
        ADDRESS: "Birkenweg 1, 24235 Laboe",
        EMAIL: "vorstand@dmun.de",
        WEBSITE: "www.dmun.de",
      },
    },
  },

  docs: {
    TITLE: "Documentation",
    DESCRIPTION:
      "Here you can find the documentation for CHASE. Currently, the Docs are only available in German. If you have any questions, feel free to contact us.",
    BACK_TO_HOME: "Back to home",
  },

  faq: {
    TITLE: "FAQs",
    DESCRIPTION:
      "Here you can find the FAQs for CHASE. Currently, the FAQs are only available in German. If you have any questions, feel free to contact us.",
    BACK_TO_HOME: "Back to home",
  },

  admin: {
    login: {
      TITLE: "Admin Login",
      CONFERENCE_ID: "Conference ID",
      CREATE_INSTEAD: "Create",
      SUBMIT: "Login",
    },
    onboarding: {
      title: "Setup new Conference",
      conferenceName: "Conference Name",
      dates: "Dates",
      token: "Creation Token",
      login: "Login",
      submit: "Create",
      success: "Success",
      successDetails: "Conference created!",
      error: {
        title: "Error",
        wrongToken: "The token is invalid.",
        conferenceExists: "A conference with this name already exists.",
        generic: "An error occurred.",
        unavailable: "Not available for legal reasons (no Cookie Consent).",
      },

      SAVE_AND_QUIT: "Quit Setup",
      SAVE_AND_QUIT_MESSAGE:
        "Do you really want to quit the setup? When you quit, you can always continue later.",
      BUTTON_ADVANCE: "Continue",
      BUTTON_BACK: "Back",

      structure: {
        DELETE_ALL: "Delete All",
        DELETE_ALL_CONFIRM: "Are you sure you want to delete all committees?",
        ADD_COMMITTEE: "Add Committee",
        SUCCESS_ADD_COMMITTEE: "Committee added",
        EMPTY_MESSAGE:
          "No Committees yet. Click 'Add Committee' in the top right corner to create a new one.",
        COMMITTEE_LONG: "Name",
        COMMITTEE_SHORT: "Abbreviation",
        CATEGORY: "Category",
        FOOTER: "In total {{0}} committees.",
        input: {
          BUTTON_ADD: "Add",
          BUTTON_CANCEL: "Cancel",
          CATEGORY: "Category",
          CATEGORY_SWITCH_COMMITTEE: "Committee",
          CATEGORY_SWITCH_CRISIS: "Crisis",
          CATEGORY_SWITCH_ICJ: "ICJ",
          IS_SUBCOMMITTEE: "Is Sub-Committee",
          PARENT_COMMITTEE: "Parent Committee",
        },
        ERROR_NO_COMMITTEES: "No Committees found",
        ERROR_NO_COMMITTEES_DETAILS:
          "Please create a committee before continuing.",
      },

      teampool: {
        DELETE_ALL: "Delete All",
        UPLOAD_TEAM: "Upload CSV",
        ADD_TEAMMEMBER: "Add Team Member",
        EMPTY_MESSAGE:
          "No Team Members yet. Click 'Add Team Member' in the top right corner to create a new one.",
        FOOTER: "In total {{0}} team members.",
        ROLE: "Role",
        COUNT: "Count",
        roles: {
          ADMIN: "Admin",
          SECRETARIAT: "Secretariat",
          CHAIR: "Chair",
          COMMITTEE_ADVISOR: "Committee Advisor",
          NON_STATE_ACTOR: "Non-State Actor",
          PRESS_CORPS: "Press Corps",
          GUEST: "Guest",
          PARTICIPANT_CARE: "Participant Care",
          MISCELLANEOUS_TEAM: "Other Team",
        },
        input: {
          COUNT: "Count",
          BUTTON_ADD: "Add",
          BUTTON_CANCEL: "Cancel",
        },
      },

      committees: {
        CHAIRS: "Select Chairs",
        ADVISORS: "Select Committee Advisors",
        AGENDA_ITEMS: "Agenda Items",
        ADD_AGENDA_ITEM: "Add Agenda Item",
        ADD_ITEM_BUTTON: "Add",
      },

      delegations: {
        ADD_DELEGATION_BUTTON: "Add Delegation",
        DELEGATION_COLUMN: "Delegation",
        TOTAL_NUMBER_OF_DELEGATIONS: "Total",
        EMPTY_MESSAGE: "No Delegations found",
        add_delegation: {
          HEADLINE: "Add Delegation",
          SEARCH_PLACEHOLDER: "Search for a Delegation",
          BACK_BUTTON: "Back",
          ADD_BUTTON: "Add and Close",
          ADD_MORE_BUTTON: "Add",
        },
      },

      configs: {
        pressWebsiteTitle: "Press Website",
        pressWebsiteDescription:
          "Here you can configure the URL of the press website.",
        feedbackWebsiteTitle: "Feedback Website",
        feedbackWebsiteDescription:
          "Here you can configure the URL of the feedback website.",
        successToast: "Configuration saved",
      },

      steps: {
        STEP_1: "Structure",
        STEP_2: "Team Pool",
        STEP_3: "Committees",
        STEP_4: "Delegations",
        STEP_5: "NSAs",
        STEP_6: "Configurations",
      },
    },
  },

  login: {
    EMAIL_PLACEHOLDER: "E-Mail",
    PASSWORD_PLACEHOLDER: "Password",
    REPEAT_PASSWORD_PLACEHOLDER: "Repeat password",
    PASSWORDS_DO_NOT_MATCH: "Passwords do not match",
    FORGOT_PASSWORD: "Forgot Password?",
    SENT_EMAIL: "Sent Email",
    ADVANCE_BUTTON: "Advance",
    BACK_BUTTON: "Back",
    LOGIN_BUTTON: "Login",
    LOGIN_TITLE: "Login",
    EMAIL_NOT_FOUND: "The email is invalid or could not be found.",
    EMAIL_NO_ACTIVE_VALIDATION_TOKEN:
      "The email does not have an active validation token.",
    EMAIL_INVALID_TOKEN: "The token is invalid.",
    EMAIL_ALREADY_VALIDATED: "The email has already been validated.",
    EMAIL_VALIDATION_TOKEN_EXPIRED:
      "The validation token has expired. Please request a new one.",
    SET_CREDENTIALS: "Set Credentials",
    LOGIN_NOW: "Login now",
    NO_TOKEN: "The confirmation token is invalid or could not be found.",
    NO_EMAIL: "The email is invalid or could not be found.",
    EMAIL_CONFIRMED: "The email has been confirmed.",
    PASSKEY: "Passkey",
    EMAIL_CONFIRMED_SERVER_ERROR:
      "We could not confirm your email address. Please try again later.",
    CREATE_ACCOUNT: "Create Account",
    EMAIL_INVALID: "Email is invalid",
    CREATION_SUCCESS:
      "Account successfully created. Please confirm your e-mail address via the link in the e-mail we sent you to activate your account.",
    PASSWORD_INVALID:
      "The password is invalid. It must be at least 8 characters long and contain at least one upper case letters, one lower case letters, one number and one special character.",
    WHAT_ARE_PASSKEYS: "What are Passkeys?",
    PASSWORD: "Password",
    LOGIN_DESCRIPTION: "Please enter your credentials to continue.",
    USER_FOUND: "User found. You can now enter your password.",
    EMAIL_NOT_CONFIRMED: "The email address has not been confirmed yet.",
    ACCOUNT_NOT_YET_CREATED:
      "Great, an account with this e-mail address does not yet exist! You can now create one!",
    WRONG_CREDENTIALS: "Wrong credentials",
    POWERED_BY: "Powered by",
    legalNotice: {
      SECTION_1: "I agree with the ",
      TERMS_LINK: "Terms of Use",
      SECTION_2:
        ". I also agree that this website uses cookies. You can find more information about this in our ",
      PRIVACY_LINK: "Privacy Policy",
      SECTION_3: ".",
    },
    participant: {
      OTHER_SIGH_IN: "Sign in as chair instead",
      COMMITTEE_LABEL: "Committee",
      COUNTRY_LABEL: "Country / NSA",
      committeeSelection: {
        HEADLINE: "Select the committee",
      },
    },
    chair: {
      OTHER_SIGN_IN: "Sign in as participant instead",
      WARNING_MESSAGE: "You are about to sign in as a chair.",
    },
    gateway: {
      TITLE: "Welcome to CHASE",
      CONFERENCE_MEMBER_SINGLE:
        "You are registered for a conference. Click on the button below to start the application.",
      CONFERENCE_MEMBER_MULTIPLE:
        "You are registered for multiple conferences. Please select the conference you want to start the application for.",
      COMMITTEE_MEMBER_SINGLE:
        "You are registered for a committee. Click on the button below to start the application.",
      COMMITTEE_MEMBER_MULTIPLE:
        "You are registered for multiple committees. Please select the committee you want to start the application for.",
      LAUNCH_BUTTON: "Launch the app",
      NO_MEMBERSHIP:
        "You are not registered for any conference or committee. If you think this is a mistake, please contact the conference organizers.",
      LOGOUT_BUTTON: "Logout",
    },
    lockout: {
      TITLE: "You have been locked out",
      DETAIL:
        "You don't have permission to use this aspect of the App. Please log in again.",
    },
  },

  navbar: {
    SETTINGS: "Settings",
    LOGOUT: "Logout",
    HUB: "Hub",
    DASHBOARD: "Dashboard",
    CONFIGURATION: "Configuration",
    ATTENDEES: "Attendees",
    SPEAKERS: "Speakers List",
    VOTING: "Voting",
    WHITEBOARD: "Whiteboard",
    INBOX: "Inbox",
    RESOLUTIONS: "Resolutions",
    PRESENTATION: "Presentation",
    NEWS: "Conference Press",
    BUG_REPORT: "Report a Bug",
  },

  settings: {
    colorTheme: {
      HEADLINE: "Color Mode",
      SYSTEM: "System",
      LIGHT: "Light",
      DARK: "Dark",
      CONTRAST: "Contrast",
    },
    language: {
      HEADLINE: "Language",
      SYSTEM: "System",
      ENGLISH: "English",
      GERMAN: "Deutsch",
    },
  },

  hub: {
    CHAIR_HUB_TITLE: "Mission Control",
    NA_HUB_TITLE: "Non-State Actor's Hub",
    GUEST_HUB_TITLE: "Guest Hub",
    SELECT_COMMITTEE: "Select a Committee",
    NO_COMMITTEES: "No Committees found",
    LOGOUT: "Logout",
  },

  participants: {
    dashboard: {
      widgetHeadlines: {
        SPEAKERS_LIST: "Speakers List",
        COMMENT_LIST: "Comment List",
        MODERATED_CAUCUS: "Moderated Caucus",
        COMMITTEE_STATUS: "Committee Status",
        WHITEBOARD: "Whiteboard",
        DOCUMENTS: "Documents",
        ACTIONS: "Send Request",
        PRESENCE: "Majorities",
      },
      timerWidget: {
        UNTIL: "until {{0}}",
        TOAST_HEADLINE: "Time is up!",
        TOAST_MESSAGE: "Going back to formal debate.",
        defaultHeadlines: {
          FORMAL: "Formal Debate",
          INFORMAL: "Informal Caucus",
          PAUSE: "Pause",
          SUSPENSION: "Suspension",
        },
      },
      actionsWidget: {
        CHAIR_BUTTON: "Chair",
        RESEARCH_SERVICE_BUTTON: "Research Service",
        contactForm: {
          HEADLINE_CHAIR: "Send a Message to the Chair",
          HEADLINE_RESEARCH_SERVICE: "Send a Message to the Research Service",
          SUBJECT_PLACEHOLDER: "Subject",
          MESSAGE_PLACEHOLDER: "Message",
          CATEGORY_LABEL: "Category",
          CATEGORY_PLACEHOLDER: "Select a Category",
          CANCEL_BUTTON: "Cancel",
          SEND_BUTTON: "Send",
          INFO_MESSAGE:
            "This request will be viewed and checked by the chair first and then forwarded to the Research Service. The Research Services will usually get back to you via email, please regularly check your inbox.",
          categoryOptions: {
            GUEST_SPEAKER: "Guest Speaker Request",
            FACT_CHECK: "Fact Check Request",
            INFORMATION: "Information Request",
            GENERAL_SECRETARY: "General Secretary Visit Request",
            OTHER: "Other",
          },
        },
        toast: {
          SUCCESS_CHAIR_SUMMARY: "Message sent",
          SUCCESS_CHAIR_DETAIL: "The chair will get back to you soon.",
          SUCCESS_RESEARCH_SUMMARY: "Message sent",
          SUCCESS_RESEARCH_DETAIL:
            "The Research Service will get back to you soon.",
          ERROR_SUMMARY: "Error",
          ERROR_DETAIL:
            "The message could not be sent. Please try again or report the issue!",
        },
      },
      documentsWidget: {
        SPONSORS: "signed Sponsors",
      },
    },

    speakersList: {
      SPEAKERS_LIST: "Speakers List",
      COMMENT_LIST: "Comment List",
      MODERATED_CAUCUS: "Moderated Caucus",
      ADD_TO_LIST_BUTTON: "Speech",
      REMOVE_FROM_LIST_BUTTON: "Remove",
      LIST_CLOSED_BUTTON: "List Closed",
      LIST_CLOSED_MESSAGE: "List Closed",
      NO_SPEAKERS_MESSAGE: "No Speakers on the List",
      NO_ACTIVE_AGENDA_ITEM: "No active agenda item",
      toast: {
        ADDED_SUCCESS_SUMMARY: "Added Speech",
        ADDED_SUCCESS_DETAIL: "to {{0}}",
        ADDED_FORBIDDEN_SUMMARY: "Forbidden",
        ADDED_FORBIDDEN_DETAIL:
          "You are probably not registered as PRESENT in the committee. Please contact the chair.",
        ADDED_ALREADY_ON_LIST_SUMMARY: "Already on List",
        ADDED_ALREADY_ON_LIST_DETAIL:
          "Please wait a moment and you should appear on the list soon. If not, reload the page. If the error persists, please contact the chair.",
        ADDED_ERROR_SUMMARY: "Error during adding",
        ADDED_ERROR_DETAIL:
          "An unexpected error occurred. Please try again later or contact the chair.",
        REMOVED_SUCCESS_SUMMARY: "Removed",
        REMOVED_SUCCESS_DETAIL: "from {{0}}",
        REMOVED_ERROR_SUMMARY: "Error during removing",
        REMOVED_ERROR_DETAIL:
          "An unexpected error occurred. Please try again later or contact the chair.",
      },
    },

    voting: {
      ACTIVE_MOTIONS_TAB: "Motions on the Floor",
      RECENT_MOTIONS_TAB: "Recent Motions",
      RECENT_VOTINGS_TAB: "Recent Votings",
      NO_DATA_MOTIONS: "No open motions",
      VOTING_HEADLINE: "Voting",
      NO_DATA_VOTING: "No voting selected",
      votingInfo: {
        INTRODUCED_BY: "Introduced by",
        votingMode: {
          SUBSTANTIAL_VOTING: "Substantial Voting – Possibility to Abstain",
          PROCEDURAL_VOTING: "Procedural Voting – No Abstention",
        },
        majorityMode: {
          SIMPLE: "Simple Majority needed (50% + 1)",
          TWO_THIRDS: "Two-Thirds Majority needed (2/3)",
          THREE_QUARTERS: "Three-Quarters Majority needed (3/4)",
          CONSENSUS: "Consensus needed",
          SECURITY_COUNCIL: "Security Council (9/15 + no veto)",
        },
      },
      votingButtons: {
        IN_FAVOUR: "In Favour",
        AGAINST: "Against",
        ABSTENTION: "Abstention",

        REMAINING: "Remaining",

        VOTE_REGISTERED: "Vote Registered",
        VOTE_REGISTERED_MESSAGE: "Waiting for results...",
      },
      votingResults: {
        VOTING_SUCCESSFUL: "Voting Successful",
        VOTING_FAILED: "Voting Failed",
      },
      votingAlert: {
        VOTING_ALERT_HEADER: "New Vote Started",
        VOTING_ALERT_MESSAGE: "A new vote has been started. Please vote now.",
        BUTTON_ADVANCE: "To Voting",
        BUTTON_IGNORE: "Ignore",
      },
    },
  },

  chairs: {
    CHAIR: "Chair",
    dashboard: {
      overview: {
        TITLE: "Overview",
      },
      configurations: {
        TITLE: "Configurations",
        agenda: {
          TITLE: "Agenda Item Selection",
          DESCRIPTION: "Select the agenda item you want to activate.",
          PLACEHOLDER: "No Agenda Item Selected",
          TOAST_SUCCESS: "Agenda Item activated",
        },
        stateOfDebate: {
          TITLE: "State of Debate",
          DESCRIPTION: "Set the state of Debate (e.g. General Debate)",
          CURRENTLY_NO_STATUS: "No Status Set",
          PLACEHOLDER_TEXT: "State of Debate",
          TOAST_SUCCESS: "State {state:string} successfully set",
        },
        statusTimer: {
          TITLE: "Status Timer",
          DESCRIPTION:
            "Set the status of the committee. You can also set a custom name, that overrides the default status name while keeping the icon (e.g. 'Lunch Break' instead of default 'Pause').",
          PLACEHOLDER_DROPDOWN: "Select a Status",
          PLACEHOLDER_CUSTOM_TEXT: "Custom Name (optional)",
          PLACEHOLDER_TIME_UNITL: "until",
          BUTTON: "Save Status",
          TOAST_SUCCESS:
            "Status '{status:string}' successfully set until {date:string}",
        },
        speakersListAdding: {
          TITLE: "Speakers List Adding Policy",
          DESCRIPTION:
            "Select the policy for speakers adding themselves to the speakers list.",
          TOGGLE_BUTTON_NOT_ALLOWED: "Not Allowed",
          TOGGLE_BUTTON_ALLOWED: "Allowed",
          TOAST_SUCCESS: "Policy changed",
          TOAST_SUCCESS_DETAILS_ALLOWED: "Speakers can now add themselves.",
          TOAST_SUCCESS_DETAILS_NOT_ALLOWED:
            "Speakers can no longer add themselves.",
        },
        overlay: {
          TITLE: "Speakers List Overlay",
          DESCRIPTION:
            "This feature allows you to see the speakers list in a separate overlay on all other pages in the App.",
          TOGGLE_BUTTON: "Toggle Overlay",
        },
        presentationMode: {
          TITLE: "Open Presentation Mode",
          DESCRIPTION:
            "Open the presentation mode in a new window. This mode is designed to be displayed on a projector or a second screen and provides relevant committee data for delegates.",
          BUTTON: "Presentation Mode",
        },
        regionalGroups: {
          TITLE: "Regional Groups",
          DESCRIPTION:
            "Open the regional groups page to show the regional groups of the committee.",
          BUTTON_PRESENTATION: "Open in Presentation Mode",
          BUTTON_LOOKUP: "Open Lookup",
          FILTER: "Filter...",
          AFRICA: "Africa",
          ASIA: "Asia and Pacific",
          LATIN_AMERICA: "Latin America and Caribbean",
          EASTERN_EUROPE: "Eastern Europe",
          WESTERN_EUROPE: "Western Europe and Others",
        },
      },
    },
    attendance: {
      PRESENT: "Present",
      ABSENT: "Absent",
      EXCUSED: "Excused",
      nations: {
        TITLE: "Attendance",
        DESCRIPTION: "Manage the attendance of delegates in the committee.",
      },
      nsa: {
        TITLE: "Non-State Actors",
        DESCRIPTION:
          "Manage the attendance of non-state actors in the committee. They are not counted in the quorum and are not allowed to vote.",
      },
      SET_ALL_ABSENT: "All on Absent",
      SET_ALL_PRESENT: "All on Present",
    },
    whiteboard: {
      SAVE_BUTTON: "Save and publish",
      RESET_BUTTON: "Reset",
      SUCCESS_TOAST: "Whiteboard saved",
      NO_CONTENT_TOAST: "Whiteboard is empty",
      NO_CONTENT_TOAST_DETAILS:
        "It seems like there was an error while loading the whiteboard or the whiteboard is empty. Please try to reload the page.",
    },
    speakersList: {
      buttons: {
        START_TIMER: "Start Timer",
        PAUSE_TIMER: "Stop Timer",
        RESET_TIMER: "Reset Timer",
        REMOVE_TIME: "15s",
        ADD_TIME: "15s",
        NEXT_SPEAKER: "Next Speaker",
        ADD_TO_LIST: "Add to List",
        CLOSE_LIST: "Close List",
        OPEN_LIST: "Open List",
        CLEAR_LIST: "Reset List",
        CHANGE_SPEECH_TIME: "Change Speech Time",
      },
      addSpeakerOverlay: {
        HEADLINE: "Add Speaker to {{0}}",
        PLACEHOLDER: "Select a Speaker",
        BUTTON_CANCEL: "Cancel",
        BUTTON_ADD: "Add",
        BUTTON_ADD_AND_CLOSE: "Add and Close",
        TOAST_ADDED_SUMMARY: "{{0}} added",
        TOAST_ADDED_DETAIL: "to the {{0}}",
        TOAST_ALREADY_ON_LIST: "Already on {{0}}",
        TOAST_ALREADY_ON_LIST_DETAIL: "This country is already on {{0}}",
      },
      changeSpeechTimeOverlay: {
        HEADLINE: "Change Speech Time for {{0}}",
        BUTTON_CANCEL: "Cancel",
        BUTTON_SET: "Change",
        PLACEHOLDER: "New Speech Time (mm:ss)",
        TOAST_SUCCESS: "Speech Time changed to {{0}} min",
        TOAST_SUCCESS_DETAIL: "for {{0}}",
        TOAST_WRONG_FORMAT: "Wrong Format",
      },
      confirm: {
        NEXT_SPEAKER_MESSAGE:
          "Do you really want to remove the current speaker and advance to the next?",
        NEXT_SPEAKER_HEADER: "Next Speaker at {list:string}",
        NEXT_SPEAKER_ACCEPT: "Yes",
        NEXT_SPEAKER_REJECT: "No",
      },
    },
    voting: {
      BUTTON_NEW_MOTION: "New Motion",
      BUTTON_CHANGE_INFO: "Change Info",
      BUTTON_RESET: "Restart Voting",
      BUTTON_DELETE: "Delete Voting",
    },
  },

  messageBoard: {
    toast: {
      NEW_MESSAGE_SUMMARY: "New Message",
      NEW_MESSAGE_DETAIL: "You have new unread messages",
      FORWARDED_SUMMARY: "Message forwarded",
      FORWARDED_DETAIL:
        "The message has been forwarded to the Research Service",
      ARCHIVED_SUMMARY: "Message archived",
      ARCHIVED_DETAIL:
        "The message has been archived. If you want to restore it, please ask a conference admin.",
    },
    menu: {
      MARK_AS_UNREAD: "Mark as Unread",
      ARCHIVE: "Archive",
    },
    pdf: {
      HEADLINE: "Message from Participant",
      FROM: "From:",
      CATEGORY: "Category:",
      EMAIL: "Email:",
      TIME: "Timestamp: {date:string} at {time:string}",
    },
    TIME: "{date:string} at {time:string}",
    NO_MESSAGE_SELECTED: "No message selected",
    TAG_UNREAD: "Unread",
    TAG_PRIORITY: "Priority",
    TAG_ASSIGNED: "Assigned",
    TAG_RESEARCH_SERVICE: "RS",
    BUTTON_FORWARD_TO_RESEARCH_SERVICE: "FWD to RS",
    tooltips: {
      UNREAD: "Mark as Unread",
      PRIORITY: "Mark as Priority",
      DELETE: "Delete message",
      ASSIGNED: "Mark as Assigned",
      PRINT: "Print message",
      REPLY_VIA_EMAIL: "Reply via Email",
    },
  },
  version: {
    VERSION_MODAL_TITLE: "Version and Changelog",
    VERSION: "Version",
    CHANGELOG: "Changelog",
    CHANGELOG_TEXT:
      "This changelog shows the changes in the current and the past 4 versions. For more information, visit our GitHub repository by clicking the Link at the bottom.",
    ALL_RELEASES: "All Releases",
    NEW_VERSION_AVAILABLE: "Outdated Version",
    NEW_VERSION_AVAILABLE_TEXT:
      "A new version is available. Please notify the server admin to update.",
    LATEST_VERSION: "Latest Version",
    LATEST_VERSION_TEXT: "You are using the latest version of CHASE.",
    DEVELOPMENT_VERSION: "Development Version",
    DEVELOPMENT_VERSION_TEXT: "You are using the development version of CHASE.",
  },
} satisfies BaseTranslation;

export default en;
