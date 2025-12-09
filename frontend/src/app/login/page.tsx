'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../services/api'; // Import the API function
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State for error messages
  const router = useRouter();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const response = await loginUser(email, password);
      login(response.access_token, response.user.email); // Store token and user info
      router.push('/tasks'); // Redirect to tasks page on successful login
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-gray-300 rounded-md text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border border-gray-300 rounded-md text-black"
          required
        />
        <button
          type="submit"
          className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-700">
          Don't have an account?{' '}
          <button type="button" onClick={() => router.push('/signup')} className="text-blue-500 hover:underline">
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}