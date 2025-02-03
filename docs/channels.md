
'game-state'
	receive: {
		data: PlayerGameState
	}

'player-action':
	receive: {
		data: PlayerAction
	},
	send: {
		token: string,
		action: PlayerAction
	}
