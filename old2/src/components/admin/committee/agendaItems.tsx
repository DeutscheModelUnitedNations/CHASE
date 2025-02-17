import React, { useEffect, useContext, useState } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import { InputText } from "primereact/inputtext";
import Button from "@/components/button";
import { useBackend } from "@/contexts/backend";
import { useToast } from "@/contexts/toast";
import {
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/contexts/committee_data";
import { useBackendCall } from "@/hooks/useBackendCall";
import FAIcon from "@/components/font_awesome_icon";

export default function agendaItem() {
  const { LL } = useI18nContext();
  const { toastError } = useToast();
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);
  const { backend } = useBackend();

  const [committeeAgendaItems, triggerItems] = useBackendCall(
    backend
      // biome-ignore lint/style/noNonNullAssertion:
      .conference({ conferenceId: conferenceId! })
      // biome-ignore lint/style/noNonNullAssertion:
      .committee({ committeeId: committeeId! }).agendaItem.get,
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
      <h1 className="font-bold text-lg mb-4">
        {LL.admin.onboarding.committees.AGENDA_ITEMS()}
      </h1>
      <li className="flex flex-col gap-2 mb-4">
        {committeeAgendaItems?.map((item) => (
          <ul
            className="flex justify-between items-center bg-gray-100 rounded-md p-1"
            key={item.id}
          >
            <div className="mx-4">
              <FAIcon icon="podium" className="text-primary-500" />
            </div>
            <div className="flex-1 my-1">{item.title}</div>
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
          placeholder={LL.admin.onboarding.committees.ADD_AGENDA_ITEM()}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mt-3 flex-1"
        />
        <Button
          faIcon="plus-circle"
          label={LL.admin.onboarding.committees.ADD_ITEM_BUTTON()}
          onClick={() => addAgendaItem()}
          disabled={inputValue === ""}
        />
      </div>
    </>
  );
}
