import React, { createContext, useContext, useState } from "react";

export const SpeakersListMiniatureContext = createContext(
	{} as {
		showSpeakersListMiniature: boolean;
		setShowSpeakersListMiniature: (show: boolean) => void;
		toggleSpeakersListMiniature: () => void;
	},
);

export const useSpeakersListMiniature = () =>
	useContext(SpeakersListMiniatureContext);

export const SpeakersListMiniatureProvider = ({
	children,
}: { children: any }) => {
	const [showSpeakersListMiniature, setShowSpeakersListMiniature] =
		useState(false);

	const toggleSpeakersListMiniature = () => {
		setShowSpeakersListMiniature(!showSpeakersListMiniature);
	};

	return (
		<SpeakersListMiniatureContext.Provider
			value={{
				showSpeakersListMiniature,
				setShowSpeakersListMiniature,
				toggleSpeakersListMiniature,
			}}
		>
			{children}
		</SpeakersListMiniatureContext.Provider>
	);
};
