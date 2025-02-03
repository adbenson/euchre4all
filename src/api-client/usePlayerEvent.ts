import { Card } from "@/db/db";
import { codeToCard } from "@/game/models/card-models";
import { PlayerAction } from "@/game/models/game-state";
import { Message } from "ably";
import { useChannel } from "ably/react";
import { useState } from "react";

export const PLAYER_EVENT_CHANNEL = 'player-event';
export const PLAYER_TURN_EVENT = 'player-turn';
export const PLAYER_HAND_EVENT = 'player-hand';

export type takeAction = (action: PlayerAction) => void;

export interface UsePlayerEventReturn {
	playerHand: Array<Card>;
}

interface PlayerTurnMessage extends Message {
	name: typeof PLAYER_TURN_EVENT,
	data: {
		actionToken: string;
	};
}

interface PlayerHandMessage extends Message {
	name: typeof PLAYER_HAND_EVENT,
	data: {
		playerHand: Array<string>;
	};
}

const isPlayerTurnMessage = (message: Message): message is PlayerTurnMessage => {
	return message.name === PLAYER_TURN_EVENT;
}

const isPlayerHandMessage = (message: Message): message is PlayerHandMessage => {
	return message.name === PLAYER_HAND_EVENT;
}

export const usePlayerEvent = (onPlayerTurn: (act: takeAction) => void): UsePlayerEventReturn => {

	const [playerHand, setPlayerHand] = useState<Array<Card>>([]);
	
	const { channel } = useChannel(PLAYER_EVENT_CHANNEL, (message) => {
		if (isPlayerTurnMessage(message)) {
			onPlayerTurn((action: PlayerAction) => {
				channel.publish({data: { action, token: message.data.actionToken }});
			});
		}

		if (isPlayerHandMessage(message)) {
			setPlayerHand(message.data.playerHand.map(codeToCard));
		}

	});

	return {
		playerHand,
	}
};
