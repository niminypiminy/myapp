"use client";

import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, data, isLend }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">{isLend ? "Confirm Lending Terms" : "Confirm Borrowing Terms"}</h2>
        <div className="mb-4">
          <p><strong>Amount:</strong> ${isLend ? data.lendAmount : data.borrowAmount}</p>
          <p><strong>Interest Rate:</strong> {isLend ? data.interestRate : data.borrowInterestRate}%</p>
          <p><strong>Duration:</strong> {isLend ? data.lendDuration : data.borrowDuration} months</p>
        </div>
        <div className="flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;