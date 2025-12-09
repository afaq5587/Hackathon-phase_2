'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend
    console.log('Signup attempted with:', { email, password });
    alert('Signup functionality is not yet implemented on the backend. You can proceed to login after implementing it.');
    // For now, redirect to login page
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
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
          className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
        <p className="text-center text-sm text-gray-700">
          Already have an account?{' '}
          <button type="button" onClick={() => router.push('/login')} className="text-blue-500 hover:underline">
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
