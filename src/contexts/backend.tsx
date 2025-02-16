"use client";
import type React from "react";
import { createContext, useContext, useState } from "react";
import { treaty } from "@elysiajs/eden";
import type { Api } from "@/api/api";

export const BackendContext = createContext({} as BackendContextType);
export const useBackend = () => useContext(BackendContext);

export type BackendInstanceType = ReturnType<typeof treaty<Api>>;

export const Backend = ({ children }: { children: React.ReactNode }) => {
	// ATTENTION: It is IMPORTANT to use a callback function here to prevent
	// react from doing funky things with the backend instance when passing to the state hook
	// please do not ask me why this is happening...
	const [backend] = useState(() =>
		treaty<Api>(`${process.env.NEXT_PUBLIC_HOST}/api`, {
			fetch: {
				credentials: "include",
			},
		}),
	);

	if (typeof window !== "undefined") {
		window.onerror = (message, source, lineno, colno, error) => {
			backend["report-error"].post({
				colno,
				error,
				lineno,
				message,
				source,
			});
		};
	}

	return (
		<BackendContext.Provider value={{ backend }}>
			{children}
		</BackendContext.Provider>
	);
};

export interface BackendContextType {
	backend: BackendInstanceType;
}
