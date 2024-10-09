import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

function SendTokens() {
    const wallet = useWallet();
    const { connection } = useConnection();

    const [toAddress, setToAddress] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    const validateInputs = (): boolean => {
        if (!toAddress || !PublicKey.isOnCurve(new PublicKey(toAddress))) {
            setMessage("Please enter a valid recipient address.");
            return false;
        }
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            setMessage("Please enter a valid amount.");
            return false;
        }
        setMessage(null);
        return true;
    };

    const sendTokens = async () => {
        if (!validateInputs()) return;

        setLoading(true);
        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey!,
                    toPubkey: new PublicKey(toAddress),
                    lamports: Number(amount) * LAMPORTS_PER_SOL,
                })
            );

            await wallet.sendTransaction(transaction, connection);
            setMessage(`Successfully sent ${amount} SOL to ${toAddress}`);
        } catch (error) {
            console.log(error);
            setMessage("Transaction failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="send-tokens-container p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">Send SOL Tokens</h2>

            <div className="form-group mb-3">
                <label htmlFor="toAddress" className="block mb-1">Recipient Address:</label>
                <input
                    id="toAddress"
                    type="text"
                    className="input-field w-full p-2 border rounded"
                    placeholder="Enter recipient address"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    disabled={loading}
                />
            </div>

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

            {message && (
                <p className={`message ${message.includes('failed') ? 'text-red-500' : 'text-green-500'} mb-4`}>
                    {message}
                </p>
            )}

            <button
                onClick={sendTokens}
                disabled={loading || !wallet.connected}
                className="submit-button bg-blue-600 text-white p-2 rounded w-full"
            >
                {loading ? 'Sending...' : 'Send Tokens'}
            </button>
        </div>
    );
}

export default SendTokens;