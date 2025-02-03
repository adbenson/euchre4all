'use client';

import { GAME_STATE_CHANNEL } from '@/api-client/useGameState';
import { PLAYER_EVENT_CHANNEL } from '@/api-client/usePlayerEvent';
import { GameTable } from '@/game/components/GameTable';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import { FC } from 'react';
import { getClientId } from '../clientId';

interface GameProps {
	id: string;
}

export const Game: FC<GameProps> = ({
	id,
}) => {

	const clientId = getClientId();
  	const client = new Ably.Realtime({ authUrl: '/api/auth', clientId });

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
