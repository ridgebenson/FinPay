import React from 'react';

const Features: React.FC = () => {
  const features = [
    { title: 'Expense Tracking', description: 'Categorize and monitor expenses with ease.' },
    { title: 'Income Tracking', description: 'Keep a record of all income sources.' },
    { title: 'Budget Management', description: 'Set budgets to manage spending effectively.' },
    { title: 'Reporting Tools', description: 'Get insights with monthly reports and analytics.' },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-primary border-b-4 border-gradient-to-r from-primary to-accent inline-block">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-white to-background"
            >
              <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
