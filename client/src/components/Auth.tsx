import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) console.error('Error:', error.message);
    else alert('Check your email for the login link!');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Login / Sign Up</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Send Magic Link
        </button>
      </form>
    </div>
  );
};

export default Auth;
