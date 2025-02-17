"use client";
import { useI18nContext } from "@/i18n/i18n-react";
import { useToast } from "@/contexts/toast";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { Button } from "primereact/button";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { useBackend } from "@/contexts/backend";

/**
 * === Regex for password requirements ===
 * --> (?=(.*RULE){MIN_OCCURANCES,})
 *
 *  ^                               start anchor
 *  (?=(.*[a-z]){1,})               lowercase letters.
 *  (?=(.*[A-Z]){1,})               uppercase letters.
 *  (?=(.*[0-9]){1,})               numbers.
 *  (?=(.*[!@#$%^&*()\-__+.]){1,})  all the special characters in the [] fields. The ones used by regex are escaped by using the \ or the character itself.
 *  {8,}                            indicates that you want 8 or more
 *  $                               end anchor
 */
const passwordRegex =
  /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;

export default () => {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <CreateCredentialsComponent />
      </Suspense>
    </>
  );
};

function CreateCredentialsComponent() {
  const { LL } = useI18nContext();
  const toast = useToast();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [awaitingCredentialSetResponse, setAwaitingCredentialSetResponse] =
    useState<boolean | undefined>();
  const [succeeded, setSucceeded] = useState<boolean | undefined>();
  const [passwordValid, setPasswordValid] = useState<boolean | undefined>();
  const { backend } = useBackend();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (password) {
      setPasswordValid(passwordRegex.test(password));
    } else {
      setPasswordValid(undefined);
    }
  }, [password]);

  const createCredentialsWithPassword = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token) {
      toast.showToast({
        severity: "error",
        summary: LL.login.NO_TOKEN(),
      });
      return;
    }

    if (!email) {
      toast.showToast({
        severity: "error",
        summary: LL.login.NO_EMAIL(),
      });
      return;
    }

    setAwaitingCredentialSetResponse(true);
    const r = await backend.auth.password.post({
      email,
      password,
      credentialCreateToken: token,
    });
    setAwaitingCredentialSetResponse(false);

    if (r.error) {
      toast.showToast({
        severity: "error",
        summary: r.error.value.summary,
      });
      return;
    }
    setSucceeded(true);
  };

  return (
    <>
      {succeeded === undefined ? (
        <form onSubmit={createCredentialsWithPassword} className="w-full">
          <h1 className="text-xl mb-5">{LL.login.SET_CREDENTIALS()}</h1>
          <span className="p-float-label w-full mb-8">
            <InputText
              className="w-full"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">{LL.login.PASSWORD_PLACEHOLDER()}</label>
            {passwordValid === false ? (
              <small className="text-red-500">
                {LL.login.PASSWORD_INVALID()}
              </small>
            ) : undefined}
          </span>
          <span className="p-float-label w-full mb-2">
            <InputText
              className="w-full"
              type="password"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <label htmlFor="repeatPassword">
              {LL.login.REPEAT_PASSWORD_PLACEHOLDER()}
            </label>
            {password !== repeatPassword ? (
              <small className="text-red-500">
                {LL.login.PASSWORDS_DO_NOT_MATCH()}
              </small>
            ) : undefined}
          </span>
          <Button
            disabled={passwordValid === false || password !== repeatPassword}
            type="submit"
            label={LL.login.SET_CREDENTIALS()}
            className="w-full mt-3"
            loading={awaitingCredentialSetResponse === true}
          />
        </form>
      ) : undefined}
      {succeeded === false ? (
        <Image
          src="/undraw/warning.svg"
          alt="decorative error drawing"
          width={300}
          height={300}
          className="mb-10"
        />
      ) : undefined}

      {succeeded === true ? (
        <Image
          src="/undraw/verified.svg"
          alt="decorative success drawing"
          width={300}
          height={300}
          className="mb-10"
        />
      ) : undefined}
      {succeeded === true ? (
        <Link href={"/login"}>
          <Button
            type="button"
            label={LL.login.LOGIN_BUTTON()}
            className="w-full mt-3"
          />
        </Link>
      ) : undefined}
    </>
  );
}
