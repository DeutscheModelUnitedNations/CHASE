import worldCountries from 'world-countries';
import type { DB } from '../db';

export async function createDefaultNationsInDatabase(db: DB) {
	console.info('Creating default nations...');

	// the Country type is wrong
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	const countries = worldCountries.filter((c) => c.unMember);

	const r = await Promise.all(
		countries.map((country) =>
			db.nation.upsert({
				where: {
					alpha3Code: country.cca3.toLowerCase()
				},
				update: {
					alpha2Code: country.cca2.toLowerCase(),
					alpha3Code: country.cca3.toLowerCase()
				},
				create: {
					alpha2Code: country.cca2.toLowerCase(),
					alpha3Code: country.cca3.toLowerCase()
				}
			})
		)
	);
	console.info('Created default nations!');
	return r;
}
