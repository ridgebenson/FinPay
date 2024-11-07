import { useState } from 'react';
import NavBar from './../components/NavBar';
import Footer2 from './../components/landing/Footer2';
import { HiMenu, HiX } from 'react-icons/hi';

const Reports = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex min-h-screen">
            <NavBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            
            <div className="flex flex-col flex-grow md:ml-64">
                <header className="flex items-center justify-between bg-gradient-to-r from-accent to-primary text-white p-4 shadow-md sticky top-0 z-40">
                    <h1 className="text-2xl font-bold">Reports</h1>
                    <button onClick={toggleSidebar} className="text-white md:hidden">
                        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </header>

                <main className="flex-grow p-6">
                    <section className="mb-6">
                        <h2 className="text-xl font-bold mb-2">Summary</h2>
                        <p>Total Balance: $1250</p>
                        <p>Total Income: $1500</p>
                        <p>Total Expenses: $250</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold mb-2">Recent Transactions</h2>
                        <ul>
                            <li className="mb-2">
                                2023-10-01 - Payment to ABC Corp: $-50
                            </li>
                            <li className="mb-2">
                                2023-10-01 - Salary from XYZ Ltd: $1500
                            </li>
                            <li className="mb-2">
                                2023-10-02 - Grocery Shopping: $-200
                            </li>
                        </ul>
                    </section>
                </main>

                <Footer2 />
            </div>
        </div>
    );
};

export default Reports;
