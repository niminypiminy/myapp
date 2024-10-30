import React, { useState } from 'react';

const TwoFactorAuth = ({ user }) => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(user.twoFactorEnabled || false); // Assume user object has this property
  const [codeSent, setCodeSent] = useState(false);
  const [message, setMessage] = useState('');

  const handleToggle2FA = async () => {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      setMessage('No authentication token found. Please log in again.');
      return;
    }

    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:8kzD815Z/auth/toggle-2fa', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ enabled: !is2FAEnabled }),
      });

      if (!response.ok) {
        throw new Error('Failed to update 2FA setting');
      }

      setIs2FAEnabled(!is2FAEnabled);
      setMessage(`Two-Factor Authentication ${is2FAEnabled ? 'disabled' : 'enabled'} successfully!`);
    } catch (error) {
      console.error('Error toggling 2FA:', error);
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  const handleSendCode = async () => {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      setMessage('No authentication token found. Please log in again.');
      return;
    }

    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:8kzD815Z/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to send verification code');
      }

      setCodeSent(true);
      setMessage('Verification code sent to your email!');
    } catch (error) {
      console.error('Error sending code:', error);
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold">Two-Factor Authentication</h3>
      <div className="flex items-center mt-2">
        <span className="mr-2">{is2FAEnabled ? 'Enabled' : 'Disabled'}</span>
        <button onClick={handleToggle2FA} className="bg-gray-800 text-white p-2 rounded">
          {is2FAEnabled ? 'Disable' : 'Enable'} 2FA
        </button>
        {is2FAEnabled && !codeSent && (
          <button onClick={handleSendCode} className="ml-4 bg-blue-500 text-white p-2 rounded">
            Send Verification Code
          </button>
        )}
      </div>
      {message && <p className={message.includes('success') ? 'text-green-500' : 'text-red-500'}>{message}</p>}
    </div>
  );
};

export default TwoFactorAuth;