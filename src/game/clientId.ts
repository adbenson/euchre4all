const clientIdKey = 'clientId';

export const setClientId = (clientId: string) => {
	sessionStorage.setItem(clientIdKey, clientId);
}

export const getClientId = () => {
	const id = sessionStorage.getItem(clientIdKey);
	if (!id) {
		throw new Error('Client ID not found');
	}
	return id;
}
