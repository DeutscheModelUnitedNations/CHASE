import Elysia from "elysia";
import { agendaItem } from "./routes/agendaItem";
import { auth } from "./routes/auth/auth";
import { baseData } from "./routes/baseData";
import { committee } from "./routes/committee";
import { conference } from "./routes/conference";
import { conferenceMember } from "./routes/conferenceMember";
import { delegation } from "./routes/delegation";
import { messages } from "./routes/messages";
import { speakersListGeneral } from "./routes/speakersList/general";
import { speakersListModification } from "./routes/speakersList/modification";
import { speakersListSpeakers } from "./routes/speakersList/speakers";
import { time } from "./routes/time";
import { reportError } from "./routes/reportError";
import { user } from "./routes/user";
import { appConfiguration } from "./util/config";
import packagejson from "@/../package.json";

export const api = new Elysia()
  .use(conference)
  .use(conferenceMember)
  .use(committee)
  .use(delegation)
  .use(agendaItem)
  .use(speakersListGeneral)
  .use(speakersListModification)
  .use(speakersListSpeakers)
  .use(messages)
  .use(user)
  .use(auth)
  .use(time)
  .use(baseData)
  .use(reportError)
  .get("/", () => ({
    production: appConfiguration.production,
    name: appConfiguration.appName,
    version: packagejson.version,
  }));

export type Api = typeof api;
