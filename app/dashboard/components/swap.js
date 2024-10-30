import React, { useState, useEffect } from 'react';
import { FaBtc, FaDollarSign } from 'react-icons/fa';

const Transactions = () => {
  const [activeAction, setActiveAction] = useState('send');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [currency, setCurrency] = useState('btc');
  const [swapDirection, setSwapDirection] = useState('btc-to-usdc');

  // Example addresses. In a real app, these would be dynamically set or fetched.
  const btcAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
  const usdcAddress = '0x1234567890abcdef1234567890abcdef123456';

  useEffect(() => {
    // Simulate getting live rates. This would ideally be an API call.
    const fakeRate = { btcToUsdc: 30000, usdcToBtc: 1 / 30000 }; // Example rates
    // Here you would set the state with real exchange rates
  }, []);

  const handleAction = () => {
    if (activeAction === 'send') {
      console.log(`Sending ${amount} ${currency} to ${address}`);
    } else if (activeAction === 'swap') {
      console.log(`Swapping ${amount} ${swapDirection}`);
    }
  };

  const SendForm = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center">
        <FaBtc className="mr-2" /> Send
      </h3>
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => setCurrency('btc')} 
          className={`px-4 py-2 rounded-lg ${currency === 'btc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>BTC</button>
        <button 
          onClick={() => setCurrency('usdc')} 
          className={`px-4 py-2 rounded-lg ${currency === 'usdc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>USDC</button>
      </div>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Amount"
        className="w-full p-2 border rounded"
      />
      <input 
        type="text" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        placeholder="Destination Address"
        className="w-full p-2 border rounded"
      />
    </div>
  );

  const ReceiveForm = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <FaBtc className="mr-2" /> Receive
        </h3>
        <div className="flex flex-col space-y-4">
          <div>
            <p>BTC Address:</p>
            <div className="flex items-center">
              <span className="font-medium">{btcAddress}</span>
            </div>
          </div>
          <div>
            <p>USDC Address:</p>
            <div className="flex items-center">
              <span className="font-medium">{usdcAddress}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SwapForm = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center">
        <FaBtc className="mr-2" /> Swap
      </h3>
      <select 
        value={swapDirection} 
        onChange={(e) => setSwapDirection(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="btc-to-usdc">BTC to USDC</option>
        <option value="usdc-to-btc">USDC to BTC</option>
      </select>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Amount"
        className="w-full p-2 border rounded"
      />
    </div>
  );

  const ActionForm = ({ action }) => {
    switch(action) {
      case 'send':
        return <SendForm />;
      case 'receive':
        return <ReceiveForm />;
      case 'swap':
        return <SwapForm />;
      default:
        return <div>Unknown action</div>;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Transactions</h2>
      <div className="flex justify-around mb-6">
        {['send', 'receive', 'swap'].map(action => (
          <button
            key={action}
            onClick={() => setActiveAction(action)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 
            ${activeAction === action ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </button>
        ))}
      </div>

      <ActionForm action={activeAction} />

      {activeAction !== 'receive' && (
        <button 
          onClick={handleAction} 
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
          {activeAction === 'swap' ? 'Swap Now' : 'Send'}
        </button>
      )}
    </div>
  );
};

export default Transactions;