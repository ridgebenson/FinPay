import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({ firstName: '',lastName:'', email: '',phone:'', password: '',confirmPwd:'' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Sign-up failed. Please try again.');
      navigate('/login');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-primary">Sign Up</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type='number'
            name='phone'
            placeholder='Phone Number'
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type='password'
            name='confirmPwd'
            placeholder='Confirm Password'
            value={formData.confirmPwd}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-lg hover:opacity-90 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
