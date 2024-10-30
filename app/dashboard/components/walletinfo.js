import React from 'react';
import { FaBitcoin } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';
import { GiGoldBar } from 'react-icons/gi';

const WalletInfo = React.memo(({ type, balance, created, onCreate, onReceive, onSend, onImport }) => {
  const icons = {
    usdt: <BiDollar className="text-4xl text-green-400 mr-3" />,
    btc: <FaBitcoin className="text-4xl text-orange-500 mr-3" />,
    xaut: <GiGoldBar className="text-4xl text-yellow-400 mr-3" />,
    sol: <img src="/images/solana.svg" alt="Solana" className="text-4xl mr-3" />, // Reference from public folder
  };

  return (
    <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {icons[type]}
          <div>
            <div className="text-2xl font-bold">
              {type.toUpperCase()} {created ? balance.toFixed(2) : ''}
            </div>
          </div>
        </div>
        {created ? (
          <div className="flex space-x-2">
            <button onClick={onSend} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">Send</button>
            <button onClick={onReceive} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">Receive</button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button onClick={() => onCreate(type)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">Create Wallet</button>
            <button onClick={() => onImport(type)} className="bg-purple-500 text-white font-bold py-2 px-4 rounded-full">Import Wallet</button>
          </div>
        )}
      </div>
    </div>
  );
});

export default WalletInfo;