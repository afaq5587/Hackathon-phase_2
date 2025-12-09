'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend for authentication
    console.log('Login attempted with:', { email, password });
    alert('Login functionality is not yet implemented on the backend. After implementing, you will be redirected to the tasks page.');
    // For now, redirect to tasks page
    router.push('/tasks');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
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
