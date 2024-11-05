import React from 'react';
// import { UserIcon } from 'shadcn-icons';
import { Link} from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">FinPay</h1>
        <nav className="hidden md:flex space-x-4">
          <a href="#home" className="hover:text-accent">Home</a>
          <a href="#features" className="hover:text-accent">Features</a>
          <a href="#about" className="hover:text-accent">About</a>
          <a href="#contact" className="hover:text-accent">Contact</a>
        </nav>
        <Link to="/login">
        <button className="flex items-center bg-accent text-white py-2 px-4 rounded ml-4 hover:bg-white hover:text-amber-500 transition duration-300">
          {/* <UserIcon className="mr-2" />  */}
          Log In
        </button>
        </Link>
        
      </div>
    </header>
  );
};

export default Header;
