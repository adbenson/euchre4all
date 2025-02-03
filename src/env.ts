export enum ENV_KEY {
	ABLY_API_KEY = 'ABLY_API_KEY',
	DATABASE_URL = 'DATABASE_URL',
}

// TODO: Validate at build time instead of runtime
// Object.keys(ENV_KEY).forEach((key) => {
// 	if (!process.env[key]) {
// 		throw new Error(`Missing environment variable: ${key}`);
// 	}
// });

export const ENV: Record<ENV_KEY, string> = process.env as unknown as Record<ENV_KEY, string>;
