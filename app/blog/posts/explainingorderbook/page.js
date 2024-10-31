"use client"; 

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ExplainingOrderBook = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for the activeTab query parameter
    const activeTab = searchParams.get('activeTab');

    if (activeTab) {
      // Navigate to the appropriate tab in the dashboard
      router.push(`/dashboard?activeTab=${activeTab}`);
    }
  }, [router, searchParams]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Protect Your Wallet</h1>
        <p>Keeping your wallet secure is essential for safeguarding your digital assets. Here are some crucial tips to help you maintain the safety of your wallet:</p>

        <h2 className="text-2xl font-bold mt-6">1. Store Your Mnemonic Securely</h2>
        <p>Your mnemonic phrase is the key to accessing your wallet. Store it in a secure location, such as a password manager or a physical safe. Avoid digital notes or unencrypted files, as these can be easily compromised.</p>

        <h2 className="text-2xl font-bold mt-6">2. Enable Two-Factor Authentication (2FA)</h2>
        <p>To enhance your wallet's security, consider enabling two-factor authentication. In your user settings, you can toggle this feature on or off. When activated, you will receive a 6-digit code via email every time you log in, providing an additional layer of protection against unauthorized access.</p>

        <h2 className="text-2xl font-bold mt-6">3. Monitor Active Sessions</h2>
        <p>Regularly check the sessions tab to review your active sessions. You can revoke any suspicious or unfamiliar sessions to prevent unauthorized access. This feature allows you to monitor IP addresses, device information, and time stamps associated with each session.</p>

        <h2 className="text-2xl font-bold mt-6">4. Use Strong Passwords</h2>
        <p>Always use strong, unique passwords for your wallet and associated accounts. Consider using a password manager to help you create and store complex passwords securely.</p>

        <h2 className="text-2xl font-bold mt-6">5. Stay Vigilant Against Phishing Attacks</h2>
        <p>Be cautious of emails or messages that ask for your wallet information or login credentials. Always verify the sender's authenticity and never click on suspicious links.</p>

        <h2 className="text-2xl font-bold mt-6">Conclusion</h2>
        <p>By following these practices, you can significantly enhance the security of your wallet and protect your digital assets. Remember, staying informed and vigilant is your best defense against potential threats.</p>
      </div>
    </Suspense>
  );
};

export default ExplainingOrderBook;