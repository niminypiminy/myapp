"use client";

import React, { useState } from 'react';

const BorrowForm = () => {
  const points = [
    { label: '1m', value: 1 },
    { label: '3m', value: 3 },
    { label: '6m', value: 6 },
    { label: '1y', value: 12 },
  ];

  const [borrowAmount, setBorrowAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [position, setPosition] = useState(0); // Track the slider position
  const [showTooltip, setShowTooltip] = useState(false); // State for tooltip visibility

  const handleBorrowSubmit = (e) => {
    e.preventDefault();
    const durationInMonths = points[position].value; // Get the selected duration
    console.log({ 
      borrowAmount, 
      interestRate, 
      borrowDuration: durationInMonths 
    });
    // Function Logic here
  };

  const handleMouseDown = (e) => {
    const slider = e.target.closest('.slider');
    const rect = slider.getBoundingClientRect();

    const updatePosition = (clientX) => {
      const offsetX = clientX - rect.left;
      const newPosition = Math.round((offsetX / rect.width) * (points.length - 1));
      setPosition(Math.max(0, Math.min(newPosition, points.length - 1)));
    };

    updatePosition(e.clientX);

    const handleMouseMove = (e) => updatePosition(e.clientX);
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <form onSubmit={handleBorrowSubmit} className="text-white bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
      <div className="flex flex-col">
        <label htmlFor="borrowAmount" className="mb-2 font-medium">Amount to Borrow</label>
        <input 
          id="borrowAmount" 
          type="number"
          value={borrowAmount} 
          onChange={(e) => setBorrowAmount(e.target.value)} 
          className="mt-1 p-2 w-full rounded-md bg-gray-700 border border-gray-600 text-white"
          placeholder="Enter amount in Dollars"
          step="0.00000001"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-medium flex items-center">
          Interest Rate (%) 
          <span 
            className="ml-1 cursor-pointer relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-5 h-5 text-blue-400 rounded-full bg-gray-700 p-1" 
              viewBox="0 0 24 24"
            >
              <path 
                fill="currentColor" 
                d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-7a1.5 1.5 0 0 1 1.5 1.5v1.5h-3v-1a1.5 1.5 0 0 1 1.5-1.5z"
              />
            </svg>
            {showTooltip && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-gray-700 text-white text-sm rounded p-2 shadow-lg">
                This is the maximum interest rate you're willing to accept over the specified duration.
              </div>
            )}
          </span>
        </label>
        <input 
          id="interestRate" 
          type="number" 
          value={interestRate} 
          onChange={(e) => setInterestRate(e.target.value)} 
          className="mt-1 p-2 w-full rounded-md bg-gray-700 border border-gray-600 text-white"
          placeholder="e.g., 4"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-medium">Duration</label>
        <div className="relative w-full h-10">
          <div
            className="slider h-2 bg-gray-300 rounded-full cursor-pointer"
            onMouseDown={handleMouseDown}
          >
            <div
              className="thumb absolute w-4 h-4 bg-blue-500 rounded-full cursor-pointer"
              style={{ left: `${(position / (points.length - 1)) * 100}%`, transform: 'translateX(-50%)' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {points.map((point, index) => (
              <span key={index} className={`text-sm ${index === position ? 'font-bold' : ''}`}>
                {point.label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button 
        type="submit" 
        className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Borrow
      </button>
    </form>
  );
};

export default BorrowForm;