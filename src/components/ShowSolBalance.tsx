import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

function ShowSolBalance() {
    const { connection } = useConnection();
    const wallet = useWallet();

    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getBalance = async () => {
            if (wallet.publicKey) {
                try {
                    const balance = await connection.getBalance(wallet.publicKey);
                    setBalance(balance / LAMPORTS_PER_SOL);
                } catch (error) {
                    console.error("Failed to fetch balance:", error);
                    setBalance(null);
                }
            }
            setLoading(false);
        };

        getBalance();
    }, [wallet.publicKey, connection]);

    return (
        <div className="balance-container p-4 bg-white shadow rounded-lg max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">SOL Balance</h2>
            {loading ? (
                <p>Loading balance...</p>
            ) : balance !== null ? (
                <p className="text-xl font-bold">{balance} SOL</p>
            ) : (
                <p>Unable to fetch balance</p>
            )}
        </div>
    );
}

export default ShowSolBalance;