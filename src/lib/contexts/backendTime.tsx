"use client";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useClientSideBackendCall } from "../backend/useClientSideBackendCall";

export const BackendTimeContext = createContext({} as BackendTimeContextType);
export const useBackendTime = () => useContext(BackendTimeContext);

export const BackendTime = ({ children }: { children: React.ReactNode }) => {
  const { value: backendTime, pending } = useClientSideBackendCall((backend) =>
    backend.timestamp.get(),
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (pending) return;

    // biome-ignore lint/suspicious/noExplicitAny: timer type
    const backendTimestamp = new Date(backendTime ?? Date.now()); // in case we are not logged in we fall back to our own time
    const ourTimestamp = new Date();
    const offset = backendTimestamp.getTime() - ourTimestamp.getTime();

    const interval = setInterval(() => {
      const newTime = new Date(new Date().getTime() + offset);
      setCurrentTime(newTime);
    }, 500);
    return () => clearInterval(interval);
  }, [backendTime, pending]);

  return (
    <BackendTimeContext.Provider value={{ currentTime }}>
      {children}
    </BackendTimeContext.Provider>
  );
};

export interface BackendTimeContextType {
  currentTime: Date;
}
