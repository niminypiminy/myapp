require("buffer");


import React, { useState, useEffect, useCallback } from 'react';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { payments } from 'bitcoinjs-lib';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import MnemonicModal from './mnemonic';
import { toast } from 'react-toastify';
import { TonClient, WalletContractV4 } from '@ton/ton';
import { mnemonicToPrivateKey, mnemonicNew } from '@ton/crypto'; 

console.log('Available functions in @ton/crypto:', { mnemonicToPrivateKey, mnemonicNew });
const bip32 = BIP32Factory(ecc);

const CreateWalletModal = ({ isOpen, onRequestClose, onWalletCreated, walletType }) => {
  const [mnemonic, setMnemonic] = useState('');
  const [isMnemonicModalOpen, setIsMnemonicModalOpen] = useState(false);
  const [isWalletCreated, setIsWalletCreated] = useState(false);

  const handleCreateWallet = useCallback(() => {
    const generatedMnemonic = generateMnemonic(256);
    setMnemonic(generatedMnemonic);
    setIsMnemonicModalOpen(true);
  }, []);

  const createWalletAPI = useCallback(async () => {
    const authToken = localStorage.getItem('token');
    let walletDetails;
    let endpoint = '';
  
    try {
      console.log('Creating wallet of type:', walletType);
  
      if (walletType === 'btc') {
        const seed = mnemonicToSeedSync(mnemonic);
        const root = bip32.fromSeed(seed);
        const keyPair = root.derivePath("m/44'/0'/0'/0/0");
        const { address } = payments.p2pkh({ pubkey: keyPair.publicKey });
        walletDetails = { walletType: 'btc', mnemonic, address };
        endpoint = 'auth/create-btc';
        console.log('Bitcoin wallet details:', walletDetails);
      } else if (walletType === 'usdt' || walletType === 'xaut') {
        // Create Ton Client
        const client = new TonClient({
          endpoint: 'https://toncenter.com/api/v2/jsonRPC',
        });
  
        // Generate mnemonic
        const mnemonics = await mnemonicNew(); 
        const keyPair = await mnemonicToPrivateKey(mnemonics);
  
        // Create wallet contract
        const workchain = 0; // Default workchain  (this may not be correct. e instead of u?)
        const wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
        const contract = client.open(wallet);
  
        // Get the wallet address
        const walletAddress = wallet.address.toString();
  
        walletDetails = {
          walletType,
          mnemonic: mnemonics.join(' '), // Stored the mnemonic as a string
          [walletType]: walletAddress, // Include the generated wallet address
        };
        endpoint = `auth/create-${walletType}`;
        console.log(`${walletType.toUpperCase()} wallet details:`, walletDetails);
      } else {
        console.error('Unsupported wallet type:', walletType);
        return; // Exit if wallet type is unsupported
      }
  
      console.log('Endpoint:', endpoint);
  
      const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:8kzD815Z/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(walletDetails),
      });
  
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json(); // Log error for debugging
        console.error('Error response:', errorData);
        throw new Error('Failed to create wallet');
      }
  
      const responseData = await response.json(); // Parse the response
      console.log('Success response:', responseData);
  
      // Handle success
      onWalletCreated(walletType);
      setIsWalletCreated(true);
      toast.success(`${walletType.toUpperCase()} wallet created successfully!`);
    } catch (error) {
      console.error('Error creating wallet:', error);
      toast.error('An error occurred while creating the wallet.');
    }
  }, [walletType, mnemonic, onWalletCreated]);
  const handleContinue = useCallback(() => {
    setIsMnemonicModalOpen(false);
    createWalletAPI(); 
    onRequestClose();
  }, [createWalletAPI, onRequestClose]);

  useEffect(() => {
    if (isOpen && !isWalletCreated) {
      handleCreateWallet(); // Generate mnemonic when modal opens
    }
  }, [isOpen, isWalletCreated, handleCreateWallet]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {isWalletCreated ? (
          <div>Your wallet has been created!</div>
        ) : (
          <MnemonicModal
            isOpen={isMnemonicModalOpen}
            onRequestClose={() => {
              setIsMnemonicModalOpen(false);
              onRequestClose();
            }}
            mnemonic={mnemonic}
            onContinue={handleContinue} // Pass handleContinue to MnemonicModal
          />
        )}
        {!isWalletCreated && !isMnemonicModalOpen && <div>Creating your wallet...</div>}
        <button onClick={onRequestClose}>Close</button>
      </div>
    </div>
  );
};

export default CreateWalletModal;