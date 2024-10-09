import React, { useState } from 'react';
import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

const SignMessage: React.FC = () => {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [signature, setSignature] = useState<string | null>(null);

    async function signMessageOnClick() {
        setError(null);
        setSignature(null);

        try {
            if (!publicKey) throw new Error('Wallet not connected!');
            if (!signMessage) throw new Error('Wallet does not support message signing!');

            const encodedMessage = new TextEncoder().encode(message);
            const signatureBytes = await signMessage(encodedMessage);

            if (!ed25519.verify(signatureBytes, encodedMessage, publicKey.toBytes())) {
                throw new Error('Message signature invalid!');
            }

            const signatureString = bs58.encode(signatureBytes);
            setSignature(signatureString);
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <div className="balance-container p-4 bg-white shadow rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Sign a Message</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="p-2 border rounded w-full"
                />
            </div>
            <button
                onClick={signMessageOnClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                disabled={!message}
            >
                Sign Message
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            {signature && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                    <p className="text-green-600 font-bold">Message signed successfully!</p>
                    <p className="text-gray-700 overflow-auto">
                        <span className="font-semibold">Signature:</span> {signature}
                    </p>
                </div>
            )}
        </div>
    );
};

export default SignMessage;