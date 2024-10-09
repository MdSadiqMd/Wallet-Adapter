import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
	WalletModalProvider,
	WalletDisconnectButton,
	WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Buffer } from 'buffer';

import Airdrop from './components/Airdrop';
import { SendTokens } from './components/SendTokens';

window.Buffer = Buffer;

function App() {
	const network = WalletAdapterNetwork.Devnet;
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);

	return (
		<div style={{ width: "100vw" }}>
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider wallets={[]} autoConnect>
					<WalletModalProvider>
						<div style={{
							display: 'flex',
							justifyContent: 'space-between',
							padding: 20
						}}>
							<WalletMultiButton />
							<WalletDisconnectButton />
						</div>
						<Airdrop />
						<SendTokens />
					</WalletModalProvider>
				</WalletProvider>
			</ConnectionProvider>
		</div>
	);
}

export default App;