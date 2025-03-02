import React, { useEffect, useContext, useState } from "react";
import { InputText } from "primereact/inputtext";
import { useToast } from "@/lib/contexts/toast";
import {
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/lib/contexts/committee_data";
import { useClientSideBackendCall } from "@/lib/backend/useClientSideBackendCall";
import { backend } from "@/lib/backend/clientsideBackend";
import FAIcon from "../../FAIcon";
import Button from "../../Button";
import * as m from "@/paraglide/messages";

export default function AgendaItems() {
  const { toastError } = useToast();
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);

  const { value: committeeAgendaItems, trigger: triggerItems } =
    useClientSideBackendCall(
      (backend) =>
        backend
          // biome-ignore lint/style/noNonNullAssertion:
          .conference({ conferenceId: conferenceId! })
          // biome-ignore lint/style/noNonNullAssertion:
          .committee({ committeeId: committeeId! }).agendaItem.get(),
      true,
    );
  const [inputValue, setInputValue] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(true);

  async function getAgendaItems() {
    if (!conferenceId || !committeeId) return;
    await backend
      .conference({ conferenceId })
      .committee({ committeeId })
      .agendaItem.get()
      .then((res) => {
        if (res.status > 400 || !res.data)
          throw new Error("Failed to fetch agenda items");
        triggerItems();
      })
      .catch((error) => {
        toastError(error);
      });
  }

  useEffect(() => {
    if (update) {
      getAgendaItems();
      setUpdate(false);
    }
  }, [update]);

  async function addAgendaItem() {
    if (!conferenceId || !committeeId) return;
    await backend
      .conference({ conferenceId })
      .committee({ committeeId })
      .agendaItem.post({
        title: inputValue,
      })
      .then(() => {
        setUpdate(true);
        setInputValue("");
      })
      .catch((error) => {
        toastError(error);
      });
  }

  async function deleteAgendaItem(agendaItemId: string) {
    if (!conferenceId || !committeeId) return;
    await backend
      .conference({ conferenceId })
      .committee({ committeeId })
      .agendaItem({ agendaItemId })
      .delete()
      .then(() => {
        setUpdate(true);
      })
      .catch((error) => {
        toastError(error);
      });
  }

  return (
    <>
      <h1 className="mb-4 text-lg font-bold">
        {m.agenda()}
      </h1>
      <li className="mb-4 flex flex-col gap-2">
        {committeeAgendaItems?.map((item) => (
          <ul
            className="flex items-center justify-between rounded-md bg-gray-100 p-1"
            key={item.id}
          >
            <div className="mx-4">
              <FAIcon icon="podium" className="text-primary-500" />
            </div>
            <div className="my-1 flex-1">{item.title}</div>
            <Button
              faIcon="trash-alt"
              severity="danger"
              text
              onClick={() => deleteAgendaItem(item.id)}
              size="small"
            />
          </ul>
        ))}
      </li>
      <div className="flex gap-2">
        <InputText
          id="username"
          placeholder={m.addAgendaItem()}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mt-3 flex-1"
        />
        <Button
          faIcon="plus-circle"
          label={m.addAgendaItem()}
          onClick={() => addAgendaItem()}
          disabled={inputValue === ""}
        />
      </div>
    </>
  );
}
