"use client";
import AddDelegationDialog from "@/components/admin/delegations/add_delegation_dialog";
import DelegationsTable from "@/components/admin/delegations/delegations_table";
import ForwardBackButtons from "@/components/admin/onboarding/forward_back_bar";
import { useBackend } from "@/contexts/backend";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import useMousetrap from "mousetrap-react";
import { ConferenceIdContext } from "@/contexts/committee_data";
import { useToast } from "@/contexts/toast";
import type {
  CommitteesType,
  DelegationsType,
} from "@/components/admin/delegations/delegations_table";

export default function AdminDelegationsPage() {
  const { toastError } = useToast();
  const router = useRouter();
  const conferenceId = useContext(ConferenceIdContext);
  const { backend } = useBackend();

  const [update, setUpdate] = useState(true);
  const [committees, setCommittees] = useState<CommitteesType | null>(null);
  const [delegations, setDelegations] = useState<DelegationsType | null>(null);
  const [inputMaskVisible, setInputMaskVisible] = useState(false);

  async function getCommittees() {
    if (!conferenceId) return;
    await backend
      .conference({ conferenceId })
      .committee.get()
      .then((res) => {
        if (res.status >= 400) throw new Error("Failed to fetch committees");
        setCommittees(res.data);
      })
      .catch((error) => {
        toastError(error);
      });
  }

  async function getDelegations() {
    if (!conferenceId) return;
    await backend
      .conference({ conferenceId })
      .delegation.get()
      .then((res) => {
        if (res.status >= 400) throw new Error("Failed to fetch delegations");
        setDelegations(res.data);
      })
      .catch((error) => {
        toastError(error);
      });
  }

  useEffect(() => {
    getCommittees();
    getDelegations();
    setUpdate(false);
  }, [update]);

  useMousetrap("n", () => {
    setInputMaskVisible(true);
  });

  async function createDelegation(alpha3Code: string) {
    if (!conferenceId) return;
    await backend
      .conference({ conferenceId })
      .delegation.post({
        alpha3Code,
      })
      .catch((error) => {
        toastError(error);
      });
    setUpdate(true);
  }

  async function deleteDelegation(delegationId: string) {
    if (!conferenceId) return;
    await backend
      .conference({ conferenceId })
      .delegation({ delegationId })
      .delete()
      .catch((error) => {
        toastError(error);
      });
    setUpdate(true);
  }

  async function activateOrDeactivateCommittee(
    delegationId: string,
    committeeId: string,
  ) {
    if (!conferenceId) return;
    await backend
      .conference({ conferenceId })
      .delegation({ delegationId })
      .committee({ committeeId })
      .post()
      .then((res) => {
        if (res.status >= 400)
          throw new Error("Failed to activate/deactivate committee");
        setUpdate(true);
      })
      .catch((error) => {
        toastError(error);
      });
  }

  return (
    <>
      <DelegationsTable
        delegations={delegations}
        committees={committees}
        activateOrDeactivateCommittee={activateOrDeactivateCommittee}
        deleteDelegation={deleteDelegation}
        openAddDelegationDialog={setInputMaskVisible}
      />

      <AddDelegationDialog
        inputMaskVisible={inputMaskVisible}
        setInputMaskVisible={setInputMaskVisible}
        addDelegationToList={(alpha3Code: string) => {
          createDelegation(alpha3Code);
          setUpdate(true);
        }}
      />

      <ForwardBackButtons
        handleSaveFunction={() => {
          router.push("./non_state_actors");
        }}
      />
    </>
  );
}
