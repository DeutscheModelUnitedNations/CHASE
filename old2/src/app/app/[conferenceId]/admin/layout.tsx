"use client";
import { useEffect, useContext } from "react";
import Navbar from "@/components/navbar/navbar";
import NavButton from "@/components/navbar/button";
import { useI18nContext } from "@/i18n/i18n-react";
import { useRouter } from "next/navigation";
import useMousetrap from "mousetrap-react";
import { ScrollPanel } from "primereact/scrollpanel";
import { useBackend } from "@/contexts/backend";
import { ConferenceIdContext } from "@/contexts/committee_data";
import Lockout from "@/components/lockout";
import { $Enums } from "@prisma/generated/client";
import { useToast } from "@/contexts/toast";

export default function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { conferenceId: string };
}) {
  // const { LL } = useI18nContext();
  const { toastError } = useToast();
  const router = useRouter();
  const conferenceId = useContext(ConferenceIdContext);
  const { backend } = useBackend();

  // const [settingsSidebarVisible, setSettingsSidebarVisible] = useState(false);

  // const saveAndQuit = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   confirmPopup({
  //     target: e.currentTarget,
  //     message: LL.admin.onboarding.SAVE_AND_QUIT_MESSAGE(),
  //     accept: () => {
  //       router.push(`/app/${params.conferenceId}/hub/team/committees`);
  //     },
  //   });
  // };

  useMousetrap("ctrl+shift+s", () =>
    router.push(`/app/${params.conferenceId}/hub/team/committees`),
  );

  useEffect(() => {
    if (!conferenceId) return;
    backend
      .conference({ conferenceId })
      .get()
      .then((response) => {
        if (!response?.data?.id) {
          router.push("/login/lockout");
        }
      })
      .catch((error) => {
        toastError(error);
        router.push("/login/lockout");
      });
  }, []);

  return (
    <>
      <Lockout whitelist={[$Enums.ConferenceRole.ADMIN]} />
      <div className="flex h-screen w-screen bg-white text-primary-100 dark:bg-primary-100 dark:text-primary-900 shadow-md overflow-hidden">
        <AdminNavbar />
        <ScrollPanel style={{ width: "calc(100% - 4rem)", height: "100%" }}>
          <div className="p-6">{children}</div>
        </ScrollPanel>
      </div>
    </>
  );
}

function AdminNavbar() {
  const { LL } = useI18nContext();

  return (
    <Navbar>
      <NavButton
        icon="chart-network"
        link="../hub/team/committees"
        title={LL.navbar.HUB()}
      />
      <div className="h-4" />
      <NavButton
        icon="table-tree"
        link={"./structure"}
        title={LL.admin.onboarding.steps.STEP_1()}
      />
      <NavButton
        icon="users"
        link={"./teampool"}
        title={LL.admin.onboarding.steps.STEP_2()}
      />
      <NavButton
        icon="podium"
        link={"./committees"}
        title={LL.admin.onboarding.steps.STEP_3()}
      />
      <NavButton
        icon="flag"
        link={"./delegations"}
        title={LL.admin.onboarding.steps.STEP_4()}
      />
      <NavButton
        icon="megaphone"
        link={"./non_state_actors"}
        title={LL.admin.onboarding.steps.STEP_5()}
      />
      <NavButton
        icon="gears"
        link={"./configs"}
        title={LL.admin.onboarding.steps.STEP_6()}
      />
      <div className="flex-1" />
    </Navbar>
  );
}
