import React from 'react';
import QRCode from 'react-qr-code';

const WalletQRComponent = ({ walletAddress, onClose }) => {
  console.log("WalletQRComponent render");
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      alert('Wallet address copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-4">Scan Your Wallet QR Code</h3>
      <div style={{ background: 'white', padding: '16px' }}>
        <QRCode size={128} value={walletAddress} />
      </div>
      <p className="mt-4 font-bold text-gray-800">{walletAddress}</p>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600 transition"
        >
          Copy your address
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WalletQRComponent;