import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Login failed. Please check your credentials.');
      const data = await response.json();
      localStorage.setItem('token', data.token); // Store token for authenticated requests
      navigate('/dashboard'); // Redirect on successful login
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
        <h2 className="text-2xl font-bold mb-6 text-primary">Login</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-lg hover:opacity-90 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
