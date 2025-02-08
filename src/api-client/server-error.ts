
export enum ServerError {
	GENERAL_ERROR = 'GENERAL_ERROR',
	INVALID_REQUEST = 'INVALID_REQUEST',
	GAME_NOT_FOUND = 'GAME_NOT_FOUND',
	GAME_FULL = 'GAME_FULL',
}

export const getMessage = (e: unknown): string => {
	if (e instanceof Error) {
		return e.message;
	}
	if (typeof e === 'string') {
		return e;
	}
	return ServerError.GENERAL_ERROR;
}

export function isErrorType(error: unknown, type: string): error is Error {
	return error instanceof Error && error?.message === type;
}
