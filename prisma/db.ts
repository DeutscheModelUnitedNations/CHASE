import { PrismaClient, Prisma, type User } from "@prisma/client";
import { createDefaultData } from "./defaultData/createDefaultData";

export const mockedDefaultUser: User = {
  email: "f.thomsen@mun-sh.de",
  family_name: "Tady",
  given_name: "Slim",
  id: "71df9ad5-54a6-4950-81bd-46c24c66f72c",
  locale: "de",
  preferred_username: "chasedefaultmockuser",
};

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
    (key) => !key.startsWith("__"),
  ) as ModelKey[];

  for (const k of modelKeys) {
    const capK = k.charAt(0).toUpperCase() + k.slice(1);
    result[k] = {
      __typename: { needs: {}, compute: () => capK as any },
    };
  }

  return client.$extends({ result });
});

export const db = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
}).$extends(brandExtension) as unknown as PrismaClient;

createDefaultData(db);

try {
  await db.user.upsert({
    where: { id: mockedDefaultUser.id },
    update: mockedDefaultUser,
    create: mockedDefaultUser,
  });
} catch (error) {
  console.error(error);
}

export type DB =
  | typeof db
  | Parameters<Parameters<typeof db.$transaction>[0]>[0];
