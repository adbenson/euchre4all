'use client';

import { getMessage } from "@/api-client/server-error";
import { FC, useState } from "react";

interface NewGameFormProps {
	showCodeInput?: false;
	submit: (playerName: string) => Promise<void>;
}

interface JoinGameFormProps{
	showCodeInput: true;
	submit: (playerName: string, gameCode: string) => Promise<void>;
}

export const JoinGameForm: FC<JoinGameFormProps | NewGameFormProps> = ({
	showCodeInput = false,
	submit,
}) => {

	const [error, setError] = useState<string | null>(null);

	const handleSumit = async (form: FormData) => {
		const gameCode = form.get('gameCode');
		const playerName = form.get('playerName');
		// TODO: validation, then remove type assertions
		try {
			await submit(playerName as string, gameCode as string);
		} catch (e) {
			setError(getMessage(e));
		}
	}

	return (
		<form action={handleSumit}>
			{showCodeInput && 
				<input
					type="text"
					name="gameCode"
					placeholder="Enter Game Code"
				></input>
			}
			<input
				type="text"
				name="playerName"
				required
				placeholder="Enter Player Name"
			></input>

			<button type="submit">Join Game</button>

			{error && <p>{error}</p>}
		</form>
	)
}
