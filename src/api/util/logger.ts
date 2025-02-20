import Elysia from "elysia";

export const logger = new Elysia({
  name: "logger",
})
  .onBeforeHandle({ as: "global" }, ({ request, path }) => {
    console.info(`Received request ${request.method} ${path}`);
  })
  .onError({ as: "global" }, ({ error, code, path, set, request }) => {
    const statusCode: number = (error as any).code;
    console.error(
      `Error in ${request.method} ${path}: ${code} ${(error as any)?.message ?? ""}. Thrown at ${(error as any)?.stack ?? ""}`,
    );

    if (code === "VALIDATION") {
      return error.message;
    }

    if (code === "NOT_FOUND") {
      return `Path ${path} doesn't exist (${error.message})`;
    }

    if (set.status === "Unavailable For Legal Reasons") {
      return error;
    }

    if (statusCode === 401) {
      return error;
    }

    // biome-ignore lint/suspicious/noExplicitAny:
    if ((error as any).name === "ForbiddenError") {
      set.status = "Forbidden";
      return "You are not allowed to perform this action";
    }

    // biome-ignore lint/suspicious/noExplicitAny:
    if ((error as any).response === "Permission check failed.") {
      set.status = "Forbidden";
      return "You are not allowed to perform this action";
    }

    // prisma relation/entry not found
    // @ts-ignore
    if (error?.code === "P2025") {
      set.status = "Not Found";
      return error;
    }

    // prisma unique constraint failed
    // @ts-ignore
    if (error?.code === "P2002") {
      set.status = "Conflict";
      return error;
    }

    console.error(JSON.stringify(error));

    return "Internal server error";
  });
