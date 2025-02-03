import { getClientId } from '@/game/clientId';
import { Game } from '@/game/components/Game';
import { redirect } from 'next/navigation';

export default function GamePage({
	params: { gameId },
}: {
	params: { gameId: string }; 
}) {

	if (!gameId) {
		redirect("/");
	}

	const clientId = getClientId();

	if (!clientId) {
		redirect(`/game/${gameId}/join`);
	}

	return (
		<Game id={gameId}/>
	);
}
