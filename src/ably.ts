import Ably from 'ably';
import { ENV } from './env';

export async function get() {
    const client = new Ably.Rest(ENV.ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'ably-nextjs-demo' });
    return Response.json(tokenRequestData);
}
