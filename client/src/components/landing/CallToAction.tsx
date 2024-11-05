import React from 'react';
import { Link } from "react-router-dom";

const CallToAction: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-accent to-secondary text-white text-center py-20 px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Get Started?</h2>
      <Link to="/signup">
        <button className="bg-white text-accent font-semibold py-2 px-4 rounded hover:bg-accent hover:text-white transition duration-300">
          Sign Up Now
        </button>
      </Link>
    </section>
  );
};

export default CallToAction;
