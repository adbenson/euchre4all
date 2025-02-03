
const codeLength = 5;
const codeCharacters = 'BCDFGHJKLMNPQRSTVWXYZ';

export const generateGameCode = (): string => {

	const numbers = crypto.getRandomValues(new Uint8Array(codeLength));

	return numbers.reduce((code, number) => code + codeCharacters[number % codeCharacters.length], '');
}
