"use client";

import React from 'react';

const DashboardImage = () => {
  return (
    <div className="flex justify-center mt-10">
      <img 
        src="/images/balance.png" 
        alt="Dashboard" 
        className="h-auto w-2/3 object-cover rounded-lg shadow-lg"
      />
    </div>
  );
};

export default DashboardImage;