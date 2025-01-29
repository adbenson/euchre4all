import { neon } from "@neondatabase/serverless";

export async function getData() {
	// TODO: add build script to validate env vars
	if (!process.env.DATABASE_URL) {
		throw new Error("Invalid DB URL");
	}
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`SELECT * FROM cards;`;
    return data;
}
