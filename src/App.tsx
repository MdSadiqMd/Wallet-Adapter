import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Buffer } from 'buffer';

import Airdrop from './components/Airdrop';
import SendTokens from './components/SendTokens';
import ShowSolBalance from './components/ShowSolBalance';
import SignMessage from './components/SignMessage';

window.Buffer = Buffer;

const App: React.FC = () => {
	const network = WalletAdapterNetwork.Devnet;
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);

	return (
		<div className="app-container min-h-screen bg-gray-100">
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider wallets={[]} autoConnect>
					<WalletModalProvider>
						<header className="app-header bg-white shadow p-4 flex justify-between items-center">
							<WalletMultiButton className="wallet-button" />
							<WalletDisconnectButton className="wallet-button" />
						</header>

						<main className="app-main p-6 space-y-8 max-w-4xl mx-auto">
							<Airdrop />
							<SendTokens />
							<ShowSolBalance />
							<SignMessage />
						</main>
					</WalletModalProvider>
				</WalletProvider>
			</ConnectionProvider>
		</div>
	);
};

export default App;