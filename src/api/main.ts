import { Elysia } from "elysia";
import { appConfiguration } from "./util/config";
import { logger } from "./util/logger";
import { helmet } from "elysia-helmet";
import { api } from "./api";

export const app = new Elysia({
  prefix: "/api",
});

if (appConfiguration.production) {
  app.use(helmet());
}

app
  .use(logger)
  .use(api)
  .compile();
