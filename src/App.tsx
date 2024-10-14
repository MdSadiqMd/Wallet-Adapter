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
        <div className="app-container min-h-screen bg-gray-50">
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                        <header className="app-header bg-white shadow p-6 flex justify-between items-center">
                            <WalletMultiButton className="wallet-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" />
                            <WalletDisconnectButton className="wallet-button bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" />
                        </header>

                        <main className="app-main p-8 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
                            <div className="bg-white p-6 shadow-lg rounded-lg">
                                <SendTokens />
                            </div>
                            <div className="bg-white p-6 shadow-lg rounded-lg">
                                <Airdrop />
                            </div>
                            <div className="bg-white p-6 shadow-lg rounded-lg">
                                <ShowSolBalance />
                            </div>
                            <div className="bg-white p-6 shadow-lg rounded-lg">
                                <SignMessage />
                            </div>
                        </main>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </div>
    );
};

export default App;
