import type { DB } from '../db';
import { createDefaultNationsInDatabase } from './nations';

export async function createDefaultData(db: DB) {
	try {
		const [nations] = await Promise.all([createDefaultNationsInDatabase(db)]);

		return { nations };
	} catch (error) {
		console.error('Error creating default data', error);
	}

	return { nations: [] };
}
