import Elysia, { t } from "elysia";
import { nanoid } from "nanoid";
import { appConfiguration } from "../util/config";
import type { Email, User } from "../../../prisma/generated/client";

//TODO periodically purge old sessions? Or does redis do that for us?

const expirationDurationInSeconds = 60 * 60 * 24 * 7; // a week

export type SessionData = {
  loggedIn: boolean;
  /**
   * The user data is stored in the session. This is the user data. May be undefined in case the user is not logged in.
   * CAREFUL: Existing data does not mean the user has a valid session. Check the loggedIn property for that.
   */
  user?: Pick<User, "id" | "name"> & Pick<Email, "email">;
};

export type SessionDataSetter = (data: Partial<SessionData>) => Promise<void>;

export type Session = {
  /**
   * In case the user has not given consent to set cookies, the data cannot be stored and will be undefined
   */
  data?: SessionData;
  setData: SessionDataSetter;
};

export const sessionPlugin = new Elysia({ name: "session" })
  .guard({
    cookie: t.Cookie(
      {
        sessionId: t.Optional(t.String()),
        chaseCookieConsent: t.Optional(t.Boolean()),
      },
      {
        sign: ["sessionId"],
        httpOnly: true,
        maxAge: expirationDurationInSeconds,
        sameSite: appConfiguration.development ? "none" : "strict",
        secure: true,
        path: "/",
      }
    ),
  })
  .derive(
    { as: "global" },
    async ({
      cookie: { sessionId, chaseCookieConsent },
      set,
    }): Promise<{ session: Session }> => {
      const session: Session = {
        data: undefined,
        setData: () => {
          set.status = "Unavailable For Legal Reasons";
          throw new Error("You need to accept cookies to use this feature.");
        },
      };
      if (!chaseCookieConsent.value) {
        return { session };
      }
      return { session };
    }
  );
