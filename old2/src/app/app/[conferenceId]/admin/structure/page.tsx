"use client";
import type React from "react";
import { useEffect, useContext, useState } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import { useBackend } from "@/contexts/backend";
import { useRouter } from "next/navigation";
import { confirmPopup } from "primereact/confirmpopup";
import ForwardBackButtons from "@/components/admin/onboarding/forward_back_bar";
import CommitteeTable from "@/components/admin/structure/committee_table";
import AddCommitteeDialog from "@/components/admin/structure/add_committee_dialog";
import useMousetrap from "mousetrap-react";
import { useToast } from "@/contexts/toast";
import { ConferenceIdContext } from "@/contexts/committee_data";
import type { $Enums } from "@prisma/generated/client";
import { useBackendCall } from "@/hooks/useBackendCall";

export default function structure() {
	const { LL } = useI18nContext();
	const router = useRouter();
	const { showToast, toastError } = useToast();
	const conferenceId = useContext(ConferenceIdContext);
	const { backend } = useBackend();

	const [inputMaskVisible, setInputMaskVisible] = useState(false);

	const [saveLoading, setSaveLoading] = useState(false);

	const [updateCommittees, setUpdateCommittees] = useState(true);
	const [committees, triggerCommittees] = useBackendCall(
		backend
			//TODO
			// biome-ignore lint/style/noNonNullAssertion:
			.conference({ conferenceId: conferenceId! }).committee.get,
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
					summary: LL.admin.onboarding.structure.SUCCESS_ADD_COMMITTEE(),
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
			message: LL.admin.onboarding.structure.DELETE_ALL_CONFIRM(),
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
				committees={committees}
			/>
		</>
	);
}
