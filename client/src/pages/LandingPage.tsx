import React from 'react';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import CallToAction from '../components/landing/CallToAction';
import Footer from '../components/landing/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
