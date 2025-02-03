import { ENV } from "@/env";
import { neon, NeonQueryFunction } from "@neondatabase/serverless";

export function query(): NeonQueryFunction<false, false> {
    return neon(ENV.DATABASE_URL);
}

export interface Card {
	code: string;
}

export async function getCardCodes() {
    const data = await query()`SELECT * FROM cards;` as Array<Card>;
    return data.map(card => card.code);
}
