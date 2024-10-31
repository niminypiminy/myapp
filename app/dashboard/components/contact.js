"use client";

import React, { useState, useEffect } from 'react';
import { useFormspark } from '@formspark/use-formspark';
import { useRouter } from 'next/navigation';

const FORMSPARK_FORM_ID = "BCiQzHi2"; // Form ID

const Contact = () => {
  const router = useRouter();
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); // State for success message
  const [userEmail, setUserEmail] = useState(''); // State to hold user email

  useEffect(() => {
    // Retrieve email from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email) {
      setUserEmail(user.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check honeypot field
    const isBot = e.target.hp_email.value; // Check honeypot field
    if (isBot) {
      console.log("Bot detected!");
      return; // Prevent further processing if the honeypot is filled
    }

    // Submit the form with subject, message, and user email
    await submit({ subject, message, email: userEmail });
    setSuccess(true);
    setSubject('');
    setMessage('');

    // Redirect after a short delay
    setTimeout(() => {
      router.push('/dashboard'); // Change '/dashboard' to the actual dashboard route
    }, 2000); // Redirect after 2 seconds 
  };

  return (
    <div className="flex justify-center mt-16 p-6">
      {success ? (
        <div className="text-green-500 text-center">
          <h2>Thank you! Your form was successfully submitted.</h2>
          <p>We will respond as soon as possible...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
          {/* Honeypot field */}
          <input type="text" name="hp_email" style={{ display: 'none' }} />

          <div className="mb-4">
            <label htmlFor="subject" className="block text-white mb-2">Subject</label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border rounded-md p-2 w-full bg-gray-800 text-white"
              placeholder="Enter the subject"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-white mb-2">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border rounded-md p-2 w-full bg-gray-800 text-white"
              placeholder="Write your message"
              rows="4"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            disabled={submitting} // Disable button while submitting
          >
            {submitting ? 'Sending...' : 'Send'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;