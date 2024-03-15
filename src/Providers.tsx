import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const projectId = process.env.REACT_APP_WC_PROJECT_ID;

const metadata = {
	name: 'PLR Rewards Dashboard',
	description:
		'Stake your PLR Liquidity tokens in order to receive rewards. You can also claim your PLR tokens and exit at any time',
	url: 'https://plr.pillar.fi/',
	icons: ['https://www.pillar.fi/wp-content/themes/pillar-2023/assets/images/pillar-logo.svg'],
};

const chains = [mainnet] as const;
const config = defaultWagmiConfig({
	chains,
	projectId,
	metadata,
	enableWalletConnect: true,
	enableInjected: true,
});

createWeb3Modal({
	wagmiConfig: config,
	projectId,
	enableOnramp: true,
	includeWalletIds: [
		'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
		'19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927',
		'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
		'e7c4d26541a7fd84dbdfa9922d3ad21e936e13a7a0e44385d44f006139e44d3b',
	],
});

function Web3Providers({ children }: any) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
}

export default Web3Providers;
