import { $Enums } from "@prisma/generated/client";
import { TranslationFunctions } from "./i18n-types";

export const conferenceRoleTranslation = (
  LL: TranslationFunctions,
  role: $Enums.ConferenceRole | null | undefined,
) => {
  switch (role) {
    case $Enums.ConferenceRole.ADMIN:
      return LL.roles.ADMIN();
    case $Enums.ConferenceRole.SECRETARIAT:
      return LL.roles.SECRETARIAT();
    case $Enums.ConferenceRole.CHAIR:
      return LL.roles.CHAIR();
    case $Enums.ConferenceRole.COMMITTEE_ADVISOR:
      return LL.roles.COMMITTEE_ADVISOR();
    case $Enums.ConferenceRole.PARTICIPANT_CARE:
      return LL.roles.PARTICIPANT_CARE();
    case $Enums.ConferenceRole.MISCELLANEOUS_TEAM:
      return LL.roles.MISCELLANEOUS_TEAM();
    case $Enums.ConferenceRole.PRESS_CORPS:
      return LL.roles.PRESS_CORPS();
    case $Enums.ConferenceRole.NON_STATE_ACTOR:
      return LL.roles.NON_STATE_ACTOR();
    case $Enums.ConferenceRole.GUEST:
      return LL.roles.GUEST();
    default:
      return LL.roles.UNKNOWN();
  }
};

export const messageCategoryTranslation = (
  LL: TranslationFunctions,
  category: $Enums.MessageCategory | null | undefined,
) => {
  switch (category) {
    case $Enums.MessageCategory.TO_CHAIR:
      return LL.messageCategories.TO_CHAIR();
    case $Enums.MessageCategory.GUEST_SPEAKER:
      return LL.messageCategories.GUEST_SPEAKER();
    case $Enums.MessageCategory.FACT_CHECK:
      return LL.messageCategories.FACT_CHECK();
    case $Enums.MessageCategory.INFORMATION:
      return LL.messageCategories.INFORMATION();
    case $Enums.MessageCategory.GENERAL_SECRETARY:
      return LL.messageCategories.GENERAL_SECRETARY();
    case $Enums.MessageCategory.OTHER:
      return LL.messageCategories.OTHER();
  }
};
