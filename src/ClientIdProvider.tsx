// import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";

// export interface ClientIdContextContainer {
// 	clientId: string | null;
// 	setClientId: (clientId: string) => void;
// }

// export const ClientIdContext = createContext<ClientIdContextContainer | null>(null);

// const useClientIdContext = () => {
// 	const context = useContext(ClientIdContext)
// 	if (!context) {
// 		throw new Error('useClientIdContext must be used within a ClientIdProvider');
// 	}
// 	return context;
// }

// export const useClientIdSetter = () => {
// 	const context = useClientIdContext();
// 	return context.setClientId;
// }

// export const useClientId = () => {
// 	const context = useClientIdContext();
// 	if (!context?.clientId) {
// 		throw new Error("Client ID has not been provided");
// 	}
// 	return context.clientId;
// }

// const useClientIdState = () => {
// 	const [clientId, setClientId] = useState("");

// 	const memo = useMemo(() => {
// 		return { clientId, setClientId };
// 	}, [clientId, setClientId]);

// 	return memo;
// }

// export const ClientIdProvider: FC<PropsWithChildren> = ({children}) => {
// 	return (
// 		<ClientIdContext.Provider value={useClientIdState()}>
// 			{children}
// 		</ClientIdContext.Provider>
// 	);
// }
