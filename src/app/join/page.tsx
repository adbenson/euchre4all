import { JoinGameForm } from "@/game/components/JoinGameForm";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { setPlayerToken } from "../playerToken";
import { joinGame } from "./actions";

export default function JoinGamePage({
	params: { gameCode },
}: {
	params: { gameCode?: string },
}): ReactNode {

	const handleSubmit = async (playerName: string, gameCode: string): Promise<void> => {
		'use server';
		const playerToken = await joinGame(playerName, gameCode);
		console.info("Player joined, token: ...", playerToken.substring(playerToken.length - 4));
		setPlayerToken(playerToken);
		redirect(`/game/${gameCode}`);
	};

	return (
		<>
			<h1>Join Game</h1>
			<JoinGameForm showCodeInput={true} submit={handleSubmit} />
		</>
	);
}
