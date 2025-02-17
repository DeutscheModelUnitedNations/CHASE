"use client";
import { useToast } from "@/contexts/toast";
import Image from "next/image";
import { useI18nContext } from "@/i18n/i18n-react";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import SmallInfoCard from "@/components/small_info_card";
import { Skeleton } from "primereact/skeleton";
import { Message } from "primereact/message";
import { useBackend } from "@/contexts/backend";
import { useBackendCall } from "@/hooks/useBackendCall";
import FAIcon from "@/components/font_awesome_icon";

const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function page() {
	const { LL, locale } = useI18nContext();
	const router = useRouter();
	const { showToast, toastError } = useToast();

	const [initialLoading, setInitialLoading] = useState(true);
	const [userStateLoading, setUserStateLoading] = useState(false);
	const [userCreateLoading, setCreateLoading] = useState(false);
	const [loginLoading, setLoginLoading] = useState(false);
	const [userCreatedSuccessfullyLoading, setCreatedSuccessfullyLoading] =
		useState(false);
	const [userState, triggerUserState] = useBackendCall(
		() => backend.auth.userState.get({ query: { email } }),
		true,
	);
	const [email, setEmail] = useState("");
	const [emailValid, setEmailValid] = useState<boolean | undefined>();
	const [password, setPassword] = useState("");
	const { backend } = useBackend();

	async function fetchMyInfoData() {
		await backend.auth.myInfo
			.get()
			.then((res) => {
				if (res.status === 200) {
					router.push("/login/gateway");
				} else {
					setInitialLoading(false);
				}
			})
			.catch((err) => {
				toastError(err);
			});
	}

	useEffect(() => {
		fetchMyInfoData();
	}, []);

	useEffect(() => {
		if (email) {
			setEmailValid(emailRegex.test(email));
		} else {
			setEmailValid(undefined);
		}
	}, [email]);

	useEffect(() => {
		if (!email || email === "") {
			return;
		}
		(async () => {
			setUserStateLoading(true);
			await triggerUserState();
			setUserStateLoading(false);
		})();
	}, [email]);

	async function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (password) {
			setLoginLoading(true);
			const res = await backend.auth.password.login.post({
				email,
				password,
			});
			if (res.error) {
				showToast({
					severity: "error",
					summary: LL.login.WRONG_CREDENTIALS(),
				});
				setLoginLoading(false);
				return;
			}
			router.push("/login/gateway");
		} else {
			setCreateLoading(true);
			const res = await backend.auth.createUser.post({
				locale,
				email,
			});
			if (res.error) {
				showToast({
					severity: "error",
					summary: res.error.value.summary,
				});
			} else {
				setCreatedSuccessfullyLoading(true);
			}
			setCreateLoading(false);
		}
	}

	function forgotPassword(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		backend.auth.sendCredentialCreateToken.get({ query: { email, locale } });
		showToast({
			severity: "info",
			summary: LL.login.SENT_EMAIL(),
		});
	}

	return (
		<>
			{initialLoading === true ? (
				<FAIcon
					icon="circle-notch"
					spin
					size="3x"
					className="text-primary-500"
				/>
			) : userCreatedSuccessfullyLoading === true ? (
				<>
					<Image
						src="/undraw/order_confirmed.svg"
						alt="decorative success drawing"
						width={300}
						height={300}
						className="mb-10"
					/>
					<p>{LL.login.CREATION_SUCCESS()}</p>
					<Button
						faIcon="arrow-left"
						label={LL.login.LOGIN_BUTTON()}
						onClick={() => router.refresh()}
						className="w-full mt-8"
					/>
				</>
			) : (
				<>
					<h1 className="font-serif font-bold text-4xl mb-4">
						{LL.login.LOGIN_TITLE()}
					</h1>
					<p className="mb-8 text-lg">{LL.login.LOGIN_DESCRIPTION()}</p>
					<form onSubmit={submit} className="w-full">
						<span className="p-float-label w-full mb-2">
							<InputText
								className="w-full"
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<label htmlFor="email">{LL.login.EMAIL_PLACEHOLDER()}</label>
						</span>

						{emailValid === false ? (
							<Message severity="error" text={LL.login.EMAIL_INVALID()} />
						) : undefined}
						{emailValid === true ? (
							<>
								{userStateLoading === true ? (
									<Skeleton
										width="100%"
										height="4rem"
										className="!bg-primary-900"
									/>
								) : userState === "userNotFound" ? (
									<>
										<SmallInfoCard icon="user-plus">
											<p>{LL.login.ACCOUNT_NOT_YET_CREATED()}</p>
										</SmallInfoCard>
										<Button
											type="submit"
											faIcon="paper-plane"
											label={LL.login.CREATE_ACCOUNT()}
											loading={userCreateLoading}
											className="w-full mt-3"
										/>
									</>
								) : undefined}
								{userState === "ok" ? (
									<>
										<SmallInfoCard
											icon="user-check"
											classNameForIconBox="bg-green-500 text-green-500 border-green-500"
											classNameForContentBox="bg-green-500"
										>
											<p>{LL.login.USER_FOUND()}</p>
										</SmallInfoCard>
										<span className="p-float-label w-full mt-8">
											<InputText
												className="w-full"
												type="password"
												id="password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
											<label htmlFor="password">
												{LL.login.PASSWORD_PLACEHOLDER()}
											</label>
										</span>
										<small>
											<button type="button" onClick={(e) => forgotPassword(e)}>
												{LL.login.FORGOT_PASSWORD()}
											</button>
										</small>
										<Button
											faIcon="right-to-bracket"
											type="submit"
											label={LL.login.LOGIN_BUTTON()}
											loading={loginLoading}
											className="w-full mt-3"
										/>
									</>
								) : undefined}
								{userState === "emailNotValidated" ? (
									<SmallInfoCard
										icon="envelope-dot"
										classNameForIconBox="bg-yellow-500 text-yellow-500 border-yellow-500"
										classNameForContentBox="bg-yellow-500"
									>
										<p>{LL.login.EMAIL_NOT_CONFIRMED()}</p>
									</SmallInfoCard>
								) : undefined}
							</>
						) : undefined}
					</form>
				</>
			)}
		</>
	);
}
