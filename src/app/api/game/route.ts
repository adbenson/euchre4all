import { insertNewGame } from "@/db/db";

export const gameRoute = '/api/game';

export interface PostGameResponse {
	code: string;
}

/**
 * Starts a new game
 * 
 * @returns `PostGameResponse`
 * 201: The game has been created
 */
export async function POST() {
	const code = await insertNewGame();
	const body: PostGameResponse = { code };
	return Response.json(body, { status: 201 });
}
