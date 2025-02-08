import { Realtime } from "ably";
import { useState } from "react";

export const useAblyClient = (token: string) => {
	const [client] = useState(() => {
		return new Realtime({
			authUrl: '/api/auth',
			authHeaders: { authorization: token },
			tls: true });
	});

	return client;
}
