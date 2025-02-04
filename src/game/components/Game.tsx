'use client';

import { useAblyClient } from '@/api-client/client';
import { GAME_STATE_CHANNEL } from '@/api-client/useGameState';
import { PLAYER_EVENT_CHANNEL } from '@/api-client/usePlayerEvent';
import { GameTable } from '@/game/components/GameTable';
import { AblyProvider, ChannelProvider } from 'ably/react';
import { FC } from 'react';

interface GameProps {
	id: string;
}

export const Game: FC<GameProps> = ({
	id,
}) => {

	const client = useAblyClient();

	return (
		<AblyProvider client={client}>
			<ChannelProvider channelName={GAME_STATE_CHANNEL}>
				<ChannelProvider channelName={PLAYER_EVENT_CHANNEL}>
				
					<GameTable />

				</ChannelProvider>
			</ChannelProvider>
		</AblyProvider>
	);
}
