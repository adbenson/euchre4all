import { ENV } from "@/env";
import { Team } from "@/game/models/game-state";
import { neon, NeonQueryFunction, Pool } from "@neondatabase/serverless";
import { randomBytes } from "crypto";
import { generateGameCode } from "./utils";

export enum ERRORS {
	NOT_FOUND = 'NOT_FOUND',
	FULL = 'FULL',
	DB_ERROR = 'DB_ERROR',
}

function query(): NeonQueryFunction<false, false> {
    return neon(ENV.DATABASE_URL);
}

function createPool(): Pool {
	return new Pool({ connectionString: ENV.DATABASE_URL });
}

export interface Card {
	code: string;
}

export async function getCardCodes() {
    const data = await query()`SELECT * FROM cards;` as Array<Card>;
    return data.map(card => card.code);
}

/**
 * Creates a new game record in the database
 * @returns game code
 */
export async function insertNewGame(): Promise<string> {
	const code = generateGameCode();
	await query()`INSERT INTO games (code) VALUES (${code});`;
	console.debug('Created new game', code);
	return code;
}

export async function insertPlayerIfNotFull(playerName: string, gameCode: string): Promise<string> {
	console.debug('Player joining game', playerName, gameCode);

	const pool = createPool();

	try {
		await pool.query('BEGIN;');
		const {rows: [game]} = await pool.query('SELECT id FROM games WHERE code = $1;', [gameCode]);

		if (!game) {
			throw new Error(ERRORS.NOT_FOUND);
		}

		const {rows} = await pool.query('SELECT COUNT (*) FROM players WHERE game_id = $1;', [game.id]);

		// Yeah, it's a magic number. But Euchre is a 4 player game, full stop.
		// No, I don't plan on impmlementing 3 player Euchre because it's not fun.
		if (rows.length >= 4) {
			throw new Error(ERRORS.FULL);
		}

		const position = rows.length + 1;
		const team = position % 2 === 0 ? Team.A : Team.B;

		const playerToken = randomBytes(64).toString('base64');
console.log("PTL", playerToken.length);
		const {rows: [player]} = await pool.query(
			`INSERT INTO players (name, team, position, player_token) VALUES ($1, $2, $3, $4, $5) RETURNING id;`,
			[playerName, team, position, playerToken]
		);

		await pool.query(
			'INSERT INTO game_players (player_id, game_id) VALUES ($1, $2);',
			[game.id, player.id],
		)

		await pool.query('COMMIT');

		console.debug('Player joined game', playerName, gameCode);

		return playerToken;
	} catch (err) {
		await pool.query('ROLLBACK');
		throw new Error(ERRORS.DB_ERROR, {cause: err});
	} finally {
		await pool.end();
	}
}
