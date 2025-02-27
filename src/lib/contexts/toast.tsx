"use client";
import type React from "react";
import { createContext, useContext, useRef, useState } from "react";
import { Toast, type ToastMessage } from "primereact/toast";
import { usePathname } from "next/navigation";
import * as m from "@/paraglide/messages";

export const ToastContext = createContext({} as ToastContextType);
export const useToast = () => useContext(ToastContext);

/**
 * This Component provides a context for the Toast Component from PrimeReact.
 * It is used to show messages to the user, for example when a document was successfully created.
 */
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useRef<Toast>(null);
  const pathname = usePathname();

  const [disabledPages, setDisabledPages] = useState<string[]>([]);

  const disableToastsOnCurrentPage = () => {
    setDisabledPages((prevDisabledPages) => [...prevDisabledPages, pathname]);
  };

  const enableToastsOnCurrentPage = () => {
    setDisabledPages((prevDisabledPages) =>
      prevDisabledPages.filter((page) => page !== pathname),
    );
  };

  const showToast = (message: ToastMessage) => {
    if (disabledPages.includes(pathname)) return;
    toast.current?.show(message);
  };

  const clearToast = () => {
    toast.current?.clear();
  };

  const toastError = (error: Error, message?: string) => {
    console.error(error);
    if (disabledPages.includes(pathname)) return;
    showToast({
      severity: "error",
      summary: m.error(),
      detail: message ?? m.anErrorOccurred(),
    });
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        clearToast,
        toastError,
        disableToastsOnCurrentPage,
        enableToastsOnCurrentPage,
      }}
    >
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
};

export interface ToastContextType {
  showToast: (message: ToastMessage) => void;
  clearToast: () => void;
  toastError: (error: Error, message?: string) => void;
  disableToastsOnCurrentPage: () => void;
  enableToastsOnCurrentPage: () => void;
}
