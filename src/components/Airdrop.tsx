import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

const Airdrop = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validateInput = () => {
        if (!wallet.publicKey) {
            setError("Wallet not connected.");
            return false;
        }
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            setError("Please enter a valid amount.");
            return false;
        }
        setError('');
        return true;
    };

    const sendAirdropToUser = async () => {
        if (!validateInput()) return;

        setLoading(true);
        try {
            await connection.requestAirdrop(wallet.publicKey as any, Number(amount) * 100000000);
            setSuccess("Airdrop successful!");
        } catch (error: any) {
            setError(`Airdrop failed with Error: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="airdrop-container p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">Solana Airdrop</h2>
            <div className="form-group mb-3">
                <label htmlFor="amount" className="block mb-1">Amount (SOL):</label>
                <input
                    id="amount"
                    type="text"
                    className="input-field w-full p-2 border rounded"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={loading}
                />
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>}
            <button
                onClick={sendAirdropToUser}
                disabled={loading}
                className="submit-button bg-blue-600 text-white p-2 rounded w-full">
                {loading ? 'Processing...' : 'Send Airdrop'}
            </button>
        </div>
    );
};

export default Airdrop;
