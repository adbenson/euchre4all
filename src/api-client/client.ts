import { PostGameResponse, gameRoute } from "@/app/api/game/route";
import { PostPlayerRequest, PostPlayerResponse } from "@/app/api/player/route";
import { fetchJson } from "@/app/api/utils";

export const createGame = async (): Promise<string> => {
	return (await fetchJson<PostGameResponse>(gameRoute, {method: 'POST'})).code;
}

export const addPlayer = async (gameCode: string, name: string): Promise<string> => {
	const response = await fetchJson<PostPlayerResponse, PostPlayerRequest>(gameRoute, {method: 'POST'}, {gameCode, playerName: name});
	return response.clientId;
}
