import React, { useState } from 'react';

const SendModal = ({ isOpen, onRequestClose, onSend, walletType }) => {
  const [sendAddress, setSendAddress] = useState('');

  if (!isOpen) return null; // Don't render if the modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg"> 
        <h2 className="text-lg font-bold mb-4">Send {walletType.toUpperCase()}</h2> {/* Updated title */}
        <input 
          type="text"
          placeholder="Enter the address here"
          value={sendAddress}
          onChange={(e) => setSendAddress(e.target.value)}
          className="border rounded w-full p-2 mb-4 text-black" 
        />
        <div className="flex justify-end">   
          <button 
            onClick={onRequestClose} 
            className="bg-gray-100 text-black font-bold py-2 px-4 rounded-full mr-2">
            Cancel
          </button>
          <button 
            onClick={() => {
              onSend(sendAddress);
              setSendAddress(''); // Clear the input field after sending
              onRequestClose(); // Close the modal
            }}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
            Confirm
          </button>
        </div>
        <p className="text-gray-300 mt-4">*Please ensure the accuracy of the address before sending.</p>
      </div>
    </div>
  );
};

export default SendModal;