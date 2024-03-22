import { providers } from 'ethers';
import { useEffect, useState } from 'react';
import type { Account, Chain, Client, Transport } from 'viem';
import { Config, useConnectorClient } from 'wagmi';

export async function clientToSigner(client: Client<Transport, Chain, Account>) {
	const { account, chain, transport } = client;
	const network = {
		chainId: chain.id,
		name: chain.name,
		ensAddress: chain.contracts?.ensRegistry?.address,
	};
	const provider = new providers.Web3Provider(transport, network);
	const signer = await provider.getSigner(account.address);
	return signer;
}

export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
	const { data: client } = useConnectorClient<Config>({ chainId });
	const [signer, setSigner] = useState<any>(null);

	useEffect(() => {
		(async () => {
			if (!client) return;
			const clientSigner = await clientToSigner(client);
			setSigner(clientSigner);
		})();
	}, [client]);

	return signer;
}
