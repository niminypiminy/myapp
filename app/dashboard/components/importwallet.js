import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ImportWalletModal = ({ isOpen, onRequestClose, onWalletImported }) => {
  const [inputValue, setInputValue] = useState('');

  const handleImport = () => {
    // Your wallet import logic
    if (inputValue) {
      const walletType = 'btc'; // Determine the wallet type from the input
      // You might want to extract and set the balance here based on the imported wallet
      onWalletImported(walletType, { created: true, balance: 0 }); // Update the wallet state with the imported data
      toast.success('Wallet imported successfully!');
      onRequestClose();
    } else {
      toast.error('Please enter a valid seed phrase or private key.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-bold">Import Wallet</h2>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your seed phrase or private key"
          className="border p-2 w-full"
        />
        <div className="mt-4">
          <button onClick={handleImport} className="bg-blue-500 text-white py-2 px-4 rounded">Import</button>
          <button onClick={onRequestClose} className="bg-gray-300 py-2 px-4 rounded ml-2">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ImportWalletModal;