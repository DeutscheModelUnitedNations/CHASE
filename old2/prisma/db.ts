import { appConfiguration } from "../src/api/util/config";
import { Prisma, PrismaClient } from "./generated/client";
import { createClient } from "redis";

// injects the actual types of the Prisma models into the data models at runtime
// so CASL can extract those and run permission checks
const brandExtension = Prisma.defineExtension((client) => {
  type ModelKey = Exclude<keyof typeof client, `__${string}` | symbol>;
  type Result = {
    [K in ModelKey]: {
      __typename: {
        needs: Record<string, never>;
        compute: () => Capitalize<K>;
      };
    };
  };

  const result = {} as Result;
  const modelKeys = Object.keys(client).filter(
    (key) => !key.startsWith("__")
  ) as ModelKey[];

  for (const k of modelKeys) {
    const capK = k.charAt(0).toUpperCase() + k.slice(1);
    result[k] = {
      // biome-ignore lint/suspicious/noExplicitAny:
      __typename: { needs: {}, compute: () => capK as any },
    };
  }

  return client.$extends({ result });
});

export const db = new PrismaClient({
  datasourceUrl: appConfiguration.db,
}).$extends(brandExtension);

// maintanance
setInterval(async () => {
  await db.pendingCredentialCreateTask.deleteMany({
    where: {
      token: {
        expiresAt: {
          lte: new Date(),
        },
      },
    },
  });

  await db.token.deleteMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
    },
  });
}, 1000 * 60 * 11);
