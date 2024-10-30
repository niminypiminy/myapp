"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:8kzD815Z/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.authToken);
        toast.success('Signup successful!');
        router.push('/dashboard'); // Redirect to dashboard
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred during signup.');
        toast.error(data.message || 'An error occurred during signup.');
      }
    } catch (error) {
      setError('Failed to connect to the server. Please try again.');
      toast.error('Failed to connect to the server. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-1/3 p-8 space-y-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-center">Create an Account</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-500"
              required 
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-500"
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
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-500"
              required 
              placeholder="Password"
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
          <div className="text-center text-sm">
            Already have an account? 
            <Link href="/login" className="font-medium text-blue-500 hover:text-blue-900 px-2">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;