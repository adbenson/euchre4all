import { insertNewGame } from '@/db/db';
import { JoinGameForm } from '@/game/components/JoinGameForm';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { joinGame } from '../join/actions';
import { setPlayerToken } from '../playerToken';

export default async function NewGamePage(): Promise<ReactNode> {

	const startAndJoinGame = async (playerName: string) => {
		'use server';
		const gameCode = await insertNewGame();
		console.info("New game created", gameCode);
		const playerToken = await joinGame(playerName, gameCode);
		console.info("Player joined, token: ...", playerToken.substring(playerToken.length - 4));
		setPlayerToken(playerToken);
		redirect(`/game/${gameCode}`);
	}

	return (
		<>
			<h1>New Game</h1>
			<JoinGameForm submit={startAndJoinGame}/>
		</>
	)
};
