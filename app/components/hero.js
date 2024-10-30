"use client";

import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-white text-gray-800 py-28 relative mt-10">
      <div className="w-2/3 mx-auto px-8">
        <div className="flex flex-col items-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 mt-16 text-center leading-tight">
            Empower Your <span className="bg-blue-100 text-blue-900 py-1 px-2 rounded inline-block">Assets</span>: Borrow and Lend with Confidence.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 text-center px-24 mb-10 mt-6">
            Unlock borrowing and lending with Bitcoin collateral, safeguarded by trustless smart contracts for your peace of mind.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;