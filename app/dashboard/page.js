"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import WalletBalance from './components/walletbalance';
import SecuritySettings from './components/security';
import Transactions from './components/swap';
import Sidebar from './components/sidebar';
import OrderBook from './components/orderbook';
import Discovery from './components/blog';
import Contact from './components/contact';
import SessionManagement from './components/sessions';

const getGreeting = (name) => {
  const hours = new Date().getHours();
  return hours < 12
    ? `Good morning, ${name}!`
    : hours < 18
      ? `Good afternoon, ${name}!`
      : `Good evening, ${name}!`;
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('balance'); // Default tab
  const router = useRouter();

  useEffect(() => {
    // Check for active tab in local storage
    const storedTab = localStorage.getItem('activeTab');
    if (storedTab) {
      setActiveTab(storedTab);
      localStorage.removeItem('activeTab'); // Clean up
    }

    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:8kzD815Z/auth/me', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data)); // Save user data to local storage
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data');
      }
    };

    fetchUserData();
  }, [router]);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Loading...</p>;

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'balance':
        return <WalletBalance user={user} />; // Pass user data to WalletBalance
      case 'security':
        return <SecuritySettings user={user} updateUser={updateUser} />;
      case 'sessions':
        return <SessionManagement />;
      case 'swap':
        return <Transactions />;
      case 'orderbook':
        return <OrderBook />;
      case 'discovery':
        return <Discovery />;
      case 'contact':
        return <Contact />;
      default:
        return <WalletBalance user={user} />; // Pass user data to WalletBalance
    }
  };


  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-4xl text-center font-bold mb-8 mt-8">{getGreeting(user.name)}</h1>
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default Dashboard;
