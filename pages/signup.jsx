import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/signup', { name, email, password });
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Network node error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0d0e12] text-slate-100 overflow-hidden font-sans">
      {/* Decorative Crypto Glow Blobs */}
      <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyan-600/15 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Glassmorphic Container */}
      <div className="relative w-full max-w-md mx-4 p-8 bg-[#161920]/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl shadow-black/50">
        
        {/* Branding Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 mb-4 shadow-lg shadow-emerald-500/20">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Initialize New Identity
          </h2>
          <p className="text-sm text-slate-400 mt-1">Register your profile on the system network</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#0d0e12]/80 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white transition-all duration-200 placeholder-slate-600 text-sm"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Corporate Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#0d0e12]/80 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white transition-all duration-200 placeholder-slate-600 text-sm"
              placeholder="name@company.com"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Secure Passkey
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#0d0e12]/80 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white transition-all duration-200 placeholder-slate-600 text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-400/20 active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none text-sm cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating Identity Node...
              </span>
            ) : (
              'Create Identity Token'
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 text-center text-sm text-slate-400">
          Already registered on node?{' '}
          <a href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            Connect account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;