import React, { useEffect, useState, useCallback } from 'react'; 
import CreateWalletModal from './createwallet';
import { toast } from 'react-toastify';
import WalletQRComponent from './receive';
import SendModal from './send';
import ImportWalletModal from './importwallet';
import WalletInfo from './walletinfo';

const ensureNumber = (value, defaultValue = 0) => isNaN(Number(value)) ? defaultValue : Number(value);

const WalletBalance = React.memo(({ user }) => {
  const [wallets, setWallets] = useState({
    usdt: { balance: 0, created: false },
    btc: { balance: 0, created: false },
    xaut: { balance: 0, created: false }, 
  });
  
  // Modal states
  const [isCreateWalletOpen, setIsCreateWalletOpen] = useState(false);
  const [walletType, setWalletType] = useState(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrWalletAddress, setQRWalletAddress] = useState('');
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isImportWalletOpen, setIsImportWalletOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const updatedWallets = {
        usdt: { balance: ensureNumber(user.usdt, 0), created: !!user.usdt },
        btc: { balance: ensureNumber(user.address ? 1.5 : 0), created: !!user.address },
        xaut: { balance: ensureNumber(user.xaut, 0), created: !!user.xaut },
      };
      setWallets(updatedWallets);
      localStorage.setItem('wallets', JSON.stringify(updatedWallets));
    }
  }, [user]);

  const createWallet = useCallback((type) => {
    if (wallets[type].created) return;
    setIsCreateWalletOpen(true);
    setWalletType(type);
  }, [wallets]);

  const handleWalletCreated = useCallback((type) => {
    const newWallet = { created: true, balance: 0 };
    setWallets(prevWallets => ({ ...prevWallets, [type]: newWallet }));
    localStorage.setItem('wallets', JSON.stringify({ ...wallets, [type]: newWallet }));
    toast.success(`${type.toUpperCase()} wallet created successfully!`);
    setIsCreateWalletOpen(false);
  }, [wallets]);

  const openQRModal = (type) => {
    let address = '';
    switch (type) {
      case 'usdt': address = user.usdt; break;
      case 'btc': address = user.address; break;
      case 'xaut': address = user.xaut; break;
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
    (wallets.xaut.created ? ensureNumber(wallets.xaut.balance, 0) * 2700 : 0); 

  const handleSend = (address) => {
    setIsSendModalOpen(false); // Close the modal after sending
  };

  const handleWalletImported = (type, walletData) => {
    setWallets(prevWallets => ({
      ...prevWallets,
      [type]: walletData,
    }));
    localStorage.setItem('wallets', JSON.stringify({ ...wallets, [type]: walletData }));
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
        {['usdt', 'btc', 'xaut'].map(type => (
          <WalletInfo
            key={type}
            type={type}
            balance={ensureNumber(wallets[type].balance)}
            created={wallets[type].created}
            onCreate={createWallet}
            onReceive={() => openQRModal(type)}
            onSend={() => {
              setWalletType(type); 
              setIsSendModalOpen(true); 
            }}
            onImport={() => setIsImportWalletOpen(true)} 
          />
        ))}
      </div>

      <CreateWalletModal
        isOpen={isCreateWalletOpen}
        onRequestClose={() => setIsCreateWalletOpen(false)}
        onWalletCreated={handleWalletCreated}
        walletType={walletType}
      />

      <ImportWalletModal
        isOpen={isImportWalletOpen}
        onRequestClose={() => setIsImportWalletOpen(false)}
        onWalletImported={handleWalletImported}
      />
      
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

      <SendModal 
        isOpen={isSendModalOpen} 
        onRequestClose={() => setIsSendModalOpen(false)} 
        onSend={handleSend} 
        walletType={walletType} 
      />
    </div>
  );
});

export default WalletBalance;