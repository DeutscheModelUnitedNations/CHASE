import type { DB } from "../db";
import { createDefaultNationsInDatabase } from "./nations";

let created = false;

export async function createDefaultData(db: DB) {
  if (created) {
    return;
  }
  try {
    const [nations] = await Promise.all([createDefaultNationsInDatabase(db)]);

    return { nations };
  } catch (error) {
    console.error("Error creating default data", error);
  }

  created = true;
  return { nations: [] };
}
