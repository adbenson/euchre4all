import { getPlayerToken } from '@/app/playerToken';
import { Game } from '@/game/components/Game';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function GamePage({
	params: { gameCode },
}: {
	params: { gameCode?: string }; 
}): Promise<ReactNode>{

	if (!gameCode) {
		console.log("No game code, redirecting to home");
		redirect("/");
	}

	const playerToken = await getPlayerToken();

	if (!playerToken) {
		console.log("No player token, redirecting to join");
		redirect(`/join/${gameCode}`);
	}

	console.info("Entering Game");

	return (
		<Game gameCode={gameCode} playerToken={playerToken}/>
	);
}
