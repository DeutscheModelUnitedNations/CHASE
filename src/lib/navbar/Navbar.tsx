"use client";
import type React from "react";
import { type ReactNode, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import * as m from "@/paraglide/messages";
import NavbarButton from "./NavbarButton";
import NavbarSettingsSidebar from "./NavbarSettingsSidebar";
import { useClientSideBackendCall } from "../backend/useClientSideBackendCall";

interface Props {
  children: ReactNode;
}

/**
 * This Component is used in the Layout Component.
 * It displays the navbar on the left side of the screen on all pages except the login page.
 * It contains buttons to navigate to other pages and a button to open the settings sidebar.
 */

export default function Navbar({ children }: Props) {
  const router = useRouter();
  const [settingsSidebarVisible, setSettingsSidebarVisible] = useState(false);
  const { value: logoutUrl } = useClientSideBackendCall(backend => backend.auth["logout-url"].get());

  const confirmLogout = () => {
    confirmDialog({
      message: m.areYouSureLogout(),
      icon: "pi pi-exclamation-triangle",
      position: "bottom-left",
      acceptLabel: "Ja",
      acceptIcon: "pi pi-check",
      acceptClassName: "p-button-danger",
      rejectLabel: "Nein",
      rejectIcon: "pi pi-times",
      accept: () => router.push(logoutUrl ?? "/"),
    });
  };

  return (
    <>
      <div className="bg-primary flex h-full w-20 flex-col items-center gap-10">
        <Image
          src="/logo/png/chase_logo_white_transparent.png"
          alt="Logo"
          width={60}
          height={60}
          className="mt-3"
        />
        <div className="flex h-full flex-col items-center justify-center gap-3 pb-6">
          {children}
          <div className="h-4" />
          <NavbarSettingsSidebar
            settingsSidebarVisible={settingsSidebarVisible}
            setSettingsSidebarVisible={setSettingsSidebarVisible}
          />
          <NavbarButton
            icon="user-gear"
            onClick={() => setSettingsSidebarVisible(true)}
            title={m.settings()}
          />
          <ConfirmDialog />
          <NavbarButton
            icon="right-from-bracket"
            onClick={confirmLogout}
            title={m.logout()}
          />
        </div>
      </div>
    </>
  );
}
