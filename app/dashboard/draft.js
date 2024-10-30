import React, { useEffect, useState, useCallback } from 'react';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';
import { GiGoldBar } from 'react-icons/gi';
import CreateWalletModal from './createwallet';
import { toast } from 'react-toastify';
import WalletQRComponent from './receive';
import SendModal from './send'; // Adjust the path if needed

const ensureNumber = (value, defaultValue = 0) => isNaN(Number(value)) ? defaultValue : Number(value);

const WalletBalance = React.memo(({ user }) => {
  console.log('WalletBalance component render');

  const [wallets, setWallets] = useState({
    usdt: { balance: 0, created: false },
    btc: { balance: 0, created: false },
    xaut: { balance: 0, created: false },
    sol: { balance: 0, created: false },
  });
  const [isCreateWalletOpen, setIsCreateWalletOpen] = useState(false);
  const [walletType, setWalletType] = useState(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false); // QR modal state
  const [qrWalletAddress, setQRWalletAddress] = useState(''); // QR wallet address state
  const [isSendModalOpen, setIsSendModalOpen] = useState(false); // Send modal state

  useEffect(() => {
    console.log('useEffect running for user data');
    if (user) {
      const updatedWallets = {
        usdt: { balance: ensureNumber(user.usdt, 0), created: !!user.usdt },
        btc: { balance: ensureNumber(user.address ? 1.5 : 0), created: !!user.address },
        xaut: { balance: 0, created: false },
        sol: { balance: ensureNumber(user.sol, 0), created: !!user.sol },
      };
      setWallets(updatedWallets);
      localStorage.setItem('wallets', JSON.stringify(updatedWallets));
      console.log('Wallets updated:', updatedWallets);
    }
  }, [user]);

  const createWallet = useCallback((type) => {
    console.log('Create wallet for type:', type);
    if (wallets[type].created) return;
    setIsCreateWalletOpen(true);
    setWalletType(type);
  }, [wallets]);

  const handleWalletCreated = useCallback((type) => {
    console.log('Wallet created for type:', type);
    const newWallet = { created: true, balance: 0 };
    setWallets(prevWallets => ({
      ...prevWallets,
      [type]: newWallet
    }));
    localStorage.setItem('wallets', JSON.stringify({ ...wallets, [type]: newWallet }));
    toast.success(`${type.toUpperCase()} wallet created successfully!`);
    setIsCreateWalletOpen(false);
  }, [wallets]);

  const openQRModal = (type) => {
    let address = '';
    switch (type) {
      case 'usdt': address = user.usdt; break;
      case 'btc': address = user.address; break;
      case 'sol': address = user.sol; break;
      default: address = '';
    }
    
    if (address) {
      setQRWalletAddress(address);
      setIsQRModalOpen(true);
    } else {
      toast.error(`No ${type.toUpperCase()} address found.`);
    }
  };

  const totalBalance = ensureNumber(wallets.usdt.balance) +
    (wallets.btc.created ? ensureNumber(wallets.btc.balance, 0) * 68200 : 0) +
    (wallets.sol.created ? ensureNumber(wallets.sol.balance, 0) : 0);

  const handleSend = (address) => {
    console.log(`Sending to: ${address}`);
    // Add your logic to handle sending cryptocurrency here
    setIsSendModalOpen(false); // Close the modal after sending
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-8 p-4 sm:p-6 lg:p-8">
      <div className="text-right mb-4">
        <div className="text-4xl text-left">
          <span className="font-bold">{totalBalance}</span>
        </div>
        <div className="text-sm text-left">BTC Current Market Price: $68200</div>
      </div>

      <div className="space-y-4">
        {['usdt', 'btc', 'xaut', 'sol'].map(type => (
          <WalletInfo
            key={type}
            type={type}
            balance={ensureNumber(wallets[type].balance)}
            created={wallets[type].created}
            onCreate={createWallet}
            onReceive={() => openQRModal(type)}
            onSend={() => setIsSendModalOpen(true)} // Open send modal
          />
        ))}
      </div>

      <CreateWalletModal
        isOpen={isCreateWalletOpen}
        onRequestClose={() => {
          setIsCreateWalletOpen(false);
          console.log('Modal closed');
        }}
        onWalletCreated={handleWalletCreated}
        walletType={walletType}
      />
      
      {/* QR Code Modal */}
      {isQRModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <WalletQRComponent 
              walletAddress={qrWalletAddress} 
              onClose={() => setIsQRModalOpen(false)} 
            />
          </div>
        </div>
      )}

      {/* Send Modal */}
      <SendModal 
        isOpen={isSendModalOpen} 
        onRequestClose={() => setIsSendModalOpen(false)} 
        onSend={handleSend} 
      />
    </div>
  );
});

const WalletInfo = React.memo(({ type, balance, created, onCreate, onReceive, onSend }) => {
  const icons = {
    usdt: <BiDollar className="text-4xl text-green-400 mr-3" />,
    btc: <FaBitcoin className="text-4xl text-orange-500 mr-3" />,
    xaut: <GiGoldBar className="text-4xl text-yellow-400 mr-3" />,
    sol: <FaEthereum className="text-4xl text-green-400 mr-3" />,
  };

  return (
    <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {icons[type]}
          <div>
            <div className="text-2xl font-bold">{type.toUpperCase()} {created ? ensureNumber(balance).toFixed(2) : ''}</div>
          </div>
        </div>
        {created ? (
          <div className="flex space-x-2">
            <button 
              onClick={onSend} 
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">Send</button>
            <button onClick={onReceive} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">Receive</button>
          </div>
        ) : (
          <button 
            onClick={() => onCreate(type)} 
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
            Create Wallet
          </button>
        )}
      </div>
    </div>
  );
});

export default WalletBalance;