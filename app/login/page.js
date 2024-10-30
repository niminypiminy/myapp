
"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:8kzD815Z/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password, 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        setError(errorData.message || 'Login failed');
        return; // Exit if there's an error
      }

      const data = await response.json();
      console.log('Data received:', data);
      if (data.authToken) {
        console.log('Token received:', data.authToken);
        localStorage.setItem('token', data.authToken);
        router.push('/dashboard');
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-1/3 p-8 space-y-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-500 sm:text-sm"
              required 
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-500 sm:text-sm"
              required 
              placeholder="Password"
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
          <div className="text-center text-sm">
            Don't have an account? 
            <Link href="/signup" className="font-medium text-blue-500 hover:text-blue-900 px-2">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;