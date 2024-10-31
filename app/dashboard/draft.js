import React, { useState, useEffect, useCallback } from 'react';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { payments } from 'bitcoinjs-lib';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { Keypair } from '@solana/web3.js';
import MnemonicModal from './mnemonic';
import { toast } from 'react-toastify';

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
      if (walletType === 'btc') {
        const seed = mnemonicToSeedSync(mnemonic);
        const root = bip32.fromSeed(seed);
        const keyPair = root.derivePath("m/44'/0'/0'/0/0");
        const { address } = payments.p2pkh({ pubkey: keyPair.publicKey });
        walletDetails = { walletType: 'btc', mnemonic, address };
        endpoint = 'auth/create-btc';
      } else if (walletType === 'usdt' || walletType === 'sol') {
        const solanaKeypair = Keypair.generate();
        const publicKey = solanaKeypair.publicKey.toString();
        walletDetails = {
          walletType,
          mnemonic,
          [walletType === 'usdt' ? 'usdt' : 'sol']: publicKey,
        };
        endpoint = `auth/create-${walletType}`;
      }

      const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:8kzD815Z/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(walletDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to create wallet');
      }

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
    createWalletAPI(); // Call the API here after user clicks continue
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