// import React from 'react';

const Dashboard = () => {
    const transactions = [
        { id: 1, description: 'Payment to ABC Corp', amount: -50, date: '2023-10-01' },
        { id: 2, description: 'Salary from XYZ Ltd', amount: 1500, date: '2023-10-01' },
        { id: 3, description: 'Grocery Shopping', amount: -200, date: '2023-10-02' },
    ];

    return (
        <div>
            <header>
                <h1>Dashboard</h1>
            </header>
            <section>
                <h2>Summary</h2>
                <p>Total Balance: $1250</p>
                <p>Total Income: $1500</p>
                <p>Total Expenses: $250</p>
            </section>
            <section>
                <h2>Recent Transactions</h2>
                <ul>
                    {transactions.map(transaction => (
                        <li key={transaction.id}>
                            {transaction.date} - {transaction.description}: ${transaction.amount}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;
