'use server'; 

import { cookies } from "next/headers";

const playerTokenKey = 'playerToken';

export const setPlayerToken = async (token: string) => {
  	const cookieStore = await cookies();
	// TODO: will this work with `httpOnly` and `secure`
	cookieStore.set(playerTokenKey, token);
}

export const getPlayerToken = async (): Promise<string | undefined> => {
	const cookieStore = await cookies();
	return cookieStore.get(playerTokenKey)?.value;
}
