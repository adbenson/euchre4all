const playerTokenKey = 'playerToken';

export const setPlayerToken = (playerToken: string) => {
	sessionStorage.setItem(playerTokenKey, playerToken);
}

export const getPlayerToken = () => {
	const token = sessionStorage.getItem(playerTokenKey);
	if (!token) {
		throw new Error('Player Token not found');
	}
	return token;
}
