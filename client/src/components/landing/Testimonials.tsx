import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-background to-secondary">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">What Our Users Say</h2>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-lg text-foreground">"FinPay has transformed the way I manage my finances. Highly recommended!"</p>
            <p className="mt-4 text-accent font-semibold">- John Doe</p>
          </div>
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-lg text-foreground">"A must-have tool for small business owners. Easy to use and very effective."</p>
            <p className="mt-4 text-accent font-semibold">- Jane Smith</p>
          </div>
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-lg text-foreground">"I've tried several budgeting apps but FinPay is by far the best one out there."</p>
            <p className="mt-4 text-accent font-semibold">- Michael Johnson</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
