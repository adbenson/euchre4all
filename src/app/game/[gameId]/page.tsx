import { Game } from '@/game/components/Game';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default function GamePage({
	params: { gameId },
}: {
	params: { gameId: string }; 
}): ReactNode {

	if (!gameId) {
		redirect("/");
	}

	// const clientId = getClientId();

	// if (!clientId) {
	// 	redirect(`/game/${gameId}/join`);
	// }

	return (
		<Game id={gameId}/>
	);
}
