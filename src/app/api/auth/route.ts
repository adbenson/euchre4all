import { ENV } from '@/env';
import Ably from 'ably';

export async function GET() {
	console.debug("Auth endpoint request")
    const client = new Ably.Rest(ENV.ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'ably-nextjs-demo' });
    return Response.json(tokenRequestData);
}
