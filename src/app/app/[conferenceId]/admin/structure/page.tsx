"use client";
import type React from "react";
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { confirmPopup } from "primereact/confirmpopup";
import ForwardBackButtons from "@/lib/components/admin/onboarding/forward_back_bar";
import CommitteeTable from "@/lib/components/admin/structure/committee_table";
import AddCommitteeDialog from "@/lib/components/admin/structure/add_committee_dialog";
import useMousetrap from "mousetrap-react";
import { useToast } from "@/lib/contexts/toast";
import type { $Enums } from "@prisma/client";
import { ConferenceIdContext } from "@/lib/contexts/committee_data";
import { useClientSideBackendCall } from "@/lib/backend/useClientSideBackendCall";
import * as m from "@/paraglide/messages";
import { backend } from "@/lib/backend/clientsideBackend";

export default function Structure() {
  const router = useRouter();
  const { showToast, toastError } = useToast();
  const conferenceId = useContext(ConferenceIdContext);

  const [inputMaskVisible, setInputMaskVisible] = useState(false);

  const [saveLoading, setSaveLoading] = useState(false);

  const [updateCommittees, setUpdateCommittees] = useState(true);
  const { value: committees, trigger: triggerCommittees } =
    useClientSideBackendCall(
      (backend) =>
        backend
          //TODO
          // biome-ignore lint/style/noNonNullAssertion:
          .conference({ conferenceId: conferenceId! })
          .committee.get(),
      true,
    );

  useEffect(() => {
    if (updateCommittees) {
      if (!conferenceId) return;
      triggerCommittees();
      setUpdateCommittees(false);
    }
  }, [updateCommittees, conferenceId]);

  async function addCommittee({
    name,
    abbreviation,
    category,
    parentId,
  }: {
    name: string;
    abbreviation: string;
    category: $Enums.CommitteeCategory;
    parentId?: string;
  }) {
    if (!conferenceId) return;
    backend
      .conference({ conferenceId })
      .committee.post({
        name,
        abbreviation,
        category,
        parent: parentId
          ? {
              connect: {
                id: parentId,
              },
            }
          : undefined,
      })
      .then((res) => {
        setInputMaskVisible(false);
        setUpdateCommittees(true);
        if (res.status >= 400) throw new Error("Failed to add committee");
        showToast({
          severity: "success",
          summary: m.addCommittee(),
          detail: `${name} (${abbreviation})`,
        });
      })
      .catch((err) => {
        toastError(err);
      });
  }

  const confirmDeleteAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    confirmPopup({
      target: event.currentTarget,
      message: m.deleteAll(),
      acceptClassName: "p-button-danger",
      accept: () => {
        if (!conferenceId) return;
        backend
          .conference({ conferenceId })
          .committee.delete()
          .then((_res) => {
            setUpdateCommittees(true);
          })
          .catch((err) => {
            toastError(err);
          });
      },
    });
  };

  async function handleDelete(rawData: NonNullable<typeof committees>[number]) {
    if (!rawData || !conferenceId) return;
    backend
      .conference({ conferenceId })
      .committee({ committeeId: rawData.id })
      .delete()
      .then((_res) => {
        setUpdateCommittees(true);
      })
      .catch((err) => {
        toastError(err);
      });
  }

  // Eventlistener for N key
  useMousetrap("n", () => {
    setInputMaskVisible(true);
  });

  const handleSave = () => {
    setSaveLoading(true);
    router.push("./teampool");
  };

  return (
    <>
      <CommitteeTable
        committees={committees}
        confirmDeleteAll={confirmDeleteAll}
        handleDelete={handleDelete}
        setInputMaskVisible={setInputMaskVisible}
      />

      <ForwardBackButtons
        handleSaveFunction={handleSave}
        saveLoading={saveLoading}
        forwardDisabled={committees?.length === 0 || !committees}
      />

      <AddCommitteeDialog
        inputMaskVisible={inputMaskVisible}
        setInputMaskVisible={setInputMaskVisible}
        addCommitteeToList={addCommittee}
        committees={committees!}
      />
    </>
  );
}
