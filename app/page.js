import React from 'react';
import Navbar from './components/navbar';
import HeroSection from './components/hero';
import FeaturesSection from './components/features';
import BannerSection from './components/banner';
import Footer from './components/footer';
import DashboardImage from './components/dashboardimage';
import OrderBookImage from './components/orderbookimage';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4">
        <HeroSection />
        <DashboardImage />
        <FeaturesSection />
        <OrderBookImage /> 
        <BannerSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;