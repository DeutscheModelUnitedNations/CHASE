import { Elysia } from "elysia";
import { logger } from "./util/logger";
import { api } from "./api";

export const app = new Elysia({
  prefix: "/api",
})
  .use(logger)
  .use(api)
  .compile();
