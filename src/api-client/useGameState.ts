import { codeToCard } from "@/game/models/card-models";
import { GameState, initialState, initialTableState, PlayerAction, TableState } from "@/game/models/game-state";
import { Message } from "ably";
import { useChannel } from "ably/react";
import { useState } from "react";

export const GAME_STATE_CHANNEL = 'game-state';

export interface UseGameStateReturn {
	gameState: GameState;
	tableState: TableState;
}

// [playerIndex, cardCode]
type PlayerActionDto = [number, string];

interface TableStateDto {
	upCard?: string;
	kitty: Array<string>;
	hands: Array<Array<string>>;
	plays: Array<PlayerActionDto>;
	// tricks[playerIndex][trickIndex][actionIndex]: PlayerAction
	playerTricks: Array<Array<Array<PlayerActionDto>>>;
}

interface GameStateMessage extends Message {
	data?: {
		gameState: GameState;
		tableState: TableStateDto;
	};
}

const playerActionFromDto = ([player, card]: PlayerActionDto): PlayerAction => {
	return {
		player,
		card: codeToCard(card),
	};
}

const tableStateFromDto = (dto: TableStateDto): TableState => {
	return {
		upCard: dto.upCard ? codeToCard(dto.upCard) : undefined,
		kitty: dto.kitty.map(codeToCard),
		hands: dto.hands.map(hand => hand.map(codeToCard)),
		plays: dto.plays.map(playerActionFromDto),
		playerTricks: dto.playerTricks.map(player => player.map(trick => trick.map(playerActionFromDto))),
	};
}

export const useGameState = (gameCode: string): UseGameStateReturn => {

	const [gameState, setGameState] = useState<GameState>(initialState);
	const [tableState, setTableState] = useState<TableState>(initialTableState);

	useChannel(`${GAME_STATE_CHANNEL}:${gameCode}`, (message: GameStateMessage) => {
		if (message.data) {
			setGameState(message.data.gameState);
			setTableState(tableStateFromDto(message.data.tableState));
		}
	});

	return {
		gameState,
		tableState,
	};
}; 
