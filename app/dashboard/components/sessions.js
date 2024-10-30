"use client";

import React, { useState } from 'react';

const SessionManagement = () => {
  const [sessions, setSessions] = useState([
    { id: 1, ip: '192.168.1.1', timestamp: '2023-10-22T10:00:00Z', lastActive: '2 hours ago', isCurrent: true },
    { id: 2, ip: '192.168.1.2', timestamp: '2023-10-21T08:00:00Z', lastActive: '1 day ago' },
    { id: 3, ip: '192.168.1.3', timestamp: '2023-10-20T12:00:00Z', lastActive: '3 days ago' },
  ]);
  const [isConfirming, setIsConfirming] = useState(null);

  const handleLogout = (id) => {
    setSessions(sessions.filter(session => session.id !== id));
    console.log(`Logged out from session ${id}`);
  };

  const handleRevokeAll = () => {
    setSessions([]);
    console.log('All sessions have been revoked.');
  };

  const confirmAction = (id, action) => {
    setIsConfirming({ id, action });
  };

  const executeAction = () => {
    if (isConfirming.action === 'logout') {
      handleLogout(isConfirming.id);
    } else if (isConfirming.action === 'revokeAll') {
      handleRevokeAll();
    }
    setIsConfirming(null);
  };

  return (
    <div className="flex justify-center mt-24">
      <div className="p-6 rounded-lg shadow-lg bg-white md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Session Management</h2>
          <button 
            onClick={() => confirmAction(null, 'revokeAll')} 
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200 ease-in-out"
          >
            Revoke All
          </button>
        </div>
        <div className="space-y-4">
          {sessions.length > 0 ? (
            sessions.map(session => (
              <div key={session.id} className={`flex justify-between items-center p-4 rounded-md ${session.isCurrent ? 'bg-blue-50' : 'bg-gray-50'} border-b border-gray-200 last:border-b-0 transition-all duration-200 ease-in-out`}>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-900">IP: {session.ip}</p>
                  <p className="text-xs text-gray-500">Last Active: {session.lastActive}</p>
                  <p className="text-xs text-gray-500">{new Date(session.timestamp).toLocaleString()}</p>
                </div>
                {session.isCurrent && <span className="text-xs text-blue-800">Current</span>}
                <button 
                  onClick={() => confirmAction(session.id, 'logout')} 
                  className="bg-gray-800 text-white px-3 py-1 text-xs rounded hover:bg-blue-700 transition-colors duration-200 ease-in-out transform active:scale-95"
                  aria-label={`Logout from session ${session.id}`}
                >
                  Logout
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No active sessions.</p>
          )}
        </div>
      </div>

      {isConfirming && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-gray-700 mb-4">Are you sure?</p>
            <div className="flex justify-end">
              <button onClick={executeAction} className="bg-red-600 text-white px-4 py-2 mr-2 rounded hover:bg-red-700">Yes</button>
              <button onClick={() => setIsConfirming(null)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionManagement;