"use client";
import type React from "react";
import { useState } from "react";
import Image from "next/image";
import NavButton from "@/components/navbar/button";
import SettingsSidebar from "@/components/navbar/settings_sidebar";
import { useRouter } from "next/navigation";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { useI18nContext } from "@/i18n/i18n-react";
import { useBackend } from "@/contexts/backend";
import { useToast } from "@/contexts/toast";

/**
 * This Component is used in the Layout Component.
 * It displays the navbar on the left side of the screen on all pages except the login page.
 * It contains buttons to navigate to other pages and a button to open the settings sidebar.
 */

export default function Navbar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { toastError } = useToast();
  const { backend } = useBackend();

  const { LL } = useI18nContext();

  const [settingsSidebarVisible, setSettingsSidebarVisible] = useState(false);

  const acceptLogout = () => {
    backend.auth.logout
      .get()
      .then((res) => {
        if (res.status !== 200) throw new Error("Failed to log out");
        router.push("/login");
      })
      .catch((err) => {
        toastError(err);
      });
  };

  const confirmLogout = () => {
    confirmDialog({
      message: "Sind sie sicher, dass Sie sich abmelden möchten?",
      icon: "pi pi-exclamation-triangle",
      position: "bottom-left",
      acceptLabel: "Ja",
      acceptIcon: "pi pi-check",
      acceptClassName: "p-button-danger",
      rejectLabel: "Nein",
      rejectIcon: "pi pi-times",
      accept: acceptLogout,
    });
  };

  return (
    <>
      <div className="w-20 h-full bg-primary flex flex-col items-center gap-10">
        <Image
          src="/logo/png/chase_logo_white_transparent.png"
          alt="Logo"
          width={60}
          height={60}
          className="mt-3"
        />
        <div className="h-full pb-6 flex flex-col justify-center items-center gap-3">
          {children}
          <div className="h-4" />
          <SettingsSidebar
            settingsSidebarVisible={settingsSidebarVisible}
            setSettingsSidebarVisible={setSettingsSidebarVisible}
          />
          <NavButton
            icon="user-gear"
            onClick={() => setSettingsSidebarVisible(true)}
            title={LL.navbar.SETTINGS()}
          />
          <ConfirmDialog />
          <NavButton
            icon="right-from-bracket"
            onClick={confirmLogout}
            title={LL.navbar.LOGOUT()}
          />
        </div>
      </div>
    </>
  );
}
