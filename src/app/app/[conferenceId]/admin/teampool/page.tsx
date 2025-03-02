"use client";
import type React from "react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ForwardBackButtons from "@/lib/components/admin/onboarding/forward_back_bar";
import TeamPoolTable from "@/lib/components/admin/teampool/teampool_table";
import AddTeammemberDialog from "@/lib/components/admin/teampool/add_teammember_dialog";
import { confirmPopup } from "primereact/confirmpopup";
import { useToast } from "@/lib/contexts/toast";
import type { $Enums } from "@prisma/generated/client";
import { useClientSideBackendCall } from "@/lib/backend/useClientSideBackendCall";
import { ConferenceIdContext } from "@/lib/contexts/committee_data";
import { backend } from "@/lib/backend/clientsideBackend";
import * as m from "@/paraglide/messages";

export default function Teampool() {
  const { toastError } = useToast();
  const router = useRouter();
  const conferenceId = useContext(ConferenceIdContext);

  const { value: team, trigger: triggerTeam } = useClientSideBackendCall(
    (backend) =>
      // biome-ignore lint/style/noNonNullAssertion:
      backend.conference({ conferenceId: conferenceId! }).member.get,
    true,
  );
  const [inputMaskVisible, setInputMaskVisible] = useState(false);
  const [updateTable, setUpdateTable] = useState(true);

  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (updateTable) {
      triggerTeam();
      setUpdateTable(false);
    }
  }, [updateTable]);

  const addTeammember = ({
    role,
    count,
  }: {
    role: $Enums.ConferenceRole;
    count: number;
  }) => {
    if (!conferenceId) return;
    backend
      .conference({ conferenceId })
      .member.post({
        data: {
          role,
        },
        count,
      })
      .then((_res) => {
        setUpdateTable(true);
      })
      .catch((err) => {
        toastError(err);
      });
  };

  const confirmDeleteAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    confirmPopup({
      target: event.currentTarget,
      message: m.reallyDeleteAll(),
      acceptClassName: "p-button-danger",
      accept: () => {
        if (!conferenceId) return;
        backend
          .conference({ conferenceId })
          .member.delete()
          .then(() => {
            setUpdateTable(true);
          })
          .catch((err) => {
            toastError(err);
          });
      },
    });
  };

  const handleDelete = (id: string) => {
    if (!conferenceId) return;
    backend
      .conference({ conferenceId })
      .member({ memberId: id })
      .delete()
      .then((_res) => {
        setUpdateTable(true);
      })
      .catch((err) => {
        toastError(err);
      });
  };

  const handleSave = () => {
    setSaveLoading(true);
    router.push("./committees");
  };

  return (
    <>
      <TeamPoolTable
        team={team}
        confirmDeleteAll={confirmDeleteAll}
        handleDelete={handleDelete}
        handleAdd={addTeammember}
        setInputMaskVisible={setInputMaskVisible}
      />

      <ForwardBackButtons
        saveLoading={saveLoading}
        handleSaveFunction={handleSave}
      />

      <AddTeammemberDialog
        inputMaskVisible={inputMaskVisible}
        setInputMaskVisible={setInputMaskVisible}
        addTeammemberToList={addTeammember}
      />
    </>
  );
}
