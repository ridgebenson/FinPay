import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FaChartArea } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";


interface NavBarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <div className="relative z-50">
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-r from-primary to-accent text-white p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 md:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    <Link to="/" className="text-3xl font-bold mb-10">FinPay</Link>

                    <nav className="flex flex-col space-y-2">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex items-center pl-4 py-2 rounded-md transition-colors duration-300 ${isActive
                                    ? 'bg-secondary text-white font-semibold border-l-4 border-accent'
                                    : 'text-gray-200 hover:bg-accent hover:text-white'
                                }`
                            }
                        >
                            <FaHome className="mr-2" />
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/transactions"
                            className={({ isActive }) =>
                                `flex items-center pl-4 py-2 rounded-md transition-colors duration-300 ${isActive
                                    ? 'bg-secondary text-white font-semibold border-l-4 border-accent'
                                    : 'text-gray-200 hover:bg-accent hover:text-white'
                                }`
                            }
                        >
                            <FaDollarSign className="mr-2" />
                            Transactions
                        </NavLink>
                        <NavLink
                            to="/budgets"
                            className={({ isActive }) =>
                                `flex items-center pl-4 py-2 rounded-md transition-colors duration-300 ${isActive
                                    ? 'bg-secondary text-white font-semibold border-l-4 border-accent'
                                    : 'text-gray-200 hover:bg-accent hover:text-white'
                                }`
                            }
                        >
                            <FaMoneyBill1Wave className="mr-2" />
                            Budgets
                        </NavLink>
                        <NavLink
                            to="/reports"
                            className={({ isActive }) =>
                                `flex items-center pl-4 py-2 rounded-md transition-colors duration-300 ${isActive
                                    ? 'bg-secondary text-white font-semibold border-l-4 border-accent'
                                    : 'text-gray-200 hover:bg-accent hover:text-white'
                                }`
                            }
                        >
                            <FaChartArea className="mr-2" />
                            Reports
                        </NavLink>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `flex items-center pl-4 py-2 rounded-md transition-colors duration-300 ${isActive
                                    ? 'bg-secondary text-white font-semibold border-l-4 border-accent'
                                    : 'text-gray-200 hover:bg-accent hover:text-white'
                                }`
                            }
                        >
                            <IoIosSettings className="mr-2" />
                            Settings
                        </NavLink>
                    </nav>

                    <button
                        onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}
                        className="mt-auto flex items-center justify-center bg-accent text-primary py-2 rounded-lg hover:bg-secondary hover:text-white transition duration-300"
                    >
                        <IoIosLogOut className="mr-2" />
                        Logout
                    </button>
                </div>
            </aside>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
};

export default NavBar;
