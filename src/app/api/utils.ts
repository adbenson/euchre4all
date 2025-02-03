import { ZodError } from "zod";

export interface RequestWithPayload<PayloadType> extends Request {
	json: () => Promise<PayloadType>,
}

export function isErrorType(error: unknown, type: string): error is Error {
	return error instanceof Error && error?.message === type;
}

export function isZoderror(error: unknown): error is ZodError {
	return error instanceof ZodError;
}

type FetchParams = Parameters<typeof fetch>;

export async function fetchJson<ResponseType, RequestType = undefined> (input: FetchParams[0], init: FetchParams[1], body?: RequestType): Promise<ResponseType> {
	const initWithBody: typeof init = {
		...init,
		body: body ? JSON.stringify(body) : undefined,
	}
	return (await fetch(input, initWithBody)).json();
}
