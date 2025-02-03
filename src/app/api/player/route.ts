import { ERRORS, insertPlayerIfNotFull } from "@/db/db";
import { z } from "zod";
import { isErrorType, isZoderror, RequestWithPayload } from "../utils";

const postPlayerSchema = z.object({
	gameCode: z.string(),
	playerName: z.string(),
});

export type PostPlayerRequest = z.infer<typeof postPlayerSchema>;

export interface PostPlayerResponse {
	clientId: string;
}

/**
 * Joins the player to a game in progress
 * @param request 
 * @param request - PostPlayerPayload
 * @returns - player Ably Client ID
 * 201: The player has successfully joined the game
 * 400: Bad Request
 * 404: The game does not exist
 * 409: Game is full
 */
export async function POST(request: RequestWithPayload<PostPlayerRequest>): Promise<Response> {
	try {
		const {gameCode, playerName} = postPlayerSchema.parse(await request.json());
		const clientId = await insertPlayerIfNotFull(gameCode, playerName);	
		const body: PostPlayerResponse = { clientId };
		return Response.json(body, { status: 201 });
	} catch (error) {
		if (isZoderror(error)) {
			return Response.json({error: 'Invalid request', reason: error}, {status: 400});
		}
		if (isErrorType(error, ERRORS.NOT_FOUND)) {
			return Response.json({error: 'Game not found'}, {status: 404});
		}
		if (isErrorType(error, ERRORS.FULL)) {
			return Response.json({error: 'Game Full'}, {status: 409});
		}

		return Response.json({error: 'Unknown', reason: error}, {status: 500});
	}
}


















// export interface GetGameRequest {
// 	code: string;
// 	playerName: string;
// }

// export interface GetGameResponse {
// 	clientId: string;
// }

// /**
//  * Joins the player to a game in progress
//  * @param request `GetGameRequest`
//  * @returns `GetGameResponse`
//  * 200: The player has successfully joined the game
//  * 400: Bad Request
//  * 404: The game does not exist
//  * 409: Game is full
//  */
// export async function GET(request: Request) {
// 	const { code, playerName } = await request.json() as GetGameRequest;
	
// }
