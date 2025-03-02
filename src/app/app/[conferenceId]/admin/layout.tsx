"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import useMousetrap from "mousetrap-react";
import { ScrollPanel } from "primereact/scrollpanel";
import Lockout from "@/lib/components/Lockout";
import { $Enums } from "@prisma/client";
import { useToast } from "@/lib/contexts/toast";
import { ConferenceIdContext } from "@/lib/contexts/committee_data";
import { backend } from "@/lib/backend/clientsideBackend";
import Navbar from "@/lib/navbar/Navbar";
import NavbarButton from "@/lib/navbar/NavbarButton";
import * as m from "@/paraglide/messages";

export default function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ conferenceId: string }>;
}) {
  // const { LL } = useI18nContext();
  const { toastError } = useToast();
  const router = useRouter();
  const conferenceId = useContext(ConferenceIdContext);

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

  useMousetrap("ctrl+shift+s", async () =>
    router.push(`/app/${(await params).conferenceId}/hub/team/committees`),
  );

  useEffect(() => {
    if (!conferenceId) return;
    backend
      .conference({ conferenceId })
      .get()
      .then((response) => {
        if (!response?.data?.id) {
          router.push("/lockout");
        }
      })
      .catch((error) => {
        toastError(error);
        router.push("/lockout");
      });
  }, []);

  return (
    <>
      <Lockout whitelist={[$Enums.ConferenceRole.ADMIN]} />
      <div className="text-primary-100 dark:bg-primary-100 dark:text-primary-900 flex h-screen w-screen overflow-hidden bg-white shadow-md">
        <AdminNavbar />
        <ScrollPanel style={{ width: "calc(100% - 4rem)", height: "100%" }}>
          <div className="p-6">{children}</div>
        </ScrollPanel>
      </div>
    </>
  );
}

function AdminNavbar() {
  return (
    <Navbar>
      <NavbarButton
        icon="chart-network"
        link="../hub/team/committees"
        title={m.hub()}
      />
      <div className="h-4" />
      <NavbarButton
        icon="table-tree"
        link={"./structure"}
        title={m.structure()}
      />
      <NavbarButton
        icon="users"
        link={"./teampool"}
        title={m.teampool()}
      />
      <NavbarButton
        icon="podium"
        link={"./committees"}
        title={m.committees()}
      />
      <NavbarButton
        icon="flag"
        link={"./delegations"}
        title={m.delegations()}
      />
      <NavbarButton
        icon="megaphone"
        link={"./non_state_actors"}
        title={m.nonStateActors()}
      />
      <NavbarButton
        icon="gears"
        link={"./configs"}
        title={m.configurations()}
      />
      <div className="flex-1" />
    </Navbar>
  );
}
