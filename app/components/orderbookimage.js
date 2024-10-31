"use client";

import React from 'react';

const OrderBookImage = () => {
  return (
    <div className="flex justify-center mt-10">
      <img 
        src="/images/orderbook.png" 
        alt="Dashboard" 
        className="h-auto w-2/3 object-cover rounded-lg shadow-lg"
      />
    </div>
  );
};

export default OrderBookImage;