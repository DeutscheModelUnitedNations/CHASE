import { $Enums } from "@prisma/client";
import * as m from "@/paraglide/messages";

export const conferenceRoleTranslation = (
  role: $Enums.ConferenceRole | null | undefined,
) => {
  switch (role) {
    case $Enums.ConferenceRole.ADMIN:
      return m.conferenceAdmin();
    case $Enums.ConferenceRole.SECRETARIAT:
      return m.memberOfSecretariat();
    case $Enums.ConferenceRole.CHAIR:
      return m.chair();
    case $Enums.ConferenceRole.COMMITTEE_ADVISOR:
      return m.committeeAdvisor();
    case $Enums.ConferenceRole.PARTICIPANT_CARE:
      return m.participantCare();
    case $Enums.ConferenceRole.MISCELLANEOUS_TEAM:
      return m.teamMember();
    case $Enums.ConferenceRole.PRESS_CORPS:
      return m.pressCorpsMember();
    case $Enums.ConferenceRole.NON_STATE_ACTOR:
      return m.nonStateActorRepresentative();
    case $Enums.ConferenceRole.GUEST:
      return m.guest();
    default:
      return m.unknownRole();
  }
};

export const messageCategoryTranslation = (
  category: $Enums.MessageCategory | null | undefined,
) => {
  switch (category) {
    case $Enums.MessageCategory.TO_CHAIR:
      return m.requestToChair();
    case $Enums.MessageCategory.GUEST_SPEAKER:
      return m.requestGuestSpeaker();
    case $Enums.MessageCategory.FACT_CHECK:
      return m.factCheck();
    case $Enums.MessageCategory.INFORMATION:
      return m.informationRequest();
    case $Enums.MessageCategory.GENERAL_SECRETARY:
      return m.generalSecretaryRequest();
    case $Enums.MessageCategory.OTHER:
      return m.other();
  }
};
