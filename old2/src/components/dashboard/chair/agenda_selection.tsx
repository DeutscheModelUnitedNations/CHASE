import React, { useState, useEffect, useContext } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import { useBackend, type BackendInstanceType } from "@/contexts/backend";
import ConfigWrapper from "@/components/dashboard/chair/config_wrapper";
import { Dropdown } from "primereact/dropdown";
import {
	CommitteeIdContext,
	ConferenceIdContext,
} from "@/contexts/committee_data";
import { useToast } from "@/contexts/toast";
import { usePollBackendCall } from "@/hooks/pollBackendCall";

export default function AgendaSelection() {
	const { LL } = useI18nContext();
	const { showToast, toastError } = useToast();
	const conferenceId = useContext(ConferenceIdContext);
	const committeeId = useContext(CommitteeIdContext);
	const { backend } = useBackend();

	const [agendaItems, triggerAgendaItems] = usePollBackendCall(
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
						summary: LL.chairs.dashboard.configurations.agenda.TOAST_SUCCESS(),
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
				title={LL.chairs.dashboard.configurations.agenda.TITLE()}
				description={LL.chairs.dashboard.configurations.agenda.DESCRIPTION()}
			>
				<div className="flex gap-2 w-full">
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
						placeholder={LL.chairs.dashboard.configurations.agenda.PLACEHOLDER()}
						loading={!agendaItems}
						className="w-full"
					/>
				</div>
			</ConfigWrapper>
		</>
	);
}
