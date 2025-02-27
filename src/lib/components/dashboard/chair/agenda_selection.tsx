import React, { useContext } from "react";
import { Dropdown } from "primereact/dropdown";
import { useToast } from "@/lib/contexts/toast";
import {
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/lib/contexts/committee_data";
import { useClientSideBackendCallPoller } from "@/lib/backend/useClientSideBackendCall";
import { backend } from "@/lib/backend/clientsideBackend";
import * as m from "@/paraglide/messages";
import ConfigWrapper from "./config_wrapper";

export default function AgendaSelection() {
  const { showToast, toastError } = useToast();
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);

  const { value: agendaItems, trigger: triggerAgendaItems } =
    useClientSideBackendCallPoller(
      (backend) =>
        backend
          //TODO
          // biome-ignore lint/style/noNonNullAssertion:
          .conference({ conferenceId: conferenceId! })
          // biome-ignore lint/style/noNonNullAssertion:
          .committee({ committeeId: committeeId! }).agendaItem.get,
    );

  async function activateAgendaItem(agendaItemId: string) {
    if (!conferenceId || !committeeId) return;
    await backend
      .conference({ conferenceId })
      .committee({ committeeId })
      .agendaItem({ agendaItemId })
      .activate.post()
      .then((res) => {
        if (res.status === 200) {
          triggerAgendaItems();
          showToast({
            severity: "success",
            summary: m.agendaItemActivated(),
            detail: agendaItems?.find((item) => item.id === agendaItemId)
              ?.title,
          });
        } else {
          throw new Error("Failed to activate agenda item");
        }
      })
      .catch((error) => {
        toastError(error);
      });
  }

  return (
    <>
      <ConfigWrapper
        title={m.agendaItemSelection()}
        description={m.selectTheCurrentAgendaItem()}
      >
        <div className="flex w-full gap-2">
          {/* <Button
            faIcon="pencil"
            onClick={() => {
              // TODO Implement Chairs creating new Agenda Items
              alert("Not implemented yet");
            }}
            disabled
          /> */}
          <Dropdown
            value={agendaItems?.find((item) => item.isActive)?.id || null}
            options={
              agendaItems?.map((item) => ({
                label: item.title,
                value: item.id,
              })) ?? []
            }
            onChange={(e) => activateAgendaItem(e.value)}
            placeholder={m.noActiveAgendaItem()}
            loading={!agendaItems}
            className="w-full"
          />
        </div>
      </ConfigWrapper>
    </>
  );
}
