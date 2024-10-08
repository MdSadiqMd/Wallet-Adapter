import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
	WalletModalProvider,
	WalletDisconnectButton,
	WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

import Airdrop from './components/Airdrop';

function App() {
	return (
		<div style={{ width: "100vw" }}>
			<ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
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
					</WalletModalProvider>
				</WalletProvider>
			</ConnectionProvider>
		</div>
	);
}

export default App;