import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { LedgerConnector } from 'wagmi/connectors/ledger';

const queryClient = new QueryClient();

const projectId: any = process.env.REACT_APP_WC_PROJECT_ID;
const REACT_APP_INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;

const metadata = {
	name: 'PLR Rewards Dashboard',
	description:
		'Stake your PLR Liquidity tokens in order to receive rewards. You can also claim your PLR tokens and exit at any time',
	url: 'https://plr.pillar.fi/',
	icons: ['https://www.pillar.fi/wp-content/themes/pillar-2023/assets/images/pillar-logo.svg'],
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet],
	[infuraProvider({ apiKey: REACT_APP_INFURA_PROJECT_ID ?? '' }), publicProvider()]
);

const client = createConfig({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({
			chains,
			options: {
				UNSTABLE_shimOnConnectSelectAccount: true,
			},
		}),
		new LedgerConnector({
			chains,
			options: {
				chainId: 1,
			},
		}),
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName: 'PLR Rewards Dashboard',
			},
		}),
		new WalletConnectConnector({
			chains,
			options: {
				metadata,
				isNewChainsStale: false,
				projectId,
				showQrModal: true,
			},
		}),
	],
	publicClient,
	webSocketPublicClient,
});

function Web3Providers({ children }: any) {
	return (
		<WagmiConfig config={client}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiConfig>
	);
}

export default Web3Providers;
