import React, { useState } from 'react';

const SecuritySettings = ({ user, updateUser }) => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState(user.name || ''); // Initialize with user name
  const [message, setMessage] = useState('');

  const handleToggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      setMessage('No authentication token found. Please log in again.');
      return;
    }

    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:8kzD815Z/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          setMessage('Your session has expired or is invalid. Please log in again.');
        } else {
          throw new Error(errorData.message || 'Failed to change password');
        }
      } else {
        setMessage('Password changed successfully!');
        setPassword(''); // Clear the password field
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage(`An error occurred when attempting to change your password: ${error.message}`);
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      setMessage('No authentication token found. Please log in again.');
      return;
    }

    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:8kzD815Z/auth/change-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          setMessage('Your session has expired or is invalid. Please log in again.');
        } else {
          throw new Error(errorData.message || 'Failed to change email');
        }
      } else {
        setMessage('Email changed successfully!');
        updateUser({ ...user, email }); // Update user state in Dashboard
        setEmail(''); // Clear the email field
      }
    } catch (error) {
      console.error('Error changing email:', error);
      setMessage(`An error occurred when attempting to change your email: ${error.message}`);
    }
  };

  const handleSubmitName = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      setMessage('No authentication token found. Please log in again.');
      return;
    }

    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:8kzD815Z/auth/change-name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          setMessage('Your session has expired or is invalid. Please log in again.');
        } else {
          throw new Error(errorData.message || 'Failed to change name');
        }
      } else {
        setMessage('Name changed successfully!');
        updateUser({ ...user, name }); // Update user state in Dashboard
        setName(''); // Clear the name field
      }
    } catch (error) {
      console.error('Error changing name:', error);
      setMessage(`An error occurred when attempting to change your name: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center mt-24 min-h-screen">
      <div className="p-6 w-1/3">
        <div className="mb-6">
          <h3 className="font-semibold">Two-Factor Authentication</h3>
          <p>Enable or disable two-factor authentication.</p>
          <div className="flex items-center mt-2">
            <span className="mr-2">{is2FAEnabled ? 'Enabled' : 'Disabled'}</span>
            <button
              onClick={handleToggle2FA}
              className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors duration-200 ${
                is2FAEnabled ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 transform ${
                  is2FAEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold">Name</h3>
          <form onSubmit={handleSubmitName}>
            <input
              type="text"
              placeholder="New Name"
              value={name}
              onChange={handleNameChange}
              className="border rounded-md p-2 w-full"
              required
            />
            <button type="submit" className="mt-2 bg-gray-800 text-white p-2 rounded">
              Update Name
            </button>
          </form>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold">Password</h3>
          <form onSubmit={handleSubmitPassword}>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={handlePasswordChange}
              className="border rounded-md p-2 w-full"
              required
            />
            <button type="submit" className="mt-2 bg-gray-800 text-white p-2 rounded">
              Update Password
            </button>
          </form>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold">Email</h3>
          <form onSubmit={handleSubmitEmail}>
            <input
              type="email"
              placeholder="New Email Address"
              value={email}
              onChange={handleEmailChange}
              className="border rounded-md p-2 w-full"
              required
            />
            <button type="submit" className="mt-2 bg-gray-800 text-white p-2 rounded">
              Update Email
            </button>
          </form>
        </div>
        {message && <p className={message.includes('success') ? 'text-green-500' : 'text-red-500'}>{message}</p>}
      </div>
    </div>
  );
};

export default SecuritySettings;
