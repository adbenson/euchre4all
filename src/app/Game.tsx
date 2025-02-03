'use client';

import { GAME_STATE_CHANNEL } from '@/api/useGameState';
import { PLAYER_EVENT_CHANNEL } from '@/api/usePlayerEvent';
import { Table } from '@/Table';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';

export default function Chat() {

  const client = new Ably.Realtime({ authUrl: '/api' });

  return (
	<AblyProvider client={client}>
	  <ChannelProvider channelName={GAME_STATE_CHANNEL}>
	  	<ChannelProvider channelName={PLAYER_EVENT_CHANNEL}>
		
			<Table />

		</ChannelProvider>
	  </ChannelProvider>
	</AblyProvider>
  );
}
