import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from './../../assets/hero.png';

const Hero: React.FC = () => {
  return (
    <section className="hero bg-gradient-to-br from-primary via-secondary to-primary text-white text-center py-20 px-4 relative">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Transform Your Finances with <span className="text-accent">FinPay</span>
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Effortless tracking, budgeting, and management for individuals and small businesses.
        </p>
        <Link to="/signup">
        <button className="bg-accent text-white py-2 px-4 rounded ml-4 hover:bg-white hover:text-amber-500 transition duration-300">
          Get Started
        </button>
        </Link>
      </div>
      <img
        src={heroImg}
        alt="Finance Illustration"
        className="absolute bottom-0 right-0 w-full md:w-1/2 opacity-10 md:opacity-10"
      />
    </section>
  );
};

export default Hero;
