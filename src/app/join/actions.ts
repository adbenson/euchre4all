'use server';

import { isErrorType, ServerError } from "@/api-client/server-error";
import { ERRORS, insertPlayerIfNotFull } from "@/db/db";

export const joinGame = async (playerName: string, gameCode: string): Promise<string> => {
	try {
		const playerToken = await insertPlayerIfNotFull(playerName, gameCode);
		return playerToken;
	} catch (error) {
		if (isErrorType(error, ERRORS.NOT_FOUND)) {
			throw new Error(ServerError.GAME_NOT_FOUND);
		}
		if (isErrorType(error, ERRORS.FULL)) {
			throw new Error(ServerError.GAME_FULL);
		}

		throw new Error(ServerError.GENERAL_ERROR);
	}
}
