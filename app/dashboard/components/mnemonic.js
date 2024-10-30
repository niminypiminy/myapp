import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MnemonicModal = ({ isOpen, onRequestClose, mnemonic, onContinue }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      toast.success('Mnemonic copied to clipboard!');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy mnemonic.');
    }
  };

  const mnemonicWords = mnemonic.split(' ');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Mnemonic"
      className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg w-11/12 sm:w-1/3"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h4 className="text-xl font-bold mb-4 text-center">Wallet Keys</h4>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Please write down your seed phrase in the correct order, and store it safely. 
      </p>
      <div className="flex flex-wrap justify-center mb-4">
        {mnemonicWords.map((word, index) => (
          <span key={index} className="bg-blue-600 text-white px-3 py-1 m-1 rounded-full">
            {index + 1}. {word}
          </span>
        ))}
      </div>
      <div className="flex space-x-4">
        <button 
          onClick={handleCopy} 
          className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${isCopied ? 'bg-green-500' : ''}`}
        >
          {isCopied ? 'Copied!' : 'Copy'}
          <svg className="h-5 w-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14h4v4h-4zm0-6h4v4h-4zm-5 2v9h14V8H5z" />
          </svg>
        </button>
        <button
          onClick={onContinue}
          className="flex items-center px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
        >
          <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6m2-4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
          </svg>
          Continue
        </button>
      </div>
    </Modal>
  );
};

export default MnemonicModal;