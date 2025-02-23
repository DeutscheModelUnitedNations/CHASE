import { PrismaClient, Prisma } from '@prisma/client';
import { createDefaultData } from './defaultData/createDefaultData';

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
	const modelKeys = Object.keys(client).filter((key) => !key.startsWith('__')) as ModelKey[];

	for (const k of modelKeys) {
		const capK = k.charAt(0).toUpperCase() + k.slice(1);
		result[k] = {
			__typename: { needs: {}, compute: () => capK as any }
		};
	}

	return client.$extends({ result });
});

export const db = new PrismaClient({
	datasourceUrl: process.env.DATABASE_URL
}).$extends(brandExtension) as unknown as PrismaClient;

createDefaultData(db);

export type DB = typeof db | Parameters<Parameters<typeof db.$transaction>[0]>[0];
